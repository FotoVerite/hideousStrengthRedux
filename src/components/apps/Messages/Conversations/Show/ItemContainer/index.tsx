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
} from 'components/apps/Messages/context/digestConversation/types';
import {GlyphBubble} from './GlyphBubble';
import {EmojiBubble} from './EmojiBubble';
import {delayFor} from 'common';
import {MessagesContext} from 'components/apps/Messages/context';
import {TypingBubble} from './TypingBubble';

const ItemContainer: FC<{
  item: DigestedConversationListItem;
  index: number;
  scrollHandler: SharedValue<number>;
  scrollRef: React.RefObject<Animated.ScrollView>;
  group: boolean;
}> = ({item, scrollHandler, scrollRef, group, index}) => {
  const context = useContext(MessagesContext);
  const opacity = useSharedValue(item.delay ? 0 : 1);

  const isWaiting =
    item.type === DigestedItemTypes.STRING &&
    item.leftSide == true &&
    item.delay;

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
  }, [scrollHandler, group, item]);

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

  useEffect(() => {
    const toBottom = async (delay: number) => {
      await delayFor(delay);
      scrollRef.current?.scrollToEnd({animated: true});
      opacity.value = withTiming(1, {duration: 300});
      if (isWaiting) {
        await delayFor(1000 + delay);
      }
      context.textFinished(true);
    };
    if (item.delay) {
      toBottom(item.delay);
    }
  }, [item.delay]);

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
      {item.type === DigestedItemTypes.TIME && (
        <P style={[styles.time]}>{item.content}</P>
      )}
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
