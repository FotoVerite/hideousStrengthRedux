import React, {FC, useEffect, useRef, useState} from 'react';
import {LayoutChangeEvent, StyleSheet, useWindowDimensions} from 'react-native';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import Notification from '../Notification';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {NotificationType} from '../reducers/notificationsReducer/types';

import theme from 'themes';

const ActiveNotificationContainer: FC<{notification: NotificationType}> = ({
  notification,
}) => {
  const {width} = useWindowDimensions();

  const visible = useSharedValue(0);
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  const [notificationHeight, setNotificationHeight] = useState<number>();
  const [deactivate, setDeactivate] = useState(false);

  const deactivationTimeout = useRef(
    setTimeout(() => {
      withTiming(1, {duration: 500}, finished => {
        if (finished) {
          runOnJS(setDeactivate)(true);
        }
      });
    }, 500),
  );

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!deactivate) {
      timer = setTimeout(() => {
        opacity.value = withTiming(0, {duration: 500}, finished => {
          if (finished) {
            runOnJS(setDeactivate)(true);
          }
        });
      }, 10000);
    } else {
    }
    return () => clearTimeout(timer);
  }, [deactivate, opacity]);

  useEffect(() => {
    if (notificationHeight) {
      visible.value = withTiming(1, {duration: 750});
    }
  }, [notificationHeight, visible]);

  useEffect(() => {
    if (deactivationTimeout.current) {
      clearTimeout(deactivationTimeout.current);
    }
  }, [setDeactivate]);

  const animatedStyles = useAnimatedStyle(() => {
    if (notificationHeight) {
      return {
        top: interpolate(visible.value, [0, 1], [-500, notificationHeight]),
        transform: [{translateX: translateX.value}],
        opacity: opacity.value,
      };
    } else {
      return {};
    }
  }, [notificationHeight]);

  return (
    <PanGestureHandler
      activeOffsetX={[-50, 50]}
      onEnded={() => {
        if (Math.abs(translateX.value) >= (width - theme.spacing.p4) / 4) {
          translateX.value = withTiming(
            -width,
            {
              duration: 250,
            },
            () => runOnJS(setDeactivate)(true),
          );
        } else {
          translateX.value = withTiming(0, {duration: 150});
        }
      }}
      onGestureEvent={e => {
        translateX.value = Math.min(0, e.nativeEvent.translationX);
      }}>
      <Animated.View
        style={[
          styles.notification,
          {
            width: width - theme.spacing.p4,
          },
          animatedStyles,
        ]}
        onLayout={(layout: LayoutChangeEvent) => {
          const itemHeight = layout.nativeEvent.layout.height;
          setNotificationHeight(itemHeight);
        }}>
        {<Notification notification={notification} />}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default ActiveNotificationContainer;

const styles = StyleSheet.create({
  notification: {
    top: -500,
    position: 'absolute',
    left: theme.spacing.p2,
  },
});
