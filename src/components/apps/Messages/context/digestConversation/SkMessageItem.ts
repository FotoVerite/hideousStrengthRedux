import {Image, ImageSourcePropType, Platform} from 'react-native';
import {BubblePath, flipPath} from './BubblePath';

import {
  DigestConfigurationType,
  DigestedConversationEmojiItemType,
  DigestedConversationGlyphItemType,
  DigestedConversationImageItemType,
  DigestedConversationListItem,
  DigestedConversationSnapShotItemType,
  DigestedConversationStringItemType,
  DigestedItemTypes,
} from './types';
import {
  CONTACT_NAMES,
  getAvatarFromContacts,
  getColorFromContacts,
} from '../usersMapping';
import {MessageWithMetaType} from '../types';
import {GetDimensionsAndSkiaNodes} from './skiaCalculations';
import {SkFont, Skia} from '@shopify/react-native-skia';
import {BUBBLE_PADDING} from '.';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {getSnapshotPath} from 'components/Snapshot/context';

type CalculationsType = {
  height: number;
  width: number;
  content: string | Element[] | {filename: string; backup: string};
};

type ItemType =
  | DigestedConversationEmojiItemType
  | DigestedConversationStringItemType
  | DigestedConversationImageItemType
  | DigestedConversationGlyphItemType
  | DigestedConversationSnapShotItemType;

export const SkMessageItem = (
  itemConfiguration: DigestConfigurationType,
  message: MessageWithMetaType,
  name: CONTACT_NAMES,
  hasTail: boolean,
) => {
  const DEFAULT_BOTTOM_PADDING = 4;
  const BOTTOM_PADDING_FOR_LAST_IN_BLOCK = 8;
  const ADDED_HEIGHT_FOR_VISIBLE_NAME = 20;
  const {group, width, positionAcc, font} = itemConfiguration;
  const leftSide = name !== 'Self';

  const calculations = calculateWidthHeightAndContent(
    message,
    width,
    leftSide,
    font,
  );

  const skItem: ItemType = {
    alignItems: leftSide ? 'flex-start' : 'flex-end',
    content: calculations.content,
    height:
      group && name !== CONTACT_NAMES.SELF
        ? calculations.height + ADDED_HEIGHT_FOR_VISIBLE_NAME
        : calculations.height,
    width: calculations.width,
    paddingBottom: hasTail
      ? BOTTOM_PADDING_FOR_LAST_IN_BLOCK
      : DEFAULT_BOTTOM_PADDING,
    name: name,
    offset: positionAcc,
    clip: [DigestedItemTypes.EMOJI].includes(message.type)
      ? undefined
      : createPath(calculations, hasTail, leftSide),
    colors: getColorFromContacts(name),
    avatar: hasTail ? getAvatarFromContacts(name) : undefined,
    leftSide: leftSide,
    type: message.type,
    reaction: message.reaction,
    messageDelay: message.messageDelay,
    typingDelay: message.typingDelay,
  };

  return skItem;
};

const createPath = (
  calculations: CalculationsType,
  tail: boolean,
  flip: boolean,
) => {
  const clip = BubblePath(calculations.width, calculations.height, 16, tail);
  if (flip) {
    flipPath(clip, calculations.width);
  }
  return clip;
};

const calculateWidthHeightAndContent = (
  message: MessageWithMetaType,
  width: number,
  leftSide: boolean,
  font: SkFont,
) => {
  const itemWidth = leftSide ? width * 0.7 - 30 : width * 0.7;
  switch (message.type) {
    case DigestedItemTypes.EMOJI:
      return {width: itemWidth, height: 60, content: message.message};
    case DigestedItemTypes.SNAPSHOT:
      return {
        width: itemWidth,
        height: 0,
        content: message.message,
      };
    case DigestedItemTypes.IMAGE:
      const imageDimensions = Image.resolveAssetSource(
        message.message as ImageSourcePropType,
      );
      const aspectRation = imageDimensions.height / imageDimensions.width;
      const imageHeight = itemWidth * aspectRation;
      return {width: itemWidth, height: imageHeight, content: message.message};
    case DigestedItemTypes.STRING:
      const [boxHeight, boxWidth, textNodes] = GetDimensionsAndSkiaNodes(
        font,
        font,
        message.message,
        width,
        leftSide,
      );
      return {
        width: boxWidth,
        height: boxHeight + BUBBLE_PADDING,
        content: textNodes,
      };

    case DigestedItemTypes.GLYPH:
      const [glyphHeight, glyphWidth, glyphNodes] = GetDimensionsAndSkiaNodes(
        font,
        font,
        message.message,
        width,
        leftSide,
      );
      return {width: glyphWidth, height: glyphHeight, content: glyphNodes};
    default:
      return {width: itemWidth, height: 60, content: ''};
  }
};
