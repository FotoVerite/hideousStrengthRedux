import React, {FC, useEffect, useRef, useState} from 'react';
import {SnapShotContextTypeDigested, SnapShotContextTypeDigest} from './types';
import {SkImage, makeImageFromView} from '@shopify/react-native-skia';
import ReactNativeBlobUtil from 'react-native-blob-util';

//defaults for empty app
export const SnapShotContext = React.createContext<SnapShotContextTypeDigested>(
  {},
);

const SnapShotContextProvider: FC<SnapShotContextTypeDigest> = props => {
  const [takeSnapShot, setTakeSnapShot] = useState<string>();
  const [image, setImage] = useState<undefined | null | SkImage>();
  const snapShotRef = useRef(props.snapShotRef);

  useEffect(() => {
    const snapShot = async () => {
      if (snapShotRef.current) {
        const image = await makeImageFromView(snapShotRef.current);
        setImage(image);
      }
    };
    if (takeSnapShot) {
      snapShot().catch(console.error);
    }
  }, [snapShotRef, takeSnapShot]);

  useEffect(() => {
    const snapShot = async () => {
      if (image && takeSnapShot) {
        await ReactNativeBlobUtil.fs.writeFile(
          getSnapshotPath(takeSnapShot),
          image.encodeToBase64(),
          'base64',
        );
        setTakeSnapShot(undefined);
        setImage(undefined);
      }
    };
    if (image && takeSnapShot) {
      snapShot().catch(console.error);
    }
  }, [image, takeSnapShot]);

  return (
    <SnapShotContext.Provider
      value={{
        takeSnapShot: {state: takeSnapShot, set: setTakeSnapShot},
        image: image,
      }}>
      {props.children}
    </SnapShotContext.Provider>
  );
};

export default SnapShotContextProvider;
export const SnapShotContextConsumer = SnapShotContext.Consumer;

export const getSnapshotPath = (filename: string) => {
  const documentDir = ReactNativeBlobUtil.fs.dirs.DocumentDir;
  return `${documentDir}/Images/${filename}.png`;
};
