import {
  NOTIFICATIONS_REDUCER_ACTIONS,
  NotificationDataType,
  NotificationsReducerActionsType,
} from './types';

const notificationReducer = (
  state: NotificationDataType[],
  action: NotificationsReducerActionsType,
) => {
  let newState: NotificationDataType[]
  switch (action.type) {
    case NOTIFICATIONS_REDUCER_ACTIONS.ADD:
      return Object.assign([...state, action.payload.data]);
    case NOTIFICATIONS_REDUCER_ACTIONS.UPDATE:
      newState = Object.assign([...state], new Array<NotificationDataType>());
      newState[action.payload.index] = action.payload.data;
      return newState
    case NOTIFICATIONS_REDUCER_ACTIONS.DELETE:
      newState = Object.assign([...state], new Array<NotificationDataType>());
      newState.splice(action.payload.index, 1)
      return newState
    case NOTIFICATIONS_REDUCER_ACTIONS.RESET:
      return new Array();
    default:
      return state;
  }
};


export default notificationReducer;
