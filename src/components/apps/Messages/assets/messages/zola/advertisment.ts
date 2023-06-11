import {ContactNames} from 'components/apps/Messages/context/usersMapping';
import {ConversationExchangeType} from '../../../context/types';

//import panopticon from '@apps/Messages/assets/messages/pantopitcon.jpeg';

export const advertisementExchange: ConversationExchangeType = {
  time: 'May 20, 2021 2:00pm',
  exchanges: [
    {
      name: ContactNames.ZOLA,
      messages: ['View down again this month. I have no idea what to do'],
    },
    {
      name: ContactNames.SELF,
      messages: ['What changed'],
    },
    {
      name: ContactNames.ZOLA,
      messages: [
        "Fuck if I know. I've combed my comments,checked my discord, scoped my competition.",
        "It isn't my content. I'm just not growing 🌝 enough.",
      ],
    },
    {
      name: ContactNames.SELF,
      messages: ['Have you tried having your thumbnails you with an O face.'],
    },
    {
      name: ContactNames.ZOLA,
      messages: [
        {type: 'emoji', message: '🙄'},
        "I don't want to give 2019 attitude. Maybe I'll start doing livestreams in a hot tub",
      ],
    },
    {
      name: ContactNames.SELF,
      messages: ['Would it hurt.'],
    },
    {
      name: ContactNames.ZOLA,
      messages: [
        'Sadly, probably not. I wish I could just block all the misogynistic creeps who watch me as jack-off material.',
        "It's fucking makeup and nails, I'm not doing squats in tights like hopescope.",
        'Not that she deserves it either.',
      ],
    },
    {
      name: ContactNames.SELF,
      messages: [
        "Hopescope/Tights, now we truly are in 2019. Isn't she doing lost luggages reviews now.",
      ],
    },
    {
      name: ContactNames.ZOLA,
      messages: [
        'Starting to.',
        'Probably a pivot, she saturated the market. Ugh I wish I could grind as hard as her.',
        'Doing a video a week is destroying me',
      ],
    },

    {
      name: ContactNames.ZOLA,
      messages: ['Get dinner with me, I need to stop looking at my metrics'],
    },
  ],
};
