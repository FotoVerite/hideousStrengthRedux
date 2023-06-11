import {ConversationType} from '../../context/types';
import chrisAvatar from '@apps/Messages/assets/avatars/Chris.jpg';
import {ContactNames, getColorFromContacts} from '../../context/usersMapping';

//import panopticon from '@apps/Messages/assets/messages/pantopitcon.jpeg';

export const chris: ConversationType = {
  name: ContactNames.CHRIS,
  tags: [],
  date: 'June 24th',
  listContent: 'Hey Zara, We need to talk',
  heroImage: chrisAvatar,
  interfaceColor: getColorFromContacts(ContactNames.CHRIS)[0],
  exchanges: [
    {
      time: 'February 23, 2023 11:00pm',
      exchanges: [
        {
          name: ContactNames.CHRIS,
          messages: ['Hey...  need a favor'],
        },
        {
          name: 'Self',
          messages: ['Whats 🙄 🙄 hellow up 🙄'],
        },
        {
          name: ContactNames.CHRIS,
          messages: ['Just Call'],
        },
      ],
    },

    {
      time: 'June 24, 2023 5:00am',
      exchanges: [
        {
          name: ContactNames.SELF,
          messages: ['Hey Zara, We need to talk'],
        },
      ],
    },
  ],
};
