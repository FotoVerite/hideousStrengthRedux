import {ConversationType} from '../../../context/types';
import zolaAvatar from '@apps/Messages/assets/avatars/Zara.jpg';

//import panopticon from '@apps/Messages/assets/messages/pantopitcon.jpeg';
import panopticon from '@apps/Messages/assets/messages/zola/pantopitcon.jpeg';

import {
  CONTACT_NAMES,
  getColorFromContacts,
} from '../../../context/usersMapping';
import {advertisementExchange} from './advertisment';
import {skincare} from './skincare';
import {ZaraOrZolaRoute} from './routes/zolaOrZora';

export const zola: ConversationType = {
  name: CONTACT_NAMES.ZOLA,
  tags: [CONTACT_NAMES.ZOLA, 'Zara', 'Hopescope', 'Panopticon', 'Ads', 'Money'],
  date: 'June 24th',
  listContent: 'Hey Zara, We need to talk',
  heroImage: zolaAvatar,
  interfaceColor: getColorFromContacts(CONTACT_NAMES.ZOLA)[0],
  routes: [ZaraOrZolaRoute],
  exchanges: [
    {
      time: 'May 15, 2019 3:00pm',
      exchanges: [
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            'People misunderstanding what the panopticon was about infuriate to me.',
            '"The panopticon\'s presence is low-key felt. It was notable how easy it was to go through customs: just a passport and face scan, and the door opened with a soft whir that felt like it was designed to emulate Star Trek. could only guess what data was being traversed that substitutes for human surveillance and a round of questioning."',
          ],
        },
        {
          name: CONTACT_NAMES.ZOLA,
          messages: ['Wha is a panopticon?'],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            'Do you want the wikipedia link, or do you want me to butcher the explanation?',
          ],
        },
        {
          name: CONTACT_NAMES.ZOLA,
          messages: [
            "I just curled up on the windowsill watching the rain. So give me the butcher explanation. They're always more interesting",
          ],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            'So the panopticon is a thought experiment created by... by... Jeremy Beramy?',
            "That's not right one sec.",
          ],
        },
        {
          name: CONTACT_NAMES.ZOLA,
          messages: ["You know it's no fun if you look up the answer."],
        },
      ],
    },

    {
      time: 'May 15, 2019 5:24pm',
      exchanges: [
        {
          name: CONTACT_NAMES.SELF,
          messages: ['Jeremy Bentham!', 'So the concept is...'],
        },
        {
          name: CONTACT_NAMES.ZOLA,
          messages: [
            '@_@',
            'Also Jeremy Bearimy.',
            'Am I blonde and Named Eleanor?',
          ],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            'I always saw you more as a Chidi.',
            'As I was saying, the concept is of a prison in a shape of a multiple pentagons with a tower in the center of each, around a central tower.',
          ],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            {
              type: 'string',
              message:
                'In the tower there can be a warden looking in on the prisoners. But from the prisoners point of view there is no way to know if they are being watched or the tower is empty?.',
            },
            {
              type: 'image',
              message: panopticon,
            },
          ],
        },
        {
          name: CONTACT_NAMES.ZOLA,
          messages: [
            "Okay, I'm not really getting... It's about control then.",
          ],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            "So Bentham's main goal is how do you get a population to behave with limited man power. You can't watch them at all times. You can't punish them for their transgressions but if you build this sauron's eye that you can't actually be sure if it's on or not you will behave. The prisoners will regulate themselves.",
          ],
        },
        {
          name: CONTACT_NAMES.ZOLA,
          messages: [
            'Wow, LOTR reference we must be deep in nerd country now.',
          ],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ['Actually more BreadTube'],
        },
        {
          name: CONTACT_NAMES.ZOLA,
          messages: [
            'So, big brother. 1984 and all that shit? Fashies controlling the population.',
          ],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            "Kinda... I mean when we get to the criticism by Foucault, it leans towards that. But Bentham saw this as very helpful. Kinda like a manifestation of Freud's super ego. Though funnily enough Michael Radford created one for film 1984",
          ],
        },
        {
          name: CONTACT_NAMES.ZOLA,
          messages: ['Why, do you know this?'],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            {
              message: 'Liberal Arts Education',
              type: 'string',
              reaction: {name: 'heart', color: 'pink'},
            },
          ],
        },
        {
          name: CONTACT_NAMES.ZOLA,
          messages: [
            "So I don't get how they're using it incorrectly. Seems like people mostly agree that surveillance is bad. What little I know of Foucault he seems to be against the idea of state control and everything we are seeing happening.",
          ],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: [
            "You misunderstand... It's not that I think the panopticon is good. It's just that the idea is you don't know that anyone is watching you with the panopticon, and we definitely know they are watching at all times.",
          ],
        },
      ],
    },
    advertisementExchange,
    skincare,

    {
      time: 'June 23, 2023 11:00pm',
      exchanges: [
        {
          name: CONTACT_NAMES.ZOLA,
          messages: ['Hey...  need a favor'],
        },
        {
          name: CONTACT_NAMES.SELF,
          messages: ['Whats up'],
        },
        {
          name: CONTACT_NAMES.ZOLA,
          messages: ['Just Call'],
        },
      ],
    },
    {
      time: 'June 24, 2023 5:00am',
      exchanges: [
        {
          name: CONTACT_NAMES.SELF,
          messages: ['Hey Zara, We need to talk'],
        },
      ],
    },
  ],
};
