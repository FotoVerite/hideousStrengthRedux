import React, {FC, useState} from 'react';
import {
  ConversationType,
  MessagesContextTypeDigest,
  MessagesContextTypeDigested,
} from './types';
import {zola} from '../assets/messages/zara';

//defaults for empty app
export const MessagesContext = React.createContext<MessagesContextTypeDigested>(
  {},
);
const conversations = [
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
  zola,
  zola,
  zola,
  zola,
];

const MessagesContextProvider: FC<MessagesContextTypeDigest> = props => {
  const [conversation, setConversation] = useState<ConversationType>();
  const [media, setMedia] = useState<string>();

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
      }}>
      {props.children}
    </MessagesContext.Provider>
  );
};

export default MessagesContextProvider;
export const MessagesContextConsumer = MessagesContext.Consumer;
