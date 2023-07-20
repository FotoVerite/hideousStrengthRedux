import {EventOrchestraContext} from 'components/EventOrchestra/context';
import React, {FC, useCallback, useContext, useEffect, useState} from 'react';
import {useSharedValue} from 'react-native-reanimated';
import {
  PathType,
  RoutePathType,
  TextOrchestrationContextTypeDigest,
  TextOrchestrationContextTypeDigested,
  TransformedRouteType,
} from './types';
import {MessageRouteType} from '../types';
import {MessagesContext} from '../index';
import {findAvailableRoutes} from '../routeConditions';
import {
  AddMessagePayloadType,
  CONVERSATION_REDUCER_ACTIONS,
  StartRoutePayloadType,
} from '../../reducers/conversationReducer/types';
import {CONTACT_NAMES} from '../usersMapping';

export const TextOrchestrationContext =
  React.createContext<TextOrchestrationContextTypeDigested>({});

const TextOrchestrationContextProvider: FC<
  TextOrchestrationContextTypeDigest
> = props => {
  const eventContext = useContext(EventOrchestraContext);
  const messageContext = useContext(MessagesContext);

  const [chosenOption, setChosenOption] = useState<string>();
  const [path, setPath] = useState<PathType>();
  const [route, setRoute] = useState<TransformedRouteType>();
  const [scrollTo, setScrollTo] = useState<number>();
  const optionsHeight = useSharedValue(0);

  const conversation = messageContext.conversation.state;

  const dispatchConversation = messageContext.conversation.dispatch;

  const findAvailableRoute = useCallback(() => {
    if (conversation == null) {
      return;
    }
    const availableRoutes = findAvailableRoutes(
      conversation.name,
      conversation.routes,
      eventContext.events.state,
    );
    if (availableRoutes.length > 0) {
      setRoute(translateRoute(availableRoutes[0]));
    } else {
      setRoute(undefined);
    }
  }, [conversation, eventContext.events.state]);

  const translateRoute = (_route: MessageRouteType) => {
    const paths: RoutePathType = {};
    for (const choice in _route.routes) {
      paths[choice] = _route.routes[choice].reduce((acc, block) => {
        for (const [index, message] of block.messages.entries()) {
          const tail = block.messages.length - 1 === index;
          acc.push({name: block.name, messageContent: message, tail: tail});
        }
        return acc;
      }, [] as AddMessagePayloadType[]);
    }
    const translated: TransformedRouteType = {
      id: _route.id,
      options: _route.options,
      paths: paths,
    };
    return translated;
  };

  useEffect(() => {
    if (conversation == null) {
      setChosenOption(undefined);
      setPath(undefined);
    }
  }, [conversation]);

  useEffect(() => {
    findAvailableRoute();
  }, [conversation?.routes]);

  useEffect(() => {
    if (conversation && chosenOption && route) {
      startRoute({
        name: conversation.name,
        id: route.id,
        chosen: chosenOption,
      });
    }
  }, [chosenOption]);

  useEffect(() => {
    if (path && !isNaN(path.cursor) && path.cursor < path.messages.length) {
      dispatchConversation({
        type: CONVERSATION_REDUCER_ACTIONS.ADD_MESSAGE,
        payload: path.messages[path.cursor],
      });
    } else {
      setChosenOption(undefined);
      findAvailableRoute();
      setPath(undefined);
    }
  }, [path]);

  const startRoute = async (payload: StartRoutePayloadType) => {
    dispatchConversation({
      type: CONVERSATION_REDUCER_ACTIONS.START_ROUTE,
      payload: payload,
    });
  };

  const showNextMessage = () => {
    if (path && route) {
      setPath(state => {
        const newState = Object.assign({}, state);
        newState.cursor += 1;
        return newState;
      });
    } else if (conversation && chosenOption && route) {
      setPathAsSeen(conversation.name, route.id, chosenOption);
      setPath({cursor: 0, messages: route.paths[chosenOption]});
    } else {
      setPath(undefined);
    }
  };

  const setPathAsSeen = (name: CONTACT_NAMES, id: number, chosen: string) => {
    eventContext.events.set(state => {
      const newState = Object.assign({}, state);
      const seenRoutes = newState.Message[name].routes;
      seenRoutes[id] = {
        chosen: chosen.toString(),
        date: new Date(),
        position: Object.keys(seenRoutes).length + 1,
      };
      return newState;
    });
  };

  return (
    <TextOrchestrationContext.Provider
      value={{
        sharedValues: {
          optionsHeight: optionsHeight,
        },
        route: route,
        pickRoute: setChosenOption,
        hasActiveRoute: chosenOption,
        showNextMessage: showNextMessage,
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
