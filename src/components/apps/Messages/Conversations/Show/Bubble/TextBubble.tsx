/* eslint-disable no-bitwise */
import React, {FC, useContext, useRef} from 'react';
import {useWindowDimensions} from 'react-native';

import {Gradient} from '../Gradient';
import {BubbleDimensionsType, ConversationSharedValues} from '../types';
import {returnTextLinesR} from '../utility';
import {ApplicationContext} from 'context';

const TextBubble: FC<
  {
    colors: string[];
    content: string;
    left: boolean;
    last: boolean;
  } & ConversationSharedValues
> = ({colors, content, left, last, offsetFromTopAcc, scrollHandler}) => {
  const layout = useRef<null | BubbleDimensionsType>();
  const applicationContext = useContext(ApplicationContext);

  const {width, height} = useWindowDimensions();

  const MAX_WIDTH = left ? width * 0.7 - 30 : width * 0.7;
  const LINE_HEIGHT = 19;
  const LINE_PADDING = 45;
  const font = applicationContext.fonts.get('HelveticaNeue');
  const emojiFont = applicationContext.fonts.get('NotoColor');

  const [lineCount, textLines] = returnTextLinesR(
    font,
    font,
    content,
    MAX_WIDTH - LINE_PADDING,
    left,
  );

  if (!layout.current) {
    const boxWidth = font.getTextWidth(content) + LINE_PADDING;
    layout.current = {
      offsetFromTop: offsetFromTopAcc.current,
      width: Math.min(boxWidth, MAX_WIDTH + 8),
      height: lineCount * LINE_HEIGHT,
    };

    offsetFromTopAcc.current += lineCount * LINE_HEIGHT + 25;
  }
  return (
    <Gradient
      color={colors}
      scrollHandler={scrollHandler}
      left={left}
      last={last}
      {...layout.current}>
      {textLines}
    </Gradient>
  );
};

export default TextBubble;
