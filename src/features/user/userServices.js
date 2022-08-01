export const LOCAL_STORAGE_USER_DETAILS = '_userDet__';


export function getLoggedUser() {
    try {
        const userDetailsJson = localStorage.getItem(LOCAL_STORAGE_USER_DETAILS);
        if (userDetailsJson != null && userDetailsJson.length > 0) {
            const userDetails = JSON.parse(userDetailsJson);
            return userDetails.phone;
        }

    } catch (err) {
        //
    }

    return null;
}

export function getApiToken() {
    try {
        const userDetailsJson = localStorage.getItem(LOCAL_STORAGE_USER_DETAILS);
        if (userDetailsJson != null && userDetailsJson.length > 0) {
            const userDetails = JSON.parse(userDetailsJson);
            return userDetails.token;
        }

    } catch (err) {
        //
    }

    return null;
}