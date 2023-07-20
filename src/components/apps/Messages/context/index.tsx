import React, {
  FC,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import {MessagesContextTypeDigest, MessagesContextTypeDigested} from './types';
import {zola} from '../assets/messages/zola';
import {chris} from '../assets/messages/chris';
import {useWindowDimensions} from 'react-native';
import {ApplicationContext} from 'context';
import {seamless} from '../assets/messages/seamless';
import {movieNight} from '../assets/messages/movie_night';
import {clay} from '../assets/messages/clay';
import {grace_russo} from '../assets/messages/grace_russo';
import {alice} from '../assets/messages/alice';
import {mileena} from '../assets/messages/mileena';
import {greg} from '../assets/messages/greg';
import {EventOrchestraContext} from 'components/EventOrchestra/context';
import {steveLitt} from '../assets/messages/steve_litt';
import createConversationReducer from '../reducers/conversationReducer';
import {
  CONVERSATION_REDUCER_ACTIONS,
  ConversationReducerActionsType,
} from '../reducers/conversationReducer/types';
import {digestConversation} from '../reducers/conversationReducer/digestion';
import {CONTACT_NAMES} from './usersMapping';

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
  const applicationContext = useContext(ApplicationContext);
  const eventContext = useContext(EventOrchestraContext);
  const setTheEvent = eventContext.events.set;

  const setViewEvent = useCallback(
    (name: CONTACT_NAMES) =>
      setTheEvent(events => {
        const newState = Object.assign({}, events);
        const views = newState.Message[name].views;
        views.push(new Date());
        return newState;
      }),
    [setTheEvent],
  );

  const [media, setMedia] = useState<ReactElement>();

  const {width, _} = useWindowDimensions();
  const config = {
    font: applicationContext.fonts.HelveticaNeue,
    emojiFont: applicationContext.fonts.NotoColor,
    width: width,
    events: eventContext.events,
  };
  const [conversation, dispatchConversation] = useReducer(
    createConversationReducer(config),
    undefined,
  );

  const reducerResolver = async (action: ConversationReducerActionsType) => {
    if (action.type === CONVERSATION_REDUCER_ACTIONS.DIGEST_CONVERSATION) {
      const digested = await digestConversation(config, action.payload);

      dispatchConversation({
        type: CONVERSATION_REDUCER_ACTIONS.ADD_CONVERSATION,
        payload: digested,
      });
    } else {
      dispatchConversation(action);
    }
  };

  useEffect(() => {
    if (conversation?.name != null) {
      setViewEvent(conversation.name);
    }
  }, [conversation?.name, setViewEvent]);

  return (
    <MessagesContext.Provider
      value={{
        conversations: conversations,
        media: {
          state: media,
          set: setMedia,
        },
        conversation: {
          state: conversation,
          dispatch: reducerResolver,
        },
      }}>
      {props.children}
    </MessagesContext.Provider>
  );
};

export default MessagesContextProvider;
export const MessagesContextConsumer = MessagesContext.Consumer;
