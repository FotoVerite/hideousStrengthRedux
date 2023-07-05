import {PropsWithChildren, ReactNode} from 'react';
import {SharedValue} from 'react-native-reanimated';
import {DataSourceParam} from '@shopify/react-native-skia';

import {GenericOrUndefinedStateType} from 'types/genericContextTypes';
import {DigestedConversationListItem} from './digestConversation/types';
import {CONTACT_NAMES, UserMappingType} from './usersMapping';
import {APP_NAMES} from 'components/apps/types';
import {Route} from '@react-navigation/native';

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
  sharedValues: {optionsHeight: SharedValue<number>};
}>;

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

export type MessageEventType = {
  [APP_NAMES.MESSAGE]: {
    [key in CONTACT_NAMES]?: {
      views: [Date];
      routes: {[routeId: string]: {date: Date; chosen: string}};
    };
  };
};

export type RouteTriggerType = {
  [APP_NAMES.MESSAGE]?: {
    [key in CONTACT_NAMES]?: {views?: number; routes?: {[key: string]: string}};
  };
};
export type MessageRouteType = {
  id: string;
  triggers?: RouteTriggerType;
  options: [{key: string; value: string}];
  routes: {[key: string]: ExchangeBlockType[]};
};
