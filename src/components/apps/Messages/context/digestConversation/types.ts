import {FlexAlignType} from 'react-native';
import {ReactionType} from '../types';
import {
  DataSourceParam,
  Glyph,
  SkFont,
  Vector,
} from '@shopify/react-native-skia';

export enum DigestedItemTypes {
  STRING = 'string',
  TIME = 'time',
  IMAGE = 'image',
  GLYPH = 'glyph',
}

export type GlyphContent = {
  font: SkFont;
  glyphs: Glyph[];
};

export type GlyphItemContentType = {
  text: GlyphContent;
  emoji: GlyphContent;
};

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

export interface DigestedConversationGlyphItemType
  extends DigestedConversationItemType {
  name: string;
  clip: any;
  colors: string[];
  content: GlyphItemContentType;
  type: DigestedItemTypes.GLYPH;
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