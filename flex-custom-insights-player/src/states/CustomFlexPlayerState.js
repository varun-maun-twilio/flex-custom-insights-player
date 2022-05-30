const ACTION_DISMISS_CUSTOM_FLEX_PLAYER = 'DISMISS_CUSTOM_FLEX_PLAYER';
const ACTION_OPEN_CUSTOM_FLEX_PLAYER = 'OPEN_CUSTOM_FLEX_PLAYER';

const initialState = {
  isOpen: false,
  mediaUrl:null
};

export class Actions {
  static dismissCustomFlexPlayer = () => ({ type: ACTION_DISMISS_CUSTOM_FLEX_PLAYER });
  static openCustomFlexPlayer = (mediaUrl) => ({ type: ACTION_OPEN_CUSTOM_FLEX_PLAYER , mediaUrl});
}

export function reduce(state = initialState, action) {
  // eslint-disable-next-line sonarjs/no-small-switch
  switch (action.type) {
    case ACTION_DISMISS_CUSTOM_FLEX_PLAYER: {
      return {
        ...state,
        isOpen: false,
      };
    }

    case ACTION_OPEN_CUSTOM_FLEX_PLAYER: {
      return {
        ...state,
        isOpen: true,
        mediaUrl:action.mediaUrl
      };
    }

    default:
      return state;
  }
}
