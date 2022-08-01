import {render, screen, fireEvent} from '@testing-library/react';
import { createRoot } from 'react-dom/client';
import Language from './Language';
import React, { useState as useStateMock } from 'react';


jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));
  


jest.mock('./Language.module.css', () => {
    return {language_dropdownActive: 'dropdown-active'};
});


describe('Language component', () => {

    it('calls setIsActive after click on Toggle button', async () => {
  
        const setState = jest.fn();
        useStateMock.mockImplementation(init => [init, setState]);

        const onChangeLanguage = jest.fn();

        render(<Language onChangeLanguage={onChangeLanguage} />);

        const buttons = await screen.findAllByRole('button');
        expect(buttons.length).toBe(1);

        await fireEvent.click(buttons[0]);

        expect(setState).toHaveBeenCalledTimes(1);
    });
});