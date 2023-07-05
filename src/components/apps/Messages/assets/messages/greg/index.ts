import {ConversationType} from 'components/apps/Messages/context/types';
import {
  CONTACT_NAMES,
  getAvatarFromContacts,
  getColorFromContacts,
} from 'components/apps/Messages/context/usersMapping';

export const greg: ConversationType = {
  name: CONTACT_NAMES.GREG,
  tags: [],
  date: 'January 19th, 2023',
  listContent: "I don't want to talk about that right now",
  heroImage: getAvatarFromContacts(CONTACT_NAMES.GREG),
  interfaceColor: getColorFromContacts(CONTACT_NAMES.GREG)[0],
  exchanges: [
    {
      time: 'May 28th, 2019 11:34pm',
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
