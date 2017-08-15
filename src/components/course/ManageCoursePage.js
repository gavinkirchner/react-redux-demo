import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../actions/courseActions';
import { bindActionCreators } from 'redux';
import CourseForm from './CourseForm';
import toastr from 'toastr';

export class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    // initialize the internal state of the component from the prop
    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {},
      isSaving: false, 
      canSave: true
    };

    this.courseChangeHandler = this.courseChangeHandler.bind(this);
    this.courseSaveHandler = this.courseSaveHandler.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.course) {
      this.setState({course: {}});
    } else if (this.props.course.id !== nextProps.course.id) {
      this.setState({course: Object.assign({}, nextProps.course)});
    }
  }

  courseChangeHandler(event) {
    const field = event.target.name;
    let course = Object.assign({}, this.state.course);
    course[field] = event.target.value;

    this.courseFormIsValid(course);

    this.setState({course: course});   
  }

  courseSaveHandler(event) {
    // prevent default since this is a submit handler
    event.preventDefault();

    if (!this.courseFormIsValid(this.state.course)) {
      return;
    }

    this.setState({isSaving: true});

    this.props.actions.saveCourse(this.state.course)
      .then(() => {
        this.setState({isSaving: false});
        toastr.success('Course Saved.');
        this.context.router.push("/courses");
      }).catch(error => {
        this.setState({isSaving: false});
        toastr.error(error);
      });
  }

  courseFormIsValid(course) {
    let formIsValid = true;
    let errors = {};

    if (!course.title || course.title.length < 5) {
      errors.title = 'Title must be at least 5 characters.';
      formIsValid = false;
    }

    this.setState({errors: errors, canSave: formIsValid});
    return formIsValid;
  }

  render() {
    return(
      <CourseForm 
        course={this.state.course} 
        errors={this.state.errors} 
        allAuthors={this.props.authors}
        onChange={this.courseChangeHandler}
        onSave={this.courseSaveHandler}
        isLoading={this.state.isSaving}
        canSave={this.state.canSave}/>
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function getFormattedAuthors(authors) {
  return authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });
}

function getCourseById(courses, courseId) {
  const course = courses.filter(course => course.id === courseId);
  // filter returns an array
  if (course.length) {
    return course[0];
  } else {
    return getDefaultCourse();
  }
}

function getDefaultCourse() {
  return {
    title: null,
    authorId: null,
    category: null,
    length: null,
    id: null
  };
}

function mapStateToProps(state, ownProps) {
  return {
    course: getCourseById(state.courses, ownProps.params.id),
    authors: getFormattedAuthors(state.authors)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);