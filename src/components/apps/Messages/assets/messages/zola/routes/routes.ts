export enum ZARA_ROUTE_IDS {
  FIRST_MESSAGE_TO_ZARA,
  FOUND_NOTHING,
  WHY_IS_THE_CONTACT_ZOLA,
}

const first_message_options = ['Zara?'] as const;
export type FirstMessageOptionType = (typeof first_message_options)[number];
