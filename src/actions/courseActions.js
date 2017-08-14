import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';
import { beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

// this function is an action creator
export function createCourseSuccess(course) {
  return {
    type: types.CREATE_COURSE_SUCCESS,
    course
  };
}

export function updateCourseSuccess(course) {
  return {
    type: types.UPDATE_COURSE_SUCCESS,
    course
  };
}

export function loadCoursesSuccess(courses) {
  return {
    type: types.LOAD_COURSES_SUCCESS,
    courses
  };
}

// thunks
export function loadCourses() {
  return function(dispatch) {
    dispatch(beginAjaxCall());

    return courseApi.getAllCourses().then(courses => {
      dispatch(loadCoursesSuccess(courses));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function saveCourse(course) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return courseApi.saveCourse(course).then(savedCourse => {
      if (course.id) {
        dispatch(updateCourseSuccess(savedCourse));
      } else {
        dispatch(createCourseSuccess(savedCourse));
      }
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}