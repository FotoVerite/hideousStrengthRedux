import {DigestedItemTypes} from 'components/apps/Messages/context/digestConversation/types';
import {ConversationType} from 'components/apps/Messages/context/types';
import {
  CONTACT_NAMES,
  getAvatarFromContacts,
  getColorFromContacts,
} from 'components/apps/Messages/context/usersMapping';

export const greg: ConversationType = {
  name: CONTACT_NAMES.GREG,
  tags: [],
  heroImage: getAvatarFromContacts(CONTACT_NAMES.GREG),
  interfaceColor: getColorFromContacts(CONTACT_NAMES.GREG)[0],
  exchanges: [
    {
      time: '2019-05-28T23:34:00Z',
      exchanges: [
        {
          name: CONTACT_NAMES.SELF,
          messages: ['That was very, very good last night.'],
        },
        {
          name: CONTACT_NAMES.GREG,
          messages: ['Agreed, and this morning'],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ['Mmmhm'],
        },
        {
          name: CONTACT_NAMES.GREG,
          messages: ['We should plan another session soon'],
        },
      ],
    },
  ],
};
