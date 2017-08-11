import * as types from '../actions/actionTypes';
import initialState from './initialState';

// since all of our actionTypes for successful calls end in "SUCCESS" we
// can use that convention to determine when something is complete instead
// of creating a completion action explicitly
function isSuccessfulAjaxAction(action) {
  return action.type.substring(action.type.length - 8) == '_SUCCESS';
}

export default function ajaxStatusReducer(state = initialState.numAjaxCallsInProgress, action) {
  if (action.type == types.BEGIN_AJAX_CALL) {
    return state + 1;
  } else if (isSuccessfulAjaxAction(action)) {
    return state - 1;
  }

  return state;
}