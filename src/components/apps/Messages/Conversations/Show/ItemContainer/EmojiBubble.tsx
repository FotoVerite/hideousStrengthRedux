/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-bitwise */
import React, {FC} from 'react';
import {Image, Text, View} from 'react-native';

import {Row} from 'components/common/layout';
import {StyleSheet} from 'react-native';
import Reaction from './Reaction';
import {DigestedConversationEmojiItemType} from 'components/apps/Messages/context/digestConversation/types';

import theme from 'themes';
import {P} from 'components/common/StyledText';

export const EmojiBubble: FC<
  DigestedConversationEmojiItemType & {
    group?: boolean;
  }
> = ({avatar, colors, content, leftSide, height, name, reaction, group}) => {
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

        {reaction && (
          <Reaction reaction={reaction} left={leftSide} colors={colors} />
        )}
        <View
          style={{
            height: height,
            marginHorizontal: 20,
          }}>
          <Text style={{fontSize: 50}}>{content}</Text>
        </View>
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
