import {PropsWithChildren, ReactNode} from 'react';
import {APP_NAMES} from 'components/apps/types';
import {ExchangeBlockType} from '../types';
import {CONTACT_NAMES} from '../usersMapping';
import {SharedValue} from 'react-native-reanimated';
import {GenericOrUndefinedStateType} from 'types/genericContextTypes';

export type TextOrchestrationContextTypeDigest = {
  children: ReactNode;
};

export type TextOrchestrationContextTypeDigested = PropsWithChildren<{
  sharedValues: {
    optionsHeight: SharedValue<number>;
  };
  pickRoute: React.Dispatch<React.SetStateAction<string | undefined>>;
  textIsFinished: React.Dispatch<React.SetStateAction<boolean>>;
  scrollTo: GenericOrUndefinedStateType<number>;
}>;

export type MessageEventType = {
  [APP_NAMES.MESSAGE]: MessageRouteEventType;
};

export type MessageRouteEventType = {
  [key in CONTACT_NAMES]?: {
    views: [Date];
    routes?: {
      [routeId: string]: {date: Date; chosen: string; position: number};
    };
  };
};
