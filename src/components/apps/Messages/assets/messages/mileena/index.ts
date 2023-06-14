import {ConversationType} from 'components/apps/Messages/context/types';
import {
  ContactNames,
  getAvatarFromContacts,
  getColorFromContacts,
} from 'components/apps/Messages/context/usersMapping';

//import panopticon from '@apps/Messages/assets/messages/pantopitcon.jpeg';

export const mileena: ConversationType = {
  name: ContactNames.MILEENA,
  tags: [],
  date: 'January 19th, 2023',
  listContent: "I don't want to talk about that right now",
  heroImage: getAvatarFromContacts(ContactNames.MILEENA),
  interfaceColor: getColorFromContacts(ContactNames.MILEENA)[0],
  exchanges: [
    {
      time: 'May 27th, 2019 5:34pm',
      exchanges: [
        {
          name: ContactNames.MILEENA,
          messages: ["You're coming to my show right?"],
        },
        {
          name: ContactNames.SELF,
          messages: ['Have I missed one yet?'],
        },
        {
          name: ContactNames.MILEENA,
          messages: ['Just trying to keep it that way'],
        },
      ],
    },
    {
      time: 'May 28th, 2019 4:34am',
      exchanges: [
        {
          name: ContactNames.MILEENA,
          messages: [
            'Yooo... who was that cutie that you were macking on after my set?',
          ],
        },
        {
          name: ContactNames.SELF,
          messages: ['After?'],
        },
        {
          name: ContactNames.MILEENA,
          messages: [
            "Boy don't play",
            'Do you want me to come after you for missing half of my songs?',
            'I saw you making googoo eyes the moment you got into the bar.',
          ],
        },
        {
          name: ContactNames.SELF,
          messages: [
            'Googoo eyes... Yes, he is the Bees Knees. Simply berries',
          ],
        },
        {
          name: ContactNames.MILEENA,
          messages: ['So'],
        },
        {
          name: ContactNames.SELF,
          messages: [
            "You waiting for a fuck play by play? Gurl I know you like to go deep with your escapade but that's not me",
          ],
        },
        {
          name: ContactNames.SELF,
          messages: ["C'mon nothing"],
        },
        {
          name: ContactNames.MILEENA,
          messages: ['That double entendre is shit and you know it.'],
        },
        {
          name: ContactNames.SELF,
          messages: [
            "Look he's sleeping next to me and I'm trying to get enough rest for a round two before eggs. ",
          ],
        },
        {
          name: ContactNames.MILEENA,
          messages: ['Name at least?'],
        },
        {
          name: ContactNames.SELF,
          messages: ['Greg'],
        },
      ],
    },
    {
      time: 'June 5th, 2019 11:28am',
      exchanges: [
        {
          name: ContactNames.SELF,
          messages: [
            "You're cousin is so cute",
            'Seeing him do downward dog almost warms my cold selfish heart enough to want kids',
          ],
        },
        {
          name: ContactNames.MILEENA,
          messages: [
            'I know, I love him so much.',
            'I wish I could see him more but work, band, life.',
          ],
        },
        {
          name: ContactNames.SELF,
          messages: [
            'You get up to Beantown a good amount.',
            'I really need to go with you sometime I need me some good seafood.',
          ],
        },
        {
          name: ContactNames.MILEENA,
          messages: ["I don't know if you can hang with my folks"],
        },
        {
          name: ContactNames.SELF,
          messages: ['Mmm is it the gay or the white'],
        },
        {
          name: ContactNames.MILEENA,
          messages: [
            'Neither',
            'How much twitter you reading to ask such a fucking dumb question',
            'My parents having issues with gay people, white people',
            'The sheer caucasity',
            "You couldn't keep up with my dad he does 30 miles a day on his bike.",
          ],
        },
        {
          name: ContactNames.SELF,
          messages: [
            'Okay, point taken',
            "You don't talk about them that much you know. Mostly your brothers",
            'And I do remember you not wanting to talk about your girlfriend back in college',
          ],
        },
        {
          name: ContactNames.MILEENA,
          messages: ['Ten years ago'],
        },
        {
          name: ContactNames.SELF,
          messages: [
            'Yeah back when you literally thought dicks were over a foot long',
            "What was it you asked? How do they not hit the seat when they're pissing",
          ],
        },
        {
          name: ContactNames.MILEENA,
          messages: ['Six inches.', 'Sheltered Boarding School Girl'],
        },
        {
          name: ContactNames.SELF,
          messages: ['Sheltered European Boarding School Girl'],
        },
        {
          name: ContactNames.MILEENA,
          messages: ['Yeah yeah, but Imma a fast tailed girl now.'],
        },
        {
          name: ContactNames.SELF,
          messages: [
            'How many times do I need to apologize for using that slang',
          ],
        },
        {
          name: ContactNames.MILEENA,
          messages: [
            'Forever, I think I heard three other black people actually use that term without making fun of it. Where did you even hear it some low grade blog post on huffington',
            'Be like one of the black israelites calling me red bone. Just fucking corny',
          ],
        },
        {
          name: ContactNames.SELF,
          messages: [
            'I think probably Salon. Back before Greenwald was a right wing cuck.',
          ],
        },
      ],
    },
    {
      time: 'July 2nd, 2019 3:21pm',
      exchanges: [
        {
          name: ContactNames.MILEENA,
          messages: ['You want to come to the 🏖️'],
        },
        {
          name: ContactNames.SELF,
          messages: ["I don't like sand"],
        },
        {
          name: ContactNames.MILEENA,
          messages: [
            "But you like sun, and I know you've been wanting to show off those guns you've been workign on all winter.",
          ],
        },
        {
          name: ContactNames.SELF,
          messages: [
            'It’s coarse, and rough, and irritating, and it gets everywhere',
          ],
        },
        {
          name: ContactNames.MILEENA,
          messages: [
            'Yes, we get it you hate sand. Why are you sounding like a whiney bitch of all a sudden',
          ],
        },
        {
          name: ContactNames.SELF,
          messages: [{type: 'emoji', message: '🥲'}],
        },
      ],
    },
  ],
};
