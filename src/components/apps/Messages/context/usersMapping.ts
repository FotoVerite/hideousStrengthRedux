import {NAMES} from './names';
import arialAvatar from '@apps/Messages/assets/avatars/alice_avator.jpg';
import aliceAvatar from '@apps/Messages/assets/avatars/alice_avator.jpg';

import defaultAvatar from '@apps/Messages/assets/avatars/unkown.jpeg';

import zaraAvatar from '../assets/avatars/Zara.jpg';
import chrisAvatar from '../assets/avatars/Chris.jpg';
import graceAvatar from '@apps/Messages/assets/avatars/grace.jpg';
import gregAvatar from '@apps/Messages/assets/avatars/greg.jpg';
import steveLitt from '@apps/Messages/assets/avatars/steve_litt.png';

import meleenaAvatar from '@apps/Messages/assets/avatars/mileena.png';

import {DataSourceParam} from '@shopify/react-native-skia';

export enum CONTACT_NAMES {
  ARIAL = 'Arial',
  ALICE = 'Alice',
  CHRIS = 'Chris',
  CLAY = 'Clay',
  GRACE_RUSSO = 'Grace Russo',
  GREG = 'Fuck Face',
  MILEENA = 'Mileena',
  SELF = 'Self',
  STEVE_LITT = 'Steve-0',
  ZOLA = 'Zola',
  DEFAULT = 'Default',
  SEAMLESS = '30368',
}

export type UserMappingType = {
  avatar?: string;
  colors: string[];
};
export const contactConsts: {[key in CONTACT_NAMES]: UserMappingType} = {
  Arial: {avatar: arialAvatar, colors: ['#dbaf48', '#cdc8bb']},
  Mileena: {avatar: meleenaAvatar, colors: ['#ff0095', '#cdbbc6']},
  Alice: {avatar: aliceAvatar, colors: ['#d0bd28', '#cdc8bb']},
  Chris: {avatar: chrisAvatar, colors: ['#6bd8e4', '#363243']},
  Clay: {avatar: chrisAvatar, colors: ['#6bd8e4', '#363243']},
  'Fuck Face': {avatar: gregAvatar, colors: ['#48ee4e', '#363243']},
  'Grace Russo': {avatar: graceAvatar, colors: ['#EE6548', '#363243']},
  Self: {avatar: undefined, colors: ['blue', '#363243']},
  'Steve-0': {avatar: steveLitt, colors: ['#FF002D', '#C3596B']},
  Zola: {avatar: zaraAvatar, colors: ['#b46be4', '#363243']},
  30368: {avatar: defaultAvatar, colors: ['#6b6b6d', '#363243']},
  Default: {avatar: defaultAvatar, colors: ['#6b6b6d', '#363243']},
};

export const getColorFromContacts = (name: CONTACT_NAMES | string) => {
  if (Object.values(CONTACT_NAMES).some(v => v === name)) {
    return contactConsts[name as CONTACT_NAMES].colors;
  } else {
    return contactConsts[CONTACT_NAMES.DEFAULT].colors;
  }
};

export const getAvatarFromContacts = (name: CONTACT_NAMES | 'string') => {
  if (Object.values(CONTACT_NAMES).some(v => v === name)) {
    return contactConsts[name as CONTACT_NAMES].avatar;
  } else {
    return contactConsts[CONTACT_NAMES.DEFAULT].avatar;
  }
};

export const userMapping: Map<NAMES, UserMappingType> = new Map();
