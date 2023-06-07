import React, {FC} from 'react';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {P} from 'components/common/StyledText';
import {Row} from 'components/common/layout';
import {screenParams} from 'navigation/screens';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Icon} from 'react-native-elements';

import theme from 'themes';

const Header: FC = () => {
  const navigation = useNavigation<StackNavigationProp<screenParams>>();

  return (
    <>
      <Row style={[styles.container]}>
        <TouchableWithoutFeedback
          style={{}}
          onPress={() => {
            //navigation.navigate('Desktop');
          }}>
          <View style={styles.spacer}>
            <Row style={styles.row}>
              <Icon name="chevron-left" color={'black'} size={16} />
              <P style={styles.backButton}>Back</P>
            </Row>
          </View>
        </TouchableWithoutFeedback>
        <P style={styles.header}>Messages</P>
        <View style={styles.spacer} />
      </Row>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  backButton: {paddingStart: 0, color: 'black'},
  container: {
    paddingHorizontal: theme.spacing.p1,
    paddingVertical: theme.spacing.p1,
    marginTop: 12,
    flexGrow: 0,
  },
  header: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 'auto',
  },
  spacer: {
    flex: 1,
  },
  row: {
    alignItems: 'center',
  },
});
