import {ImageSourcePropType} from 'react-native';

export type NotificationType = {
  active: boolean;
  content: string;
  image?: ImageSourcePropType;
};
