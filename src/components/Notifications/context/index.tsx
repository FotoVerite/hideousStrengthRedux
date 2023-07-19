import React, {FC, useEffect, useRef, useState} from 'react';
import {
  NotificationsContextTypeDigested,
  NotificationsContextTypeDigest,
} from './types';
import {NotificationType} from '../types';

//defaults for empty app
export const NotificationsContext =
  React.createContext<NotificationsContextTypeDigested>({});

const NotificationsContextProvider: FC<
  NotificationsContextTypeDigest
> = props => {
  const [notifications, setNotifications] = useState<NotificationType[]>([
    {content: 'Hello this is a notification', active: true},
    {content: 'Hello this is a notification', active: true},
    {content: 'Hello this is a notification', active: true},
    {content: 'Hello this is a notification', active: true},
    {content: 'Hello this is a notification', active: true},
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
