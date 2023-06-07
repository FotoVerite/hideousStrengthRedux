import {SkFont} from '@shopify/react-native-skia';
import {PropsWithChildren, ReactNode} from 'react';

export type skFontMap = Map<string, SkFont>;

export type ApplicationContextTypeDigest = {
  children: ReactNode;
};

export type ApplicationContextTypeDigested = PropsWithChildren<{
  fonts: skFontMap;
  ready: boolean;
}>;
