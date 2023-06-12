import chrisAvatar from '@apps/Messages/assets/avatars/alice_avator.jpg';
import {ConversationType} from 'components/apps/Messages/context/types';
import {
  ContactNames,
  getColorFromContacts,
} from 'components/apps/Messages/context/usersMapping';

//import panopticon from '@apps/Messages/assets/messages/pantopitcon.jpeg';

export const grace_russo: ConversationType = {
  name: ContactNames.GRACE_RUSSO,
  tags: ['sleep', 'government', 'midlife crises', 'astrology'],
  date: 'August 14th, 2022',
  listContent: "I also can't seem to sleep.",
  heroImage: chrisAvatar,
  interfaceColor: getColorFromContacts(ContactNames.GRACE_RUSSO)[0],
  exchanges: [
    {
      time: 'August 14th, 2021 8:04pm',
      exchanges: [
        {
          name: ContactNames.GRACE_RUSSO,
          messages: [
            "Why is half my life/job convincing people that the red tape the government wants is unneeded. The CIA doesn't need fips 140, they use fucking amazon. But here I am spending my lunch hour convincing my team that it makes no sense to backport their services.",
          ],
        },
        {
          name: ContactNames.SELF,
          messages: [
            "I mean... that's been your life since you sold your soul",
          ],
        },
        {
          name: ContactNames.GRACE_RUSSO,
          messages: ['You know my soul is worth way more then they pay me.'],
        },
        {
          name: ContactNames.SELF,
          messages: [
            'I know gurl. 💅',
            "I've been feeling kinda aimless these days",
          ],
        },
      ],
    },
    {
      time: 'August 14th, 2021 8:24pm',
      exchanges: [
        {
          name: ContactNames.GRACE_RUSSO,
          messages: ['What do you mean?'],
        },
        {
          name: ContactNames.SELF,
          messages: ["I'm turning 40 Grace."],
        },
        {
          name: ContactNames.GRACE_RUSSO,
          messages: ['When?'],
        },
        {
          name: ContactNames.SELF,
          messages: [
            "Nov, how many times do I need to remind you that I'm a ♐️",
          ],
        },
        {
          name: ContactNames.GRACE_RUSSO,
          messages: ["I'm a atheist"],
        },
        {
          name: ContactNames.SELF,
          messages: ['Good for you?'],
        },
        {
          name: ContactNames.GRACE_RUSSO,
          messages: ['Astrology has become a gay religion.'],
        },
        {
          name: ContactNames.SELF,
          messages: ["I can't even.", '🫠🫠🫠'],
        },
        {
          name: ContactNames.GRACE_RUSSO,
          messages: ['Why are you feeling this way?'],
        },
        {
          name: ContactNames.SELF,
          messages: [
            'I don\'t know, I really don\'t. I just wake up sometimes and think. "Am I there? Is this what I really wanted."',
          ],
        },
        {
          name: ContactNames.GRACE_RUSSO,
          messages: [
            "We just have less milestones then we used to. If we wanted kids we would be using them to measure our lives. But we don't, so we need other rulers, other goals. Mine is to find my way to a nice beach and get day drunk and a tan by the end of this month.",
          ],
        },
        {
          name: ContactNames.SELF,
          messages: ['So much sand in my ass. I never liked the 🏖︎.'],
        },
        {
          name: ContactNames.GRACE_RUSSO,
          messages: ["I wasn't inviting you. 🤣"],
        },
        {
          name: ContactNames.SELF,
          messages: [
            "I just... I don't know what I want. I never did. And I thought I wanted Matt, maybe I still do. I'm all twisted. I've been twisted for months and I just... I look at my screen and don't even understand the paragraphs I write half the time. I zone out, do my job and  remember nothing of consequence.",
          ],
        },
        {
          name: ContactNames.GRACE_RUSSO,
          messages: [
            "Maybe you're just just burnt out. When did you last take a day off.",
          ],
        },
        {
          name: ContactNames.SELF,
          messages: ['Yesterday. I treat myself well.'],
        },
      ],
    },
    {
      time: 'August 14th, 2021 10:50pm',
      exchanges: [
        {
          name: ContactNames.SELF,
          messages: ["I also can't seem to sleep."],
        },
      ],
    },
  ],
};
