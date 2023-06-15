import React, {FC, useContext, useState} from 'react';
import {
  ConversationType,
  DigestedConversation,
  MessagesContextTypeDigest,
  MessagesContextTypeDigested,
} from './types';
import {zola} from '../assets/messages/zola';
import {chris} from '../assets/messages/chris';
import {digestConversation as digestExchanges} from './digestConversation';
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

//defaults for empty app
export const MessagesContext = React.createContext<MessagesContextTypeDigested>(
  {},
);
const conversations = [
  zola,
  chris,
  seamless,
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

  const setDigestedConversation = (conversation: ConversationType) => {
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
      });
      _setConversation(digested);
      eventContext.events.set(`message-${digested.name}-viewed`);
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
          set: setDigestedConversation,
        },
      }}>
      {props.children}
    </MessagesContext.Provider>
  );
};

export default MessagesContextProvider;
export const MessagesContextConsumer = MessagesContext.Consumer;
