import {SkFont} from '@shopify/react-native-skia';
import {DigestConfigurationType, DigestedConversationListItem} from './types';
import {createTimeItem} from './TimeItem';
import {
  ConversationExchangeType,
  ExchangeBlockType,
  MessageType,
  MessageWithMetaType,
} from '../types';
import {createStringItem} from './StringItem';
import {SkMessageItem} from './SkMessageItem';

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
  group: boolean = false,
  width: number,
  font: SkFont,
  emojiFont: SkFont,
  offset: number = 50,
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
        const item = createItem(itemConfiguration, exchange, message, hasTail);
        ret.push(item);
        itemConfiguration.positionAcc += item.height + item.paddingBottom;
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
  return createItem(itemConfiguration, exchange, message, hasTail);
};

const createItem = (
  itemConfiguration: DigestConfigurationType,
  exchange: ExchangeBlockType,
  message: MessageType,
  hasTail: boolean,
) => {
  if (message.hasOwnProperty('type')) {
    return SkMessageItem(
      itemConfiguration,
      message as MessageWithMetaType,
      exchange.name,
      hasTail,
    );
  } else {
    return createStringItem(
      itemConfiguration,
      exchange.name,
      message as string,
      hasTail,
      undefined,
    );
  }
};
