import React, {FC, useContext, useRef} from 'react';

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
  withTiming,
} from 'react-native-reanimated';

import {Bold, P} from 'components/common/StyledText';

import {MessagesContext} from '../context';

import theme from 'themes';
import Icon from 'react-native-vector-icons/FontAwesome';
import {BlurView} from '@react-native-community/blur';
import {Row} from 'components/common/layout';

const ConversationHeader: FC = () => {
  const context = useContext(MessagesContext);

  const conversationName = useRef(context.conversation.state?.name);

  if (
    context.conversation.state?.name != null &&
    conversationName.current !== context.conversation.state?.name
  ) {
    conversationName.current = context.conversation.state?.name;
  }

  const {width, height} = useWindowDimensions();

  const opacityAndPosition = useSharedValue(0);

  const popInAndTranslateAnimation = useAnimatedStyle(() => {
    if (context.conversation.state != null) {
      opacityAndPosition.value = withTiming(1);
    } else {
      opacityAndPosition.value = withTiming(0);
    }
    return {
      opacity: opacityAndPosition.value,
      marginLeft: interpolate(opacityAndPosition.value, [0, 1], [width, 0]),
    };
  }, [context.conversation]);

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
              onPress={() => context.conversation.set(undefined)}>
              <Icon
                suppressHighlighting={true}
                name="chevron-left"
                size={20}
                color={context.conversation.state?.interfaceColor}
                style={[styles.chevron]}
              />
            </TouchableWithoutFeedback>
          </Row>
        </View>
        <Bold size={'m'} style={styles.chatName}>
          {conversationName.current}
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
  touchableContainer: {
    borderRadius: 5,
    flex: 0,
    backgroundColor: 'orange',
    height: 400,
    width: 400,
  },
  spacer: {
    flex: 1,
  },
});

export default ConversationHeader;
