import React, {FC, useContext, useState} from 'react';
import {
  ConversationType,
  MessagesContextTypeDigest,
  MessagesContextTypeDigested,
} from './types';
import {zola} from '../assets/messages/zola';
import {chris} from '../assets/messages/chris';
import {
  DigestedConversationStringItemType,
  DigestedConversationTimeType,
  digestConversation,
} from './digestConversation';
import {useWindowDimensions} from 'react-native';
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
  const [conversation, setConversation] = useState<ConversationType>();
  const [media, setMedia] = useState<string>();
  const [digestedConversation, sDc] =
    useState<
      (DigestedConversationStringItemType | DigestedConversationTimeType)[]
    >();

  const {width, height} = useWindowDimensions();

  const c = useContext(ApplicationContext);

  const setDigestedConversation = (toDigest: ConversationType) => {
    if (toDigest) {
      sDc(
        digestConversation(
          toDigest.exchanges,
          width,
          c.fonts.get('HelveticaNeue'),
        ),
      );
    } else {
      sDc(undefined);
    }
  };

  return (
    <MessagesContext.Provider
      value={{
        conversations: conversations,
        conversation: {
          state: conversation,
          set: setConversation,
        },
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
