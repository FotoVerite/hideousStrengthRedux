import React, {FC, useEffect, useRef, useState} from 'react';
import {
  NotificationsContextTypeDigested,
  NotificationsContextTypeDigest,
} from './types';
import {NotificationType} from '../reducers/notificationsReducer/types';
import zolaAvatar from '@apps/Messages/assets/avatars/Zara.jpg';

//defaults for empty app
export const NotificationsContext =
  React.createContext<NotificationsContextTypeDigested>({});

const notification = {
  title: 'title',
  content: 'Hello this is a notification',
  active: true,
  timestamp: new Date(),
  image: zolaAvatar,
};

const NotificationsContextProvider: FC<
  NotificationsContextTypeDigest
> = props => {
  const [notifications, setNotifications] = useState<NotificationType[]>([
    notification,
    notification,
    notification,
    notification,
    notification,
    notification,
  ]);

  return (
    <NotificationsContext.Provider
      value={{
        notifications: {state: notifications, set: setNotifications},
      }}>
      {props.children}
    </NotificationsContext.Provider>
  );
};

export default NotificationsContextProvider;
export const NotificationsContextConsumer = NotificationsContext.Consumer;
