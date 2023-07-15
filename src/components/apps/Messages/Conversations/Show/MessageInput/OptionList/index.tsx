import {MessagesContext} from 'components/apps/Messages/context';
import React, {FC, useContext, useEffect, useRef, useState} from 'react';
import {FlatList, ListRenderItem, StyleSheet, View} from 'react-native';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {GenericStateType} from 'types/genericContextTypes';
import Option from './Option';
import theme from 'themes';
import NoOption from './NoOption';
import {TextOrchestrationContext} from 'components/apps/Messages/context/textOrchestration';

const Conversations: FC<{
  active: GenericStateType<boolean>;
}> = ({active}) => {
  const context = useContext(MessagesContext);
  const textOrchestraContext = useContext(TextOrchestrationContext);
  const route = textOrchestraContext.route;
  const showOptions = useSharedValue(0);

  const [optionsHeight, setOptionsHeight] = useState(0);

  const conversation = context.conversation.state;
  const conversationRef = useRef(conversation);
  const [refresh, setRefresh] = useState(0);
  const name = conversationRef.current?.name;

  useEffect(() => {
    if (!conversation) {
      active.set(false);
    } else {
      conversationRef.current = conversation;
      setRefresh(i => (i += 1));
    }
  }, [conversation]);

  useEffect(() => {
    if (conversationRef.current) {
      setOptionsHeight(0);
    }
  }, [name, route]);

  useEffect(() => {
    if (active.state) {
      showOptions.value = withDelay(50, withTiming(1, {duration: 300}));
    } else {
      showOptions.value = withDelay(50, withTiming(0, {duration: 300}));
    }
  }, [active.state]);

  useEffect(() => {
    if (active.state) {
      textOrchestraContext.sharedValues.optionsHeight.value = withTiming(
        optionsHeight,
        {duration: 50},
        () => runOnJS(textOrchestraContext.scrollTo.set)(-1),
      );
    } else {
      textOrchestraContext.sharedValues.optionsHeight.value = withDelay(
        50,
        withTiming(0, {duration: 300}),
      );
    }
  }, [active.state]);

  const animateOptionsUp = useAnimatedStyle(() => {
    return {
      height: interpolate(showOptions.value, [0, 1], [0, optionsHeight]),
    };
  }, [showOptions, active.state]);
  return (
    <Animated.View style={[styles.screen, animateOptionsUp]}>
      {conversationRef.current && (
        <View style={{}}>
          {route == null && (
            <NoOption
              active={active}
              totalHeight={setOptionsHeight}
              key={conversationRef.current.name}
            />
          )}
          {route &&
            route.options.map(option => (
              <Option
                key={option}
                option={option}
                active={active}
                totalHeight={setOptionsHeight}
              />
            ))}
        </View>
      )}
    </Animated.View>
  );
};

export default Conversations;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: theme.colors.muted,
    overflow: 'hidden',
    zIndex: 3,
  },
  itemSeparator: {
    height: 1,
    marginVertical: 10,
    backgroundColor: 'gray',
  },

  list: {
    paddingHorizontal: theme.spacing.p2,
    flexGrow: 1,
  },
});
