import {NAMES} from './names';
import arialAvatar from '@apps/Messages/assets/avatars/alice_avator.jpg';
import defaultAvatar from '@apps/Messages/assets/avatars/unkown.jpeg';

import zaraAvatar from '../assets/avatars/Zara.jpg';
import chrisAvatar from '../assets/avatars/Chris.jpg';
import graceAvatar from '@apps/Messages/assets/avatars/alice_avator.jpg';
import {DataSourceParam} from '@shopify/react-native-skia';

export enum ContactNames {
  ARIAL = 'Arial',
  CHRIS = 'Chris',
  CLAY = 'Clay',
  GRACE_RUSSO = 'Grace Russo',
  SELF = 'Self',
  ZOLA = 'Zola',
  DEFAULT = 'Default',
  SEAMLESS = '30368',
}

export type UserMappingType = {
  avatar?: DataSourceParam;
  colors: string[];
};
export const contactConsts: {[key in ContactNames]: UserMappingType} = {
  Arial: {avatar: arialAvatar, colors: ['#dbaf48', '#cdc8bb']},
  Chris: {avatar: chrisAvatar, colors: ['#6bd8e4', '#363243']},
  Clay: {avatar: chrisAvatar, colors: ['#6bd8e4', '#363243']},
  'Grace Russo': {avatar: graceAvatar, colors: ['#EE6548', '#363243']},
  Self: {avatar: undefined, colors: ['blue', '#363243']},
  Zola: {avatar: zaraAvatar, colors: ['#b46be4', '#363243']},
  30368: {avatar: defaultAvatar, colors: ['#6b6b6d', '#363243']},
  Default: {avatar: defaultAvatar, colors: ['#6b6b6d', '#363243']},
};

export const getColorFromContacts = (name: ContactNames | string) => {
  if (Object.values(ContactNames).some(v => v === name)) {
    return contactConsts[name as ContactNames].colors;
  } else {
    return contactConsts[ContactNames.DEFAULT].colors;
  }
};

export const getAvatarFromContacts = (name: ContactNames | 'string') => {
  if (Object.values(ContactNames).some(v => v === name)) {
    return contactConsts[name as ContactNames].avatar;
  } else {
    return contactConsts[ContactNames.DEFAULT].avatar;
  }
};

export const userMapping: Map<NAMES, UserMappingType> = new Map();
