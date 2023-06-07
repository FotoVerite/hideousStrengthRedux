import {PropsWithChildren, ReactNode} from 'react';
import {ColorValue, ImageURISource} from 'react-native';
import {SharedValue} from 'react-native-reanimated';
import {GenericOrUndefinedStateType} from 'types/genericContextTypes';
import {NAMES} from './names';

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
  media: GenericOrUndefinedStateType<ImageURISource>;
}>;

export type ConversationType = {
  tags: string[];
  name: string;
  date: string;
  listContent: string;
  heroImage: ImageURISource;
  exchanges: ConversationExchangeType[];
};

export type ConversationExchangeType = {
  time: string;
  exchanges: ExchangeBlockType[];
};

export type ExchangeBlockType = {
  name: NAMES;
  messages: MessageType[];
};

export type MessageType = string | StringMessageWithMeta | ImageMessageWithMeta;

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

export type ReactionType = {name: string; color: string};
