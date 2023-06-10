import React, {FC, useContext} from 'react';
import {TouchableOpacity, Image, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Bold, P} from 'components/common/StyledText';
import {Row} from 'components/common/layout';

import {ConversationType} from '../../context/types';
import {MessagesContext} from '../../context';
import theme from 'themes';

const ConversationListItem: FC<{conversation: ConversationType}> = ({
  conversation,
}) => {
  const context = useContext(MessagesContext);
  return (
    <TouchableOpacity
      onPress={() => {
        context.digestedConversation.set(conversation);
      }}>
      <Row>
        <Image source={conversation.heroImage} style={styles.image} />
        <View style={styles.content}>
          <Row style={styles.infoRow}>
            <Bold>{conversation.name}</Bold>
            <Row style={styles.dateRow}>
              <P style={styles.date}>{conversation.date}</P>
              <Icon name="chevron-right" color={'black'} size={24} />
            </Row>
          </Row>
          <P>{conversation.listContent}</P>
        </View>
      </Row>
    </TouchableOpacity>
  );
};

export default ConversationListItem;

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    marginRight: theme.spacing.p2,
    overflow: 'hidden',
    aspectRatio: 1,
    borderRadius: 25,
  },
  infoRow: {
    flexGrow: 0,
  },
  dateRow: {
    flexGrow: 0,
    marginLeft: 'auto',
    alignItems: 'center',
  },
  date: {},
  content: {
    flex: 1,
    alignSelf: 'center',
  },
});
