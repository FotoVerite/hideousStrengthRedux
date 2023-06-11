import {FlexAlignType, DataSourceParam} from 'react-native';
import {ReactionType} from '../types';

export enum DigestedItemTypes {
  STRING = 'string',
  TIME = 'time',
  IMAGE = 'image',
}

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
