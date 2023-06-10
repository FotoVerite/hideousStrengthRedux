import {SkFont} from '@shopify/react-native-skia';
import {PropsWithChildren, ReactNode} from 'react';

type skFontNames = 'SFPro' | 'NotoColor' | 'HelveticaNeue';
export type skFontMap = Map<skFontNames, SkFont>;

export type ApplicationContextTypeDigest = {
  fonts: skFontMap;
  children: ReactNode;
};

export type ApplicationContextTypeDigested = PropsWithChildren<{
  fonts: skFontMap;
  ready: boolean;
}>;
