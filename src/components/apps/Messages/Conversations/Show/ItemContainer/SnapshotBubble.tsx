/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-bitwise */
import React, {FC, useContext, useEffect, useState} from 'react';
import {Image, TouchableWithoutFeedback, View} from 'react-native';

import {
  Canvas,
  Group,
  useImage,
  Image as SkImage,
} from '@shopify/react-native-skia';

import {SharedValue} from 'react-native-reanimated';
import {Row} from 'components/common/layout';
import {StyleSheet} from 'react-native';
import theme from 'themes';
import {MessagesContext} from 'components/apps/Messages/context';
import Reaction from './Reaction';
import {DigestedConversationSnapShotItemType} from 'components/apps/Messages/context/digestConversation/types';
import {SnapShotContext} from 'components/Snapshot/context';

export const SnapshotBubble: FC<DigestedConversationSnapShotItemType & {}> = ({
  avatar,
  content,
  leftSide,
  width,
  height,
  clip,
  reaction,
  colors,
}) => {
  const [image, setImage] = useState(content ? useImage(content) : undefined);

  const context = useContext(MessagesContext);
  const snapshotContext = useContext(SnapShotContext);

  useEffect(() => {
    if (!image) {
      snapshotContext.takeSnapShot.set('IMAGE_NAME');
    }
  });

  useEffect(() => {
    if (snapshotContext.takeSnapShot && snapshotContext.image) {
      setImage(snapshotContext.image);
    }
  }, [snapshotContext.takeSnapShot, snapshotContext.image]);

  if (!image) {
    return null;
  }

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
              },
            ]}>
            <Group clip={clip}>
              <SkImage
                image={image}
                fit="fill"
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
