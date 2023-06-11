import {NAMES} from './names';
import zaraAvatar from '../assets/avatars/Zara.jpg';
import chrisAvatar from '../assets/avatars/Chris.jpg';
import {DataSourceParam} from '@shopify/react-native-skia';

export type UserMappingType = {
  avatar?: DataSourceParam;
  colors: string[];
};

export const userMapping: Map<NAMES, UserMappingType> = new Map();

userMapping.set('Self', {colors: ['blue', '#363243']});
userMapping.set('Zola', {avatar: zaraAvatar, colors: ['#a770d8', '#5f4f9a']});
userMapping.set('Chris', {avatar: chrisAvatar, colors: ['red', 'blue']});
