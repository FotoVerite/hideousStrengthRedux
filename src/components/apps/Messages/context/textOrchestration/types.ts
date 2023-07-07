import {PropsWithChildren, ReactNode} from 'react';
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
