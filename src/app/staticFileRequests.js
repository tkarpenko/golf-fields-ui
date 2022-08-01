import { StaticFileRequestsConfig } from './staticFileRequestsConfig';
import environment from './environment';


export async function GetTranslation(url, dispatch, add) {

    const response = await StaticFileRequestsConfig(dispatch, add).get(`${url}?${environment.settings.buildTimeStamp}`);

    return response && response.data;

}