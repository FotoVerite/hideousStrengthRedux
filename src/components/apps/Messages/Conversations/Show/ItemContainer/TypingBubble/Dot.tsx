/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-bitwise */
import React, {FC, useEffect} from 'react';

import {Circle, Group} from '@shopify/react-native-skia';

import {
  convertToRGBA,
  interpolateColor,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withRepeat,
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
        withTiming(color.value == 0 ? 1 : 0, {
          duration: color.value == 0 ? 1000 : 2000,
        }),
        -1,
        true,
      ),
    );
  };

  useEffect(() => {
    repeatForever();
  }, []);

  const animatedColor = useDerivedValue(() =>
    convertToRGBA(
      interpolateColor(color.value, [0, 1], ['#acacac', '#525252']),
    ),
  );

  return (
    <Group color={animatedColor}>
      <Circle cx={width} cy={height} r={8} />
    </Group>
  );
};
