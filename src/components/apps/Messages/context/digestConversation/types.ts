import {FlexAlignType} from 'react-native';
import {ReactionType} from '../types';
import {
  DataSourceParam,
  Glyph,
  SkFont,
  SkPath,
  Vector,
} from '@shopify/react-native-skia';
import {CONTACT_NAMES} from '../usersMapping';

export enum DigestedItemTypes {
  EMOJI = 'emoji',
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
  emojiFont: SkFont;
  width: number;
  positionAcc: number;
  group?: boolean;
};

export interface AbstractDigestedConversationItemType {
  height: number;
  width: number;
  offset: number;
  paddingBottom: number;
  delay?: number;
}

export interface DigestedConversationTimeType
  extends AbstractDigestedConversationItemType {
  content: string;
  alignItems: undefined;
  type: DigestedItemTypes.TIME;
}

export interface AbstractMetaDigestedConversationItemType
  extends AbstractDigestedConversationItemType {
  alignItems: FlexAlignType;
  avatar?: string;
  colors: string[];
  name: CONTACT_NAMES;
  leftSide: boolean;
  reaction?: ReactionType;
}

export interface DigestedConversationStringItemType
  extends AbstractMetaDigestedConversationItemType {
  clip: SkPath;
  content: React.JSX.Element[];
  type: DigestedItemTypes.STRING;
}

export interface DigestedConversationGlyphItemType
  extends AbstractMetaDigestedConversationItemType {
  clip: SkPath;
  content: React.JSX.Element[];
  type: DigestedItemTypes.GLYPH;
}

export interface DigestedConversationImageItemType
  extends AbstractMetaDigestedConversationItemType {
  clip: SkPath;
  content: string;
  type: DigestedItemTypes.IMAGE;
}

export interface DigestedConversationEmojiItemType
  extends AbstractMetaDigestedConversationItemType {
  content: string;
  type: DigestedItemTypes.EMOJI;
}
export type DigestedConversationListItem =
  | DigestedConversationEmojiItemType
  | DigestedConversationTimeType
  | DigestedConversationStringItemType
  | DigestedConversationImageItemType
  | DigestedConversationGlyphItemType;
