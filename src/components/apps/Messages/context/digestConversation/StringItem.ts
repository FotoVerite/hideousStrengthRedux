import {SkFont} from '@shopify/react-native-skia';
import {ReactionType} from '../types';
import {GetDimensionsAndSkiaNodes} from './skiaCalculations';

import {BUBBLE_PADDING} from '.';
import {userMapping} from '../usersMapping';
import {NAMES} from '../names';
import {DigestedConversationStringItemType, DigestedItemTypes} from './types';
import {BubblePath, flipPath} from './BubblePath';

const uMapping = userMapping;

export const createStringItem = (
  font: SkFont,
  width: number,
  positionAcc: number,
  name: NAMES,
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
    positionFromStartOfList: positionAcc,
    content: textNodes,
    height: boxHeight + BUBBLE_PADDING,
    width: boxWidth,
    offset: positionAcc,
    clip: clip,
    colors: uMapping.get(name)?.colors,
    avatar: hasTail ? uMapping.get(name)?.avatar : undefined,
    leftSide: leftSide,
    type: DigestedItemTypes.STRING,
    reaction: reaction,
  } as DigestedConversationStringItemType;
  return listItem;
};
