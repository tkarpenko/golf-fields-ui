import { getLoggedUser, getApiToken, LOCAL_STORAGE_USER_DETAILS} from './userServices';
import { mockLocalStorage } from '../../utils/localStorageMock';
  

  
describe('User services', () => {
    

    it('getLoggedUser retuns phone from localStorage', () => {

        Object.defineProperty(window, 'localStorage', {value: mockLocalStorage({[LOCAL_STORAGE_USER_DETAILS]: '{"phone":"+38063","token":"123"}'})});
        
        const actual = getLoggedUser();
        expect(actual).toBe('+38063');

        Object.defineProperty(window, 'localStorage', {});
    });


    it('getApiToken retuns token from localStorage', () => {

        Object.defineProperty(window, 'localStorage', {value: mockLocalStorage({[LOCAL_STORAGE_USER_DETAILS]: '{"phone":"+38063","token":"123"}'})});
        
        const actual = getApiToken();
        expect(actual).toBe('123');

        Object.defineProperty(window, 'localStorage', {});
    });

});
