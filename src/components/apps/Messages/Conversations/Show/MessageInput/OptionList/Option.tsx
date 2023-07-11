import React, {FC, useContext} from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  StyleSheet,
  LayoutChangeEvent,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Bold, P} from 'components/common/StyledText';
import {Row} from 'components/common/layout';
import theme from 'themes';
import {GenericStateType} from 'types/genericContextTypes';
import {TextOrchestrationContext} from 'components/apps/Messages/context/textOrchestration';

const Option: FC<{
  active: GenericStateType<boolean>;
  totalHeight: React.Dispatch<React.SetStateAction<number>>;
  option: string;
}> = ({active, option, totalHeight}) => {
  const context = useContext(TextOrchestrationContext);
  return (
    <TouchableOpacity
      onPress={() => {
        active.set(false);
        context.pickRoute(option);
      }}>
      <Row
        style={styles.container}
        onLayout={(layout: LayoutChangeEvent) => {
          const layoutHeight = layout.nativeEvent.layout.height;
          totalHeight(height => (height += layoutHeight));
        }}>
        <View style={styles.content}>
          <Row style={styles.infoRow}>
            <Row style={styles.dateRow}>
              <P style={styles.content}>{option}</P>
              <Icon
                name="chevron-right"
                color={'black'}
                size={24}
                style={styles.icon}
              />
            </Row>
          </Row>
        </View>
      </Row>
    </TouchableOpacity>
  );
};

export default Option;

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing.p1 / 2,
    marginHorizontal: theme.spacing.p1,

    backgroundColor: '#ebebed',
    borderRadius: theme.BorderRadius.small,
    alignItems: 'center',
    height: 50,
  },
  content: {
    flex: 1,
    fontSize: 16,
    marginStart: theme.spacing.p1 / 2,
  },
  infoRow: {
    flexGrow: 0,
  },
  icon: {
    marginStart: 'auto',
  },
  dateRow: {
    alignItems: 'center',
  },
  date: {},
});
