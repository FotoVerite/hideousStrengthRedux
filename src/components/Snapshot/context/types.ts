import {SkImage} from '@shopify/react-native-skia';
import {PropsWithChildren, ReactNode} from 'react';
import {View} from 'react-native';
import {
  GenericOrUndefinedStateType,
  GenericStateType,
} from 'types/genericContextTypes';

export type SnapShotContextTypeDigest = {
  children: ReactNode;
  snapShotRef: React.RefObject<View>;
};

export type SnapShotContextTypeDigested = PropsWithChildren<{
  takeSnapShot: GenericOrUndefinedStateType<string>;
  image: SkImage | null | undefined;
}>;
