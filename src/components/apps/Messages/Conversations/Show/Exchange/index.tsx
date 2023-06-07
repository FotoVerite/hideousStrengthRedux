import {P} from 'components/common/StyledText';
import React, {FC} from 'react';
import {View, StyleSheet} from 'react-native';
import {ConversationExchangeType} from '../../../context/types';
import theme from 'themes';
import Block from './Block';
import {ConversationSharedValues} from '../types';

const Exchange: FC<
  {
    conversation: ConversationExchangeType;
    index: number;
  } & ConversationSharedValues
> = ({offsetFromTopAcc, conversation, scrollHandler, font, index}) => {
  const TIME_HEIGHT = 60;
  offsetFromTopAcc.current += TIME_HEIGHT;
  return (
    <View style={styles.exchange}>
      <P p={'p2'} style={styles.time}>
        {conversation.time}
      </P>
      {conversation.exchanges.map((exchange, exchangeIndex) => (
        <Block
          block={exchange}
          offsetFromTopAcc={offsetFromTopAcc}
          scrollHandler={scrollHandler}
          font={font}
          index={index}
          key={`${index}-conversation-${exchangeIndex}`}
        />
      ))}
    </View>
  );
};

export default Exchange;

const styles = StyleSheet.create({
  exchange: {
    flexGrow: 1,
  },
  time: {
    textAlign: 'center',
    fontSize: 10,
  },
  listHeader: {
    height: 0,
    marginBottom: theme.spacing.p3,
  },
  listFooter: {
    height: 0,
    marginBottom: theme.spacing.p2,
  },
  list: {
    backgroundColor: theme.colors.muted,
    padding: theme.spacing.p1,
    paddingBottom: 0,
  },
  itemSeparator: {
    height: 1,
    marginVertical: 10,
    backgroundColor: 'gray',
  },
  screen: {
    backgroundColor: 'white',
    zIndex: 2,
    top: 0,
    position: 'absolute',
    flexGrow: 1,
    bottom: 0,
  },
});
