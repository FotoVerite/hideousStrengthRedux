/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-bitwise */
import React, {FC, PropsWithChildren, ReactNode} from 'react';
import {View, useWindowDimensions} from 'react-native';

import {
  Canvas,
  Group,
  LinearGradient,
  Rect,
  vec,
} from '@shopify/react-native-skia';

import {
  SharedValue,
  interpolateColor,
  useDerivedValue,
} from 'react-native-reanimated';
import {changeColor} from '../utility';
import {BubbleDimensionsType} from '../types';
import {BubblePath, flipPath} from './BubblePath';

export const Gradient: FC<
  {
    color: string[];
    scrollHandler: SharedValue<number>;
    left: boolean;
    last: boolean;
    textLines?: ReactNode[];
  } & BubbleDimensionsType &
    PropsWithChildren
> = ({
  color,
  children,
  scrollHandler,
  left,
  last,
  offsetFromTop,
  width,
  height,
}) => {
  const PADDING = 16;
  const COLOR_CHANGE_HEIGHT = useWindowDimensions().height / 2;

  const currentlyFromTop = useDerivedValue(() => {
    return Math.max(
      0,
      Math.min(offsetFromTop - scrollHandler.value, COLOR_CHANGE_HEIGHT),
    );
  }, [scrollHandler]);

  const darkenedColor1 = changeColor(color[0], left ? -100 : -25);
  const darkenedColor2 = changeColor(color[1], left ? -100 : 20);

  const computedColors = useDerivedValue(() => {
    const color1 = interpolateColor(
      currentlyFromTop.value,
      [0, COLOR_CHANGE_HEIGHT],
      [color[0], darkenedColor1],
    );

    const color2 = interpolateColor(
      currentlyFromTop.value,
      [0, COLOR_CHANGE_HEIGHT],
      [color[1], darkenedColor2],
    );
    return [color1, color2];
  }, [currentlyFromTop]);

  let bubblePath = BubblePath(width, height + PADDING, 16, last);
  if (left) {
    bubblePath = flipPath(bubblePath, width);
  }

  return (
    <View style={{alignItems: left ? undefined : 'flex-end'}}>
      <Canvas
        style={{
          width: width,
          height: height + PADDING,
          marginBottom: 2,
          alignItems: left ? undefined : 'flex-end',
        }}>
        <Group clip={bubblePath}>
          <Rect x={0} y={0} width={width} height={height + 16}>
            <LinearGradient
              colors={computedColors}
              start={vec(0, 0)}
              end={vec(0, height)}
            />
          </Rect>
        </Group>
        {children}
      </Canvas>
    </View>
  );
};
