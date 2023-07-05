/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-bitwise */
import React, {FC} from 'react';
import {Image, View} from 'react-native';

import {
  Canvas,
  Circle,
  Group,
  LinearGradient,
  Rect,
  vec,
} from '@shopify/react-native-skia';

import Animated, {SharedValue} from 'react-native-reanimated';
import {Row} from 'components/common/layout';
import {StyleSheet} from 'react-native';
import {DigestedConversationStringItemType} from 'components/apps/Messages/context/digestConversation/types';

import theme from 'themes';
import {P} from 'components/common/StyledText';
import {useHeightDeterminedGradient} from '../hooks/useHeightDeterminedGradient';
import {Dot} from './Dot';

export const TypingBubble: FC<
  DigestedConversationStringItemType & {
    scrollHandler: SharedValue<number>;
    scrollRef: React.RefObject<Animated.ScrollView>;
    group?: boolean;
  }
> = ({
  avatar,
  colors,
  delay,
  scrollHandler,
  scrollRef,
  offset,
  content,
  leftSide,
  width,
  height,
  clip,
  name,
  reaction,
  group,
}) => {
  const computedColors = useHeightDeterminedGradient(
    colors,
    offset,
    leftSide,
    scrollHandler,
  );

  return (
    <Row style={styles.row}>
      {leftSide && (
        <View style={styles.avatarContainer}>
          {avatar && <Image source={avatar} style={styles.avatar} />}
        </View>
      )}
      <View>
        {group && name != 'Self' && (
          <P size="s" style={{marginLeft: 20}}>
            {name}
          </P>
        )}

        <Canvas
          style={{
            width: width,
            height: height,
          }}>
          <Group clip={clip}>
            <Rect x={0} y={0} width={width} height={height}>
              <LinearGradient
                colors={computedColors}
                start={vec(0, 0)}
                end={vec(0, height)}
              />
            </Rect>
            <Dot height={height / 2} width={40} delay={0} />
            <Dot height={height / 2} width={width / 2} delay={500} />
            <Dot height={height / 2} width={width - 30} delay={1000} />
          </Group>
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
});
