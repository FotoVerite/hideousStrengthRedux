/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-bitwise */
import React, {FC, useContext, useEffect, useRef, useState} from 'react';
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
import {
  DigestedConversationSnapShotItemType,
  DigestedConversationStringItemType,
} from 'components/apps/Messages/context/digestConversation/types';

import {TextOrchestrationContext} from 'components/apps/Messages/context/textOrchestration';
import {SnapShotContext} from 'components/Snapshot/context';
import {BubblePath} from 'components/apps/Messages/context/digestConversation/BubblePath';
import {SkImage} from '@shopify/react-native-skia';
import {SnapshotBubbleRenderer} from './SnapshotBubbleRenderer';
import {MessagesContext} from 'components/apps/Messages/context';

export const SnapshotBubble: FC<
  DigestedConversationSnapShotItemType & {
    index: number;
    scrollHandler: SharedValue<number>;
    scrollRef: React.RefObject<Animated.ScrollView>;
    group?: boolean;
  }
> = props => {
  const context = useContext(TextOrchestrationContext);
  const messageContext = useContext(MessagesContext);
  const snapshotContext = useContext(SnapShotContext);

  const opacity = useSharedValue(props.content.image ? 1 : 0);
  const [renderWaiting, setRenderWaiting] = useState(true);
  const [image, setImage] = useState<SkImage | undefined>(props.content.image);

  const clip = BubblePath(props.width, props.height, 16, true);

  const opacityStyle = useAnimatedStyle(() => {
    return {opacity: opacity.value};
  });

  useEffect(() => {
    if (!image) {
      snapshotContext.takeSnapShot.set(props.content.filename);
    }
  });

  useEffect(() => {
    if (snapshotContext.takeSnapShot && snapshotContext.image) {
      const snapshotImage = snapshotContext.image;
      const aspectRation = snapshotImage.height() / snapshotImage.width();
      const imageHeight = props.width * aspectRation;
      messageContext.digestedConversation.updateMessage(props.index, {
        content: {
          image: snapshotImage,
          filename: props.content.filename,
          backup: props.content.backup,
        },
        height: imageHeight,
      });
      setImage(snapshotContext.image);
    }
  }, [snapshotContext.takeSnapShot, snapshotContext.image]);

  useEffect(() => {
    if (!renderWaiting) {
      context.textIsFinished(true);
    }
  }, [renderWaiting]);

  useEffect(() => {
    if (
      image &&
      !snapshotContext.indicatorRunning.state &&
      props.messageDelay
    ) {
      context.scrollTo.set(-1);
      opacity.value = withTiming(1, {duration: 300}, finished => {
        if (finished) {
          runOnJS(setRenderWaiting)(false);
        }
      });
    }
  }, [image, snapshotContext.indicatorRunning.state]);

  return (
    <View style={{height: props.height}}>
      <Animated.View style={[styles.main, opacityStyle]}>
        <SnapshotBubbleRenderer {...props} clip={clip} image={image} />
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
