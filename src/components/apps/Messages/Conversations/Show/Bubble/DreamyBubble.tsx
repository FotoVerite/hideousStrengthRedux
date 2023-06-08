/* eslint-disable no-bitwise */
import React, {FC, useEffect} from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';

import {P} from 'components/common/StyledText';
import {
  useClockValue,
  useComputedValue,
  Skia,
  vec,
  Canvas,
  Path,
  Text,
  useFont,
  LinearGradient,
} from '@shopify/react-native-skia';
import {createNoise2D} from 'simplex-noise';

const C = 0.55228474983079;
const F = 5500;
const A = 0.2;
const {width, height} = useWindowDimensions();
const c = vec(80, 80);
const r = 65;
const n1 = createNoise2D();
const n2 = createNoise2D();
const n3 = createNoise2D();
const n4 = createNoise2D();

const DreamyBubble: FC<{
  content: string;
}> = ({content}) => {
  const clock = useClockValue();
  const font = useFont(require('../../../assets/fonts/Roboto-Regular.ttf'), 12);

  const path = useComputedValue(() => {
    const C1 = C + A * n1(clock.current / F, 0);
    const C2 = C + A * n2(clock.current / F, 0);
    const C3 = C + A * n3(clock.current / F, 0);
    const C4 = C + A * n4(clock.current / F, 0);
    const p = Skia.Path.Make();
    p.moveTo(c.x, c.y - r);
    p.cubicTo(c.x + C1 * r, c.y - r, c.x + r, c.y - C1 * r, c.x + r, c.y);
    p.cubicTo(c.x + r, c.y + C2 * r, c.x + C2 * r, c.y + r, c.x, c.y + r);
    p.cubicTo(c.x - C3 * r, c.y + r, c.x - r, c.y + C3 * r, c.x - r, c.y);
    p.cubicTo(c.x - r, c.y - C4 * r, c.x - C4 * r, c.y - r, c.x, c.y - r);
    const m = Skia.Matrix();
    m.translate(c.x, c.y);
    m.rotate(clock.current / 2000);
    m.translate(-c.x, -c.y);
    p.transform(m);
    return p;
  }, [clock]);
  return (
    <Canvas style={{flex: 1, width: 150, height: 150}}>
      <Path path={path}>
        <LinearGradient
          start={vec(0, 0)}
          end={vec(80, 120)}
          colors={['#c4cbc5', '#fa23e1', '#F0647D', '#FAAF23', '#ffffff']}
        />
      </Path>
      <Text x={20} y={80} text={content} font={font} />
    </Canvas>
  );
};

export default DreamyBubble;

const styles = StyleSheet.create({
  textBubble: {
    padding: 4,
    color: 'white',
    margin: 0,
    textAlign: 'left',
    fontSize: 13,
  },
});
