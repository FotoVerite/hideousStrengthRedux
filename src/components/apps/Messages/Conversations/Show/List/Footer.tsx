import React, {FC, useContext} from 'react';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import theme from 'themes';
import {MessagesContext} from 'components/apps/Messages/context';

const Footer: FC = () => {
  const messageContext = useContext(MessagesContext);

  const animatedMargin = useAnimatedStyle(() => {
    return {
      marginBottom:
        theme.spacing.p2 + 50 + messageContext.sharedValues.optionsHeight.value,
    };
  }, [messageContext.sharedValues.optionsHeight.value]);
  return <Animated.View style={animatedMargin} />;
};

export default Footer;
