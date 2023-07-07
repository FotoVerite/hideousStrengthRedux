import {SkFont} from '@shopify/react-native-skia';
import {
  DigestConfigurationType,
  DigestedConversationListItem,
  DigestedItemTypes,
} from './types';
import {createTimeItem} from './TimeItem';
import {
  ConversationExchangeType,
  ConversationType,
  ExchangeBlockType,
  MessageType,
} from '../types';
import {createStringItem} from './StringItem';
import {createImageItem} from './ImageItem';
import {createGlyphItem} from './GlyphItem';
import {createEmojiItem} from './EmojiItem';

export const BUBBLE_PADDING = 18;

export const TIME_OPTIONS = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
};

export const digestConversation = (
  conversationExchanges: ConversationExchangeType[],
  group?: boolean,
  width: number,
  font: SkFont,
  emojiFont: SkFont,
  offset?: number = 50,
) => {
  const ret: DigestedConversationListItem[] = [];
  let positionAcc = offset;
  const itemConfiguration: DigestConfigurationType = {
    font: font,
    emojiFont: emojiFont,
    width: width,
    positionAcc: positionAcc,
    group: group,
  };
  conversationExchanges.forEach(block => {
    const time = createTimeItem(
      block,
      itemConfiguration.width,
      itemConfiguration.positionAcc,
    );

    itemConfiguration.positionAcc += time.height;
    ret.push(time);
    block.exchanges.forEach(exchange => {
      // SIMPLE ARRAY
      exchange.messages.forEach((message, index) => {
        const hasTail = index === exchange.messages.length - 1;

        if (message.hasOwnProperty('type')) {
          if (message.type === DigestedItemTypes.EMOJI) {
            const emojiBubble = createEmojiItem(
              itemConfiguration,
              exchange.name,
              message.message,
              hasTail,
              message.reaction,
            );
            ret.push(emojiBubble);
            itemConfiguration.positionAcc +=
              emojiBubble.height + emojiBubble.paddingBottom;
          }
          if (message.type === 'string') {
            const textBubble = createStringItem(
              itemConfiguration,
              exchange.name,
              message.message,
              hasTail,
              message.reaction,
            );
            ret.push(textBubble);
            itemConfiguration.positionAcc +=
              textBubble.height + textBubble.paddingBottom;
          }
          if (message.type === 'glyph') {
            const glyphBubble = createGlyphItem(
              itemConfiguration,
              exchange.name,
              message.message,
              hasTail,
              message.reaction,
            );
            ret.push(glyphBubble);
            itemConfiguration.positionAcc +=
              glyphBubble.height + glyphBubble.paddingBottom;
          }
          if (message.type === 'image') {
            const imageBubble = createImageItem(
              itemConfiguration,
              exchange.name,
              message.message,
              hasTail,
              message.reaction,
            );
            ret.push(imageBubble);
            itemConfiguration.positionAcc +=
              imageBubble.height + imageBubble.paddingBottom;
          }
        } else {
          const textBubble = createStringItem(
            itemConfiguration,
            exchange.name,
            message,
            hasTail,
            message.reaction,
          );
          ret.push(textBubble);
          itemConfiguration.positionAcc +=
            textBubble.height + textBubble.paddingBottom;
        }
      });
    });
  });

  return ret;
};

export const startNewBlock = (
  startingPosition: number,
  width: number,
  font: SkFont,
  emojiFont: SkFont,
) => {
  const itemConfiguration: DigestConfigurationType = {
    font: font,
    emojiFont: emojiFont,
    width: width,
    positionAcc: startingPosition,
    group: false,
  };

  const time = createTimeItem(
    {
      time: new Date().toLocaleDateString('en-US', TIME_OPTIONS as any),
      exchanges: [],
    },
    itemConfiguration.width,
    itemConfiguration.positionAcc,
  );

  return time;
};

export const addToBlock = (
  exchange: ExchangeBlockType,
  message: MessageType,
  hasTail: boolean,
  startingPosition: number,
  width: number,
  font: SkFont,
  emojiFont: SkFont,
) => {
  const itemConfiguration: DigestConfigurationType = {
    font: font,
    emojiFont: emojiFont,
    width: width,
    positionAcc: startingPosition,
    group: false,
  };
  if (message.hasOwnProperty('type')) {
    if (message.type === DigestedItemTypes.EMOJI) {
      const emojiBubble = createEmojiItem(
        itemConfiguration,
        exchange.name,
        message.message,
        hasTail,
        message.reaction,
      );
      return emojiBubble;
    }
    if (message.type === 'string') {
      const textBubble = createStringItem(
        itemConfiguration,
        exchange.name,
        message.message,
        hasTail,
        message.reaction,
      );
      return textBubble;
    }
    if (message.type === 'glyph') {
      const glyphBubble = createGlyphItem(
        itemConfiguration,
        exchange.name,
        message.message,
        hasTail,
        message.reaction,
      );
      return glyphBubble;
    }
    if (message.type === 'image') {
      const imageBubble = createImageItem(
        itemConfiguration,
        exchange.name,
        message.message,
        hasTail,
        message.reaction,
      );
      return imageBubble;
    }
  } else {
    const textBubble = createStringItem(
      itemConfiguration,
      exchange.name,
      message,
      hasTail,
      message.reaction,
    );
    return textBubble;
  }
};
