import {ExchangeBlockType} from '../types';
import {CONTACT_NAMES} from '../usersMapping';

export type MessageRouteEventType = {
  [key in CONTACT_NAMES]?: {
    views: [Date];
    routes?: {
      [routeId: string]: {date: Date; chosen: string; position: number};
    };
  };
};

export type RouteConditionsType = {
  [key in CONTACT_NAMES]?: {views?: number; routes?: {[key: string]: string}};
};
export type MessageRouteType = {
  id: string;
  conditions?: RouteConditionsType;
  options: [{key: string; value: string}];
  routes: {[key: string]: ExchangeBlockType[]};
};
