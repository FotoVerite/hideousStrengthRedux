import React, {FC, useContext, useMemo} from 'react';

import {
  Canvas,
  Circle,
  Group,
  LinearGradient,
  Rect,
  vec,
  Text,
  Skia,
} from '@shopify/react-native-skia';

import Animated, {SharedValue} from 'react-native-reanimated';
import {
  DigestedConversationStringItemType,
  DigestedConversationVCardItemType,
} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';

import {useHeightDeterminedGradient} from './hooks/useHeightDeterminedGradient';
import {TouchableWithoutFeedback, View} from 'react-native';
import {MessagesContext} from 'components/apps/Messages/context';
import {CONVERSATION_REDUCER_ACTIONS} from 'components/apps/Messages/reducers/conversationReducer/types';
import {ApplicationContext} from 'context';

export const VCardBubble: FC<
  DigestedConversationVCardItemType & {
    scrollHandler: SharedValue<number>;
    scrollRef: React.RefObject<Animated.ScrollView>;
  }
> = ({
  colors,
  scrollHandler,
  offset,
  content,
  leftSide,
  width,
  height,
  clip,
  paddingBottom,
}) => {
  const computedColors = useHeightDeterminedGradient(
    colors,
    offset,
    leftSide,
    scrollHandler,
  );

  const appContext = useContext(ApplicationContext);
  const context = useContext(MessagesContext);
  const font = appContext.fonts.HelveticaNeue;
  const initials = content.name
    .split(' ')
    .map(word => word[0])
    .join('');
  const bubbleFontSize = initials.length === 1 ? 36 : 20;
  let bubbleFont = font;

  bubbleFont = useMemo(() => {
    const fontInstance = font.getTypeface();
    if (fontInstance != null) {
      return Skia.Font(fontInstance, bubbleFontSize);
    } else {
      return font;
    }
  }, [bubbleFontSize, font]);

  const middle = (height + paddingBottom) / 2;
  const initialsWidth = bubbleFont.getTextWidth(initials);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        context.newMessage.dispatch({
          type: CONVERSATION_REDUCER_ACTIONS.DIGEST_CONVERSATION,
          payload: content,
        });
      }}>
      <View>
        <Canvas
          style={{
            width: width,
            height: height,
          }}>
          <Group clip={clip}>
            <Rect x={0} y={0} width={width} height={height}>
              <LinearGradient
                colors={computedColors}
                start={vec(0, 0)}
                end={vec(0, height)}
              />
            </Rect>
          </Group>
          <Circle c={vec(width - 50, height / 2)} r={22} color={'white'} />
          <Text
            x={30}
            y={middle}
            text={content.name}
            color="white"
            font={font}
          />
          <Text
            x={width - 50 - initialsWidth / 2}
            y={middle + bubbleFontSize / 3.5}
            text={initials}
            color="black"
            font={bubbleFont}
          />
        </Canvas>
      </View>
    </TouchableWithoutFeedback>
  );
};
