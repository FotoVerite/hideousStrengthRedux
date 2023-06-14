import React, {FC, useContext, useEffect, useRef} from 'react';

import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import {Bold} from 'components/common/StyledText';

import {MessagesContext} from '../context';

import theme from 'themes';
import Icon from 'react-native-vector-icons/FontAwesome';
import {BlurView} from '@react-native-community/blur';
import {Row} from 'components/common/layout';

const ConversationHeader: FC = () => {
  const context = useContext(MessagesContext);

  const conversation = useRef(context.digestedConversation.state);

  if (
    context.digestedConversation.state?.name != null &&
    conversation.current !== context.digestedConversation.state
  ) {
    conversation.current = context.digestedConversation.state;
  }

  const {width, height} = useWindowDimensions();

  const opacityAndPosition = useSharedValue(0);

  useEffect(() => {
    if (context.digestedConversation.state) {
      opacityAndPosition.value = withDelay(250, withTiming(1, {duration: 750}));
    } else {
      opacityAndPosition.value = withTiming(0, {duration: 750});
    }
  }, [context.digestedConversation.state, opacityAndPosition]);

  const popInAndTranslateAnimation = useAnimatedStyle(() => {
    return {
      opacity: opacityAndPosition.value,
      marginLeft: interpolate(opacityAndPosition.value, [0, 1], [width, 0]),
    };
  }, [context.digestedConversation]);

  return (
    <Animated.View style={[styles.header, popInAndTranslateAnimation]}>
      <BlurView
        style={styles.blur}
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      />
      <Row style={styles.row}>
        <View style={styles.spacer}>
          <Row style={styles.row}>
            <TouchableWithoutFeedback
              onPress={() => context.digestedConversation.set(undefined)}>
              <Icon
                suppressHighlighting={true}
                name="chevron-left"
                size={20}
                color={conversation.current?.interfaceColor}
                style={[styles.chevron]}
              />
            </TouchableWithoutFeedback>
          </Row>
        </View>
        <Bold size={'m'} style={[styles.chatName]}>
          {conversation.current?.name}
        </Bold>
        <View style={styles.spacer} />
      </Row>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  chevron: {
    alignItems: 'center',
    marginStart: theme.spacing.p1,
  },
  chatName: {
    fontWeight: 'bold',
    fontSize: 24,
    zIndex: 3,
  },
  header: {
    height: 50,
    zIndex: 2,
    position: 'absolute',
    width: '100%',
    top: 0,
  },
  blur: {
    zIndex: 3,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  row: {
    alignItems: 'center',
    zIndex: 3,
  },
  spacer: {
    flex: 1,
  },
});

export default ConversationHeader;
