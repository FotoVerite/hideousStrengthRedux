import React, {FC, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {P} from 'components/common/StyledText';
import {TextBubble} from './TextBubble';
import {SharedValue} from 'react-native-reanimated';
import {ImageBubble} from './ImageBubble';
import {DigestedConversationListItem} from 'components/apps/Messages/context/digestConversation/types';
import {GlyphBubble} from './GlyphBubble';

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
    if (item.type === 'string') {
      return <ImageBubble {...item} />;
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
      {item.type === 'time' && <P style={[styles.time]}>{item.content}</P>}
      {item.type === 'string' && MemoTextBubble}
      {item.type === 'glyph' && (
        <GlyphBubble {...item} scrollHandler={scrollHandler} group={group} />
      )}

      {item.type === 'image' && <ImageBubble {...item} />}
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
