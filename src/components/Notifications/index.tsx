import {Blur, Canvas, Image} from '@shopify/react-native-skia';
import React, {FC, PropsWithChildren, useContext, useRef} from 'react';
import {StyleSheet, View, useWindowDimensions} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import NotificationsList from './List';
import {
  interpolate,
  runOnJS,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {SnapShotContext} from 'components/Snapshot/context';
import NotificationsContextProvider from './context';
import ActiveNotifications from './ActiveNotifications';

const Notifications: FC<PropsWithChildren> = ({children}) => {
  const snapshotContext = useContext(SnapShotContext);
  const insets = useSafeAreaInsets();
  const {width, height} = useWindowDimensions();
  const left = useSharedValue(width);
  const open = useRef<boolean>(false);

  const blur = useDerivedValue(() => {
    return interpolate(left.value, [0, width], [8, 0]);
  });

  const reset = () => {
    open.current = false;
    snapshotContext.background.set(undefined);
    snapshotContext.takeBackground.set(false);
  };

  return (
    <NotificationsContextProvider>
      <PanGestureHandler
        activeOffsetX={[-50, 50]}
        onActivated={e => {
          snapshotContext.takeBackground.set(true);
        }}
        onEnded={e => {
          if (left.value <= width / 2) {
            left.value = withTiming(0);
            open.current = true;
          } else {
            left.value = withTiming(width, {}, () => {
              runOnJS(reset)();
            });
          }
        }}
        onGestureEvent={e => {
          if (open.current) {
            left.value = Math.max(0, e.nativeEvent.translationX);
          } else {
            left.value = width + e.nativeEvent.translationX;
          }
        }}>
        <View style={styles.layout}>
          <NotificationsList left={left} />
          {snapshotContext.background.state && (
            <Canvas
              pointerEvents="none"
              style={{
                marginTop: 12,
                width: width,
                height: height,
                position: 'absolute',
                zIndex: 99,
              }}>
              <Image
                x={0}
                y={0.5}
                width={width}
                height={height}
                image={snapshotContext.background.state}>
                <Blur blur={blur} />
              </Image>
            </Canvas>
          )}
          {children}
        </View>
      </PanGestureHandler>
      <ActiveNotifications />
    </NotificationsContextProvider>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  layout: {
    flexGrow: 1,
    backgroundColor: '#f1f1f1',
  },
});
