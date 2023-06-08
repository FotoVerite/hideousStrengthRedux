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

function App(): JSX.Element {
  const game = games.firstGame;
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Messages />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
