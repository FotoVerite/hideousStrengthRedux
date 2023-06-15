import {TextBoxDialoguesType} from 'components/TextBoxEngine/context/types';
import {ContactNames} from 'components/apps/Messages/context/usersMapping';

//import panopticon from '@apps/Messages/assets/messages/pantopitcon.jpeg';

export const testScript: TextBoxDialoguesType = {
  id: ContactNames.ALICE,
  screenConfiguration: {
    fadeInDelay: 2000,
  },
  dialogues: [
    {name: ContactNames.ALICE, content: 'This is the first screen'},
    {name: ContactNames.ALICE, content: 'This is the second screen'},
    {name: ContactNames.ALICE, content: 'This is the third screen'},
  ],
};
