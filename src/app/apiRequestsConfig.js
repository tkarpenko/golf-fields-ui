import axios from 'axios';
// import { getApiToken } from '../features/user/userServices';
import environment from './environment';


export function ApiConfig(dispatch, addAlert, signout, apiToken, translation) {


    const instance = axios.create({
        baseURL: `${environment.settings.apiEndpoint}/${environment.settings.apiVersion}`,
        timeout: 120000,
        withCredentials: false,
        headers: {
            'Authorization': 'Bearer ' + apiToken || '',
            'Content-Type': 'application/json',
        },
    });

    /**
     * show a progress bar after a request starting
     */
    instance.interceptors.request.use((config) => {
        return config;
    }, (error) => {
        return Promise.reject(error);
    });


    /**
     * hide a progress bar after a request ending and show an alert
     * if there is an error
     */
     instance.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {

            if (error.response && error.response.status === 401) {
                dispatch(signout());
                dispatch(addAlert(translation('error.401')));
                return;
            }

            if (error.response && error.response.data && error.response.data.error) {
                dispatch(addAlert(error.response.data.error));

            } else if (error.response) {

                const data = error.response.data;
                let msg = typeof data === 'string' ? data : JSON.stringify(data);

                if (error.response.status === 403 && (msg == null || msg.length === 0)) {
                    msg = 'error.403';
                }
                if (error.response.status === 404 && (msg == null || msg.length === 0)) {
                    msg = 'error.404';
                }

                dispatch(addAlert(translation(msg)));

            } else if (error.request) {

                const msg = (typeof error.request === 'object') ? JSON.stringify(error.request) : error.request;

                if (msg != null && msg.length > 0 && msg !== '{}') {
                    
                    dispatch(addAlert(`${translation('error.notConnectedToServer')}: ${msg}`));
                } else {
                    dispatch(addAlert(translation('error.notConnectedToServer')));
                }

            } else {
                dispatch(addAlert(error.message));
            }
        });

    return instance;
}
