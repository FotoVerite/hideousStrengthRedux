import chrisAvatar from '@apps/Messages/assets/avatars/Chris.jpg';
import coil from '@apps/Messages/assets/messages/chris/coil.jpeg';

import {ConversationType} from 'components/apps/Messages/context/types';
import {
  ContactNames,
  getColorFromContacts,
} from 'components/apps/Messages/context/usersMapping';

//import panopticon from '@apps/Messages/assets/messages/pantopitcon.jpeg';

export const chris: ConversationType = {
  name: ContactNames.CHRIS,
  tags: [],
  date: 'June 15th 2022',
  listContent: 'Have You?',
  heroImage: chrisAvatar,
  interfaceColor: getColorFromContacts(ContactNames.CHRIS)[0],
  exchanges: [
    {
      time: 'September 28th 2021 3:00pm',
      exchanges: [
        {
          name: ContactNames.CHRIS,
          messages: ['What about Hellraiser?'],
        },
        {
          name: ContactNames.SELF,
          messages: ["That's a good one. I don't think Zara seen it before."],
        },
        {
          name: ContactNames.CHRIS,
          messages: ['Why do you care so much about her?'],
        },
        {
          name: ContactNames.SELF,
          messages: [
            "Cause she's the scardy cat of the group. And it's no fun if nobody screams at the gruesome parts.",
          ],
        },
        {
          name: ContactNames.SELF,
          messages: [
            {type: 'string', message: 'Funny thing about Hellraiser.'},
            {type: 'image', message: coil},
          ],
        },
        {
          name: ContactNames.CHRIS,
          messages: [
            'Here we go. Okay',
            "I'll humor you what does Coil have to do with bloody Hellraiser.",
          ],
        },
        {
          name: ContactNames.SELF,
          messages: [
            'So Clive Barker actually was friends with Stephen Thrower',
          ],
        },
        {
          name: ContactNames.CHRIS,
          messages: ['Who is?...............', '8=================D'],
        },
        {
          name: ContactNames.SELF,
          messages: ['Oh my god dude, grow up.'],
        },
        {
          name: ContactNames.CHRIS,
          messages: [
            "You're the one sending album covers covered in dick and balls",
          ],
        },
        {
          name: ContactNames.SELF,
          messages: [
            'One dick and balls',
            'Anyway Stephen Thrower was one of the members of Coil',
          ],
        },
        {
          name: ContactNames.CHRIS,
          messages: ['Like the synth guy or'],
        },
        {
          name: ContactNames.SELF,
          messages: [
            "They didn't work like that. They were all very collaborative, AND YOU'RE TRYING TO SIDETRACK ME!!!",
          ],
        },
        {
          name: ContactNames.CHRIS,
          messages: [
            {type: 'string', message: 'Guilty'},
            {type: 'emoji', message: '😈'},
          ],
        },
        {
          name: ContactNames.SELF,
          messages: [
            'So, Stephen Tower was friends with Barker and decided to introduce him to them. He vibed with the sound and contracted them to make the soundtrack for Hellraiser.',
          ],
        },
        {
          name: ContactNames.CHRIS,
          messages: [
            'Coil did not do the soundtrack, that was Christopher Young',
          ],
        },
        {
          name: ContactNames.SELF,
          messages: [
            'Yes, the studio wanted something more commercial. You can find their version online as the Unreleased Themes for Hellraiser',
          ],
        },
        {
          name: ContactNames.CHRIS,
          messages: ['Interesting'],
        },
        {
          name: ContactNames.SELF,
          messages: [
            'Stephen was also really interested in Body Modification. Had lots of Magazines he showed Barker. Probably had a lot of influence on how the Cenobites developed visually.',
          ],
        },
        {
          name: ContactNames.SELF,
          messages: [
            'I think you are underestimating the world building he did in the Hell Bound Heart',
          ],
        },
        {
          name: ContactNames.SELF,
          messages: [
            'They were friends when he was writing it. This was 1985.',
          ],
        },
        {
          name: ContactNames.SELF,
          messages: ["When do you think we'll first hear Zola scream?"],
        },
      ],
    },
    {
      time: 'November 12th 2021 4:12pm',
      exchanges: [
        {
          name: ContactNames.CHRIS,
          messages: ['Motherfucker, last week has been grueling'],
        },
        {
          name: ContactNames.SELF,
          messages: ["You're the one who chose to work at Google."],
        },
        {
          name: ContactNames.CHRIS,
          messages: ['What can I say I like money'],
        },
        {
          name: ContactNames.SELF,
          messages: ['Was it wart it?'],
        },
        {
          name: ContactNames.SELF,
          messages: ['Worth it?'],
        },
        {
          name: ContactNames.CHRIS,
          messages: ['Yes', '💰💰💰'],
        },
        {
          name: ContactNames.SELF,
          messages: ['Okay Faust'],
        },
        {
          name: ContactNames.CHRIS,
          messages: ['Who?'],
        },
        {
          name: ContactNames.SELF,
          messages: ['Faust? Goethe Faust? Made a deal with the devil.'],
        },
        {
          name: ContactNames.CHRIS,
          messages: ['Like the devil went down to George?'],
        },
        {
          name: ContactNames.SELF,
          messages: [{type: 'emoji', message: '🙁'}],
        },
        {
          name: ContactNames.CHRIS,
          messages: [
            "I'm sorry that my low brow STEM masters of science does not have all these references.",
            'Also I have time tomorrow if you want to come over?',
          ],
        },
        {
          name: ContactNames.SELF,
          messages: ['Just watch something? 😈'],
        },
        {
          name: ContactNames.CHRIS,
          messages: ["I mean... I've been thinking about this."],
        },
      ],
    },
    {
      time: 'November 15th 2021 9:12am',
      exchanges: [
        {
          name: ContactNames.CHRIS,
          messages: ['Are you going to be weird about last night?'],
        },
        {
          name: ContactNames.SELF,
          messages: [
            "Only if you are? I mean it's on me. I know that. I'm the responsible one of the group and here I am still shitfaced 3pm the next day",
          ],
        },
      ],
    },
    {
      time: 'June 15th 2022 10:20am',
      exchanges: [
        {
          name: ContactNames.CHRIS,
          messages: ['You should come with us to the Liberation march.'],
        },
        {
          name: ContactNames.SELF,
          messages: ["It's not my scene you know that. Never was."],
        },
        {
          name: ContactNames.CHRIS,
          messages: ['I could use the support you know.'],
        },
        {
          name: ContactNames.SELF,
          messages: [
            "Dude, don't put that on me. And I have been supportive. You know that.",
          ],
        },
        {
          name: ContactNames.CHRIS,
          messages: ['Have you?'],
        },
      ],
    },
  ],
};
