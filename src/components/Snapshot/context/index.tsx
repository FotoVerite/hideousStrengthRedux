import React, {FC, useRef, useState} from 'react';
import {SnapShotContextTypeDigested, SnapShotContextTypeDigest} from './types';

//defaults for empty app
export const SnapShotContext = React.createContext<SnapShotContextTypeDigested>(
  {},
);

const SnapShotContextProvider: FC<SnapShotContextTypeDigest> = props => {
  const [takeSnapShot, setTakeSnapShot] = useState(false);
  const snapShotRef = useRef(props.snapShotRef);

  return (
    <SnapShotContext.Provider
      value={{
        takeSnapShot: {state: takeSnapShot, set: setTakeSnapShot},
      }}>
      {props.children}
    </SnapShotContext.Provider>
  );
};

export default SnapShotContextProvider;
export const SnapShotContextConsumer = SnapShotContext.Consumer;
