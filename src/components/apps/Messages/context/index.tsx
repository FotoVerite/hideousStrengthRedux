import React, {FC, useContext, useEffect, useState} from 'react';
import {
  ConversationType,
  DigestedConversation,
  ExchangeBlockType,
  MessageEventType,
  MessageRouteType,
  MessageType,
  MessagesContextTypeDigest,
  MessagesContextTypeDigested,
  RouteTriggerType,
} from './types';
import {zola} from '../assets/messages/zola';
import {chris} from '../assets/messages/chris';
import {
  addToBlock,
  digestConversation as digestExchanges,
  startNewBlock,
} from './digestConversation';
import {useWindowDimensions} from 'react-native';
import {ApplicationContext} from 'context';
import {seamless} from '../assets/messages/seamless';
import {DataSourceParam} from '@shopify/react-native-skia';
import {movieNight} from '../assets/messages/movie_night';
import {clay} from '../assets/messages/clay';
import {grace_russo} from '../assets/messages/grace_russo';
import {alice} from '../assets/messages/alice';
import {mileena} from '../assets/messages/mileena';
import {greg} from '../assets/messages/greg';
import {EventOrchestraContext} from 'components/EventOrchestra/context';
import {steveLitt} from '../assets/messages/steve_litt';
import {APP_NAMES} from 'components/apps/types';
import {CONTACT_NAMES} from './usersMapping';
import {useSharedValue} from 'react-native-reanimated';
import {delayFor} from 'common';

//defaults for empty app
export const MessagesContext = React.createContext<MessagesContextTypeDigested>(
  {},
);
const conversations = [
  zola,
  chris,
  seamless,
  steveLitt,
  movieNight,
  clay,
  mileena,
  grace_russo,
  alice,
  greg,
];

const MessagesContextProvider: FC<MessagesContextTypeDigest> = props => {
  const eventContext = useContext(EventOrchestraContext);
  const [media, setMedia] = useState<DataSourceParam>();
  const [startRoute, setStartRoute] = useState<string>();
  const [textFinished, setTextFinished] = useState<boolean>(false);
  const [routeIndexes, setRouteIndex] = useState<{
    exchangeIndex: number;
    messageIndex: number;
  }>({exchangeIndex: 0, messageIndex: 0});

  const [digestedConversation, _setConversation] =
    useState<DigestedConversation>();

  const {width, _} = useWindowDimensions();

  const applicationContext = useContext(ApplicationContext);
  const optionsHeight = useSharedValue(0);

  const setEventDefaultState = (state: any, name: CONTACT_NAMES) => {
    if (state[name]) {
      return state[name];
    } else return (state[name] = {views: [], routes: {}});
  };

  const triggersMet = (state: MessageEventType, triggers: RouteTriggerType) => {
    const messageTriggers = triggers.Message;
    if (messageTriggers == null) {
      return true;
    }
    let ret = false;
    Object.keys(messageTriggers).forEach(key => {
      const views = messageTriggers[key as CONTACT_NAMES]?.views;
      const routes = messageTriggers[key as CONTACT_NAMES]?.routes;
      if (views) {
        const stateView = messageTriggers[key as CONTACT_NAMES]?.views || 0;
        ret = ret && views >= stateView;
      }
      if (routes) {
        const stateRoutes = messageTriggers[key as CONTACT_NAMES]?.routes || {};
        ret =
          ret &&
          Object.keys(routes).reduce((acc, key) => {
            return (
              acc && stateRoutes[key] != null && stateRoutes[key] == routes[key]
            );
          }, true);
      }
    });
    return ret;
  };

  const findAvailableRoutes = (
    state: MessageEventType,
    routes?: MessageRouteType[],
  ) => {
    if (routes == null) {
      return undefined;
    } else {
      return routes.filter(
        route => route.triggers == null || triggersMet(state, route.triggers),
      )[0];
    }
  };

  const setConversationAsViewed = (name: CONTACT_NAMES) => {
    eventContext.events.set(events => {
      const newState = Object.assign({}, events);
      const views = setEventDefaultState(
        newState[APP_NAMES.MESSAGE],
        name,
      ).views;
      views.push(new Date());
      return newState;
    });
  };

  const setDigestedConversation = (conversation?: ConversationType) => {
    if (conversation) {
      const {exchanges, routes, ...conversationProps} = conversation;
      const digestedExchanges = digestExchanges(
        exchanges,
        conversationProps.group,
        width,
        applicationContext.fonts.get('HelveticaNeue'),
        applicationContext.fonts.get('NotoColor'),
      );
      const digested = Object.assign(conversationProps, {
        exchanges: digestedExchanges,
        route: findAvailableRoutes(eventContext.events.state, routes),
      });
      _setConversation(digested);
      setConversationAsViewed(digested.name);
    } else {
      _setConversation(undefined);
    }
  };

  const startNewRoute = () => {
    _setConversation(state => {
      const newState = Object.assign({}, state);
      const lastNode = newState.exchanges[newState.exchanges.length - 1];
      const offset = lastNode.offset + lastNode.height;
      const timeNode = startNewBlock(
        offset,
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
    _setConversation(state => {
      const newState = Object.assign({}, state);
      const lastNode = newState.exchanges[newState.exchanges.length - 1];
      const offset = lastNode.offset + lastNode.height + lastNode.paddingBottom;
      const messageNode = addToBlock(
        exchange,
        message,
        hasTail,
        offset,
        width,
        applicationContext.fonts.get('HelveticaNeue'),
        applicationContext.fonts.get('NotoColor'),
      );
      messageNode.delay = 50;
      newState.exchanges = [...newState.exchanges, messageNode];
      return newState;
    });
  };

  useEffect(() => {
    const startTheRoute = async () => {
      if (digestedConversation == null || startRoute == null) {
        return;
      }
      startNewRoute();
      await delayFor(500);
      const route = digestedConversation.route?.routes[startRoute]!;
      const exchange = route[routeIndexes.exchangeIndex];
      textContact(
        exchange,
        exchange.messages[routeIndexes.messageIndex],
        exchange.messages[routeIndexes.messageIndex + 1] == null,
      );
      setRouteIndex(indexes =>
        exchange.messages[indexes.messageIndex + 1] != null
          ? {
              exchangeIndex: indexes.exchangeIndex,
              messageIndex: indexes.messageIndex + 1,
            }
          : {
              exchangeIndex: indexes.exchangeIndex + 1,
              messageIndex: 0,
            },
      );
    };

    if (startRoute) {
      startTheRoute();
    }
  }, [startRoute]);

  useEffect(() => {
    const sendNextText = async () => {
      if (digestedConversation == null || startRoute == null) {
        return;
      }
      setTextFinished(false);
      await delayFor(500);
      const lastNode =
        digestedConversation.exchanges[
          digestedConversation.exchanges.length - 1
        ];
      const route = digestedConversation.route?.routes[startRoute]!;
      const exchange = route[routeIndexes.exchangeIndex];
      if (exchange != null) {
        textContact(
          exchange,
          exchange.messages[routeIndexes.messageIndex],
          exchange.messages[routeIndexes.messageIndex + 1] == null,
        );
        setRouteIndex(indexes =>
          exchange.messages[indexes.messageIndex + 1] != null
            ? {
                exchangeIndex: indexes.exchangeIndex,
                messageIndex: indexes.messageIndex + 1,
              }
            : {
                exchangeIndex: indexes.exchangeIndex + 1,
                messageIndex: 0,
              },
        );
      } else {
        setStartRoute(undefined);
        setRouteIndex({exchangeIndex: 0, messageIndex: 0});
      }
    };

    if (textFinished) {
      sendNextText();
    }
  }, [textFinished]);

  const addToConversation = (conversation?: ExchangeBlockType) => {};

  return (
    <MessagesContext.Provider
      value={{
        conversations: conversations,
        media: {
          state: media,
          set: setMedia,
        },
        digestedConversation: {
          state: digestedConversation,
          set: setDigestedConversation,
        },
        sharedValues: {
          optionsHeight: optionsHeight,
        },
        startRoute: setStartRoute,
        textFinished: setTextFinished,
      }}>
      {props.children}
    </MessagesContext.Provider>
  );
};

export default MessagesContextProvider;
export const MessagesContextConsumer = MessagesContext.Consumer;
