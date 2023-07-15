import {PropsWithChildren, ReactElement, ReactNode} from 'react';
import {SharedValue} from 'react-native-reanimated';
import {DataSourceParam} from '@shopify/react-native-skia';

import {GenericOrUndefinedStateType} from 'types/genericContextTypes';
import {CONTACT_NAMES} from './usersMapping';

import {
  DigestedConversationListItem,
  DigestedItemTypes,
} from '../reducers/conversationReducer/digestion/types';
import {ConversationReducerActionsType} from '../reducers/conversationReducer/types';
export type MessagesSharedValuesType = {
  wordInputShake: SharedValue<number>;
  infoOpened: SharedValue<number>;
};

export type MessagesContextTypeDigest = {
  children: ReactNode;
};

export type MessagesContextTypeDigested = PropsWithChildren<{
  conversations: ConversationType[];
  conversation: {
    state: DigestedConversationType | undefined;
    dispatch: (action: ConversationReducerActionsType) => Promise<void>;
  };
  media: GenericOrUndefinedStateType<ReactElement>;
}>;

export type RouteConditionsType = {
  [key in CONTACT_NAMES]?: {views?: number; routes?: {[key: string]: string[]}};
};

export type MessageRouteType = {
  id: number;
  conditions?: RouteConditionsType;
  options: string[];
  routes: {[key: string]: ExchangeBlockType[]};
};

export type DigestedConversationRouteType = MessageRouteType & {
  exchangeIndex: number;
  messageIndex: number;
};

export type ConversationType = {
  tags: string[];
  name: CONTACT_NAMES;
  heroImage: DataSourceParam;
  exchanges: ConversationExchangeType[];
  group?: boolean;
  routes?: MessageRouteType[];
  interfaceColor: string;
};

export type DigestedConversationType = {
  tags: string[];
  name: CONTACT_NAMES;
  heroImage: DataSourceParam;
  exchanges: DigestedConversationListItem[];
  group?: boolean;
  routes: MessageRouteType[];
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

export type MessageType = string | MessageWithMetaType;

export type MessageWithMetaType =
  | EmojiMessageWithMeta
  | GlyphMessageWithMeta
  | StringMessageWithMeta
  | ImageMessageWithMeta
  | SnapshotMessageWithMeta;

interface AbstractMessageWithMetaType {
  messageDelay?: number;
  typingDelay?: number;
  reaction?: ReactionType;
}

export interface StringMessageWithMeta extends AbstractMessageWithMetaType {
  message: string;
  type: DigestedItemTypes.STRING;
}

export interface ImageMessageWithMeta extends AbstractMessageWithMetaType {
  message: string;
  type: DigestedItemTypes.IMAGE;
}

export interface EmojiMessageWithMeta extends AbstractMessageWithMetaType {
  message: string;
  type: DigestedItemTypes.EMOJI;
}
export interface GlyphMessageWithMeta extends AbstractMessageWithMetaType {
  message: string;
  type: DigestedItemTypes.GLYPH;
}

export interface SnapshotMessageWithMeta extends AbstractMessageWithMetaType {
  type: DigestedItemTypes.SNAPSHOT;
  message: {backup: string; filename: string};
}

export type ReactionType = {name: string; color: string};
