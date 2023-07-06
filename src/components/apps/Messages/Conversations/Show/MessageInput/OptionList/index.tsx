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
  scrollToBottom: GenericStateType<boolean>;
}> = ({active, scrollToBottom}) => {
  const context = useContext(MessagesContext);
  const textOrchestraContext = useContext(TextOrchestrationContext);

  const showOptions = useSharedValue(0);

  const [optionsHeight, setOptionsHeight] = useState(0);

  const conversation = context.digestedConversation.state;

  useEffect(() => {
    if (!conversation) {
      setOptionsHeight(0);
    }
  }, [conversation]);

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
        () => runOnJS(scrollToBottom.set)(true),
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
      height: interpolate(showOptions.value, [0, 1], [0, 50]),
    };
  }, [showOptions, active.state]);

  return (
    <Animated.View style={[styles.screen, animateOptionsUp]}>
      {conversation && (
        <View style={{}}>
          {conversation && conversation.route == null && (
            <NoOption active={active} totalHeight={setOptionsHeight} />
          )}
          {conversation.route &&
            conversation.route.options.map(option => (
              <Option
                key={option.key}
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
