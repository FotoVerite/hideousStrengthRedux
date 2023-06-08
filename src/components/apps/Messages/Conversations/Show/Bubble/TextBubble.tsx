/* eslint-disable no-bitwise */
import React, {FC, useRef} from 'react';
import {useWindowDimensions} from 'react-native';

import {Gradient} from '../Gradient';
import {BubbleDimensionsType, ConversationSharedValues} from '../types';
import {calculateLines, returnTextLines} from '../utility';

const TextBubble: FC<
  {
    colors: string[];
    content: string;
    left: boolean;
    last: boolean;
  } & ConversationSharedValues
> = ({colors, content, font, left, last, offsetFromTopAcc, scrollHandler}) => {
  const layout = useRef<null | BubbleDimensionsType>();

  const {width, height} = useWindowDimensions();

  const MAX_WIDTH = left ? width * 0.7 - 30 : width * 0.7;
  const LINE_HEIGHT = 19;
  const LINE_PADDING = 45;

  if (!layout.current) {
    const boxWidth = font.getTextWidth(content) + LINE_PADDING;
    const boxLines = calculateLines(font, content, MAX_WIDTH - LINE_PADDING);
    layout.current = {
      offsetFromTop: offsetFromTopAcc.current,
      width: Math.min(boxWidth, MAX_WIDTH + 8),
      height: boxLines * LINE_HEIGHT,
    };

    offsetFromTopAcc.current += boxLines * LINE_HEIGHT + 25;
  }

  let textLines = returnTextLines(
    font,
    content,
    MAX_WIDTH - LINE_PADDING,
    left,
  );

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
