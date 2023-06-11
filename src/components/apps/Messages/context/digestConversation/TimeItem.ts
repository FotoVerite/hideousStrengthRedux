import {ConversationExchangeType} from '../types';
import {DigestedConversationTimeType, DigestedItemTypes} from './types';

const HEIGHT = 60;

export const createTimeItem = (
  item: ConversationExchangeType,
  width: number,
  positionAcc: number,
): DigestedConversationTimeType => {
  const listItem = {
    height: HEIGHT,
    width: width,
    paddingBottom: 0,
    offset: positionAcc,
    content: item.time,
    type: DigestedItemTypes.TIME,
  } as DigestedConversationTimeType;
  return listItem;
};
