import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../actions/courseActions';
import { bindActionCreators } from 'redux';
import CourseForm from './CourseForm';
import toastr from 'toastr';

class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    // initialize the internal state of the component from the prop
    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {},
      isSaving: false
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

    return this.setState({course: course});
  }

  courseSaveHandler(event) {
    // prevent default since this is a submit handler
    event.preventDefault();
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

  render() {
    return(
      <CourseForm 
        course={this.state.course} 
        errors={this.state.errors} 
        allAuthors={this.props.authors}
        onChange={this.courseChangeHandler}
        onSave={this.courseSaveHandler}
        isLoading={this.state.isSaving}/>
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
    return null;
  }
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