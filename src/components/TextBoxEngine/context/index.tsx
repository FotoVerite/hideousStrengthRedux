import React, {FC, useContext, useEffect, useState} from 'react';
import {
  TextBoxEngineContextTypeDigested,
  TextBoxEngineContextTypeDigest,
  TextBoxDialoguesType,
} from './types';
import {EventOrchestraContext} from 'components/EventOrchestra/context';
import {testScript} from '../assets/scripts/test';

//defaults for empty app
export const TextBoxEngineContext =
  React.createContext<TextBoxEngineContextTypeDigested>({});

const TextBoxEngineContextProvider: FC<
  TextBoxEngineContextTypeDigest
> = props => {
  const [dialogues, setDialogues] = useState<TextBoxDialoguesType>();

  const eventOrchestra = useContext(EventOrchestraContext);

  useEffect(() => {
    if (eventOrchestra.events.state.has('message-Zola-viewed')) {
      setDialogues(testScript);
    }
  }, [eventOrchestra.events.state]);

  return (
    <TextBoxEngineContext.Provider
      value={{
        dialogues: {state: dialogues, set: setDialogues},
      }}>
      {props.children}
    </TextBoxEngineContext.Provider>
  );
};

export default TextBoxEngineContextProvider;
export const TextBoxEngineContextConsumer = TextBoxEngineContext.Consumer;
