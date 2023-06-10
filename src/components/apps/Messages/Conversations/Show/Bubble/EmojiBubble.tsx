import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {ConversationSharedValues} from '../types';

const EmojiBubble: FC<
  {
    content: string;
    left: boolean;
  } & ConversationSharedValues
> = ({content, left, offsetFromTopAcc}) => {
  offsetFromTopAcc.current += 60;

  return (
    <View
      style={{
        alignItems: left ? undefined : 'flex-end',
      }}>
      <Text style={styles.emoji}>{content}</Text>
    </View>
  );
};

export default EmojiBubble;

const styles = StyleSheet.create({
  emoji: {
    marginStart: 8,
    fontSize: 50,
    marginBottom: 2,
  },
});
