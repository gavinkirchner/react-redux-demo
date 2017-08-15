import expect from 'expect';
import React from 'react';
import CourseForm from './CourseForm';
import { mount, shallow } from 'enzyme';

function setup(isSaving) {
  const props = {
    course: {},
    isSaving: isSaving,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  return shallow(<CourseForm {...props}/>);
}

describe('CourseForm', () => {
  it('renders top-level form and then h1', () => {
    const wrapper = setup(false);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h1').text()).toEqual('Manage Course');
  });
  
  it('save button is labeled "Save" when not saving', () => {
    const wrapper = setup(false);
    expect(wrapper.find('input').props().value).toBe('Save');
  });

  it('save button is labeled "Saving..." when saving', () => {
    const wrapper = setup(true);
    expect(wrapper.find('input').props().value).toBe('Save');
  });
});