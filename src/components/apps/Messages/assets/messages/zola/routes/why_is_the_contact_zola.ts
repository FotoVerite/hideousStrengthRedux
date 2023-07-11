import {MessageRouteType} from 'components/apps/Messages/context/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {ZARA_ROUTE_IDS} from './routes';
import {ZARA_FOUND_NOTHING_OPTIONS} from './nothing_found';

export enum ZARA_WHY_IS_CONTACT_ZOLA_OPTIONS {
  A = 'Question',
  B = 'I just started looking',
}

const exchanges = [
  {
    name: CONTACT_NAMES.ZOLA,
    messages: ["I'm afraid to ask."],
  },
  {
    name: CONTACT_NAMES.SELF,
    messages: ['Why are you listed in his Contacts as Zola?'],
  },
  {
    name: CONTACT_NAMES.ZOLA,
    messages: ['What?'],
  },
  {
    name: CONTACT_NAMES.SELF,
    messages: ['Here'],
  },
];

export const why_is_the_contact_zola: MessageRouteType = {
  id: ZARA_ROUTE_IDS.WHY_IS_THE_CONTACT_ZOLA,
  conditions: {
    [CONTACT_NAMES.ZOLA]: {
      routes: {
        [ZARA_ROUTE_IDS.FOUND_NOTHING]: [
          ZARA_FOUND_NOTHING_OPTIONS.A,
          ZARA_FOUND_NOTHING_OPTIONS.B,
        ],
      },
    },
  },
  options: Object.values(ZARA_WHY_IS_CONTACT_ZOLA_OPTIONS),
  routes: {
    [ZARA_WHY_IS_CONTACT_ZOLA_OPTIONS.A]: [
      {
        name: CONTACT_NAMES.SELF,
        messages: [ZARA_WHY_IS_CONTACT_ZOLA_OPTIONS.A as string],
      },
    ].concat(exchanges),
  },
};
