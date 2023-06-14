import {SkFont} from '@shopify/react-native-skia';
import {
  DigestConfigurationType,
  DigestedConversationListItem,
  DigestedItemTypes,
} from './types';
import {createTimeItem} from './TimeItem';
import {ConversationExchangeType} from '../types';
import {createStringItem} from './StringItem';
import {createImageItem} from './ImageItem';
import {createGlyphItem} from './GlyphItem';
import {createEmojiItem} from './EmojiItem';

const HEADER_PADDING = 50;
export const BUBBLE_PADDING = 18;

export const digestConversation = (
  conversationExchanges: ConversationExchangeType[],
  group?: boolean,
  width: number,
  font: SkFont,
  emojiFont: SkFont,
) => {
  const ret: DigestedConversationListItem[] = [];
  let positionAcc = HEADER_PADDING;
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
