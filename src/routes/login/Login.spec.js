import Login from './Login';
import { renderWithProviders } from '../../utils/test-utils';
import {fireEvent, screen} from '@testing-library/react';

import { Navigate as NavigateMock } from 'react-router-dom';

import { useTranslation as useTranslationMock } from 'react-i18next';

import React, { 
       useState as useStateMock,
       useEffect as useEffectMock } from 'react';


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    Navigate: jest.fn(),
}));


jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
    useEffect: jest.fn(),
}));

jest.mock('react-i18next', () => ({
    ...jest.requireActual('react-i18next'),
    useTranslation: jest.fn(),
}));


jest.mock('i18next', () => {
    return {
        addResourceBundle: jest.fn(),
        language: 'en'
    };
});

jest.mock('../../app/staticFileRequests', () => {
    return jest.fn().mockReturnValue(Promise.resolve({"key": "translation to key"}));
});

jest.mock('../../features/lang/Language', () => {
    return function DummyLanguage(props) {
        return (
            <div>lang here</div>
        );
    };
});


jest.mock('./Login.module.css', () => {
  return {};
});


describe('Login component', () => {

  let view = null;

  afterEach(() => {
    view.unmount();
  });


  it('renders component without messages', () => {

    const setState = jest.fn();
    useStateMock.mockImplementation(init => [init, setState]);
    useTranslationMock.mockImplementation(() => ({t: jest.fn()}));

    view = renderWithProviders(<Login />, {preloadedState: {user: {loggedUser: null, apiToken: null}}});

    expect(useEffectMock).toHaveBeenCalledTimes(2);
  });
  
});
