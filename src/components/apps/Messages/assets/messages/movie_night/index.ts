import darkoAvatar from '@apps/Messages/assets/avatars/donnie-darko.jpg';
import {
  ContactNames,
  getColorFromContacts,
} from 'components/apps/Messages/context/usersMapping';

export const movieNight = {
  name: 'Movie Night',
  tags: ['Seamless', 'order', 'food', 'hungry', 'grubhub'],
  date: 'June 24th',
  listContent: 'Zoolander?',
  heroImage: darkoAvatar,
  interfaceColor: getColorFromContacts('movieNight')[0],
  group: true,
  exchanges: [
    {
      time: 'Feb 10, 2021 5:00pm',
      exchanges: [
        {
          name: ContactNames.ARIAL,
          messages: ["Can't make it this time."],
        },
        {
          name: ContactNames.SELF,
          messages: ['I wish you could'],
        },
        {
          name: ContactNames.ARIAL,
          messages: ['I Know.'],
        },
        {
          name: ContactNames.ZOLA,
          messages: [
            'I miss you girl. You at least have time for a wine hang soonish?',
          ],
        },
        {
          name: ContactNames.ARIAL,
          messages: ['Hopefully. Everything has me feeling a bit ground down.'],
        },
        {
          name: ContactNames.CHRIS,
          messages: ['O, the new Ben Whetly movie is streaming.'],
        },
      ],
    },
    {
      time: 'April 16, 2021 5:00pm',
      exchanges: [
        {
          name: ContactNames.CHRIS,
          messages: ['O, the new Ben Whetly movie is streaming'],
        },
        {
          name: ContactNames.ZOLA,
          messages: ['In the Earth? Looks a bit like an ecological cult movie'],
        },
        {
          name: ContactNames.SELF,
          messages: [
            "There's only seven actors on IMDB. It was shot at the hight of the Pandemic. I really doubt they could do a good cult movie",
          ],
        },
        {
          name: ContactNames.CHRIS,
          messages: ["You don't need that many people for a cult"],
        },
        {
          name: ContactNames.SELF,
          messages: ['I need something old school'],
        },
      ],
    },
    {
      time: 'May 25, 2021 3:22pm',
      exchanges: [
        {
          name: ContactNames.ARIAL,
          messages: ["I can't make it this time either."],
        },
        {
          name: ContactNames.ZOLA,
          messages: ["I can't also"],
        },
        {
          name: ContactNames.CHRIS,
          messages: ["I'm still in"],
        },
        {
          name: ContactNames.SELF,
          messages: ['Going to just be the two of us then'],
        },
        {
          name: ContactNames.CHRIS,
          messages: [
            'Good, only you could deal with Beyond the Black Rainbow.',
          ],
        },
        {
          name: ContactNames.SELF,
          messages: ['Yes, I am a masochists'],
        },
      ],
    },
    {
      time: 'August 14, 2021 3:52pm',
      exchanges: [
        {
          name: ContactNames.ZOLA,
          messages: ["It's time toooo movie night!"],
        },
        {
          name: ContactNames.CHRIS,
          messages: [
            'Is this where we draw a smiley face on or hands and do a group huddle before we are sent to the shadow zone.',
          ],
        },
        {
          name: ContactNames.ZOLA,
          messages: ['It is a symbol of friendship'],
        },
        {
          name: ContactNames.SELF,
          messages: ['Weeeeeb'],
        },
        {
          name: ContactNames.ZOLA,
          messages: ["Seriously, I'm bored and climbing the walls"],
        },
        {
          name: ContactNames.CHRIS,
          messages: ['Sounds like a normal Saturday night for you'],
        },
        {
          name: ContactNames.ZOLA,
          messages: [
            'No, normally I have more 🍷. And actual witty repertoire to keep me amused',
          ],
        },
        {
          name: ContactNames.SELF,
          messages: [
            'Sorry, work has kept me busy gurl.',
            'That and setting up the new office.',
          ],
        },
        {
          name: ContactNames.ZOLA,
          messages: [
            "You need to send photos of that soon. I'm pretty sure you haven't event started to decorate it properly",
          ],
        },
        {
          name: ContactNames.SELF,
          messages: ['At least I cabled managed'],
        },
        {
          name: ContactNames.CHRIS,
          messages: ['I want to see a new horror film'],
        },
        {
          name: ContactNames.ZOLA,
          messages: [
            "It's always horror with you. We've done six of them in a row",
          ],
        },
        {
          name: ContactNames.CHRIS,
          messages: ['We have not!'],
        },
        {
          name: ContactNames.ZOLA,
          messages: [
            'In the Earth.',
            'A Field in England.',
            'Susperia Both Versions',
            'A Dark Song',
          ],
        },
        {
          name: ContactNames.CHRIS,
          messages: ['I count only five'],
        },
        {
          name: ContactNames.ZOLA,
          messages: ['The Tenet'],
        },
        {
          name: ContactNames.SELF,
          messages: ['Point'],
        },
        {
          name: ContactNames.ARIAL,
          messages: ['I actually might have time this month'],
        },
        {
          name: ContactNames.CHRIS,
          messages: ['Clair letting you out for the night'],
        },
        {
          name: ContactNames.ARIAL,
          messages: ["She ain't my keeper!"],
        },
        {
          name: ContactNames.CHRIS,
          messages: [
            "Is that why you've only made it twice in the last six months",
          ],
        },
        {
          name: ContactNames.ARIAL,
          messages: ["I've been busy."],
        },
        {
          name: ContactNames.CHRIS,
          messages: ['With Clair'],
        },
        {
          name: ContactNames.SELF,
          messages: ['Chris lay the fuck off'],
        },
        {
          name: ContactNames.CHRIS,
          messages: ["I'm just saying the obvious. 💁‍♀️"],
        },
        {
          name: ContactNames.SELF,
          messages: ['Why did I ever show you that emoji'],
        },
        {
          name: ContactNames.ZOLA,
          messages: ['Zoolander?'],
        },
      ],
    },
  ],
};
