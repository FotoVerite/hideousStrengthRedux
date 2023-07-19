import {P} from 'components/common/StyledText';
import React, {FC, useContext, useEffect, useRef, useState} from 'react';
import {
  ListRenderItem,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import theme from 'themes';
import {NotificationsContext} from '../context';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

function Separator() {
  return <View style={styles.itemSeparator} />;
}

const renderItem: ListRenderItem<any> = ({item}) => (
  <View style={styles.item}>
    <P>{item.content}</P>
  </View>
);

const ActiveNotifications: FC<{left: SharedValue<number>}> = ({left}) => {
  const notificationsContext = useContext(NotificationsContext);

  const [active, setActive] = useState(false);
  const pushLeft = useSharedValue(0);
  const aref = useAnimatedRef<Animated.FlatList<any>>();

  const inset = useSafeAreaInsets();

  return <View pointerEvents="box-none"></View>;
};

export default ActiveNotifications;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#6e6e6e52',
    position: 'absolute',
    zIndex: 102,
  },

  itemSeparator: {
    height: 10,
  },

  item: {
    borderRadius: 25,
    backgroundColor: '#ffffffc7',
    padding: theme.spacing.p1,
  },

  list: {
    paddingHorizontal: theme.spacing.p2,
    flexGrow: 1,
  },
});
