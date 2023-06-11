import {SkFont} from '@shopify/react-native-skia';
import {ReactionType} from '../types';
import {GetDimensionsAndSkiaNodes} from './skiaCalculations';

import {BUBBLE_PADDING} from '.';
import {
  ContactNames,
  getAvatarFromContacts,
  getColorFromContacts,
} from '../usersMapping';
import {DigestedConversationStringItemType, DigestedItemTypes} from './types';
import {BubblePath, flipPath} from './BubblePath';

export const createStringItem = (
  font: SkFont,
  width: number,
  positionAcc: number,
  name: ContactNames,
  message: string,
  hasTail: boolean,
  reaction?: ReactionType,
): DigestedConversationStringItemType => {
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
    alignItems: leftSide ? 'flex-start' : 'flex-end',
    content: textNodes,
    height: boxHeight + BUBBLE_PADDING,
    paddingBottom: hasTail ? 8 : 4,
    width: boxWidth,
    offset: positionAcc,
    clip: clip,
    colors: getColorFromContacts(name),
    avatar: hasTail ? getAvatarFromContacts(name) : undefined,
    leftSide: leftSide,
    type: DigestedItemTypes.STRING,
    reaction: reaction,
  } as unknown as DigestedConversationStringItemType;
  return listItem;
};
