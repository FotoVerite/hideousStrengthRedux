import React, {FC, useContext, useEffect} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from 'themes';
import Cursor from './Cursor';
import {GenericStateType} from 'types/genericContextTypes';
import {TextOrchestrationContext} from 'components/apps/Messages/context/textOrchestration';

const MessageTextInput: FC<{
  active: GenericStateType<boolean>;
}> = ({active}) => {
  const textOrchestration = useContext(TextOrchestrationContext);
  return (
    <View style={[styles.container]}>
      <TouchableWithoutFeedback
        onPress={() => {
          if (textOrchestration.hasActiveRoute == null)
            active.set(state => !!!state);
        }}>
        <View style={[styles.textInput]}>
          {active.state && <Cursor />}
          <Icon size={20} name="chevron-up" style={styles.icon} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default MessageTextInput;

const styles = StyleSheet.create({
  container: {
    height: 50,
    zIndex: 4,
    justifyContent: 'center',
  },
  textInput: {
    maxHeight: 40,
    borderColor: '#cfcdcd',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: theme.BorderRadius.normal,
    height: 40,
    marginHorizontal: theme.spacing.p1,
    alignItems: 'center',
    paddingHorizontal: 12,
    flexDirection: 'row',
    marginBottom: 2,
  },
  icon: {
    marginStart: 'auto',
  },
});
