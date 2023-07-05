import {MessageEventType} from 'components/apps/Messages/context/types';
import {APP_NAMES} from 'components/apps/types';
import {PropsWithChildren, ReactNode} from 'react';

export type EventOrchestraObjectType = MessageEventType;

export type EventOrchestraContextTypeDigest = {
  children: ReactNode;
};

export type EventOrchestraContextTypeDigested = PropsWithChildren<{
  events: {
    state: EventOrchestraObjectType;
    set: React.Dispatch<React.SetStateAction<EventOrchestraObjectType>>;
  };
}>;
