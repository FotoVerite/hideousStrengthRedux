import {MessagesContext} from 'components/apps/Messages/context';
import React, {FC, useContext, useRef} from 'react';
import {
  ImageURISource,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
  Image,
  View,
} from 'react-native';

import {BubbleDimensionsType, ConversationSharedValues} from '../types';
import {
  Canvas,
  Group,
  Image as SkImage,
  useImage,
} from '@shopify/react-native-skia';
import {BubblePath} from '../Gradient/BubblePath';
//import {BubblePath} from '../Gradient/BubblePath';

const ImageBubble: FC<
  {
    colors: string[];
    content: ImageURISource;
    left: boolean;
    last: boolean;
  } & ConversationSharedValues
> = ({colors, content, left, last, offsetFromTopAcc, scrollHandler}) => {
  const {width, height} = Image.resolveAssetSource(content);
  const windowWidth = useWindowDimensions().width;
  const imageWidth = left ? windowWidth * 0.7 - 30 : windowWidth * 0.7;
  const layout = useRef<null | BubbleDimensionsType>();
  const context = useContext(MessagesContext);
  const aspectRation = height / width;
  offsetFromTopAcc.current += imageWidth * aspectRation;

  const image = useImage(content);

  if (!image) {
    return null;
  }

  const imageHeight = imageWidth * aspectRation;
  if (!layout.current) {
    layout.current = {
      offsetFromTop: offsetFromTopAcc.current,
      width: imageWidth,
      height: imageHeight,
    };
  }

  const bubblePath = BubblePath(imageWidth, imageHeight, 16, last);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        context.media.set(content);
      }}>
      <View style={{alignItems: left ? undefined : 'flex-end'}}>
        <Canvas
          style={[
            {
              width: imageWidth,
              height: imageHeight,
            },
            styles.image,
          ]}>
          <Group clip={bubblePath}>
            <SkImage
              image={image}
              fit="fitWidth"
              x={0}
              y={0}
              width={imageWidth}
              height={imageHeight}
            />
          </Group>
        </Canvas>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ImageBubble;

const styles = StyleSheet.create({
  image: {
    marginBottom: 2,
  },
});
