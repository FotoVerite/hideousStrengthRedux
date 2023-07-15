import {ReactElement} from 'react';
import {DigestedConversationListItem} from './digestion/types';
import {
  ConversationType,
  DigestedConversationType,
  ExchangeBlockType,
  MessageRouteType,
  MessageType,
} from '../../context/types';
import {SkFont} from '@shopify/react-native-skia';
import {GenericStateType} from 'types/genericContextTypes';
import {EventOrchestraObjectType} from 'components/EventOrchestra/context/types';
import {CONTACT_NAMES} from '../../context/usersMapping';

export enum CONVERSATION_REDUCER_ACTIONS {
  ADD_CONVERSATION,
  ADD_MESSAGE,
  ADD_MESSAGE_FROM_BLOCK,
  DIGEST_CONVERSATION,
  START_ROUTE,
  UPDATE_MESSAGE,
  RESET,
}

export type DigestedMessageProps = {
  [index in keyof DigestedConversationListItem]?: DigestedConversationListItem[index];
};

export type StartRoutePayloadType = {
  name: CONTACT_NAMES;
  id: number;
  chosen: string;
};

export type AddMessagePayloadType = {
  messageContent: MessageType;
  name: CONTACT_NAMES;
  tail: boolean;
};

type AbstractConversationReducerAction = {
  type: CONVERSATION_REDUCER_ACTIONS;
};

type AddConversationActionType = {
  type: CONVERSATION_REDUCER_ACTIONS.ADD_CONVERSATION;
  payload: DigestedConversationType;
};

type AddMessageFromBlockActionType = {
  type: CONVERSATION_REDUCER_ACTIONS.ADD_MESSAGE;
  payload: AddMessagePayloadType;
};

type AddMessageActionType = {
  type: CONVERSATION_REDUCER_ACTIONS.ADD_MESSAGE_FROM_BLOCK;
  payload: {block: ExchangeBlockType; index: number};
};

type DigestConversationActionType = {
  type: CONVERSATION_REDUCER_ACTIONS.DIGEST_CONVERSATION;
  payload: ConversationType;
};

type ResetConversationActionType = {
  type: CONVERSATION_REDUCER_ACTIONS.RESET;
};

type StartRouteActionType = {
  type: CONVERSATION_REDUCER_ACTIONS.START_ROUTE;
  payload: StartRoutePayloadType;
};

type UpdateMessageActionType = {
  type: CONVERSATION_REDUCER_ACTIONS.UPDATE_MESSAGE;
  payload: {
    props: DigestedMessageProps;
    index: number;
  };
};

export type ConversationReducerConfigurationType = {
  font: SkFont;
  emojiFont: SkFont;
  width: number;
  events: GenericStateType<EventOrchestraObjectType>;
};

export type DigestConfigurationType = {
  font: SkFont;
  emojiFont: SkFont;
  width: number;
};
export type ConversationReducerActionsType =
  | AddMessageActionType
  | AddMessageFromBlockActionType
  | AddConversationActionType
  | DigestConversationActionType
  | ResetConversationActionType
  | StartRouteActionType
  | UpdateMessageActionType;
