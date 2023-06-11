import {Image, ImageSourcePropType} from 'react-native';
import {BUBBLE_PADDING} from '.';
import {userMapping} from '../usersMapping';
import {BubblePath, flipPath} from './BubblePath';

import {DataSourceParam} from '@shopify/react-native-skia';
import {DigestedConversationImageItemType, DigestedItemTypes} from './types';
import {NAMES} from '../names';
import {ReactionType} from '../types';

export const createImageItem = (
  width: number,
  positionAcc: number,
  name: NAMES,
  imagePath: DataSourceParam,
  hasTail: boolean,
  reaction?: ReactionType,
) => {
  const uMapping = userMapping;
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
    positionFromStartOfList: positionAcc,
    content: imagePath,
    height: imageHeight,
    width: imageWidth,
    offset: positionAcc,
    clip: clip,
    colors: uMapping.get(name)?.colors,
    avatar: hasTail ? uMapping.get(name)?.avatar : undefined,
    leftSide: leftSide,
    type: DigestedItemTypes.IMAGE,
    reaction: reaction,
  };

  return listItem;
};
