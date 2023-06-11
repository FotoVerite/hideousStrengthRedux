import {ConversationType} from '../../../context/types';
import zolaAvatar from '@apps/Messages/assets/avatars/Zara.jpg';

//import panopticon from '@apps/Messages/assets/messages/pantopitcon.jpeg';
import panopticon from '@apps/Messages/assets/messages/zola/pantopitcon.jpeg';

import {
  ContactNames,
  getColorFromContacts,
} from '../../../context/usersMapping';
import {advertisementExchange} from './advertisment';
import {skincare} from './skincare';

export const zola: ConversationType = {
  name: ContactNames.ZOLA,
  tags: [ContactNames.ZOLA, 'Zara', 'Hopescope', 'Panopticon', 'Ads', 'Money'],
  date: 'June 24th',
  listContent: 'Hey Zara, We need to talk',
  heroImage: zolaAvatar,
  interfaceColor: getColorFromContacts(ContactNames.ZOLA)[0],
  exchanges: [
    {
      time: 'May 15, 2019 3:00pm',
      exchanges: [
        {
          name: ContactNames.SELF,
          messages: [
            'People misunderstanding what the panopticon was about infuriate to me.',
            '"The panopticon\'s presence is low-key felt. It was notable how easy it was to go through customs: just a passport and face scan, and the door opened with a soft whir that felt like it was designed to emulate Star Trek. could only guess what data was being traversed that substitutes for human surveillance and a round of questioning."',
          ],
        },
        {
          name: ContactNames.ZOLA,
          messages: ['Wha is a panopticon?'],
        },
        {
          name: ContactNames.SELF,
          messages: [
            'Do you want the wikipedia link, or do you want me to butcher the explanation?',
          ],
        },
        {
          name: ContactNames.ZOLA,
          messages: [
            "I just curled up on the windowsill watching the rain. So give me the butcher explanation. They're always more interesting",
          ],
        },
        {
          name: ContactNames.SELF,
          messages: [
            'So the panopticon is a thought experiment created by... by... Jeremy Beramy?',
            "That's not right one sec.",
          ],
        },
        {
          name: ContactNames.ZOLA,
          messages: ["You know it's no fun if you look up the answer."],
        },
      ],
    },

    {
      time: 'May 15, 2019 5:24pm',
      exchanges: [
        {
          name: ContactNames.SELF,
          messages: ['Jeremy Bentham!', 'So the concept is...'],
        },
        {
          name: ContactNames.ZOLA,
          messages: [
            '@_@',
            'Also Jeremy Bearimy.',
            'Am I blonde and Named Eleanor?',
          ],
        },
        {
          name: ContactNames.SELF,
          messages: [
            'I always saw you more as a Chidi.',
            'As I was saying, the concept is of a prison in a shape of a multiple pentagons with a tower in the center of each, around a central tower.',
          ],
        },
        {
          name: ContactNames.SELF,
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
          name: ContactNames.ZOLA,
          messages: [
            "Okay, I'm not really getting... It's about control then.",
          ],
        },
        {
          name: ContactNames.SELF,
          messages: [
            "So Bentham's main goal is how do you get a population to behave with limited man power. You can't watch them at all times. You can't punish them for their transgressions but if you build this sauron's eye that you can't actually be sure if it's on or not you will behave. The prisoners will regulate themselves.",
          ],
        },
        {
          name: ContactNames.ZOLA,
          messages: [
            'Wow, LOTR reference we must be deep in nerd country now.',
          ],
        },
        {
          name: ContactNames.SELF,
          messages: ['Actually more BreadTube'],
        },
        {
          name: ContactNames.ZOLA,
          messages: [
            'So, big brother. 1984 and all that shit? Fashies controlling the population.',
          ],
        },
        {
          name: ContactNames.SELF,
          messages: [
            "Kinda... I mean when we get to the criticism by Foucault, it leans towards that. But Bentham saw this as very helpful. Kinda like a manifestation of Freud's super ego. Though funnily enough Michael Radford created one for film 1984",
          ],
        },
        {
          name: ContactNames.ZOLA,
          messages: ['Why, do you know this?'],
        },
        {
          name: ContactNames.SELF,
          messages: [
            {
              message: 'Liberal Arts Education',
              type: 'string',
              reaction: {name: 'heart', color: 'pink'},
            },
          ],
        },
        {
          name: ContactNames.ZOLA,
          messages: [
            "So I don't get how they're using it incorrectly. Seems like people mostly agree that surveillance is bad. What little I know of Foucault he seems to be against the idea of state control and everything we are seeing happening.",
          ],
        },
        {
          name: ContactNames.SELF,
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
          name: ContactNames.ZOLA,
          messages: ['Hey...  need a favor'],
        },
        {
          name: ContactNames.SELF,
          messages: ['Whats up'],
        },
        {
          name: ContactNames.ZOLA,
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
