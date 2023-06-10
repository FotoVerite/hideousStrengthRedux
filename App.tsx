/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {games} from 'components/apps/hexGame/assets/games';
import Messages from 'components/apps/Messages';
import ApplicationContextProvider from 'context';
import {skFontMap} from 'context/types';
import {useFont} from '@shopify/react-native-skia';

function App(): JSX.Element {
  const game = games.firstGame;
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
  if (!SFPro || !NotoColor || !HelveticaNeue) {
    return <></>;
  } else {
    fonts.set('SFPro', SFPro);

    fonts.set('NotoColor', NotoColor);

    fonts.set('HelveticaNeue', HelveticaNeue);

    return (
      <SafeAreaProvider>
        <ApplicationContextProvider fonts={fonts}>
          <NavigationContainer>
            <Messages />
          </NavigationContainer>
        </ApplicationContextProvider>
      </SafeAreaProvider>
    );
  }
}

export default App;
