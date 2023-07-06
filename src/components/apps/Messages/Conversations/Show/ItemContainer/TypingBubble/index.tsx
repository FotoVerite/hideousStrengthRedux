/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-bitwise */
import React, {FC, useEffect, useRef, useState} from 'react';
import {View} from 'react-native';

import Animated, {
  SharedValue,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {StyleSheet} from 'react-native';
import {DigestedConversationStringItemType} from 'components/apps/Messages/context/digestConversation/types';

import {WaitingBubble} from './WaitingBubble';
import {TextBubble} from '../TextBubble';

export const TypingBubble: FC<
  DigestedConversationStringItemType & {
    scrollHandler: SharedValue<number>;
    scrollRef: React.RefObject<Animated.ScrollView>;
    group?: boolean;
  }
> = props => {
  const opacity = useSharedValue(1);
  const [renderWaiting, setRenderWaiting] = useState(true);
  const waitingOpacity = useAnimatedStyle(() => {
    return {opacity: opacity.value};
  });

  const textOpacity = useAnimatedStyle(() => {
    return {opacity: interpolate(opacity.value, [1, 0], [0, 1])};
  });

  useEffect(() => {
    opacity.value = withDelay(
      1000 + (props.delay || 500),
      withTiming(0, {duration: 500}, finished => {
        if (finished) {
          runOnJS(setRenderWaiting)(false);
        }
      }),
    );
  });

  return (
    <View style={{height: props.height}}>
      {renderWaiting && (
        <Animated.View style={[styles.waiting, waitingOpacity]}>
          <WaitingBubble {...props} />
        </Animated.View>
      )}
      <Animated.View style={[styles.main, textOpacity]}>
        <TextBubble {...props} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  waiting: {
    position: 'absolute',
  },
  main: {},
});
