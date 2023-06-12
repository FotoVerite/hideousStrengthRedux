import {FlexAlignType} from 'react-native';
import {ReactionType} from '../types';
import {SkFont} from '@shopify/react-native-skia';

export enum DigestedItemTypes {
  STRING = 'string',
  TIME = 'time',
  IMAGE = 'image',
}

export type DigestConfigurationType = {
  font: SkFont;
  width: number;
  positionAcc: number;
  group?: boolean;
};

export interface DigestedConversationItemType {
  height: number;
  width: number;
  offset: number;
  paddingBottom: number;
}

export interface DigestedConversationTimeType
  extends DigestedConversationItemType {
  content: string;
  type: DigestedItemTypes.TIME;
  alignItems?: undefined;
}

export interface DigestedConversationStringItemType
  extends DigestedConversationItemType {
  name: string;
  clip: any;
  colors: string[];
  content: React.JSX.Element[];
  type: DigestedItemTypes.STRING;
  avatar?: string;
  alignItems: FlexAlignType;
  leftSide: boolean;
  reaction?: ReactionType;
}

export interface DigestedConversationImageItemType
  extends DigestedConversationItemType {
  name: string;
  clip: any;
  colors: string[];
  content: DataSourceParam;
  type: DigestedItemTypes.IMAGE;
  avatar?: DataSourceParam;
  alignItems: FlexAlignType;
  leftSide: boolean;
  reaction?: ReactionType;
}
export type DigestedConversationListItem =
  | DigestedConversationTimeType
  | DigestedConversationStringItemType
  | DigestedConversationImageItemType;
