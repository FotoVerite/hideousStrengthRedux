import {DigestedConversationListItem} from 'components/apps/Messages/context/digestConversation/types';
import {DigestedConversation} from 'components/apps/Messages/context/types';
import React, {FC} from 'react';
import {
  View,
  useWindowDimensions,
  ListRenderItem,
  StyleSheet,
} from 'react-native';
import Animated, {
  useAnimatedRef,
  useScrollViewOffset,
} from 'react-native-reanimated';
import ItemContainer from '../ItemContainer';
import theme from 'themes';

function ListHeader() {
  return <View style={styles.listHeader} />;
}

function ListFooter() {
  return <View style={styles.listFooter} />;
}

const List: FC<{conversation: DigestedConversation | undefined}> = ({
  conversation,
}) => {
  const {width, height} = useWindowDimensions();

  const aref = useAnimatedRef<Animated.ScrollView>();
  const scrollHandler = useScrollViewOffset(aref);
  const renderDigestedConversation: ListRenderItem<
    DigestedConversationListItem
  > = ({item, index}) => (
    <ItemContainer
      item={item}
      group={conversation?.group}
      scrollHandler={scrollHandler}
      index={index}
      key={`item-${index}`}
    />
  );

  return (
    <Animated.FlatList
      ref={aref}
      style={[styles.list, {width: width}]}
      data={conversation?.exchanges}
      renderItem={renderDigestedConversation}
      keyExtractor={(item: DigestedConversationListItem, index) =>
        `$conversation.name}-${index}`
      }
      ListHeaderComponent={ListHeader}
      ListFooterComponent={ListFooter}
      getItemLayout={(data, index) => ({
        length: data[index].height + data[index].paddingBottom,
        offset: data[index].offset,
        index,
      })}
      maxToRenderPerBatch={10}
      scrollEventThrottle={16}
    />
  );
};

export default List;

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
