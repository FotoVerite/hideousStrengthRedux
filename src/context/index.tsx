import React, {FC, useEffect, useState} from 'react';
import {
  ApplicationContextTypeDigest,
  ApplicationContextTypeDigested,
  skFontMap,
} from './types';
import {SkFont, useFont} from '@shopify/react-native-skia';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';

//defaults for empty app
export const ApplicationContext =
  React.createContext<ApplicationContextTypeDigested>({});

const ApplicationContextProvider: FC<ApplicationContextTypeDigest> = props => {
  const [ready, setReady] = useState(false);
  const fonts: skFontMap = new Map();

  useEffect(() => {
    _loadSettings();
  });

  const _loadSettings = async () => {
    const SFProPath = require('src/assets/fonts/SFPro.ttf');
    const iconFonts: any[] = [
      MaterialCommunityIcons,
      MaterialIcons,
      EntypoIcon,
      FontAwesome,
      Feather,
    ];
    const iconFontReturn: Promise<Array<null>>[] = [];

    const SFPro = await useFont(SFProPath, 16);
    fonts.set('SFPro', SFPro);

    for (const iconFont in iconFonts) {
      iconFontReturn.push(iconFont.loadFont());
    }
    await Promise.all(iconFontReturn).then(result => {
      setTriggerMap(new Map(result as any));
      setReady(true);
    });
  };

  return (
    <ApplicationContext.Provider
      value={{
        fonts: fonts,
        ready: ready,
      }}>
      {props.children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationContextProvider;
export const ApplicationContextConsumer = ApplicationContext.Consumer;
