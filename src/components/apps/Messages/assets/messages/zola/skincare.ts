import {ContactNames} from 'components/apps/Messages/context/usersMapping';
import {ConversationExchangeType} from '../../../context/types';

export const skincare: ConversationExchangeType = {
  time: 'June 20, 2021 2:00pm',
  exchanges: [
    {
      name: ContactNames.ZOLA,
      messages: [
        "Well you know me, enthusiastic to a fault. And you know I'm just dying to get some eye shadow on those deep-set eyes of yours",
      ],
    },
    {
      name: ContactNames.SELF,
      messages: [
        'Deep-set, Thanks. 🙃',
        "And no makeup, you know I'm not that faggy right. I wouldn't know a makeup brush from a hair brush. I just need a bit of help with my skin. Matt remarked about it",
      ],
    },
    {
      name: ContactNames.ZOLA,
      messages: [
        "With how you wear your hair I don't doubt that.",
        "And Matt thinks you very cute you're overreacting",
      ],
    },
    {
      name: ContactNames.SELF,
      messages: [
        {
          type: 'string',
          message: "I know I'm cute. God damn spend enough time at the gym.",
          reaction: {name: 'heart', color: '#f487d3'},
        },
      ],
    },
    {
      name: ContactNames.ZOLA,
      messages: [
        {
          type: 'string',
          message:
            "Well your confidence is intact. The gym is no place to train one's skin though",
          reaction: {name: 'thumbs-down', color: '#c22036'},
        },
      ],
    },
    {
      name: ContactNames.SELF,
      messages: ['🙃💁‍♀️', 'Are you done.'],
    },
    {
      name: ContactNames.ZOLA,
      messages: [
        "No, I've been waiting for years for you to finally take care of yourself. I've think I've gotten a million subscribers while waiting for you to even listen to me to wear sunscreen.",
      ],
    },
    {
      name: ContactNames.SELF,
      messages: ["I know, I know, you're best friend is your sunscreen"],
    },
    {
      name: ContactNames.ZOLA,
      messages: ["It's SPF is your BFF. Do you even watch my videos?"],
    },
    {
      name: ContactNames.SELF,
      messages: ['You post one every day girl.'],
    },
    {
      name: ContactNames.ZOLA,
      messages: ["I know, I'm a slave to the algorithm."],
    },
  ],
};