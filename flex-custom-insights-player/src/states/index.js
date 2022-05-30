import { combineReducers } from 'redux';

import { reduce as CustomFlexPlayerReducer } from './CustomFlexPlayerState';

// Register your redux store under a unique namespace
export const namespace = 'flex-custom-insights-player';

// Combine the reducers
export default combineReducers({
  customFlexPlayer: CustomFlexPlayerReducer,
});
