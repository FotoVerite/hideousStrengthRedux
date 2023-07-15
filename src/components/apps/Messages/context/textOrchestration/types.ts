import {PropsWithChildren, ReactNode} from 'react';
import {SharedValue} from 'react-native-reanimated';
import {GenericOrUndefinedStateType} from 'types/genericContextTypes';
import {MessageType} from '../types';
import {CONTACT_NAMES} from '../usersMapping';
import {AddMessagePayloadType} from '../../reducers/conversationReducer/types';

export type RoutePathType = {[key: string]: AddMessagePayloadType[]};
export type PathType = {messages: AddMessagePayloadType[]; cursor: number};

export type TransformedRouteType = {
  id: number;
  options: string[];
  paths: RoutePathType;
};

export type TextOrchestrationContextTypeDigest = {
  children: ReactNode;
};

export type TextOrchestrationContextTypeDigested = PropsWithChildren<{
  sharedValues: {
    optionsHeight: SharedValue<number>;
  };
  pickRoute: React.Dispatch<React.SetStateAction<string | undefined>>;
  route: TransformedRouteType | undefined;
  showNextMessage: () => void;
  scrollTo: GenericOrUndefinedStateType<number>;
}>;
