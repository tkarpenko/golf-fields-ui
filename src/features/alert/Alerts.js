import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAlerts, hideAlerts } from "./alertSlice";
import styles from './Alerts.module.css';


export const ALERT_VISIBILITY_TIMEOUT_IN_SECONDS = 10;



export default function Alerts() {

    let alertsState = useSelector(selectAlerts);

    const dispatch = useDispatch();
    
    setTimeout(() => {
        close();
    }, ALERT_VISIBILITY_TIMEOUT_IN_SECONDS * 1000);


    function close() {
        if (alertsState.length > 0) {
            dispatch(hideAlerts()); 
        }
    }


    if (alertsState != null && alertsState.length > 0)
    {
        return (
            <div className={styles.alert}>
                <ul>
                    {alertsState.map((msg, index) =>
                        <li className="alert_msg" key={index}>{msg}</li>
                    )}
                </ul>
                <button className="button pink rubber" type="button" onClick={close}>Close</button>
            </div>
        );

    } else {
        return <div></div>
    }
}