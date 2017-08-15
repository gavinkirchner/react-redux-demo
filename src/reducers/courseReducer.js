import * as types from '../actions/actionTypes';
import intitalState from './initialState';

export default function courseReducer(state = intitalState.courses, action) {
  switch (action.type) {
    
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;

    case types.CREATE_COURSE_SUCCESS:
      return [...state, Object.assign({}, action.course)];

    case types.UPDATE_COURSE_SUCCESS:
      return [
        ...state.filter(course => course.id !== action.course.id),
        Object.assign({}, action.course)
      ];

    default:
      return state;
  }
}