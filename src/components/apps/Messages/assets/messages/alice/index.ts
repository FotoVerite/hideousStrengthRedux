import aliceAvatar from '@apps/Messages/assets/avatars/alice_avator.jpg';
import metroidDread from '@apps/Messages/assets/messages/alice/MetroidDread.jpeg';
import {ConversationType} from 'components/apps/Messages/context/types';
import {
  ContactNames,
  getColorFromContacts,
} from 'components/apps/Messages/context/usersMapping';

//import panopticon from '@apps/Messages/assets/messages/pantopitcon.jpeg';

export const alice: ConversationType = {
  name: ContactNames.ALICE,
  tags: ['sleep', 'games', 'metroid'],
  date: 'August 14th, 2022',
  listContent: "I don't want to talk about that right now",
  heroImage: aliceAvatar,
  interfaceColor: getColorFromContacts(ContactNames.ALICE)[0],
  exchanges: [
    {
      time: 'August 14th, 2022 7:04pm',
      exchanges: [
        {
          name: ContactNames.ALICE,
          messages: [
            {type: 'string', message: `And done!`},
            {type: 'image', message: metroidDread},
          ],
        },
        {
          name: ContactNames.SELF,
          messages: ['Nice, how long did it take you'],
        },
        {
          name: ContactNames.ALICE,
          messages: ['Eight and change'],
        },
        {
          name: ContactNames.SELF,
          messages: ['You going to try hard mode?'],
        },
        {
          name: ContactNames.ALICE,
          messages: ['Fuck no, I got other games to play'],
        },
        {
          name: ContactNames.SELF,
          messages: ["I'm still at the boss that controls the Lava Machine"],
        },
        {
          name: ContactNames.ALICE,
          messages: ["I'm sorry I've been distant. A lot of my mind."],
        },
        {
          name: ContactNames.SELF,
          messages: ["We talked about that last week. It's okay"],
        },
        {
          name: ContactNames.ALICE,
          messages: [
            'I know, but you were going through a lot and I just kinda let our friendship slide. ',
          ],
        },
        {
          name: ContactNames.SELF,
          messages: [
            "Nobody can save you but yourself. I have my therapist. My issues shouldn't be dumped on my friends like that",
          ],
        },
        {
          name: ContactNames.ALICE,
          messages: [
            'Fuck that. What else are friends for. You still having those night terrors?',
          ],
        },
        {
          name: ContactNames.SELF,
          messages: ["I don't want to talk about that right now."],
        },
      ],
    },
  ],
};
