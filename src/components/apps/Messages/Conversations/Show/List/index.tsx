import {DigestedConversationListItem} from 'components/apps/Messages/context/digestConversation/types';
import {DigestedConversation} from 'components/apps/Messages/context/types';
import React, {FC, useContext, useEffect} from 'react';
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
import Footer from './Footer';
import {GenericStateType} from 'types/genericContextTypes';
import {TextOrchestrationContext} from 'components/apps/Messages/context/textOrchestration';

function ListHeader() {
  return <View style={styles.listHeader} />;
}

const List: FC<{
  conversation: DigestedConversation | undefined;
}> = ({conversation}) => {
  const {width, height} = useWindowDimensions();
  const textOrchestration = useContext(TextOrchestrationContext);
  const aref = useAnimatedRef<Animated.ScrollView>();
  const scrollHandler = useScrollViewOffset(aref);
  const renderDigestedConversation: ListRenderItem<
    DigestedConversationListItem
  > = ({item, index}) => (
    <ItemContainer
      item={item}
      group={conversation?.group || false}
      scrollHandler={scrollHandler}
      index={index}
      scrollRef={aref}
      key={`item-${index}`}
    />
  );

  useEffect(() => {
    if (textOrchestration.scrollTo.state != null) {
      if (textOrchestration.scrollTo.state === -1) {
        aref.current?.scrollToEnd({animated: true});
      } else {
        aref.current?.scrollTo({
          y: textOrchestration.scrollTo.state,
          animated: true,
        });
      }
      textOrchestration.scrollTo.set(undefined);
    }
  }, [textOrchestration.scrollTo.state]);

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
      ListFooterComponent={<Footer />}
      getItemLayout={(data, index) => ({
        length: data[index].height + data[index].paddingBottom,
        offset: data[index].offset,
        index,
      })}
      maxToRenderPerBatch={10}
      scrollEventThrottle={16}
      //onContentSizeChange={() => aref.current?.scrollToEnd({animated: true})}
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
    marginBottom: theme.spacing.p2 + 50,
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
