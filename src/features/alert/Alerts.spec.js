import Alerts, { ALERT_VISIBILITY_TIMEOUT_IN_SECONDS } from './Alerts';
import { renderWithProviders } from '../../utils/test-utils';
import {fireEvent, screen} from '@testing-library/react';
import { act } from 'react-dom/test-utils';


jest.mock('./Alerts.module.css', () => {
  return {};
});


describe('Alert component', () => {

  let view = null;

  afterEach(() => {
    view.unmount();
  });



  it('renders component without messages', () => {

    view = renderWithProviders(<Alerts />, {preloadedState: {alerts: {msgs: ['one message', 'another message']}}});
  
    const liElements = screen.getAllByRole('listitem');
    expect(liElements.length).toBe(2);
    expect(liElements[0]).toBeInTheDocument();

    const liFirst = screen.getAllByText('one message');
    const liSecond = screen.getAllByText('another message');

    expect(liFirst.length).toBe(1);
    expect(liSecond.length).toBe(1);
  });



  it('renders component with few messages', () => {

    view = renderWithProviders(<Alerts />, {preloadedState: {alerts: {msgs: []}}});
    expect(view.container.innerHTML).toBe('<div></div>');
  });


  it('removes messages on click on Close button', async () => {

    view = renderWithProviders(<Alerts />, {preloadedState: {alerts: {msgs: ['one message', 'another message']}}});
  
    let liElements = await screen.queryAllByRole('listitem');
    expect(liElements.length).toBe(2);
    
    const closeButtons = screen.getAllByRole('button');
    expect(closeButtons.length).toBe(1);

    fireEvent.click(closeButtons[0]);

    liElements = await screen.queryAllByRole('listitem');
    expect(liElements.length).toBe(0);
  });


  it('removes messages after timeout', async () => {
    
    jest.useFakeTimers(); // <-- REMEMBER IT

    view = renderWithProviders(<Alerts />, {preloadedState: {alerts: {msgs: ['one message', 'another message']}}});

    let liElements = await screen.queryAllByRole('listitem');
    expect(liElements.length).toBe(2);
    
    act(() => {
      jest.advanceTimersByTime(1000 * (ALERT_VISIBILITY_TIMEOUT_IN_SECONDS + 1));
    });

    liElements = await screen.queryAllByRole('listitem');
    expect(liElements.length).toBe(0);
  });

  
});

