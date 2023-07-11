import {
  EventOrchestraObjectType,
  MessageAppContactsEventType,
} from 'components/EventOrchestra/context/types';
import {
  ConversationType,
  MessageRouteType,
  RouteConditionsType,
} from '../types';
import {CONTACT_NAMES} from '../usersMapping';

const contactHasBeenViewedCheck = (
  name: CONTACT_NAMES,
  messageEvents: MessageAppContactsEventType,
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
  messageEvents: MessageAppContactsEventType,
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
      routeConditions[key].includes(viewedRoutes[key].chosen)
    );
  }, true);
};

const messageAppConditionsMet = (
  state: MessageAppContactsEventType,
  conditions: RouteConditionsType,
) => {
  let ret = true;
  Object.keys(conditions).forEach((key: string) => {
    ret =
      ret && contactHasBeenViewedCheck(key as CONTACT_NAMES, state, conditions);
    ret =
      ret && routeHasBeenChosenCheck(key as CONTACT_NAMES, state, conditions);
  });
  return ret;
};

export const findAvailableRoutes = (
  name: CONTACT_NAMES,
  routes: MessageRouteType[],
  state: EventOrchestraObjectType,
) => {
  if (routes == null || routes.length == 0) {
    return undefined;
  } else {
    return routes.filter(route => {
      // Convert number to string due to objects keys needing to be strings
      return (
        !Object.keys(state.Message[name]?.routes || {}).includes(
          route.id.toString(),
        ) &&
        (route.conditions == null ||
          messageAppConditionsMet(state.Message, route.conditions))
      );
    })[0];
  }
};
