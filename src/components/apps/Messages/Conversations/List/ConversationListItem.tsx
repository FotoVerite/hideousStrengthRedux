import React, {FC, useContext, useMemo} from 'react';
import {TouchableOpacity, Image, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Bold, P} from 'components/common/StyledText';
import {Row} from 'components/common/layout';

import {
  ConversationType,
  ExchangeBlockType,
  MessageWithMetaType,
} from '../../context/types';
import {MessagesContext} from '../../context';
import theme from 'themes';
import {MessageRouteEventDataType} from 'components/EventOrchestra/context/types';
import moment from 'moment';
import {
  RouteObjectType,
  getLastSeenRoute,
  isMessageWithMeta,
} from '../../context/utility';
import {EventOrchestraContext} from 'components/EventOrchestra/context';
import {formatMoment} from 'common';
import {DigestedItemTypes} from '../../context/digestConversation/types';

const ConversationListItem: FC<{conversation: ConversationType}> = ({
  conversation,
}) => {
  const context = useContext(MessagesContext);
  const eventContext = useContext(EventOrchestraContext);

  const logLine = useMemo(
    () =>
      determineLogLine(
        conversation,
        getLastSeenRoute(
          conversation.name,
          eventContext.events.state,
          conversation.routes,
        ),
      ),
    [conversation, eventContext.events.state],
  );
  return (
    <TouchableOpacity
      onPress={() => {
        context.digestedConversation.digest(conversation);
      }}>
      <Row>
        <Image source={conversation.heroImage} style={styles.image} />
        <View style={styles.content}>
          <Row style={styles.infoRow}>
            <Bold>{conversation.name}</Bold>
            <Row style={styles.dateRow}>
              <P style={styles.date}>{logLine.time}</P>
              <Icon name="chevron-right" color={'black'} size={24} />
            </Row>
          </Row>
          <P>{logLine.content}</P>
        </View>
      </Row>
    </TouchableOpacity>
  );
};

export default ConversationListItem;

const determineLogLine = (
  conversation: ConversationType,
  routeEvent?: RouteObjectType,
): {time: string; content: string} => {
  if (routeEvent == null) {
    const lastExchange = conversation.exchanges.slice(-1)[0];
    const date = moment(lastExchange.time);
    return {
      time: formatMoment(date),
      content: getLastMessageString(lastExchange.exchanges),
    };
  } else {
    return {
      time: formatMoment(moment(routeEvent.date)),
      content: getLastMessageString(routeEvent.exchanges),
    };
  }
};

const getLastMessageString = (block: ExchangeBlockType[]) => {
  const lastMessage = block.slice(-1)[0].messages.slice(-1)[0];
  if (isMessageWithMeta(lastMessage)) {
    if (lastMessage.type !== DigestedItemTypes.SNAPSHOT) {
      return lastMessage.message;
    } else {
      return lastMessage.message.filename;
    }
  } else {
    return lastMessage;
  }
};

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
