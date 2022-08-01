import userReducer, { signin, signout } from './userSlice';
import {LOCAL_STORAGE_USER_DETAILS} from './userServices';
import { mockLocalStorage } from '../../utils/localStorageMock';
  

  
describe('User reducer', () => {
    
    const initialState = {
        loggedUser: null,
        apiToken: null
    };


    it('should handle initial state', () => {
        expect(userReducer(undefined, { type: 'unknown' })).toEqual({
            loggedUser: null,
            apiToken: null
        });
    });


    it('should remove data from the memory', () => {

        Object.defineProperty(window, 'localStorage', {value: mockLocalStorage({})});

        userReducer(initialState, signin({token: '1', phone: '+38'}));

        let lsValue = window.localStorage.getItem(LOCAL_STORAGE_USER_DETAILS);
        expect(lsValue).toBe('{"phone":"+38","token":"1"}');

        const actual = userReducer(initialState, signout());

        expect(actual.loggedUser).toBe(null);
        expect(actual.apiToken).toBe(null);

        lsValue = window.localStorage.getItem(LOCAL_STORAGE_USER_DETAILS);
        expect(lsValue).toBe(null);

        Object.defineProperty(window, 'localStorage', {});
    });


    it('should add data', () => {

        Object.defineProperty(window, 'localStorage', {value: mockLocalStorage({})});

        let lsValue = window.localStorage.getItem(LOCAL_STORAGE_USER_DETAILS);
        expect(lsValue).toBe(null);

        const actual = userReducer(initialState, signin({token: '1', phone: '+38'}));
        expect(actual.loggedUser).toEqual('+38');
        expect(actual.apiToken).toEqual('1');

        lsValue = window.localStorage.getItem(LOCAL_STORAGE_USER_DETAILS);
        expect(lsValue).toBe('{"phone":"+38","token":"1"}');

        Object.defineProperty(window, 'localStorage', {});
    });

});
