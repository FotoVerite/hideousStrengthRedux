import {
  MessageRouteEventType,
  MessageRouteType,
  RouteConditionsType,
} from './types';
import {CONTACT_NAMES} from '../usersMapping';
import {MessageEventType} from '../textOrchestration/types';

const contactHasBeenViewedCheck = (
  name: CONTACT_NAMES,
  messageEvents: MessageRouteEventType,
  conditions: RouteConditionsType,
) => {
  const viewCondition = conditions[name]?.views;
  if (viewCondition == null) {
    return true;
  }
  const viewedAmount = messageEvents[name]?.views.length || 0;
  return viewCondition <= viewedAmount;
};

const routeHasBeenChosenCheck = (
  name: CONTACT_NAMES,
  messageEvents: MessageRouteEventType,
  conditions: RouteConditionsType,
) => {
  const routeConditions = conditions[name]?.routes || {};
  const routeConditionsKeys = Object.keys(routeConditions);
  if (routeConditionsKeys.length === 0) {
    return true;
  }
  const viewedRoutes = messageEvents[name]?.routes || {};
  return routeConditionsKeys.reduce((acc, key) => {
    return (
      acc &&
      viewedRoutes[key] != null &&
      viewedRoutes[key].chosen == routeConditions[key]
    );
  }, true);
};

const conditionsMet = (
  state: MessageEventType,
  conditions: RouteConditionsType,
) => {
  let ret = false;
  Object.keys(conditions).forEach((key: string) => {
    ret =
      ret &&
      contactHasBeenViewedCheck(
        key as CONTACT_NAMES,
        state.Message,
        conditions,
      );
    ret =
      ret &&
      routeHasBeenChosenCheck(key as CONTACT_NAMES, state.Message, conditions);
  });
  return ret;
};

export const findAvailableRoutes = (
  state: MessageEventType,
  routes?: MessageRouteType[],
) => {
  if (routes == null) {
    return undefined;
  } else {
    return routes.filter(
      route =>
        route.conditions == null || conditionsMet(state, route.conditions),
    )[0];
  }
};
