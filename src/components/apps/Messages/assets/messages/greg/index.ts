import {ConversationType} from 'components/apps/Messages/context/types';
import {
  ContactNames,
  getAvatarFromContacts,
  getColorFromContacts,
} from 'components/apps/Messages/context/usersMapping';

//import panopticon from '@apps/Messages/assets/messages/pantopitcon.jpeg';

export const greg: ConversationType = {
  name: ContactNames.GREG,
  tags: [],
  date: 'January 19th, 2023',
  listContent: "I don't want to talk about that right now",
  heroImage: getAvatarFromContacts(ContactNames.GREG),
  interfaceColor: getColorFromContacts(ContactNames.GREG)[0],
  exchanges: [
    {
      time: 'May 28th, 2019 11:34pm',
      exchanges: [
        {
          name: ContactNames.SELF,
          messages: ['That was very very good last night.'],
        },
        {
          name: ContactNames.GREG,
          messages: ['Agreed, and this morning. '],
        },
        {
          name: ContactNames.GREG,
          messages: ['Just trying to keep it that way'],
        },
      ],
    },
  ],
};
