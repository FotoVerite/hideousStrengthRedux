import React, {FC, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import theme from 'themes';
import {DigestedConversationListItem} from 'components/apps/Messages/context/digestConversation';
import {P} from 'components/common/StyledText';
import {TextBubble} from './TextBubble';
import {SharedValue} from 'react-native-reanimated';
import {Row} from 'components/common/layout';
import {ImageBubble} from './ImageBubble';

const ItemContainer: FC<{
  item: DigestedConversationListItem;
  index: number;
  scrollHandler: SharedValue<number>;
}> = ({item, scrollHandler, index}) => {
  const MemoTextBubble = useMemo(() => {
    if (item.type === 'string') {
      return <TextBubble {...item} scrollHandler={scrollHandler} />;
    }
  }, [scrollHandler, item]);

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
          height: item.height - 8,
          alignItems: item.alignItems,
        },
      ]}>
      {item.type === 'time' && <P style={[styles.time]}>{item.content}</P>}
      {item.type === 'string' && MemoTextBubble}
      {item.type === 'image' && <ImageBubble {...item} />}
    </View>
  );
};

export default ItemContainer;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginBottom: 8,
  },

  time: {
    fontSize: 10,
    textAlign: 'center',
  },
});
