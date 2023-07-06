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
import {
  BubblePath,
  flipPath,
} from 'components/apps/Messages/context/digestConversation/BubblePath';

export const WaitingBubble: FC<
  DigestedConversationStringItemType & {
    scrollHandler: SharedValue<number>;
    scrollRef: React.RefObject<Animated.ScrollView>;
    group?: boolean;
  }
> = ({avatar, colors, scrollHandler, offset, leftSide, clip, name, group}) => {
  const computedColors = useHeightDeterminedGradient(
    colors,
    offset,
    leftSide,
    scrollHandler,
  );

  const waitingWidth = 125;
  const waitingHeight = 38;
  clip = BubblePath(waitingWidth, waitingHeight - 5, 16, false);
  flipPath(clip, waitingWidth);

  clip.addCircle(18, 25, 10);
  clip.addCircle(18, 25, 10);
  clip.addCircle(5, 33, 4);

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
            width: waitingWidth,
            height: waitingHeight,
          }}>
          <Group clip={clip}>
            <Rect x={0} y={0} width={waitingWidth} height={waitingHeight}>
              <LinearGradient
                colors={computedColors}
                start={vec(0, 0)}
                end={vec(0, waitingHeight)}
              />
            </Rect>
            <Dot height={waitingHeight / 2} width={40} delay={0} />
            <Dot
              height={waitingHeight / 2}
              width={(waitingWidth + 16) / 2}
              delay={1000}
            />
            <Dot
              height={waitingHeight / 2}
              width={waitingWidth - 24}
              delay={2000}
            />
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
