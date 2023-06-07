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
) => {
  let lines = 1;
  let thisLineWidth = 0;
  const textLines: ReactNode[] = [];
  let thisLine = '';
  sentence.split(' ').forEach(word => {
    const thisWordWidth = font.getTextWidth(word);
    if (thisLineWidth + thisWordWidth > width) {
      textLines.push(
        <Text
          x={12}
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
      x={12}
      y={19 * lines + 4}
      text={thisLine}
      font={font}
      color={'white'}
      key={`Text-${thisLine}`}
    />,
  );
  return textLines;
};
