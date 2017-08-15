import expect from 'expect';
import React from 'react';
import { ManageCoursePage } from './ManageCoursePage';
import { mount, shallow } from 'enzyme';

describe ('Manage Course Page', () => {
  it ('sets error message when trying to save undefined title', ()=> {
    // Arrange
    const props = {
      authors: [],
      actions: { saveCourse: () => { return Promise.resolve(); }},
      course: {}
    };

    // use mount() instead of shallow() so that all children are rendered into the DOM
    const wrapper = mount(<ManageCoursePage {...props}/>); 
    const saveButton = wrapper.find('input').last();

    // Act
    saveButton.simulate('click');
    
    // Assert
    expect(wrapper.state().errors.title).toBe('Title must be at least 5 characters.');
  });

  it ('sets error message when trying to save empty title', ()=> {
    // Arrange
    const props = {
      authors: [],
      actions: { saveCourse: () => { return Promise.resolve(); }},
      course: { title: '' }
    };

    // use mount() instead of shallow() so that all children are rendered into the DOM
    const wrapper = mount(<ManageCoursePage {...props}/>); 
    const saveButton = wrapper.find('input').last();

    // Act
    saveButton.simulate('click');
    
    // Assert
    expect(wrapper.state().errors.title).toBe('Title must be at least 5 characters.');
  });
});