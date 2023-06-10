import {Row} from 'components/common/layout';
import React, {FC} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import theme from 'themes';
import {userMapping} from 'components/apps/Messages/context/usersMapping';
import {
  EmojiMessageWithMeta,
  ExchangeBlockType,
  ImageMessageWithMeta,
  StringMessageWithMeta,
} from 'components/apps/Messages/context/types';
import {ConversationSharedValues} from '../types';
import TextBubble from '../Bubble/TextBubble';
import ImageBubble from '../Bubble/ImageBubble';
import Reaction from '../Bubble/Reaction';
import EmojiBubble from '../Bubble/EmojiBubble';

const Block: FC<
  {
    block: ExchangeBlockType;
    index: number;
  } & ConversationSharedValues
> = ({block, font, offsetFromTopAcc, scrollHandler}) => {
  const mapping = userMapping.get(block.name)!;

  const renderMessageWithMeta = (
    message:
      | StringMessageWithMeta
      | ImageMessageWithMeta
      | EmojiMessageWithMeta,
    left: boolean,
    index: number,
    last: boolean,
  ) => {
    return (
      <View key={`${index}-view`}>
        {message.reaction && (
          <Reaction
            reaction={message.reaction}
            left={left}
            colors={mapping.colors}
            key={`${index}-reaction`}
          />
        )}
        {message.type === 'string' && (
          <TextBubble
            colors={mapping.colors}
            content={message.message}
            left={left}
            last={last}
            offsetFromTopAcc={offsetFromTopAcc}
            scrollHandler={scrollHandler}
            font={font}
            key={`${index}-${message.message}-textBubble`}
          />
        )}
        {message.type === 'image' && (
          <ImageBubble
            colors={mapping.colors}
            content={message.message}
            left={left}
            last={last}
            offsetFromTopAcc={offsetFromTopAcc}
            scrollHandler={scrollHandler}
            font={font}
            key={`${index}-${message.message}-imageBubble`}
          />
        )}
        {message.type === 'emoji' && (
          <EmojiBubble
            content={message.message}
            left={left}
            offsetFromTopAcc={offsetFromTopAcc}
            scrollHandler={scrollHandler}
            key={`${index}-${message.message}-emoji`}
          />
        )}
      </View>
    );
  };

  const renderBubbles = () => {
    const left = block.name !== 'Self';
    return block.messages.map((message, index) => {
      const last = block.messages.length - 1 === index;
      if (message.hasOwnProperty('type')) {
        return renderMessageWithMeta(message, left, index, last);
      } else {
        return (
          <TextBubble
            colors={mapping?.colors}
            content={message}
            left={left}
            last={last}
            offsetFromTopAcc={offsetFromTopAcc}
            scrollHandler={scrollHandler}
            font={font}
            key={`${index}-${message}-simpleText`}
          />
        );
      }
    });
  };
  return (
    <View style={mapping?.avatar ? styles.blockLeft : styles.blockRight}>
      <Row style={styles.center}>
        <Row style={styles.bubbles}>
          {mapping?.avatar && (
            <Image source={mapping.avatar} style={styles.avatar} />
          )}
        </Row>
        <View>{renderBubbles()}</View>
      </Row>
    </View>
  );
};

export default Block;

const styles = StyleSheet.create({
  avatar: {
    width: 30,
    height: 30,
    marginEnd: theme.spacing.p1,
    borderRadius: theme.BorderRadius.normal,
  },
  blockLeft: {
    maxWidth: '70%',
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  blockRight: {
    maxWidth: '70%',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  center: {
    flexGrow: 0,
    marginBottom: 4,
    alignContent: 'center',
  },
  bubbles: {flexGrow: 0, alignItems: 'flex-end'},
});
