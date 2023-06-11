import {Image, ImageSourcePropType} from 'react-native';
import {BubblePath, flipPath} from './BubblePath';

import {DataSourceParam} from '@shopify/react-native-skia';
import {DigestedConversationImageItemType, DigestedItemTypes} from './types';
import {ReactionType} from '../types';
import {
  ContactNames,
  getAvatarFromContacts,
  getColorFromContacts,
} from '../usersMapping';

export const createImageItem = (
  width: number,
  positionAcc: number,
  name: ContactNames,
  imagePath: DataSourceParam,
  hasTail: boolean,
  reaction?: ReactionType,
) => {
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
    height: imageHeight,
    width: imageWidth,
    paddingBottom: hasTail ? 8 : 4,
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
