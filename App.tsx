/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import Hex from 'components/apps/hexGame';
import React, {useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {games} from 'components/apps/hexGame/assets/games';
import Messages from 'components/apps/Messages';

function App(): JSX.Element {
  useEffect(() => {
    MaterialCommunityIcons.loadFont();
    MaterialIcons.loadFont();
    EntypoIcon.loadFont();
    FontAwesome.loadFont();
    Feather.loadFont();
  }, []);

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
