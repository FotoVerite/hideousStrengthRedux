import {SkPath, Skia} from '@shopify/react-native-skia';

export const BubblePath = (
  width: number,
  height: number,
  cr: number,
  tail: boolean,
): SkPath => {
  const straightLineWidth = width - cr - cr;
  const path = Skia.Path.Make();
  path.moveTo(0, cr);
  if (true) {
    path.rArcTo(cr, cr, 0, true, false, cr, -cr);
  }

  path.lineTo(straightLineWidth, 0);

  if (true) {
    path.rArcTo(cr, cr, 0, true, false, cr, cr);
  }

  if (tail) {
    path.lineTo(straightLineWidth + cr, height - cr - 1);

    path.rArcTo(cr, cr, 0, true, true, cr, cr);

    path.rArcTo(cr, cr, 0, true, false, -cr, -2);
    path.rArcTo(cr, cr, 0, true, false, -cr + 5, 3);
  } else {
    path.lineTo(straightLineWidth + cr, height - cr);

    path.rArcTo(cr, cr, 0, true, false, -cr, cr);
  }
  path.lineTo(cr, height);
  if (true) {
    path.rArcTo(cr, cr, 0, true, false, -cr, -cr);
  }
  path.close();
  return path;
};

export const flipPath = (path: SkPath, width: number): SkPath => {
  const m = Skia.Matrix();
  m.scale(-1, 1);
  m.translate(-width, -0);
  path.transform(m);
  return path;
};
