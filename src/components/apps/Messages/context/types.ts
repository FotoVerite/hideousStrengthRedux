import {PropsWithChildren, ReactNode} from 'react';
import {SharedValue} from 'react-native-reanimated';
import {DataSourceParam} from '@shopify/react-native-skia';

import {GenericOrUndefinedStateType} from 'types/genericContextTypes';
import {CONTACT_NAMES} from './usersMapping';

import {
  DigestedConversationListItem,
  DigestedItemTypes,
} from './digestConversation/types';
export type MessagesSharedValuesType = {
  wordInputShake: SharedValue<number>;
  infoOpened: SharedValue<number>;
};

export type MessagesContextTypeDigest = {
  children: ReactNode;
};

export type MessagesContextTypeDigested = PropsWithChildren<{
  conversations: ConversationType[];
  digestedConversation: {
    state: DigestedConversation | undefined;
    set: React.Dispatch<React.SetStateAction<DigestedConversation | undefined>>;
    digest: (toDigest: ConversationType | undefined) => void;
  };
  media: GenericOrUndefinedStateType<DataSourceParam>;
}>;

export type RouteConditionsType = {
  [key in CONTACT_NAMES]?: {views?: number; routes?: {[key: string]: string}};
};

export type MessageRouteType = {
  id: string;
  conditions?: RouteConditionsType;
  options: [{key: string; value: string}];
  routes: {[key: string]: ExchangeBlockType[]};
};

export type ConversationType = {
  tags: string[];
  name: CONTACT_NAMES;
  date: string;
  listContent: string;
  heroImage: DataSourceParam;
  exchanges: ConversationExchangeType[];
  group?: boolean;
  routes?: MessageRouteType[];
  interfaceColor: string;
};

export type DigestedConversation = {
  tags: string[];
  name: CONTACT_NAMES;
  date: string;
  listContent: string;
  heroImage: DataSourceParam;
  exchanges: DigestedConversationListItem[];
  group?: boolean;
  availableRoutes: MessageRouteType[];
  route?: MessageRouteType;
  interfaceColor: string;
};

export type ConversationExchangeType = {
  time: string;
  exchanges: ExchangeBlockType[];
};

export type ExchangeBlockType = {
  name: CONTACT_NAMES;
  messages: MessageType[];
};

export type MessageType =
  | string
  | StringMessageWithMeta
  | ImageMessageWithMeta
  | EmojiMessageWithMeta;

export type MessageWithMetaType =
  | EmojiMessageWithMeta
  | GlyphMessageWithMeta
  | StringMessageWithMeta
  | ImageMessageWithMeta;

interface AbstractMessageWithMetaType {
  message: string;
  reaction?: ReactionType;
}

export interface StringMessageWithMeta extends AbstractMessageWithMetaType {
  type: DigestedItemTypes.STRING;
}

export interface ImageMessageWithMeta extends AbstractMessageWithMetaType {
  type: DigestedItemTypes.IMAGE;
}

export interface EmojiMessageWithMeta extends AbstractMessageWithMetaType {
  type: DigestedItemTypes.EMOJI;
}
export interface GlyphMessageWithMeta extends AbstractMessageWithMetaType {
  type: DigestedItemTypes.GLYPH;
}

export type ReactionType = {name: string; color: string};
