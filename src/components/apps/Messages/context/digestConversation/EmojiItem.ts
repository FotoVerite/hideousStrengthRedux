import {
  DigestConfigurationType,
  DigestedConversationEmojiItemType,
  DigestedItemTypes,
} from './types';
import {ReactionType} from '../types';
import {ContactNames, getAvatarFromContacts} from '../usersMapping';

export const createEmojiItem = (
  itemConfiguration: DigestConfigurationType,
  name: ContactNames,
  content: string,
  hasTail: boolean,
  reaction?: ReactionType,
) => {
  const {group, width, positionAcc} = itemConfiguration;

  const leftSide = name !== 'Self';

  const maxWidth = leftSide ? width * 0.7 - 30 : width * 0.7;

  const listItem: DigestedConversationEmojiItemType = {
    alignItems: leftSide ? 'flex-start' : 'flex-end',
    content: content,
    height: group && name !== ContactNames.SELF ? 60 + 20 : 60,
    width: maxWidth,
    paddingBottom: hasTail ? 8 : 4,
    name: name,
    offset: positionAcc,
    avatar: hasTail ? getAvatarFromContacts(name) : undefined,
    leftSide: leftSide,
    type: DigestedItemTypes.EMOJI,
    reaction: reaction,
  };

  return listItem;
};
