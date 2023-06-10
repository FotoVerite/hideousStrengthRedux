import React, {FC, useContext, useEffect} from 'react';
import {ListRenderItem, StyleSheet, View} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import theme from 'themes';
import {ConversationType} from '../../context/types';
import ConversationListItem from './ConversationListItem';
import {MessagesContext} from '../../context';
import Search from './Search';

function Separator() {
  return <View style={styles.itemSeparator} />;
}
const Conversations: FC = () => {
  const context = useContext(MessagesContext);

  const pushLeft = useSharedValue(0);
  const aref = useAnimatedRef<Animated.FlatList<ConversationType>>();
  const scrollHandler = useScrollViewOffset(aref);

  useEffect(() => {
    if (context.conversation.state) {
      pushLeft.value = withDelay(450, withTiming(1, {duration: 750}));
    } else {
      pushLeft.value = withTiming(0, {duration: 750});
    }
  }, [context.conversation.state, pushLeft]);

  const AnimateMessagesLeft = useAnimatedStyle(() => {
    return {
      right: interpolate(pushLeft.value, [0, 1], [0, 75]),
    };
  }, [context.conversation.state]);

  const renderItem: ListRenderItem<ConversationType> = ({item}) => (
    <ConversationListItem conversation={item} />
  );

  return (
    <Animated.View style={[styles.screen, AnimateMessagesLeft]}>
      <Search scrollOffset={scrollHandler} />
      <Animated.FlatList
        ref={aref}
        ItemSeparatorComponent={Separator}
        style={styles.list}
        data={context.conversations}
        renderItem={renderItem}
        keyExtractor={(item: ConversationType, index) =>
          index + '-conversation'
        }
        scrollEventThrottle={16}
      />
    </Animated.View>
  );
};

export default Conversations;

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    flex: 1,
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
