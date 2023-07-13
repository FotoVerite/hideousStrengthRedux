import {SkFont, Skia} from '@shopify/react-native-skia';
import {
  DigestConfigurationType,
  DigestedConversationListItem,
  DigestedItemTypes,
} from './types';
import {createTimeItem} from './TimeItem';
import {
  ConversationExchangeType,
  ExchangeBlockType,
  MessageType,
  MessageWithMetaType,
} from '../types';
import {createStringItem} from './StringItem';
import {SkMessageItem} from './SkMessageItem';
import {isMessageWithMeta} from '../utility';
import {getSnapshotPath} from 'components/Snapshot/context';
import ReactNativeBlobUtil from 'react-native-blob-util';

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
      for (const [index, message] of exchange.messages.entries()) {
        const hasTail = index === exchange.messages.length - 1;
        const item = createItem(itemConfiguration, exchange, message, hasTail);
        ret.push(item);
        itemConfiguration.positionAcc += item.height + item.paddingBottom;
      }
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
      time: new Date().toISOString(),
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
  if (isMessageWithMeta(message)) {
    return SkMessageItem(itemConfiguration, message, exchange.name, hasTail);
  } else {
    return createStringItem(
      itemConfiguration,
      exchange.name,
      message,
      hasTail,
      undefined,
    );
  }
};

type SnapshotResolverType = {
  offset: number;
  arr: DigestedConversationListItem[];
};
export const resolveSnapshots = async (
  digested: DigestedConversationListItem[],
) => {
  const resolver = new Promise<SnapshotResolverType>((resolve, reject) => {
    resolve({
      arr: new Array(),
      offset: 0,
    });
  });
  const resolved = await digested.reduce(
    resolveSnapshotAndUpdateOffset,
    resolver,
  );
  return resolved.arr;
};

const resolveSnapshotAndUpdateOffset = async (
  memo: Promise<{
    offset: number;
    arr: DigestedConversationListItem[];
  }>,
  item: DigestedConversationListItem,
) => {
  const acc = await memo;
  if (item.type !== DigestedItemTypes.SNAPSHOT) {
    item.offset += acc.offset;
    acc.arr.push(item);
    return acc;
  } else {
    const path = getSnapshotPath(item.content.filename);
    const exists = await ReactNativeBlobUtil.fs.exists(path);
    if (!exists) {
      acc.arr.push(item);
      return acc;
    }
    console.log(path);
    const data = await ReactNativeBlobUtil.fs.readFile(
      '/Users/fotoverite/Downloads/weather-map.png',
      'base64',
    );
    const image = Skia.Image.MakeImageFromEncoded(Skia.Data.fromBase64(data));
    if (!image) {
      acc.arr.push(item);
      return acc;
    }
    const aspectRation = image.height() / image.width();
    const imageHeight = item.width * aspectRation;
    acc.offset += imageHeight;
    item.height = imageHeight;
    item.content.image = image;
    item.content = Object.assign({}, {...item.content}, {image: image});
    acc.arr.push(item);
    return acc;
  }
};
