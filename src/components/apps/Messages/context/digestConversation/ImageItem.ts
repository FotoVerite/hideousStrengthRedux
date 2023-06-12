import {Image, ImageSourcePropType} from 'react-native';
import {BubblePath, flipPath} from './BubblePath';

import {DataSourceParam} from '@shopify/react-native-skia';
import {
  DigestConfigurationType,
  DigestedConversationImageItemType,
  DigestedItemTypes,
} from './types';
import {ReactionType} from '../types';
import {
  ContactNames,
  getAvatarFromContacts,
  getColorFromContacts,
} from '../usersMapping';

export const createImageItem = (
  itemConfiguration: DigestConfigurationType,
  name: ContactNames,
  imagePath: DataSourceParam,
  hasTail: boolean,
  reaction?: ReactionType,
) => {
  const {group, width, positionAcc} = itemConfiguration;

  const leftSide = name !== 'Self';

  const imageDimensions = Image.resolveAssetSource(
    imagePath as ImageSourcePropType,
  );
  const imageWidth = leftSide ? width * 0.7 - 30 : width * 0.7;
  const aspectRation = imageDimensions.height / imageDimensions.width;
  const imageHeight = imageWidth * aspectRation;

  const clip = BubblePath(imageWidth, imageHeight, 16, hasTail);
  if (leftSide) {
    flipPath(clip, imageWidth);
  }
  const listItem: DigestedConversationImageItemType = {
    alignItems: leftSide ? 'flex-start' : 'flex-end',
    content: imagePath,
    height: group && name !== ContactNames.SELF ? imageHeight + 20 : imageHeight,
    width: imageWidth,
    paddingBottom: hasTail ? 8 : 4,
    name: name,
    offset: positionAcc,
    clip: clip,
    colors: getColorFromContacts(name),
    avatar: hasTail ? getAvatarFromContacts(name) : undefined,
    leftSide: leftSide,
    type: DigestedItemTypes.IMAGE,
    reaction: reaction,
  };

  return listItem;
};
