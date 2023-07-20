import React, {FC, useContext, useEffect, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {P} from 'components/common/StyledText';
import {TextBubble} from './TextBubble';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {ImageBubble} from './ImageBubble';
import {
  DigestedConversationListItem,
  DigestedItemTypes,
} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';
import {GlyphBubble} from './GlyphBubble';
import {EmojiBubble} from './EmojiBubble';
import {TypingBubble} from './TypingBubble';

import {TextOrchestrationContext} from 'components/apps/Messages/context/textOrchestration';
import {delayFor} from 'common';
import {SnapshotBubble} from './SnapshotBubble';

const ItemContainer: FC<{
  item: DigestedConversationListItem;
  index: number;
  scrollHandler: SharedValue<number>;
  scrollRef: React.RefObject<Animated.ScrollView>;
  group: boolean;
}> = ({item, scrollHandler, scrollRef, group, index}) => {
  const opacity = useSharedValue(
    item.messageDelay && item.type !== DigestedItemTypes.SNAPSHOT ? 0 : 1,
  );

  const isWaiting =
    item.type === DigestedItemTypes.STRING &&
    item.leftSide === true &&
    item.messageDelay;

  const MemoTextBubble = useMemo(() => {
    if (item.type === DigestedItemTypes.STRING && !isWaiting) {
      return (
        <TextBubble
          {...item}
          scrollHandler={scrollHandler}
          group={group}
          scrollRef={scrollRef}
        />
      );
    }
  }, [item]);

  const MemoGlyphBubble = useMemo(() => {
    if (item.type === DigestedItemTypes.GLYPH) {
      return (
        <GlyphBubble {...item} scrollHandler={scrollHandler} group={group} />
      );
    }
  }, [scrollHandler, group, item]);

  const MemoTypingBubble = useMemo(() => {
    if (isWaiting) {
      return (
        <TypingBubble
          {...item}
          scrollHandler={scrollHandler}
          group={group}
          scrollRef={scrollRef}
        />
      );
    }
  }, [scrollHandler, group, item]);

  const MemoImageBubble = useMemo(() => {
    if (item.type === DigestedItemTypes.IMAGE) {
      return <ImageBubble {...item} />;
    }
  }, [item]);

  const MemoEmojiBubble = useMemo(() => {
    if (item.type === DigestedItemTypes.EMOJI) {
      return <EmojiBubble {...item} />;
    }
  }, [item]);

  const MemoTimeBubble = useMemo(() => {
    if (item.type === DigestedItemTypes.TIME) {
      return <P style={[styles.time]}>{item.content}</P>;
    }
  }, [item]);

  const MemoSnapshotBubble = useMemo(() => {
    if (item.type === DigestedItemTypes.SNAPSHOT) {
      return (
        <SnapshotBubble
          {...item}
          index={index}
          scrollHandler={scrollHandler}
          group={group}
          scrollRef={scrollRef}
        />
      );
    }
  }, [item]);

  useEffect(() => {
    const toBottom = async (delay: number) => {
      await delayFor(delay);
      scrollRef.current?.scrollToEnd({animated: true});
      opacity.value = withTiming(1, {duration: 300});
      if (!isWaiting) {
      }
    };
    if (item.type !== DigestedItemTypes.SNAPSHOT && item.messageDelay) {
      toBottom(item.messageDelay);
    }
  }, []);

  const fadeInAnimation = useAnimatedStyle(() => {
    return {opacity: opacity.value};
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          height: item.height,
          alignItems: item.alignItems,
          marginBottom: item.paddingBottom,
        },
        fadeInAnimation,
      ]}>
      {MemoTimeBubble}
      {/* <View style={{position: 'absolute'}}>
        {MemoEmojiBubble}
        {MemoTextBubble}
        {MemoGlyphBubble}
        {MemoImageBubble}
      </View> */}
      <View>
        {MemoEmojiBubble}
        {MemoTextBubble}
        {MemoTypingBubble}
        {MemoGlyphBubble}
        {MemoImageBubble}
        {MemoSnapshotBubble}
      </View>
    </Animated.View>
  );
};

export default ItemContainer;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },

  time: {
    fontSize: 10,
    textAlign: 'center',
  },
});
