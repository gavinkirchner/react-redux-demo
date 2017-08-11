import * as types from '../actions/actionTypes';
import intitalState from './initialState';

export default function authorReducer(state = intitalState.authors, action) {
  switch (action.type) {

    case types.LOAD_AUTHORS_SUCCESS:
      return action.authors;

    default:
      return state;
  }
}