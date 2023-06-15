import {PropsWithChildren, ReactNode} from 'react';

export type EventOrchestraContextTypeDigest = {
  children: ReactNode;
};

export type EventOrchestraContextTypeDigested = PropsWithChildren<{
  events: {state: Map<string, number>; set: (event: string) => void};
}>;
