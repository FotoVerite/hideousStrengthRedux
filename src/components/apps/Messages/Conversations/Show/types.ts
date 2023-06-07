import {SkFont} from '@shopify/react-native-skia';
import {SharedValue} from 'react-native-reanimated';

export type ConversationSharedValues = {
  offsetFromTopAcc: React.MutableRefObject<number>;
  scrollHandler: SharedValue<number>;
  font: SkFont;
};

export type BubbleDimensionsType = {
  offsetFromTop: number;
  width: number;
  height: number;
};
