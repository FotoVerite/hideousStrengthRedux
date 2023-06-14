import React, {FC, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {P} from 'components/common/StyledText';
import {TextBubble} from './TextBubble';
import {SharedValue} from 'react-native-reanimated';
import {ImageBubble} from './ImageBubble';
import {
  DigestedConversationListItem,
  DigestedItemTypes,
} from 'components/apps/Messages/context/digestConversation/types';
import {GlyphBubble} from './GlyphBubble';
import {EmojiBubble} from './EmojiBubble';

const ItemContainer: FC<{
  item: DigestedConversationListItem;
  index: number;
  scrollHandler: SharedValue<number>;
  group: boolean;
}> = ({item, scrollHandler, group, index}) => {
  const MemoTextBubble = useMemo(() => {
    if (item.type === 'string') {
      return (
        <TextBubble {...item} scrollHandler={scrollHandler} group={group} />
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

  return (
    <View
      style={[
        styles.container,
        {
          height: item.height,
          alignItems: item.alignItems,
          marginBottom: item.paddingBottom,
        },
      ]}>
      {item.type === DigestedItemTypes.TIME && (
        <P style={[styles.time]}>{item.content}</P>
      )}

      {MemoEmojiBubble}

      {item.type === DigestedItemTypes.STRING && MemoTextBubble}

      {item.type === DigestedItemTypes.GLYPH && (
        <GlyphBubble {...item} scrollHandler={scrollHandler} group={group} />
      )}

      {item.type === DigestedItemTypes.IMAGE && MemoImageBubble}
    </View>
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
