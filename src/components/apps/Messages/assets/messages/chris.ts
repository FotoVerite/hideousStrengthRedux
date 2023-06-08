import {ConversationType} from '../../context/types';
import zolaAvatar from '@apps/Messages/assets/avatars/Zara.jpg';

//import panopticon from '@apps/Messages/assets/messages/pantopitcon.jpeg';
import panopticon from '@apps/Messages/assets/avatars/Chris.jpg';

import {userMapping} from '../../context/usersMapping';

export const chris: ConversationType = {
  name: 'Chris',
  tags: [],
  date: 'June 24th',
  listContent: 'Hey Zara, We need to talk',
  heroImage: zolaAvatar,
  interfaceColor: userMapping.get('Chris')!.colors[1],
  exchanges: [
    {
      time: 'February 23, 2023 11:00pm',
      exchanges: [
        {
          name: 'Zola',
          messages: ['Hey...  need a favor'],
        },
        {
          name: 'Self',
          messages: ['Whats up'],
        },
        {
          name: 'Zola',
          messages: ['Just Call'],
        },
      ],
    },

    {
      time: 'June 24, 2023 5:00am',
      exchanges: [
        {
          name: 'Self',
          messages: ['Hey Zara, We need to talk'],
        },
      ],
    },
  ],
};
