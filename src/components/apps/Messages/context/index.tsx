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
import {DataSourceParam, useWindowDimensions} from 'react-native';
import {ApplicationContext} from 'context';

//defaults for empty app
export const MessagesContext = React.createContext<MessagesContextTypeDigested>(
  {},
);
const conversations = [
  zola,
  chris,
  zola,
  chris,
  zola,
  zola,
  zola,
  zola,
  zola,
  zola,
  zola,
  zola,
  zola,
  zola,
  zola,
  zola,
];

const MessagesContextProvider: FC<MessagesContextTypeDigest> = props => {
  const [media, setMedia] = useState<DataSourceParam>();
  const [digestedConversation, sDc] = useState<DigestedConversation>();

  const {width, _} = useWindowDimensions();

  const applicationContext = useContext(ApplicationContext);

  const setDigestedConversation = (conversation: ConversationType) => {
    if (conversation) {
      const {exchanges, ...conversationProps} = conversation;
      const digestedExchanges = digestExchanges(
        exchanges,
        width,
        applicationContext.fonts.get('HelveticaNeue'),
      );
      const digested = Object.assign(conversationProps, {
        exchanges: digestedExchanges,
      });
      sDc(digested);
    } else {
      sDc(undefined);
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
