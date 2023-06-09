/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React, {useRef} from 'react';

import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Messages from 'components/apps/Messages';
import ApplicationContextProvider from 'context';
import {skFontRecords} from 'context/types';
import {useFont} from '@shopify/react-native-skia';
import TextBoxEngine from 'components/TextBoxEngine';
import TextBoxEngineContextProvider from 'components/TextBoxEngine/context';
import {View} from 'react-native';
import EventOrchestraContextProvider from 'components/EventOrchestra/context';
import SnapShotContextProvider from 'components/Snapshot/context';
import SnapshotView from 'components/Snapshot';

function App(): JSX.Element {
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
    const skFontRecord: skFontRecords = {
      ['SFPro']: SFPro,
      ['NotoColor']: NotoColor,
      ['HelveticaNeue']: HelveticaNeue,
    };

    return (
      <SafeAreaProvider>
        <ApplicationContextProvider fonts={skFontRecord}>
          <EventOrchestraContextProvider>
            <TextBoxEngineContextProvider>
              <NavigationContainer>
                <SnapShotContextProvider snapShotRef={screenRef}>
                  <SnapshotView snapshotRef={screenRef}>
                    <Messages />
                  </SnapshotView>
                </SnapShotContextProvider>
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
