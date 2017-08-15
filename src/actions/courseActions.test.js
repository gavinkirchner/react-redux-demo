import expect from 'expect';
import * as courseActions from './courseActions';
import * as types from './actionTypes';
import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

describe('Course ActionCreators', () => {
  describe('createCourseSuccess', () => {
    it('returns expected action given course', () => {
      // Arrange 
      const inputCourse = { id: '1', title: 'course 1' };
      const expectedAction = { 
        type: types.CREATE_COURSE_SUCCESS,
        course: Object.assign({}, inputCourse)
      };

      // Act
      const action = courseActions.createCourseSuccess(inputCourse);

      // Assert
      expect(action).toEqual(expectedAction);
    });
  });
});

// thunk set up
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Course Thunks', () => {
  afterEach(() => {
    // if using Nock to mock, it is IMPERATIVE to call cleanAll after each test
    nock.cleanAll();
  });

  describe('loadCourses', () => {
    it('should create BEGIN_AJAX_STORE and LOAD_COURSES_SUCCESS when API is successful', (done) => {
      // if we were using a real API instead of a Mock one, this is what a call to Nock might look like:
      // nock('http://someurl.com/')
      //   .get('/courses')
      //   .reply(200, { body: { course: [{id: '1', title: 'course 1'}] } });

      // Arrange
      const expectedActions = [
        { type: types.BEGIN_AJAX_CALL },
        { type: types.LOAD_COURSES_SUCCESS, body: {courses: [{id: '1', title: 'course 1'}]} }
      ];
      const store = mockStore({courses: []}, expectedActions);

      // Act
      store.dispatch(courseActions.loadCourses()).then(() => {
        const actions = store.getActions();

        // Assert
        expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
        expect(actions[1].type).toEqual(types.LOAD_COURSES_SUCCESS);

        // call the finished callback defined in the it block
        done();
      });
    });
  });
});