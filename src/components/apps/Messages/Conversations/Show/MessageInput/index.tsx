import React, {FC, useState} from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
import Animated from 'react-native-reanimated';
import theme from 'themes';
import MessageTextInput from './MessageTextInput';
import OptionList from './OptionList';
import {BlurView} from '@react-native-community/blur';
import {GenericStateType} from 'types/genericContextTypes';

const MessageInput: FC<{scrollToBottom: GenericStateType<boolean>}> = ({
  scrollToBottom,
}) => {
  const {width, height} = useWindowDimensions();

  const [active, setActive] = useState(false);
  const activeObject = {state: active, set: setActive};

  return (
    <Animated.View style={[{width: width}, styles.container]}>
      <BlurView
        style={styles.blur}
        blurType="light"
        blurAmount={25}
        reducedTransparencyFallbackColor="white"
      />
      <MessageTextInput active={activeObject} />
      <OptionList active={activeObject} scrollToBottom={scrollToBottom} />
    </Animated.View>
  );
};

export default MessageInput;

const styles = StyleSheet.create({
  blur: {
    zIndex: 3,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  container: {
    zIndex: 3,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
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
