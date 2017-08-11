import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../actions/courseActions';
import { bindActionCreators } from 'redux';
import CourseForm from './CourseForm';

class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    // initialize the internal state of the component from the prop
    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {}
    };

    this.courseChangeHandler = this.courseChangeHandler.bind(this);
  }

  courseChangeHandler(event) {
    const field = event.target.name;
    let course = Object.assign({}, this.state.course);
    course[field] = event.target.value;

    return this.setState({course: course});
  }

  render() {
    return(
      <CourseForm 
        course={this.state.course} 
        errors={this.state.errors} 
        allAuthors={this.props.authors}
        onChange={this.courseChangeHandler}/>
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  // temp object that should come from an api later
  let course = {
    id: 'some-id',
    watchHref: 'http://localhost:3000',
    title: 'this is a course',
    length: '2:34',
    category: 'some category',
    authorId: 'cory-house'
  };

  const authorsFormattedForDropdown = state.authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });

  return {
    course: course,
    authors: authorsFormattedForDropdown
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);