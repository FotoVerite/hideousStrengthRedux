import chrisAvatar from '@apps/Messages/assets/avatars/Chris.jpg';
import {ConversationType} from 'components/apps/Messages/context/types';
import {
  ContactNames,
  getColorFromContacts,
} from 'components/apps/Messages/context/usersMapping';

//import panopticon from '@apps/Messages/assets/messages/pantopitcon.jpeg';

export const clay: ConversationType = {
  name: ContactNames.CLAY,
  tags: [],
  date: 'December 22th, 2022',
  listContent: 'Meet any interesting people?',
  heroImage: chrisAvatar,
  interfaceColor: getColorFromContacts(ContactNames.CLAY)[0],
  exchanges: [
    {
      time: 'December 14, 2020 8:04pm',
      exchanges: [
        {
          name: ContactNames.SELF,
          messages: [`Happy Birthday Dude, been a while`],
        },
        {
          name: ContactNames.CLAY,
          messages: ['Thanks'],
        },
        {
          name: ContactNames.SELF,
          messages: [
            'I miss you being around. Not the same without you in the city.',
          ],
        },
        {
          name: ContactNames.CLAY,
          messages: [
            "I'm going to visiting. I have couches I can crash on. But it's RV life for me for the moment. NY and even SF are suffocating. I wasn't feeling like myself anymore.",
          ],
        },
        {
          name: ContactNames.SELF,
          messages: [
            'I also wanted to apologize for what I said last time we talked',
          ],
        },
        {
          name: ContactNames.SELF,
          messages: [`${ContactNames.CLAY}?`],
        },
      ],
    },
    {
      time: 'December 14, 2020 8:50pm',
      exchanges: [
        {
          name: ContactNames.CLAY,
          messages: ["About how I'm a slut?"],
        },
        {
          name: ContactNames.SELF,
          messages: [
            'No, you are a slut. But I also called you selfish and you got a right to be pissed off over that.',
          ],
        },
        {
          name: ContactNames.CLAY,
          messages: ["...maybe I'm am"],
        },
        {
          name: ContactNames.SELF,
          messages: [
            'It was easier to feel that way when I was with someone before the breakup.',
          ],
        },
        {
          name: ContactNames.CLAY,
          messages: ['And now you remember how dating actually goes.'],
        },
        {
          name: ContactNames.SELF,
          messages: ["It's way worse be honest."],
        },
        {
          name: ContactNames.CLAY,
          messages: ['Are you actually dating?'],
        },
        {
          name: ContactNames.SELF,
          messages: [
            "Depends on the defin no, I'm just fucking around and being dumb.",
          ],
        },
        {
          name: ContactNames.CLAY,
          messages: ['Dumb like me?'],
        },
        {
          name: ContactNames.SELF,
          messages: [
            "No, but I get it at least. These boys are exhausitng. You are still being too risky. PREP doesn't solve everything. There are other things out there besides HIV.",
          ],
        },
        {
          name: ContactNames.CLAY,
          messages: [
            'And there are drugs to cure them',
            "Did you txt to apologize or just sermonize to me yet again on how I'm a bad faggot.",
          ],
        },
        {
          name: ContactNames.SELF,
          messages: ["You know there's something called super gonorrhea"],
        },
        {
          name: ContactNames.CLAY,
          messages: ['My body my choice boo.'],
        },
        {
          name: ContactNames.SELF,
          messages: ['Yeah'],
        },
      ],
    },
    {
      time: 'December 14, 2020 9:02pm',
      exchanges: [
        {
          name: ContactNames.CLAY,
          messages: ['How many notches did you add in the last month'],
        },
        {
          name: ContactNames.SELF,
          messages: ['Five'],
        },
        {
          name: ContactNames.CLAY,
          messages: ['Definitely not the only slut here anymore'],
        },
      ],
    },
    {
      time: 'December 22, 2020 11:05am',
      exchanges: [
        {
          name: ContactNames.SELF,
          messages: ['How goes the Van Life?'],
        },
        {
          name: ContactNames.CLAY,
          messages: [
            'Well, parked outside of Phoenix for the moment. Might head back to Cali to do Joshua for a few weeks.',
          ],
        },
        {
          name: ContactNames.SELF,
          messages: ['Meet any interesting people?'],
        },
      ],
    },
  ],
};
