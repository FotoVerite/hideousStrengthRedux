import {SkFont} from '@shopify/react-native-skia';
import {ReactionType} from '../types';
import {GetDimensionsAndSkiaNodes} from './skiaCalculations';

import {BUBBLE_PADDING} from '.';
import {
  ContactNames,
  getAvatarFromContacts,
  getColorFromContacts,
} from '../usersMapping';
import {
  DigestConfigurationType,
  DigestedConversationStringItemType,
  DigestedItemTypes,
} from './types';
import {BubblePath, flipPath} from './BubblePath';

export const createStringItem = (
  itemConfiguration: DigestConfigurationType,
  name: ContactNames,
  message: string,
  hasTail: boolean,
  reaction?: ReactionType,
): DigestedConversationStringItemType => {
  const {font, group, width, positionAcc} = itemConfiguration;
  const leftSide = name !== 'Self';
  const [boxHeight, boxWidth, textNodes] = GetDimensionsAndSkiaNodes(
    font,
    message as string,
    width,
    leftSide,
  );
  const clip = BubblePath(boxWidth, boxHeight + 16, 16, hasTail);
  if (leftSide) {
    flipPath(clip, boxWidth);
  }
  const listItem = {
    avatar: hasTail ? getAvatarFromContacts(name) : undefined,
    alignItems: leftSide ? 'flex-start' : 'flex-end',
    clip: clip,
    content: textNodes,
    colors: getColorFromContacts(name),
    height:
      group && name !== ContactNames.SELF
        ? boxHeight + BUBBLE_PADDING + 20
        : boxHeight + BUBBLE_PADDING,
    leftSide: leftSide,
    name: name,
    paddingBottom: hasTail ? 8 : 4,
    offset: positionAcc,
    reaction: reaction,
    type: DigestedItemTypes.STRING,
    width: boxWidth,
  } as DigestedConversationStringItemType;
  return listItem;
};
