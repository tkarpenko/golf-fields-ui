import axios from 'axios';
import environment from './environment';


export function StaticFileRequestsConfig(dispatch, add) {

    const instance = axios.create({
        baseURL: `${environment.settings.staticFilesEndpoint}`,
        timeout: 120000,
        withCredentials: false,
        headers: {
            'Content-Type': 'application/json',
        },
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

            if (error.response && error.response.data && error.response.data.error) {
                dispatch(add(error.response.data.error));

            } else if (error.response) {

                const data = error.response.data;
                let msg = typeof data === 'string' ? data : JSON.stringify(data);

                if (error.response.status === 404 && (msg == null || msg.length === 0)) {
                    msg = 'Not Found';
                }

                dispatch(add(msg));

            } else if (error.request) {

                const msg = (typeof error.request === 'object') ? JSON.stringify(error.request) : error.request;

                if (msg != null && msg.length > 0 && msg !== '{}') {
                    
                    dispatch(add(`Communication with the server could not be established: ${msg}`));
                } else {
                    
                    dispatch(add(`Communication with the server could not be established`));
                }

            } else {
                dispatch(add(error.message));
            }
        });


    return instance;
}
