import alertReducer, {
    addAlert,
    hideAlerts,
  } from './alertSlice';
  

  
  describe('Alert reducer', () => {
    
    const initialState = {
        msgs: ['one alert'],
    };


    it('should handle initial state', () => {
      expect(alertReducer(undefined, { type: 'unknown' })).toEqual({
        msgs:[]
      });
    });
  

    it('should add', () => {
      const actual = alertReducer(initialState, addAlert('second alert'));
      expect(actual.msgs.length).toEqual(2);
    });
  

    it('should remove all alerts', () => {
      alertReducer(initialState, addAlert('second alert'));
      const actual = alertReducer(initialState, hideAlerts());
      expect(actual.msgs.length).toEqual(0);
    });
  
  });
  