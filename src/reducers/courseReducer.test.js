import expect from 'expect';
import courseReducer from './courseReducer';
import * as types from '../actions/actionTypes';
import initialState from './initialState';

describe('courseReducer', () => {
  describe('Default ActionType', () => {
    it('returns input state when input state is an object', () => {
      // Arrange
      const inputState = { courses: [], authors: [] };
      const expectedState = Object.assign({}, inputState);
      const action = { type: types.AJAX_CALL_ERROR };

      // Act
      const newState = courseReducer(inputState, action);

      // Assert
      expect(newState).toEqual(expectedState);
    });

    it('returns initial state when input state is undefined', () => {
      // Arrange
      const inputState = undefined;
      const expectedState = initialState.courses;
      const action = { type: types.AJAX_CALL_ERROR };

      // Act
      const newState = courseReducer(inputState, action);

      // Assert
      expect(newState).toEqual(expectedState);
    });

    it('returns null state when input state is null', () => {
      // Arrange
      const inputState = null;
      const action = { type: types.AJAX_CALL_ERROR };

      // Act
      const newState = courseReducer(inputState, action);

      // Assert
      expect(newState).toEqual(null);
    });
  });

  describe('LOAD_COURSES_SUCCESS ActionType', () => {
    it('returns action courses when input state is undefined', () => {
      // Arrange
      const inputState = undefined;
      const courses = [
        { id: '1', title: 'course 1' },
        { id: '2', title: 'course 2' }
      ];
      const inputAction = {
        type: types.LOAD_COURSES_SUCCESS,
        courses: courses
      };
      const expectedState = [...courses];

      // Act
      const newState = courseReducer(inputState,inputAction);

      // Assert
      expect(newState).toEqual(expectedState);
    });

    it('returns action courses when input state is array', () => {
      // Arrange
      const inputState = [
        { id: '3', title: 'course 3' }
      ];
      const courses = [
        { id: '1', title: 'course 1' },
        { id: '2', title: 'course 2' }
      ];
      const inputAction = {
        type: types.LOAD_COURSES_SUCCESS,
        courses: courses
      };
      const expectedState = [...courses];

      // Act
      const newState = courseReducer(inputState,inputAction);

      // Assert
      expect(newState).toEqual(expectedState);
    });
  });
});