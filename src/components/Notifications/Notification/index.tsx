import React, {FC} from 'react';
import {formatMoment} from 'common';
import {Bold, P} from 'components/common/StyledText';
import {Row} from 'components/common/layout';
import moment from 'moment';
import {View, Image, StyleSheet} from 'react-native';
import {NotificationType} from '../reducers/notificationsReducer/types';
import theme from 'themes';

const Notification: FC<{notification: NotificationType}> = props => {
  const {content, image, timestamp, title} = props.notification;
  return (
    <View style={styles.container}>
      <Row>
        <Image source={image} style={styles.image} />
        <View style={styles.contentContainer}>
          <Row style={styles.header}>
            <View>
              <Bold style={styles.text}>{title}</Bold>
              <P style={styles.text}>{content}</P>
            </View>
            <P style={styles.date}>{formatMoment(moment(timestamp))}</P>
          </Row>
        </View>
      </Row>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    backgroundColor: '#b2b0b092',
    padding: theme.spacing.p1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 8,
    marginEnd: theme.spacing.p1,
  },
  header: {
    alignItems: 'flex-start',
  },
  date: {
    marginLeft: 'auto',
    marginTop: 0,
    color: '#343434',
    fontSize: 13,
  },
  text: {
    color: '#343434',
    fontSize: 13,
  },
});
