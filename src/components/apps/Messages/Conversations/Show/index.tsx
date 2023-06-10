import React, {FC, useContext, useEffect, useRef} from 'react';
import {
  ListRenderItem,
  View,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {useFont} from '@shopify/react-native-skia';

import {ConversationExchangeType} from '../../context/types';

import {MessagesContext} from '../../context';
import Exchange from './Exchange';

import theme from 'themes';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import SFPro from '@applicationAssets/fonts/HelveticaNeue.ttf';

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

  const conversation = useRef(context.conversation.state);
  const offsetFromTopAcc = useRef(50);

  const aref = useAnimatedRef<Animated.ScrollView>();
  const scrollHandler = useScrollViewOffset(aref);

  if (
    context.conversation.state != null &&
    conversation.current !== context.conversation.state
  ) {
    conversation.current = context.conversation.state;
  } else {
    offsetFromTopAcc.current = 50;
  }

  const showMessage = useSharedValue(0);

  useEffect(() => {
    if (context.conversation.state) {
      showMessage.value = withDelay(300, withTiming(1, {duration: 750}));
    } else {
      showMessage.value = withTiming(0, {duration: 750});
    }
  }, [context.conversation.state, showMessage]);

  const AnimateMessageLeft = useAnimatedStyle(() => {
    return {
      marginLeft: interpolate(showMessage.value, [0, 1], [width, 0]),
    };
  }, [context.conversation.state]);

  const font = useFont(SFPro, 14);

  if (font === null) {
    return null;
  }

  const renderConversation: ListRenderItem<ConversationExchangeType> = ({
    item,
    index,
  }) => (
    <Exchange
      conversation={item}
      offsetFromTopAcc={offsetFromTopAcc}
      scrollHandler={scrollHandler}
      font={font}
      index={index}
      key={`exchange-${index}`}
    />
  );

  return (
    <Animated.View
      style={[
        {height: height - (insets.top + insets.bottom)},
        styles.screen,
        AnimateMessageLeft,
      ]}>
      <Animated.FlatList
        ref={aref}
        style={[styles.list, {width: width}]}
        initialNumToRender={1}
        data={conversation.current?.exchanges}
        renderItem={renderConversation}
        keyExtractor={(item: ConversationExchangeType, index) => index + ''}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
        windowSize={3}
        scrollEventThrottle={16}
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
