import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import MessagesContextProvider from './context';
import Conversations from './Conversations/List';
import Header from './Header';
import ConversationHeader from './Header/ConversationHeader';
import MediaView from './Conversations/Show/MediaViewer';
import Conversation from './Conversations/Show';

const Messages: FC = () => {
  const insets = useSafeAreaInsets();
  return (
    <MessagesContextProvider>
      <View
        style={[
          styles.layout,
          {marginTop: insets.top, marginBottom: insets.bottom},
        ]}>
        <Header />
        <Conversations />
        <Conversation />
        <ConversationHeader />
        <MediaView />
      </View>
    </MessagesContextProvider>
  );
};

export default Messages;

const styles = StyleSheet.create({
  layout: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
});
