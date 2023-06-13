import React, {FC, useContext, useEffect, useRef} from 'react';
import {View, useWindowDimensions, StyleSheet} from 'react-native';
import Animated, {
  useAnimatedRef,
  useScrollViewOffset,
  useSharedValue,
  withDelay,
  withTiming,
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MessagesContext} from '../../context';
import theme from 'themes';
import List from './List';

function ListHeader() {
  return <View style={styles.listHeader} />;
}

function ListFooter() {
  return <View style={styles.listFooter} />;
}

const Conversation: FC = () => {
  const {width, height} = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const context = useContext(MessagesContext);

  const digestedConversation = useRef(context.digestedConversation.state);

  if (
    context.digestedConversation.state != null &&
    digestedConversation.current !== context.digestedConversation.state
  ) {
    digestedConversation.current = context.digestedConversation.state;
  }

  const showMessage = useSharedValue(0);

  useEffect(() => {
    if (context.digestedConversation.state) {
      showMessage.value = withDelay(300, withTiming(1, {duration: 750}));
    } else {
      showMessage.value = withTiming(0, {duration: 750});
    }
  }, [context.digestedConversation.state, showMessage]);

  const AnimateMessageLeft = useAnimatedStyle(() => {
    return {
      marginLeft: interpolate(showMessage.value, [0, 1], [width, 0]),
    };
  }, [context.digestedConversation.state]);

  return (
    <Animated.View
      style={[
        {height: height - (insets.top + insets.bottom)},
        styles.screen,
        AnimateMessageLeft,
      ]}>
      <List
        conversation={digestedConversation.current}
        key={digestedConversation.current?.name}
      />
    </Animated.View>
  );
};

export default Conversation;

const styles = StyleSheet.create({
  listHeader: {
    height: 0,
    marginBottom: theme.spacing.p3,
  },
  listFooter: {
    height: 0,
    marginBottom: theme.spacing.p2,
  },
  list: {
    backgroundColor: theme.colors.muted,
    padding: theme.spacing.p1,
    paddingBottom: 0,
    flexGrow: 1,
  },
  itemSeparator: {
    height: 1,
    marginVertical: 10,
    backgroundColor: 'gray',
  },
  screen: {
    zIndex: 2,
    position: 'absolute',
  },
});
