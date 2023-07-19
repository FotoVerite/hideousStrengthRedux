import {formatMoment} from 'common';
import {Bold, P} from 'components/common/StyledText';
import {Row} from 'components/common/layout';
import moment from 'moment';
import {FC} from 'react';
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
            <Bold>{title}</Bold>
            <P style={styles.date}>{formatMoment(moment(timestamp))}</P>
          </Row>
          <P>{content}</P>
        </View>
      </Row>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    backgroundColor: '#ffffffc7',
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
    alignItems: 'center',
  },
  date: {
    marginLeft: 'auto',
  },
});
