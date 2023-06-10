import {SkFont, SkTextBlob} from '@shopify/react-native-skia';
import {
  ConversationExchangeType,
  ConversationType,
  ReactionType,
} from './types';
import {CalculateWidthHeightAndGenerateTextNodes} from '../Conversations/Show/utility';
import {BubblePath, flipPath} from '../Conversations/Show/Gradient/BubblePath';
import {userMapping} from './usersMapping';
import {FlexAlignType, Image, ImageSourcePropType} from 'react-native';

interface DigestedConversationItemType {
  positionFromStartOfList: number;
  height: number;
  width: number;
  offset: number;
  type: 'string' | 'time';
}

export interface DigestedConversationTimeType {
  positionFromStartOfList: number;
  height: number;
  width: number;
  content: string;
  type: 'time';
  alignItems?: undefined;
}

export interface DigestedConversationStringItemType
  extends DigestedConversationItemType {
  clip: any;
  content: React.JSX.Element[];
  type: 'string';
  avatar?: string;
  alignItems: FlexAlignType;
  leftSide: boolean;
  reaction?: ReactionType;
}

export interface DigestedConversationImageItemType
  extends DigestedConversationItemType {
  clip: any;
  content: ImageSourcePropType;
  type: 'image';
  avatar?: string;
  alignItems: FlexAlignType;
  leftSide: boolean;
  reaction?: ReactionType;
}
export type DigestedConversationListItem =
  | DigestedConversationTimeType
  | DigestedConversationStringItemType
  | DigestedConversationImageItemType;

const HEADER_PADDING = 50;
const BUBBLE_PADDING = 24;
const uMapping = userMapping;

export const digestConversation = (
  conversationExchanges: ConversationExchangeType[],
  width: number,
  font: SkFont,
) => {
  const createTimeItem = (
    item: ConversationExchangeType,
  ): DigestedConversationTimeType => {
    const HEIGHT = 60;
    const listItem = {
      positionFromStartOfList: positionFromStartAcc,
      height: HEIGHT,
      width: width,
      offset: positionFromStartAcc,
      content: item.time,
      type: 'time',
    } as DigestedConversationTimeType;
    positionFromStartAcc += HEIGHT;
    return listItem;
  };

  const createStringItem = (
    name: string,
    message: string,
    leftSide: boolean,
    hasTail: boolean,
    reaction?: ReactionType,
  ) => {
    const [boxHeight, boxWidth, textNodes] =
      CalculateWidthHeightAndGenerateTextNodes(
        font,
        message as string,
        width,
        leftSide,
      );
    const clip = BubblePath(boxWidth, boxHeight + 16, 16, hasTail);
    if (leftSide) {
      flipPath(clip, boxWidth);
    }
    const listItem: DigestedConversationStringItemType = {
      alignItems: leftSide ? 'flex-start' : 'flex-end',
      positionFromStartOfList: positionFromStartAcc,
      content: textNodes,
      height: boxHeight + BUBBLE_PADDING,
      width: boxWidth,
      offset: positionFromStartAcc,
      clip: clip,
      color: uMapping.get(name)?.colors,
      avatar: hasTail ? uMapping.get(name)?.avatar : undefined,
      leftSide: leftSide,
      type: 'string',
      reaction: reaction,
    };
    ret.push(listItem);
    positionFromStartAcc += boxHeight + BUBBLE_PADDING;
  };

  const createImageItem = (
    name: string,
    message: ImageSourcePropType,
    leftSide: boolean,
    hasTail: boolean,
    reaction?: ReactionType,
  ) => {
    const imageDimensions = Image.resolveAssetSource(message);
    const imageWidth = leftSide ? width * 0.7 - 30 : width * 0.7;
    const aspectRation = imageDimensions.height / imageDimensions.width;
    const imageHeight = imageWidth * aspectRation;

    const clip = BubblePath(imageWidth, imageHeight + 16, 16, hasTail);
    if (leftSide) {
      flipPath(clip, imageWidth);
    }
    const listItem: DigestedConversationImageItemType = {
      alignItems: leftSide ? 'flex-start' : 'flex-end',
      positionFromStartOfList: positionFromStartAcc,
      content: message,
      height: imageHeight + BUBBLE_PADDING,
      width: imageWidth,
      offset: positionFromStartAcc,
      clip: clip,
      color: uMapping.get(name)?.colors,
      avatar: hasTail ? uMapping.get(name)?.avatar : undefined,
      leftSide: leftSide,
      type: 'image',
      reaction: reaction,
    };
    ret.push(listItem);
    positionFromStartAcc += imageHeight + BUBBLE_PADDING;
  };

  const ret: (
    | DigestedConversationStringItemType
    | DigestedConversationTimeType
    | DigestedConversationImageItemType
  )[] = [];
  let positionFromStartAcc = HEADER_PADDING;
  conversationExchanges.forEach(block => {
    ret.push(createTimeItem(block));
    block.exchanges.forEach(exchange => {
      const leftSide = exchange.name !== 'Self';

      // SIMPLE ARRAY
      exchange.messages.forEach((message, index) => {
        const hasTail = index === exchange.messages.length - 1;

        if (message.hasOwnProperty('type')) {
          if (message.type === 'string') {
            createStringItem(
              exchange.name,
              message.message,
              leftSide,
              hasTail,
              message.reaction,
            );
          }
          if (message.type === 'image') {
            createImageItem(
              exchange.name,
              message.message,
              leftSide,
              hasTail,
              message.reaction,
            );
          }
        } else {
          createStringItem(
            exchange.name,
            message as string,
            leftSide,
            hasTail,
            undefined,
          );
        }
      });
    });
  });

  return ret;
};
