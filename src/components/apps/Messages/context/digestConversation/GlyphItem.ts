import {ReactionType} from '../types';
import {GetDimensionsAndSkiaGlyphs} from './skiaCalculations';

import {BUBBLE_PADDING} from '.';
import {
  CONTACT_NAMES,
  getAvatarFromContacts,
  getColorFromContacts,
} from '../usersMapping';
import {
  DigestConfigurationType,
  DigestedConversationGlyphItemType,
  DigestedItemTypes,
} from './types';
import {BubblePath, flipPath} from './BubblePath';

export const createGlyphItem = (
  itemConfiguration: DigestConfigurationType,
  name: CONTACT_NAMES,
  message: string,
  hasTail: boolean,
  reaction?: ReactionType,
): DigestedConversationGlyphItemType => {
  const {font, group, width, positionAcc} = itemConfiguration;
  const leftSide = name !== 'Self';
  const [boxHeight, boxWidth, textNodes] = GetDimensionsAndSkiaGlyphs(
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
      group && name !== CONTACT_NAMES.SELF
        ? boxHeight + BUBBLE_PADDING + 20
        : boxHeight + BUBBLE_PADDING,
    leftSide: leftSide,
    name: name,
    paddingBottom: hasTail ? 8 : 4,
    offset: positionAcc,
    reaction: reaction,
    type: DigestedItemTypes.GLYPH,
    width: boxWidth,
  } as DigestedConversationGlyphItemType;
  return listItem;
};
