import unknownAvatar from '@apps/Messages/assets/avatars/unkown.jpeg';
import {ConversationType} from 'components/apps/Messages/context/types';
import {
  ContactNames,
  getColorFromContacts,
} from 'components/apps/Messages/context/usersMapping';

//import panopticon from '@apps/Messages/assets/messages/pantopitcon.jpeg';

export const seamless: ConversationType = {
  name: ContactNames.SEAMLESS,
  tags: ['Seamless', 'order', 'food', 'hungry', 'grubhub'],
  date: 'June 24th',
  listContent: 'Your Seamless order from Cozy Corner is here!',
  heroImage: unknownAvatar,
  interfaceColor: getColorFromContacts('seamless')[0],
  exchanges: [
    {
      time: 'February 23, 2021 5:00pm',
      exchanges: [
        {
          name: ContactNames.SEAMLESS,
          messages: [
            'Hungry? is preparing your order, to be delivered between 5:48 PM and 5:58 PM. Track your food online or with the Seamless app seamless.app.',
          ],
        },
        {
          name: ContactNames.SEAMLESS,
          messages: [
            'Your order is on the way and will arrive between 5:42 PM and 5:52 PM.',
          ],
        },
        {
          name: ContactNames.SEAMLESS,
          messages: ['Your Seamless driver will arrive with your order soon'],
        },
        {
          name: ContactNames.SEAMLESS,
          messages: ['Your Seamless order from Hungry? is here!'],
        },
      ],
    },

    {
      time: 'March 7, 2021 5:00pm',
      exchanges: [
        {
          name: ContactNames.SEAMLESS,
          messages: [
            'Hungry? is preparing your order, to be delivered between 5:48 PM and 5:58 PM. Track your food online or with the Seamless app seamless.app.',
          ],
        },
        {
          name: ContactNames.SEAMLESS,
          messages: [
            'Your order is on the way and will arrive between 5:32 PM and 5:42 PM.',
          ],
        },
        {
          name: ContactNames.SEAMLESS,
          messages: ['Your Seamless driver will arrive with your order soon'],
        },
        {
          name: ContactNames.SEAMLESS,
          messages: ['Your Seamless order from Hungry? is here!'],
        },
      ],
    },

    {
      time: 'March 10, 2022 5:00pm',
      exchanges: [
        {
          name: ContactNames.SEAMLESS,
          messages: [
            'Cafe @ Klom Klorm is preparing your order, to be delivered between 5:48 PM and 5:58 PM. Track your food online or with the Seamless app seamless.app.',
          ],
        },
        {
          name: ContactNames.SEAMLESS,
          messages: [
            'Your order is on the way and will arrive between 5:32 PM and 5:42 PM.',
          ],
        },
        {
          name: ContactNames.SEAMLESS,
          messages: ['Your Seamless driver will arrive with your order soon'],
        },
        {
          name: ContactNames.SEAMLESS,
          messages: ['Your Seamless order from Cafe @ Klom Klorm is here!'],
        },
      ],
    },
    {
      time: 'March 11, 2021 5:00pm',
      exchanges: [
        {
          name: ContactNames.SEAMLESS,
          messages: [
            'Peach pit is preparing your order, to be delivered between 5:28 PM and 6:05 PM. Track your food online or with the Seamless app seamless.app.',
          ],
        },
        {
          name: ContactNames.SEAMLESS,
          messages: [
            'Your order is on the way and will arrive between 5:32 PM and 5:42 PM.',
          ],
        },
        {
          name: ContactNames.SEAMLESS,
          messages: ['Your Seamless driver will arrive with your order soon'],
        },
        {
          name: ContactNames.SEAMLESS,
          messages: ['Your Seamless order from Peach Pit is here!'],
        },
      ],
    },
    {
      time: 'March 12, 2021 5:10pm',
      exchanges: [
        {
          name: ContactNames.SEAMLESS,
          messages: [
            'Cozy Corner is preparing your order, to be delivered between 5:48 PM and 5:58 PM. Track your food online or with the Seamless app seamless.app.',
          ],
        },
        {
          name: ContactNames.SEAMLESS,
          messages: [
            'Your order is on the way and will arrive between 5:32 PM and 5:42 PM.',
          ],
        },
        {
          name: ContactNames.SEAMLESS,
          messages: ['Your Seamless driver will arrive with your order soon'],
        },
        {
          name: ContactNames.SEAMLESS,
          messages: ['Your Seamless order from Cozy Corner is here!'],
        },
      ],
    },
  ],
};
