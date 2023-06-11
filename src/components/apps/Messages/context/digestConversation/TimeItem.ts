import {ConversationExchangeType} from '../types';
import {DigestedConversationTimeType, DigestedItemTypes} from './types';

const HEIGHT = 60;

export const createTimeItem = (
  item: ConversationExchangeType,
  width: number,
  positionAcc: number,
): DigestedConversationTimeType => {
  const listItem = {
    positionFromStartOfList: positionAcc,
    height: HEIGHT,
    width: width,
    offset: positionAcc,
    content: item.time,
    type: DigestedItemTypes.TIME,
  } as DigestedConversationTimeType;
  return listItem;
};
