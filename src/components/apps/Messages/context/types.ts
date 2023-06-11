import {PropsWithChildren, ReactNode} from 'react';
import {SharedValue} from 'react-native-reanimated';
import {DataSourceParam} from '@shopify/react-native-skia';

import {GenericOrUndefinedStateType} from 'types/genericContextTypes';
import {NAMES} from './names';
import {DigestedConversationListItem} from './digestConversation/types';

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
    set: (toDigest: ConversationType | undefined) => void;
  };
  media: GenericOrUndefinedStateType<DataSourceParam>;
}>;

export type ConversationType = {
  tags: string[];
  name: string;
  date: string;
  listContent: string;
  heroImage: DataSourceParam;
  exchanges: ConversationExchangeType[];
  interfaceColor: string;
};

export type DigestedConversation = {
  tags: string[];
  name: string;
  date: string;
  listContent: string;
  heroImage: DataSourceParam;
  exchanges: DigestedConversationListItem[];
  interfaceColor: string;
};

export type ConversationExchangeType = {
  time: string;
  exchanges: ExchangeBlockType[];
};

export type ExchangeBlockType = {
  name: NAMES;
  messages: MessageType[];
};

export type MessageType =
  | string
  | StringMessageWithMeta
  | ImageMessageWithMeta
  | EmojiMessageWithMeta;

interface MessageWithMetaType {
  reaction?: ReactionType;
}

export interface StringMessageWithMeta extends MessageWithMetaType {
  type: 'string';
  message: string;
}

export interface ImageMessageWithMeta extends MessageWithMetaType {
  type: 'image';
  message: DataSourceParam;
}

export interface EmojiMessageWithMeta extends MessageWithMetaType {
  type: 'emoji';
  message: string;
}

export type ReactionType = {name: string; color: string};
