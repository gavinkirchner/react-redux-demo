import expect from 'expect';
import { createStore } from 'redux';
import rootReducer from '../reducers';
import initialState from '../reducers/initialState';
import * as courseActions from '../actions/courseActions';

describe('Store Integration Tests', () => {
  it ('should handle creating courses', () => {
    // Arrange
    const store = createStore(rootReducer, initialState);
    const expectedCourse = { title: 'Clean Code' };

    // Act
    store.dispatch(courseActions.createCourseSuccess(expectedCourse));
    const actualCourse = store.getState().courses[0];

    // Assert
    expect(actualCourse).toEqual(expectedCourse);
  });

  // here we could chain multiple actions together to make a journey test just
  // by dispatching multiple actions and then checking what the final state is. 
});