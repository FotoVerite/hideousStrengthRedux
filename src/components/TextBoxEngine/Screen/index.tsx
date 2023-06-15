import React, {FC, useContext, useEffect, useMemo, useState} from 'react';
import {View, StyleSheet, useWindowDimensions} from 'react-native';
import {P} from 'components/common/StyledText';
import {
  BackdropFilter,
  Blur,
  BoxShadow,
  Canvas,
  Fill,
  Group,
  Image,
  Rect,
  RoundedRect,
  SkImage,
  Text,
  rect,
  rrect,
  vec,
} from '@shopify/react-native-skia';
import {TextBoxEngineContext} from '../context';
import {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import theme from 'themes';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ApplicationContext} from 'context';
import Frame from '../Frame';
import {generateFrameDimensions} from '../utility';

const TextBoxScreen: FC<{background: SkImage}> = ({background}) => {
  const textBoxEngineContext = useContext(TextBoxEngineContext);
  const applicationContext = useContext(ApplicationContext);
  const {width, height} = useWindowDimensions();
  const opacity = useSharedValue(0);
  const insets = useSafeAreaInsets();

  const configuration =
    textBoxEngineContext.dialogues.state?.screenConfiguration;

  useEffect(() => {
    opacity.value = withDelay(0, withTiming(1, {duration: 1000}));
  }, [configuration?.fadeInDelay, opacity]);

  const opacityAnimation = useAnimatedStyle(() => {
    return {opacity: opacity.value};
  });

  const nameFont = applicationContext.fonts.get('SFPro');
  nameFont?.setSize(24);
  const frameConfiguration = generateFrameDimensions(
    nameFont,
    width,
    height,
    insets.bottom,
  );
  const rounded = 15;
  const textBoxRect = rect(
    frameConfiguration.x,
    frameConfiguration.y,
    frameConfiguration.width,
    frameConfiguration.height,
  );

  const textBoxRectRoundClip = rrect(textBoxRect, rounded, rounded);

  return (
    <Canvas
      style={[
        {
          position: 'absolute',
          height: height,
          width: width,
          zIndex: 100,
        },
      ]}>
      <Image
        image={background}
        x={0}
        y={0}
        width={width}
        height={height}
        opacity={opacity}
        fit="cover"
      />
      <BackdropFilter opacity={opacity} filter={<Blur blur={5} />}>
        <Fill color="rgba(125, 125, 125, 0.3)" />
      </BackdropFilter>

      <Group clip={textBoxRectRoundClip}>
        <BackdropFilter opacity={opacity} filter={<Blur blur={25} />}>
          <Fill color="rgba(125, 125, 125, 0.3)" />
        </BackdropFilter>
      </Group>
      <Frame
        color={'white'}
        font={nameFont}
        frameConfiguration={frameConfiguration}
        name={'Matthew'}
      />
      <Text
        color={'white'}
        x={frameConfiguration.x + 25}
        y={frameConfiguration.y + 50}
        text={textBoxEngineContext.dialogues.state?.dialogues[0].content}
        font={nameFont}
      />
    </Canvas>
  );
};

export default TextBoxScreen;
