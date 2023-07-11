import {EventOrchestraContext} from 'components/EventOrchestra/context';
import {ApplicationContext} from 'context';
import React, {FC, useContext, useEffect, useRef, useState} from 'react';
import {useWindowDimensions} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import {
  TextOrchestrationContextTypeDigest,
  TextOrchestrationContextTypeDigested,
} from './types';
import {addToBlock, startNewBlock} from '../digestConversation';
import {DigestedConversation, ExchangeBlockType, MessageType} from '../types';
import {delayFor} from 'common';
import {MessagesContext} from '../index';
import {findAvailableRoutes} from '../routeConditions';
import {CONTACT_NAMES} from '../usersMapping';

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

  const conversationRef = useRef(digestedConversation);

  const MINIMUM_DELAY = 250;

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
    if (state.exchanges == undefined) {
      return 0;
    }
    const lastNode = state.exchanges.slice(-1)[0];
    return lastNode.offset + lastNode.height + lastNode.paddingBottom;
  };

  const startNewRoute = () => {
    addToConversation(state => {
      const newState = Object.assign({}, state);
      const timeNode = startNewBlock(
        getConversationOffset(newState),
        width,
        applicationContext.fonts.HelveticaNeue,
        applicationContext.fonts.NotoColor,
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
      if (state == null) {
        return undefined;
      }
      const newState = Object.assign({}, state);
      const messageNode = addToBlock(
        exchange,
        message,
        hasTail,
        getConversationOffset(newState),
        width,
        applicationContext.fonts.HelveticaNeue,
        applicationContext.fonts.NotoColor,
      );
      messageNode.messageDelay = messageNode.messageDelay ||=
        messageNode.name === CONTACT_NAMES.SELF ? 50 : 200;
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
    if (
      pickedRoute &&
      conversationRef.current &&
      conversationRef.current.route != null
    ) {
      eventContext.events.set(state => {
        const newState = Object.assign({}, state);
        const seenRoutes =
          newState.Message[conversationRef.current!.name]!.routes!;
        seenRoutes[conversationRef.current!.route!.id] = {
          chosen: pickedRoute,
          date: new Date(),
          position: Object.keys(seenRoutes).length + 1,
        };
        return newState;
      });
      startTheRoute();
    }
  }, [pickedRoute]);

  const sendNextText = async () => {
    const conversation = conversationRef.current;
    if (conversation == null || pickedRoute == null) {
      return;
    } else {
      setTextFinished(false);
      await delayFor(MINIMUM_DELAY);
      const {messageIndex, exchangeIndex} = routeIndexes;
      const route = conversation.route?.routes[pickedRoute]!;
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
        addToConversation(state => {
          const newState = Object.assign({}, state);
          newState.route = findAvailableRoutes(
            conversation.name,
            conversation.availableRoutes,
            eventContext.events.state,
          );
          return newState;
        });
        setRouteIndexes({exchangeIndex: 0, messageIndex: 0});
      }
    }
  };

  useEffect(() => {
    if (textFinished) {
      sendNextText();
    }
  }, [textFinished]);

  useEffect(() => {
    if (digestedConversation != null) {
      conversationRef.current = digestedConversation;
    }
  }, [digestedConversation]);

  useEffect(() => {
    setRouteIndexes({exchangeIndex: 0, messageIndex: 0});
  }, [conversationRef.current?.route]);

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
