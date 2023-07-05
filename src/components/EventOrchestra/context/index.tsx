import React, {FC, useState} from 'react';
import {
  EventOrchestraContextTypeDigest,
  EventOrchestraContextTypeDigested,
  EventOrchestraObjectType,
} from './types';
import {APP_NAMES} from 'components/apps/types';

//defaults for empty app
export const EventOrchestraContext =
  React.createContext<EventOrchestraContextTypeDigested>({});

const EventOrchestraContextProvider: FC<
  EventOrchestraContextTypeDigest
> = props => {
  const [events, setEvent] = useState<EventOrchestraObjectType>({
    [APP_NAMES.MESSAGE]: {},
  });

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
