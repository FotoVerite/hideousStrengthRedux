import React, {FC, useContext} from 'react';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {TextOrchestrationContext} from 'components/apps/Messages/context/textOrchestration';

import theme from 'themes';

const Footer: FC = () => {
  const context = useContext(TextOrchestrationContext);
  console.log(context);
  const animatedMargin = useAnimatedStyle(() => {
    return {
      marginBottom:
        theme.spacing.p2 + 50 + context.sharedValues.optionsHeight.value,
    };
  }, [context.sharedValues.optionsHeight.value]);
  return <Animated.View style={animatedMargin} />;
};

export default Footer;
