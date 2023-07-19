import {
  DigestedConversationType,
  ExchangeBlockType,
} from '../../context/types';
import {
  AddMessagePayloadType,
  CONVERSATION_REDUCER_ACTIONS,
  ConversationReducerActionsType,
  ConversationReducerConfigurationType,
  DigestedMessageProps,
  StartRoutePayloadType,
} from './types';
import {
  createSkBubbleFromExchange,
  createSkBubbleFromMessage,
  getListHeight,
} from './digestion';
import {createTimeItem} from './digestion/TimeItem';

const createConversationReducer =
  (config: ConversationReducerConfigurationType) =>
  (
    state: DigestedConversationType | undefined,
    action: ConversationReducerActionsType,
  ) =>
    conversationReducer(state, action, config);

const conversationReducer = (
  state: DigestedConversationType | undefined,
  action: ConversationReducerActionsType,
  config: ConversationReducerConfigurationType,
) => {
  switch (action.type) {
    case CONVERSATION_REDUCER_ACTIONS.START_ROUTE:
      return startRoute(config, state, action.payload);
    case CONVERSATION_REDUCER_ACTIONS.ADD_CONVERSATION:
      return addConversation(config, action.payload);
    case CONVERSATION_REDUCER_ACTIONS.ADD_MESSAGE_FROM_BLOCK:
      return addMessageFromBlock(
        config,
        state,
        action.payload.block,
        action.payload.index,
      );
    case CONVERSATION_REDUCER_ACTIONS.ADD_MESSAGE:
      return addMessage(config, state, action.payload);
    case CONVERSATION_REDUCER_ACTIONS.UPDATE_MESSAGE:
      return updateMessage(state, action.payload.props, action.payload.index);
    case CONVERSATION_REDUCER_ACTIONS.RESET:
      return undefined;
    default:
      return state;
  }
};

const startRoute = (
  config: ConversationReducerConfigurationType,
  state: DigestedConversationType | undefined,
  payload: StartRoutePayloadType,
) => {
  if (state == null) {
    return state;
  }
  const newState = Object.assign({}, state);
  const offset = getListHeight(newState.exchanges);

  const timeItem = createTimeItem(
    {
      time: new Date().toISOString(),
      exchanges: [],
    },
    config.width,
    offset,
  );
  timeItem.messageDelay = 10;
  newState.exchanges = [...newState.exchanges, timeItem];
  return newState;
};

const addConversation = (
  config: ConversationReducerConfigurationType,
  conversation: DigestedConversationType,
) => {
  return conversation;
};

const addMessageFromBlock = (
  config: ConversationReducerConfigurationType,
  state: DigestedConversationType | undefined,
  block: ExchangeBlockType,
  index: number,
) => {
  if (state == null) {
    return state;
  }
  const newState = Object.assign({}, state);
  const offset = getListHeight(newState.exchanges);
  const itemConfiguration = Object.assign(config, {
    group: newState.group || false,
    positionAcc: offset,
  });
  const message = createSkBubbleFromExchange(itemConfiguration, block, index);
  message.messageDelay = message.messageDelay ||= 400;
  newState.exchanges.push(message);
  return newState;
};

const addMessage = (
  config: ConversationReducerConfigurationType,
  state: DigestedConversationType | undefined,
  payload: AddMessagePayloadType,
) => {
  if (state == null) {
    return state;
  }
  const {name, messageContent, tail} = payload;
  const newState = Object.assign({}, state);
  const offset = getListHeight(newState.exchanges);
  const itemConfiguration = Object.assign(config, {
    group: newState.group || false,
    positionAcc: offset,
  });
  const message = createSkBubbleFromMessage(
    itemConfiguration,
    messageContent,
    name,
    tail,
  );
  message.messageDelay = message.messageDelay ||= 400;
  newState.exchanges.push(message);
  return newState;
};

const updateMessage = (
  state: DigestedConversationType | undefined,
  props: DigestedMessageProps,
  index: number,
) => {
  if (state == null) {
    return state;
  }
  const newState = Object.assign({}, state);
  newState.exchanges[index] = Object.assign(
    {},
    newState.exchanges[index],
    props,
  );
  return newState;
};

export default createConversationReducer;
