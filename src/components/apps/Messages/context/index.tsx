import React, {FC, useContext, useState} from 'react';
import {
  ConversationExchangeType,
  ConversationType,
  DigestedConversation,
  ExchangeBlockType,
  MessageRouteType,
  MessagesContextTypeDigest,
  MessagesContextTypeDigested,
} from './types';
import {zola} from '../assets/messages/zola';
import {chris} from '../assets/messages/chris';
import {
  TIME_OPTIONS,
  digestConversation as digestExchanges,
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
import {findAvailableRoutes} from './routeConditions';
import {
  MessageRouteEventDataType,
  MessageRouteEventType,
} from 'components/EventOrchestra/context/types';

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

  const [digestedConversation, _setConversation] =
    useState<DigestedConversation>();

  const {width, _} = useWindowDimensions();

  const applicationContext = useContext(ApplicationContext);

  const setEventDefaultState = (state: any, name: CONTACT_NAMES) => {
    if (state[name]) {
      return state[name];
    } else return (state[name] = {views: [], routes: {}});
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

  const createBlockFromSeenRoute = (
    digested: DigestedConversation,
    routeId: string,
    data: MessageRouteEventDataType,
    availableRoutes: {[index: string]: {[key: string]: ExchangeBlockType[]}},
  ) => {
    const lastNode = digested.exchanges[digested.exchanges.length - 1];
    const offset = lastNode.offset + lastNode.height + lastNode.paddingBottom;
    const conversationBlock: ConversationExchangeType = {
      time: data.date.toLocaleDateString('en-US', TIME_OPTIONS as any),
      exchanges: availableRoutes[routeId][data.chosen],
    };
    digested.exchanges = digested.exchanges.concat(
      digestExchanges(
        [conversationBlock],
        digested.group,
        width,
        applicationContext.fonts.get('HelveticaNeue'),
        applicationContext.fonts.get('NotoColor'),
        offset,
      ),
    );
  };

  const appendSeenRoutes = (digested: DigestedConversation) => {
    if (digested.availableRoutes == null) {
      return;
    }
    const routes: {[index: string]: {[key: string]: ExchangeBlockType[]}} = {};
    const seenRoutes =
      eventContext.events.state.Message[digested.name]?.routes || {};
    digested.availableRoutes.forEach(
      route => (routes[route.id] = route.routes),
    );
    Object.keys(seenRoutes).forEach(routeId =>
      createBlockFromSeenRoute(digested, routeId, seenRoutes[routeId], routes),
    );
  };

  const setDigestedConversation = (conversation?: ConversationType) => {
    if (conversation) {
      const {exchanges, ...conversationProps} = conversation;
      const digestedExchanges = digestExchanges(
        exchanges,
        conversationProps.group,
        width,
        applicationContext.fonts.get('HelveticaNeue'),
        applicationContext.fonts.get('NotoColor'),
      );
      const digested = Object.assign(conversationProps, {
        exchanges: digestedExchanges,
        availableRoutes: conversation.routes || [],
        route: findAvailableRoutes(
          conversation.name,
          conversation.routes || [],
          eventContext.events.state,
        ),
      });
      appendSeenRoutes(digested);
      _setConversation(digested);
      setConversationAsViewed(digested.name);
    } else {
      _setConversation(undefined);
    }
  };

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
          digest: setDigestedConversation,
          set: _setConversation,
        },
      }}>
      {props.children}
    </MessagesContext.Provider>
  );
};

export default MessagesContextProvider;
export const MessagesContextConsumer = MessagesContext.Consumer;
