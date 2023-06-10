import {PropsWithChildren, ReactNode} from 'react';
import {ImageURISource} from 'react-native';
import {SharedValue} from 'react-native-reanimated';
import {GenericOrUndefinedStateType} from 'types/genericContextTypes';
import {NAMES} from './names';
import {DigestedConversationListItem} from './digestConversation';

export type MessagesSharedValuesType = {
  wordInputShake: SharedValue<number>;
  infoOpened: SharedValue<number>;
};

export type MessagesContextTypeDigest = {
  children: ReactNode;
};

export type MessagesContextTypeDigested = PropsWithChildren<{
  conversations: ConversationType[];
  conversation: GenericOrUndefinedStateType<ConversationType>;
  digestedConversation: {
    state: DigestedConversationListItem[] | undefined;
    set: (toDigest: ConversationType) => void;
  };
  media: GenericOrUndefinedStateType<ImageURISource>;
}>;

export type ConversationType = {
  tags: string[];
  name: string;
  date: string;
  listContent: string;
  heroImage: ImageURISource;
  exchanges: ConversationExchangeType[];
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
  message: ImageURISource;
}

export interface EmojiMessageWithMeta extends MessageWithMetaType {
  type: 'emoji';
  message: string;
}

export type ReactionType = {name: string; color: string};
