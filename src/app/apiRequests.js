import { ApiConfig } from './apiRequestsConfig';


export async function ApiUserAuth(body, dispatch, addAlert, signout, apiToken, translation) {

    const response = await ApiConfig(dispatch, addAlert, signout, apiToken, translation).post('/User/Auth', body);

    return response && response.data;

}