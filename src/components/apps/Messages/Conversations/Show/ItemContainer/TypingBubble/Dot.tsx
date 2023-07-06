/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-bitwise */
import React, {FC, useEffect} from 'react';

import {Circle, Group} from '@shopify/react-native-skia';

import {
  Easing,
  convertToRGBA,
  interpolateColor,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

export const Dot: FC<{height: number; width: number; delay: number}> = ({
  delay,
  height,
  width,
}) => {
  const color = useSharedValue(0);

  const repeatForever = () => {
    'worklet';
    color.value = withDelay(
      delay,
      withRepeat(
        withDelay(
          2000,
          withSequence(
            // split duration of 500ms to 250ms
            withTiming(1, {
              duration: 500,
              easing: Easing.inOut(Easing.ease),
            }),
            withTiming(0, {
              duration: 500,
              easing: Easing.inOut(Easing.ease),
            }),
          ),
        ),
        -1,
      ),
    );
  };

  useEffect(() => {
    repeatForever();
  }, []);

  const animatedColor = useDerivedValue(() =>
    convertToRGBA(
      interpolateColor(color.value, [0, 1], ['#525252', '#acacac']),
    ),
  );

  return (
    <Group color={animatedColor}>
      <Circle cx={width} cy={height} r={4} />
    </Group>
  );
};
