import {MessageRouteType} from 'components/apps/Messages/context/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';

export enum ZARA_OR_ZOLA_OPTIONS {
  ZARA = 'ZARA',
}

export const ZaraOrZolaRoute: MessageRouteType = {
  id: 'ZARA_OR_ZOLA_OPTIONS',
  options: [{key: ZARA_OR_ZOLA_OPTIONS.ZARA, value: 'Zara?'}],
  routes: {
    [ZARA_OR_ZOLA_OPTIONS.ZARA]: [
      {
        name: CONTACT_NAMES.SELF,
        messages: ['Zara?'],
      },
      {
        name: CONTACT_NAMES.ZOLA,
        messages: [
          "OMG, you're okay! It's been days",
          'You know I called the police!',
        ],
      },
      {
        name: CONTACT_NAMES.SELF,
        messages: ['No, Zara, sorry.', 'Its Michael'],
      },
      {
        name: CONTACT_NAMES.ZOLA,
        messages: ['Michael? WTF'],
      },
      {
        name: CONTACT_NAMES.ZOLA,
        messages: [
          'Wait...',
          'Why are you on his phone?',
          'Are you in his apartment?',
        ],
      },
    ],
  },
};
