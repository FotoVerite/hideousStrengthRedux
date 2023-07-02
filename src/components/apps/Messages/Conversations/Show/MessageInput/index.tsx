import React, {FC, MutableRefObject, useContext, useState} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from 'themes';

const MessageInput: FC<{}> = ({}) => {
  const [active, setActive] = useState(false);
  return (
    <View style={styles.container}>
      <View style={[styles.textInput]}>
        <Icon size={20} name="chevron-up" style={styles.icon} />
      </View>
    </View>
  );
};

export default MessageInput;

const styles = StyleSheet.create({
  container: {
    height: 50,
    zIndex: 3,
  },
  textInput: {
    maxHeight: 40,
    borderColor: '#dfdede',
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
