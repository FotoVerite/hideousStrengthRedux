import {SkFont} from '@shopify/react-native-skia';
import {DigestedConversationListItem} from './types';
import {createTimeItem} from './TimeItem';
import {ConversationExchangeType} from '../types';
import {createStringItem} from './StringItem';
import {createImageItem} from './ImageItem';

const HEADER_PADDING = 50;
export const BUBBLE_PADDING = 18;

export const digestConversation = (
  conversationExchanges: ConversationExchangeType[],
  width: number,
  font: SkFont,
) => {
  const ret: DigestedConversationListItem[] = [];
  let positionAcc = HEADER_PADDING;
  conversationExchanges.forEach(block => {
    const time = createTimeItem(block, width, positionAcc);
    positionAcc += time.height;
    ret.push(time);
    block.exchanges.forEach(exchange => {
      // SIMPLE ARRAY
      exchange.messages.forEach((message, index) => {
        const hasTail = index === exchange.messages.length - 1;

        if (message.hasOwnProperty('type')) {
          if (message.type === 'string') {
            const textBubble = createStringItem(
              font,
              width,
              positionAcc,
              exchange.name,
              message.message,
              hasTail,
              message.reaction,
            );
            ret.push(textBubble);
            positionAcc += textBubble.height + textBubble.paddingBottom;
          }
          if (message.type === 'image') {
            const imageBubble = createImageItem(
              width,
              positionAcc,
              exchange.name,
              message.message,
              hasTail,
              message.reaction,
            );
            ret.push(imageBubble);
            positionAcc += imageBubble.height + imageBubble.paddingBottom;
          }
        } else {
          const textBubble = createStringItem(
            font,
            width,
            positionAcc,
            exchange.name,
            message,
            hasTail,
            message.reaction,
          );
          ret.push(textBubble);
          positionAcc += textBubble.height + textBubble.paddingBottom;
        }
      });
    });
  });

  return ret;
};
