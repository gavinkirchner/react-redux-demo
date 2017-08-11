import * as types from '../actions/actionTypes';
import intitalState from './initialState';

export default function courseReducer(state = intitalState.courses, action) {
  switch (action.type) {
    // case types.CREATE_COURSE:
    //   return [...state, Object.assign({}, state, action.course)];

    case types.LOAD_COURSES_SUCCESS:
      return action.courses;

    default:
      return state;
  }
}