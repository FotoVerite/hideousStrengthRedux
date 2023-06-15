import React from 'react';
import {SkImage, makeImageFromView} from '@shopify/react-native-skia';
import {FC, useContext, useEffect, useState} from 'react';
import {TextBoxEngineContext} from './context';
import Screen from './Screen';
import {delayFor} from 'common';
import {StyleSheet, View} from 'react-native';

const TextBoxEngine: FC<{screenRef: any}> = ({screenRef}) => {
  const [background, setBackground] = useState<SkImage | null>(null);
  const textBoxEngineContext = useContext(TextBoxEngineContext);
  const configuration =
    textBoxEngineContext.dialogues.state?.screenConfiguration;

  useEffect(() => {
    const takeSnapShot = async () => {
      if (screenRef.current && textBoxEngineContext.dialogues.state != null) {
        if (configuration?.fadeInDelay) {
          await delayFor(configuration?.fadeInDelay);
        }
        const image = await makeImageFromView(screenRef);
        setBackground(image);
      }
    };
    takeSnapShot().catch(console.error);
  }, [
    configuration?.fadeInDelay,
    screenRef,
    textBoxEngineContext.dialogues.state,
  ]);

  if (!textBoxEngineContext.dialogues.state && !background) {
    return null;
  } else if (textBoxEngineContext.dialogues.state && !background) {
    return <View style={styles.protector}></View>;
  } else {
    return <Screen background={background} />;
  }
};

export default TextBoxEngine;

const styles = StyleSheet.create({
  protector: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 100,
  },
});
