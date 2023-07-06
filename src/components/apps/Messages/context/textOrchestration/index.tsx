import {EventOrchestraContext} from 'components/EventOrchestra/context';
import {ApplicationContext} from 'context';
import React, {FC, useContext, useEffect, useState} from 'react';
import {useWindowDimensions} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import {
  TextOrchestrationContextTypeDigest,
  TextOrchestrationContextTypeDigested,
} from './types';
import {addToBlock, startNewBlock} from '../digestConversation';
import {
  ConversationExchangeType,
  DigestedConversation,
  ExchangeBlockType,
  MessageType,
} from '../types';
import {delayFor} from 'common';
import {MessagesContext} from '../index';

//defaults for empty app
export const TextOrchestrationContext =
  React.createContext<TextOrchestrationContextTypeDigested>({});

const TextOrchestrationContextProvider: FC<
  TextOrchestrationContextTypeDigest
> = props => {
  const applicationContext = useContext(ApplicationContext);
  const eventContext = useContext(EventOrchestraContext);
  const messageContext = useContext(MessagesContext);

  const [pickedRoute, setPickedRoute] = useState<string>();
  const [textFinished, setTextFinished] = useState<boolean>(false);
  const [routeIndexes, setRouteIndexes] = useState<{
    exchangeIndex: number;
    messageIndex: number;
  }>({exchangeIndex: 0, messageIndex: 0});

  const optionsHeight = useSharedValue(0);
  const [scrollTo, setScrollTo] = useState<number>();

  const digestedConversation = messageContext.digestedConversation.state;
  const addToConversation = messageContext.digestedConversation.set;

  const {width, _} = useWindowDimensions();

  const MINIMUM_DELAY = 500;

  const incrementRouteIndexes = (exchange: ExchangeBlockType) => {
    setRouteIndexes(indexes => {
      const {exchangeIndex, messageIndex} = indexes;
      if (exchange.messages[messageIndex + 1] != null)
        return {
          exchangeIndex: exchangeIndex,
          messageIndex: messageIndex + 1,
        };
      else
        return {
          exchangeIndex: exchangeIndex + 1,
          messageIndex: 0,
        };
    });
  };

  const getConversationOffset = (state: DigestedConversation) => {
    const lastNode = state.exchanges[state.exchanges.length - 1];
    return lastNode.offset + lastNode.height + lastNode.paddingBottom;
  };

  const startNewRoute = () => {
    addToConversation(state => {
      const newState = Object.assign({}, state);
      const timeNode = startNewBlock(
        getConversationOffset(newState),
        width,
        applicationContext.fonts.get('HelveticaNeue'),
        applicationContext.fonts.get('NotoColor'),
      );
      newState.exchanges = [...newState.exchanges, timeNode];
      return newState;
    });
  };

  const textContact = (
    exchange: ExchangeBlockType,
    message: MessageType,
    hasTail: boolean,
  ) => {
    addToConversation(state => {
      const newState = Object.assign({}, state);
      const messageNode = addToBlock(
        exchange,
        message,
        hasTail,
        getConversationOffset(newState),
        width,
        applicationContext.fonts.get('HelveticaNeue'),
        applicationContext.fonts.get('NotoColor'),
      );
      messageNode.delay = 50;
      newState.exchanges = [...newState.exchanges, messageNode];
      return newState;
    });
  };

  const startTheRoute = async () => {
    startNewRoute();
    await delayFor(MINIMUM_DELAY);
    setTextFinished(true);
  };

  useEffect(() => {
    if (pickedRoute) {
      startTheRoute();
    }
  }, [pickedRoute]);

  const sendNextText = async () => {
    if (digestedConversation == null || pickedRoute == null) {
      return;
    } else {
      setTextFinished(false);
      await delayFor(MINIMUM_DELAY);
      const {messageIndex, exchangeIndex} = routeIndexes;
      const route = digestedConversation.route?.routes[pickedRoute]!;
      const exchange = route[exchangeIndex];
      if (exchange != null) {
        textContact(
          exchange,
          exchange.messages[messageIndex],
          exchange.messages[messageIndex + 1] == null,
        );
        incrementRouteIndexes(exchange);
      } else {
        setPickedRoute(undefined);
        setRouteIndexes({exchangeIndex: 0, messageIndex: 0});
      }
    }
  };

  useEffect(() => {
    if (textFinished) {
      sendNextText();
    }
  }, [textFinished]);

  return (
    <TextOrchestrationContext.Provider
      value={{
        sharedValues: {
          optionsHeight: optionsHeight,
        },
        pickRoute: setPickedRoute,
        textIsFinished: setTextFinished,
        scrollTo: {
          state: scrollTo,
          set: setScrollTo,
        },
      }}>
      {props.children}
    </TextOrchestrationContext.Provider>
  );
};

export default TextOrchestrationContextProvider;
export const TextOrchestrationContextConsumer =
  TextOrchestrationContext.Consumer;
