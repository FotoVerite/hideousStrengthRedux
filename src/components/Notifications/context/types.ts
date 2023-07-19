import {SkImage} from '@shopify/react-native-skia';
import {PropsWithChildren, ReactNode} from 'react';
import {View} from 'react-native';
import {
  GenericOrUndefinedStateType,
  GenericStateType,
} from 'types/genericContextTypes';
import {NotificationType} from '../reducers/notificationsReducer/types';

export type NotificationsContextTypeDigest = {
  children: ReactNode;
};

export type NotificationsContextTypeDigested = PropsWithChildren<{
  notifications: GenericStateType<NotificationType[]>;
}>;
