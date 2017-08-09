// This component handles the App template used on every page.
import React, {PropTypes} from 'react';
import Header from './common/Header';

class App extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <Header />
                {this.props.children}
            </div>
        );
    }
}

// this is setting children as a required propType in the App Component (its passed in from react-router)
App.propTypes = {
    children: PropTypes.object.isRequired
};

export default App;