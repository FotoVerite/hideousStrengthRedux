/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-bitwise */
import React, {FC, useContext, useEffect, useState} from 'react';
import {Image, TouchableWithoutFeedback, View} from 'react-native';

import {
  Canvas,
  Group,
  useImage,
  Image as SkImage,
  Rect,
} from '@shopify/react-native-skia';

import {SharedValue} from 'react-native-reanimated';
import {Row} from 'components/common/layout';
import {StyleSheet} from 'react-native';
import theme from 'themes';
import {MessagesContext} from 'components/apps/Messages/context';
import Reaction from './Reaction';
import {DigestedConversationSnapShotItemType} from 'components/apps/Messages/context/digestConversation/types';
import {SnapShotContext} from 'components/Snapshot/context';
import {
  BubblePath,
  flipPath,
} from 'components/apps/Messages/context/digestConversation/BubblePath';
import metroidDread from '@apps/Messages/assets/messages/alice/MetroidDread.jpeg';

export const SnapshotBubble: FC<DigestedConversationSnapShotItemType & {}> = ({
  avatar,
  content,
  leftSide,
  width,
  height,
  reaction,
  colors,
}) => {
  const [image, setImage] = useState(content.image);
  const context = useContext(MessagesContext);
  const snapshotContext = useContext(SnapShotContext);
  const k = BubblePath(width, height, 16, true);

  useEffect(() => {
    if (!image) {
      snapshotContext.takeSnapShot.set(content.filename);
    }
  });

  useEffect(() => {
    if (snapshotContext.takeSnapShot && snapshotContext.image) {
      setImage(snapshotContext.image);
    }
  }, [snapshotContext.takeSnapShot, snapshotContext.image]);

  useEffect(() => {}, [image]);
  const a = useImage(metroidDread);

  if (!image) {
    return null;
  }
  console.log(image.height(), image.width());
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
      <TouchableWithoutFeedback
        onPress={() => {
          context.media.set(image);
        }}>
        <View>
          {reaction && (
            <Reaction reaction={reaction} left={leftSide} colors={colors} />
          )}
          <Canvas
            style={[
              {
                width: width,
                height: height,
                backgroundColor: 'red',
              },
            ]}>
            <Group clip={k} strokeWidth={1}>
              <SkImage
                image={image}
                fit={'contain'}
                x={0}
                y={0}
                width={width}
                height={height}
              />
            </Group>
          </Canvas>
        </View>
      </TouchableWithoutFeedback>
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
