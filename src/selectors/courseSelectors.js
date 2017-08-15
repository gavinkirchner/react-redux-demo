// If you use something like Reselect to memoize your selectors, this is the recommended place to put them
// (memoization is function caching, which is useful for idempotent operations)
// selectors shouldn't touch state, etc.
export function getCourseById(courses, courseId) {
  const course = courses.filter(course => course.id === courseId);
  // filter returns an array
  if (course.length) {
    return course[0];
  } else {
    return getDefaultCourse();
  }
}

export function getDefaultCourse() {
  return {
    title: null,
    authorId: null,
    category: null,
    length: null,
    id: null
  };
}