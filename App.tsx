/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React, {useRef} from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import Messages from 'components/apps/Messages';
import ApplicationContextProvider from 'context';
import {skFontMap} from 'context/types';
import {useFont} from '@shopify/react-native-skia';
import TextBoxEngine from 'components/TextBoxEngine';
import TextBoxEngineContextProvider from 'components/TextBoxEngine/context';
import {View} from 'react-native';
import EventOrchestraContextProvider from 'components/EventOrchestra/context';

function App(): JSX.Element {
  const fonts: skFontMap = new Map();

  const SFPro = useFont(require('@applicationAssets/fonts/SFPro.ttf'), 16);
  const NotoColor = useFont(
    require('@applicationAssets/fonts/NotoColorEmoji.ttf'),
    16,
  );
  const HelveticaNeue = useFont(
    require('@applicationAssets/fonts/HelveticaNeue.ttf'),
    16,
  );
  const screenRef = useRef<View>(null);

  if (!SFPro || !NotoColor || !HelveticaNeue) {
    return <></>;
  } else {
    fonts.set('SFPro', SFPro);

    fonts.set('NotoColor', NotoColor);

    fonts.set('HelveticaNeue', HelveticaNeue);

    return (
      <SafeAreaProvider>
        <ApplicationContextProvider fonts={fonts}>
          <EventOrchestraContextProvider>
            <TextBoxEngineContextProvider>
              <NavigationContainer>
                <View ref={screenRef} style={{flex: 1}}>
                  <Messages />
                </View>
              </NavigationContainer>
              <TextBoxEngine screenRef={screenRef} />
            </TextBoxEngineContextProvider>
          </EventOrchestraContextProvider>
        </ApplicationContextProvider>
      </SafeAreaProvider>
    );
  }
}

export default App;
