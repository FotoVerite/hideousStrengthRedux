import React, {FC, useState} from 'react';
import {
  EventOrchestraContextTypeDigest,
  EventOrchestraContextTypeDigested,
} from './types';

//defaults for empty app
export const EventOrchestraContext =
  React.createContext<EventOrchestraContextTypeDigested>({});

const EventOrchestraContextProvider: FC<
  EventOrchestraContextTypeDigest
> = props => {
  const [events, _setEvent] = useState<Map<string, number>>(new Map());

  const setEvent = (event: string) => {
    _setEvent(state => {
      const newState = new Map(state);
      const numberOfTimes = newState.get(event);
      newState.set(event, (numberOfTimes || 0) + 1);
      return newState;
    });
  };

  return (
    <EventOrchestraContext.Provider
      value={{
        events: {state: events, set: setEvent},
      }}>
      {props.children}
    </EventOrchestraContext.Provider>
  );
};

export default EventOrchestraContextProvider;
export const EventOrchestraContextConsumer = EventOrchestraContext.Consumer;
