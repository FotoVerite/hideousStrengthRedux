import {MessagesContext} from 'components/apps/Messages/context';
import React, {FC, useContext, useRef} from 'react';
import {
  Image,
  ImageURISource,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native';

import theme from 'themes';
import {BubbleDimensionsType, ConversationSharedValues} from '../types';
import {Gradient} from '../Gradient';

const ImageBubble: FC<
  {
    colors: string[];
    content: ImageURISource;
    left: boolean;
  } & ConversationSharedValues
> = ({colors, content, left, offsetFromTopAcc, scrollHandler}) => {
  const {width, height} = Image.resolveAssetSource(content);
  const windowWidth = useWindowDimensions().width;
  const aspectRation = height / width;
  const imageWidth = left ? windowWidth * 0.7 - 30 : windowWidth * 0.7;
  const layout = useRef<null | BubbleDimensionsType>();
  const context = useContext(MessagesContext);

  layout.current = {
    offsetFromTop: offsetFromTopAcc.current,
    width: imageWidth,
    height: imageWidth * aspectRation,
  };

  offsetFromTopAcc.current += imageWidth * aspectRation;

  return (
    <Gradient
      color={colors}
      scrollHandler={scrollHandler}
      left={left}
      {...layout.current}>
      <TouchableWithoutFeedback
        onPress={() => {
          context.media.set(content);
        }}>
        <Image
          source={content}
          style={[
            styles.image,
            {
              width: imageWidth - theme.spacing.p2,
              height: imageWidth * aspectRation - theme.spacing.p1,
            },
          ]}
        />
      </TouchableWithoutFeedback>
    </Gradient>
  );
};

export default ImageBubble;

const styles = StyleSheet.create({
  image: {
    borderRadius: 5,
    position: 'absolute',
    alignSelf: 'center',
    padding: 0,
    margin: theme.spacing.p1,
  },
});
