import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import MessagesContextProvider from './context';
import Conversations from './Conversations/List';
import Header from './Header';
import Conversation from './Conversations/Show';
import ConversationHeader from './Header/ConversationHeader';
import MediaView from './Conversations/Show/MediaViewer';

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
  },
});
