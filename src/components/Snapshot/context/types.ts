import {PropsWithChildren, ReactNode} from 'react';
import {View} from 'react-native';
import {GenericStateType} from 'types/genericContextTypes';

export type SnapShotContextTypeDigest = {
  children: ReactNode;
  snapShotRef: React.RefObject<View>;
};

export type SnapShotContextTypeDigested = PropsWithChildren<{
  takeSnapShot: GenericStateType<boolean>;
}>;
