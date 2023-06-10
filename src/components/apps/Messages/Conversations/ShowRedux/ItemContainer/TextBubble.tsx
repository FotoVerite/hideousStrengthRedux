/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-bitwise */
import React, {FC, PropsWithChildren, ReactNode} from 'react';
import {Image, View, useWindowDimensions} from 'react-native';

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
import {changeColor} from '../../Show/utility';
import {DigestedConversationStringItemType} from 'components/apps/Messages/context/digestConversation';
import {Row} from 'components/common/layout';
import {StyleSheet} from 'react-native';
import theme from 'themes';
import {P} from 'components/common/StyledText';
import Reaction from '../../Show/Bubble/Reaction';

export const TextBubble: FC<
  DigestedConversationStringItemType & {
    scrollHandler: SharedValue<number>;
  }
> = ({
  avatar,
  color,
  scrollHandler,
  positionFromStartOfList,
  content,
  leftSide,
  width,
  height,
  clip,
  reaction,
}) => {
  const COLOR_CHANGE_HEIGHT = useWindowDimensions().height / 2;
  const currentlyFromTop = useDerivedValue(() => {
    return Math.max(
      0,
      Math.min(
        positionFromStartOfList - scrollHandler.value,
        COLOR_CHANGE_HEIGHT,
      ),
    );
  }, [scrollHandler]);

  const darkenedColor1 = changeColor(color[0], leftSide ? -100 : -25);
  const darkenedColor2 = changeColor(color[1], leftSide ? -100 : 20);

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

  return (
    <Row
      style={{
        alignItems: 'flex-end',
        padding: 0,
        margin: 0,
      }}>
      {leftSide && (
        <View style={styles.avatarContainer}>
          {avatar && <Image source={avatar} style={styles.avatar} />}
        </View>
      )}
      <View>
        {reaction && (
          <Reaction reaction={reaction} left={leftSide} colors={color} />
        )}
        <Canvas
          style={{
            width: width,
            height: height - 8,
          }}>
          <Group clip={clip}>
            <Rect x={0} y={0} width={width} height={height}>
              <LinearGradient
                colors={computedColors}
                start={vec(0, 0)}
                end={vec(0, height)}
              />
            </Rect>
          </Group>
          {content}
        </Canvas>
      </View>
    </Row>
  );
};

const styles = StyleSheet.create({
  row: {
    alignItems: 'flex-end',
    padding: 0,
    margin: 0,
  },
  avatarContainer: {
    width: 30,
    height: 30,
    marginEnd: theme.spacing.p1,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: theme.BorderRadius.normal,
  },
  time: {
    fontSize: 10,
    textAlign: 'center',
  },
});
