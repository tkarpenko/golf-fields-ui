import App from './App';
import {render, screen} from '@testing-library/react';

import {
    Routes as RoutesMock,
    Route as RouteMock } from 'react-router-dom';

import { useTranslation as useTranslationMock } from 'react-i18next';

import React, { 
       useState as useStateMock,
       useEffect as useEffectMock } from 'react';


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    Routes: function DummyRoutes(props) {
        return (
            <p>routes here</p>
        );
    },
    Route: jest.fn(),
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

jest.mock('./app/staticFileRequests', () => {
    return jest.fn().mockReturnValue(Promise.resolve({"key": "translation to key"}));
});

jest.mock('./features/alert/Alerts', () => {
    return function DummyAlerts(props) {
        return (
            <p>alerts here</p>
        );
    };
});


jest.mock('./App.css', () => {
  return {};
});


describe('App component', () => {

    it('renders two components', async () => {

        const setState = jest.fn();
        useStateMock.mockImplementation(init => [init, setState]);
        useTranslationMock.mockImplementation(() => ({t: jest.fn()}));

        render(<App />);

        const divAlerts = await screen.findAllByText('alerts here');
        expect(divAlerts.length).toBe(1);

        const divRoutes = await screen.findAllByText('routes here');
        expect(divRoutes.length).toBe(1);
    });
  
});
