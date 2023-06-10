/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-bitwise */
import React, {FC, useContext} from 'react';
import {TouchableWithoutFeedback, View} from 'react-native';

import {Canvas, Group, Image, useImage} from '@shopify/react-native-skia';

import {SharedValue} from 'react-native-reanimated';
import {DigestedConversationImageItemType} from 'components/apps/Messages/context/digestConversation';
import {Row} from 'components/common/layout';
import {StyleSheet} from 'react-native';
import theme from 'themes';
import Reaction from '../../Show/Bubble/Reaction';
import {MessagesContext} from 'components/apps/Messages/context';

export const ImageBubble: FC<
  DigestedConversationImageItemType & {
    scrollHandler: SharedValue<number>;
  }
> = ({avatar, content, leftSide, width, height, clip, reaction, color}) => {
  const image = useImage(content);
  const context = useContext(MessagesContext);

  if (!image) {
    return null;
  }

  return (
    <Row
      style={{
        alignItems: 'flex-end',
        padding: 0,
        margin: 0,
        background: 'green',
      }}>
      {leftSide && (
        <View style={styles.avatarContainer}>
          {avatar && <Image source={avatar} style={styles.avatar} />}
        </View>
      )}
      <TouchableWithoutFeedback
        onPress={() => {
          context.media.set(content);
        }}>
        <View>
          {reaction && (
            <Reaction reaction={reaction} left={leftSide} colors={color} />
          )}
          <Canvas
            style={[
              {
                width: width,
                height: height,
              },
            ]}>
            <Group clip={clip}>
              <Image
                image={image}
                fit="contain"
                x={0}
                y={0}
                width={width + 24}
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
