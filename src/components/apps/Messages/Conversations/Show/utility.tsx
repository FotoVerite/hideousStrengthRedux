import React, {ReactNode} from 'react';
import {SkFont, Text} from '@shopify/react-native-skia';

export const changeColor = (color: string, amount: number) => {
  const clamp = (val: number) => Math.min(Math.max(val, 0), 0xff);
  const fill = (str: string) => ('00' + str).slice(-2);

  const num = parseInt(color.substr(1), 16);
  const red = clamp((num >> 16) + amount);
  const green = clamp(((num >> 8) & 0x00ff) + amount);
  const blue = clamp((num & 0x0000ff) + amount);
  return (
    '#' +
    fill(red.toString(16)) +
    fill(green.toString(16)) +
    fill(blue.toString(16))
  );
};

export const calculateLines = (
  font: SkFont,
  sentence: string,
  width: number,
) => {
  let lines = 1;
  let thisLineWidth = 0;
  sentence.split(' ').forEach(word => {
    const thisWordWidth = font.getTextWidth(word);
    if (thisLineWidth + thisWordWidth > width) {
      lines += 1;
      thisLineWidth = thisWordWidth + font.getTextWidth(' ');
    } else {
      thisLineWidth += thisWordWidth + font.getTextWidth(' ');
    }
  });
  return lines;
};

export const returnTextLines = (
  font: SkFont,
  sentence: string,
  width: number,
  leftSide: boolean,
) => {
  let lines = 1;
  let thisLineWidth = 0;
  const textLines: ReactNode[] = [];
  let thisLine = '';
  const LEFT_PADDING = leftSide ? 24 : 8;
  sentence.split(' ').forEach(word => {
    const thisWordWidth = font.getTextWidth(word);
    if (thisLineWidth + thisWordWidth > width) {
      textLines.push(
        <Text
          x={LEFT_PADDING}
          y={19 * lines + 4}
          text={thisLine}
          font={font}
          color={'white'}
          key={`Text-${thisLine}`}
        />,
      );

      lines += 1;
      thisLineWidth = thisWordWidth + font.getTextWidth(' ');

      thisLine = word + ' ';
    } else {
      thisLineWidth += thisWordWidth + font.getTextWidth(' ');
      thisLine += word + ' ';
    }
  });
  textLines.push(
    <Text
      x={LEFT_PADDING}
      y={19 * lines + 4}
      text={thisLine}
      font={font}
      color={'white'}
      key={`Text-${thisLine}`}
    />,
  );
  return textLines;
};

export const returnTextLinesR = (
  font: SkFont,
  emojiFont: SkFont,
  sentence: string,
  width: number,
  leftSide: boolean,
) => {
  const LEFT_PADDING = leftSide ? 24 : 8;
  const lineQueue: {
    type: 'emoji' | 'text';
    starts: number;
    content: string;
  }[][] = [];
  let lineWidth = 0;
  let widthSinceEmoji = 0;
  let content = '';

  const appendContent = (textString: string) => {
    if (widthSinceEmoji === 0) {
      lineQueue.push([
        {
          type: 'text',
          starts: LEFT_PADDING + widthSinceEmoji,
          content: textString,
        },
      ]);
    } else {
      lineQueue[lineQueue.length - 1].push({
        type: 'text',
        content: textString,
        starts: LEFT_PADDING + widthSinceEmoji,
      });
    }
  };
  const calculateFontElement = (word: string) => {
    const wordWidth = font.getTextWidth(word);
    if (lineWidth + wordWidth > width) {
      appendContent(content);
      widthSinceEmoji = 0;
      content = word + ' ';
      lineWidth = wordWidth + font.getTextWidth(' ');
    } else {
      content += word + ' ';
      lineWidth += wordWidth + font.getTextWidth(' ');
    }
  };

  const calculateEmojiElement = (word: string) => {
    const wordWidth = emojiFont.getTextWidth(word);
    if (lineWidth + wordWidth > width) {
      lineQueue[lineQueue.length - 1].push({
        type: 'text',
        starts: LEFT_PADDING + widthSinceEmoji,
        content: content,
      });

      lineWidth = wordWidth + font.getTextWidth(' ');
      widthSinceEmoji = lineWidth;

      lineQueue.push([{type: 'emoji', starts: LEFT_PADDING, content: word}]);
    } else {
      if (lineQueue.length === 0) {
        lineQueue.push([]);
      }
      lineQueue[lineQueue.length - 1].push({
        type: 'emoji',
        content: word,
        starts: lineWidth + LEFT_PADDING,
      });
      lineWidth += wordWidth + font.getTextWidth(' ');
      widthSinceEmoji = lineWidth;
    }
    content = '';
  };

  sentence.split(' ').forEach(word => {
    const isEmoji = /\p{Extended_Pictographic}/u.test(word);
    if (isEmoji) {
      if (content !== ' ') {
        content += ' ';
        lineWidth += font.getTextWidth(' ');
        appendContent(content);
      }
      calculateEmojiElement(word);
    } else {
      calculateFontElement(word);
    }
  });

  if (content) {
    appendContent(content);
  }
  const lineCount = lineQueue.length;
  const textElements = lineQueue
    .map((line, index) =>
      line.map((section, sIdx) => (
        <Text
          x={section.starts}
          y={19 * (index + 1) + 4}
          text={section.content}
          font={section.type === 'text' ? font : emojiFont}
          color={'white'}
          key={`Text-${section.content}-${sIdx}`}
        />
      )),
    )
    .flat();
  return [lineCount, textElements] as const;
};

export const CalculateWidthHeightAndGenerateTextNodes = (
  font: SkFont,
  sentence: string,
  width: number,
  leftSide: boolean,
) => {
  const LINE_HEIGHT = 19;
  const LINE_PADDING = 45;
  const RIGHT_SIDE_PADDING = 8;
  const MAX_WIDTH = leftSide ? width * 0.7 - 30 : width * 0.7;
  let calculatedWidth = font.getTextWidth(sentence) + LINE_PADDING;
  calculatedWidth = Math.min(
    calculatedWidth + RIGHT_SIDE_PADDING,
    MAX_WIDTH + 8,
  );
  const [lineCount, textNodes] = returnTextLinesR(
    font,
    font,
    sentence,
    MAX_WIDTH - LINE_PADDING,
    leftSide,
  );

  return [lineCount * LINE_HEIGHT, calculatedWidth, textNodes] as const;
};
