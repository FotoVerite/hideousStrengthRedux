import {
  MessageRouteEventType,
  MessageEventType,
} from 'components/EventOrchestra/context/types';
import {
  ExchangeBlockType,
  MessageRouteType,
  MessageWithMetaType,
} from 'components/apps/Messages/context/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';

export type SeenRouteType = {
  [index: string]: {[key: string]: ExchangeBlockType[]};
};

export type RouteObjectType = {
  routeId: string;
  chosen: string;
  date: Date;
  exchanges: ExchangeBlockType[];
  position: number;
};

export const isMessageWithMeta = (
  message: MessageWithMetaType | string,
): message is MessageWithMetaType => {
  return (message as MessageWithMetaType).type !== undefined;
};

const constructAvailableRouteObject = (availableRoutes: MessageRouteType[]) => {
  const routes: SeenRouteType = {};
  availableRoutes.forEach(route => (routes[route.id] = route.routes));
  return routes;
};

const constructSeenRoutes = (
  routeEvents: MessageRouteEventType,
  availableRoutes: SeenRouteType,
) => {
  const ret: RouteObjectType[] = [];
  for (const [key, value] of Object.entries(routeEvents)) {
    ret.push(
      Object.assign(
        {},
        {routeId: key},
        {...value},
        {exchanges: availableRoutes[key][value.chosen]},
      ),
    );
  }
  ret.sort((a, b) => a.position - b.position);
  return ret;
};

export const getSeenRoutes = (
  name: CONTACT_NAMES,
  events: MessageEventType,
  availableRoutes?: MessageRouteType[],
) => {
  if (!availableRoutes) {
    return [];
  }
  const routeEvents = events.Message[name]?.routes || {};

  return constructSeenRoutes(
    routeEvents,
    constructAvailableRouteObject(availableRoutes),
  );
};

export const getLastSeenRoute = (
  name: CONTACT_NAMES,
  events: MessageEventType,
  availableRoutes?: MessageRouteType[],
): RouteObjectType | undefined => {
  return getSeenRoutes(name, events, availableRoutes).slice(-1)[0];
};
