// This component handles the App template used on every page.
import React, { PropTypes } from 'react';
import Header from './common/Header';
import LoadingSpinner from './common/LoadingSpinner';
//import ajaxStatus from '../reducers/ajaxStatusReducer';
import { connect } from 'react-redux';

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid" >
        <Header/>&nbsp;{this.props.numAjaxCallsInProgress > 0 && <LoadingSpinner/>}
        {this.props.children}
      </div>
    );
  }
}

// this is setting children as a required propType in the App Component (its passed in from react-router)
App.propTypes = {
  children: PropTypes.object.isRequired,
  numAjaxCallsInProgress: PropTypes.number
};

function mapStateToProps(state, ownProps) {
  return {
    numAjaxCallsInProgress: state.ajaxStatus // This variable name is coming from the alias in the rootReducer
  };
}

export default connect(mapStateToProps)(App);