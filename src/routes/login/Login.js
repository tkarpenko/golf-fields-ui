import { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import { ApiUserAuth } from '../../app/apiRequests';
import { GetTranslation } from '../../app/staticFileRequests';
import { useDispatch, useSelector } from "react-redux";
import { addAlert } from '../../features/alert/alertSlice';
import { signin, signout, selectUserToken } from '../../features/user/userSlice';
import Language from '../../features/lang/Language';
import styles from './Login.module.css';


import i18next from 'i18next';
import { useTranslation } from 'react-i18next';



export default function Login() {

    const apiToken = useSelector(selectUserToken);
    const dispatch = useDispatch();
    const { t } = useTranslation(['common', 'login']);

    const [phone, setPhone] = useState('');
    const [lang, setLang] = useState('');

    
    useEffect(() => {
        if (lang !== i18next.language || lang === '') {
            loadLanguageFiles();
        }
    }, [lang, apiToken]);
    


    async function onSubmit(e) {
        e.preventDefault();
        const result = await ApiUserAuth({phone}, dispatch, addAlert, signout, apiToken, t);
        if (result != null && typeof result.bearerToken === 'string' && result.bearerToken.length > 0) {
            dispatch(signin({phone, token: result.bearerToken}));
        }
    }

    async function loadLanguageFiles() {

        const loginJson = await GetTranslation(`/locales/${i18next.language}/login.json`);
        i18next.addResourceBundle(i18next.language, 'login', loginJson);
        setLang(i18next.language);
    }


    async function onChangeLanguage() {
        await loadLanguageFiles();
    }

    if (apiToken != null) {
        return <Navigate to="/" state={{ from: '/login' }} />;
    }

    return (
        <div className={styles.login_container}>

            <div className={styles.login_fromWrapper}>

                <h1 className={styles.login_title}>{t('login', {ns: 'login'})}</h1>

                <form onSubmit={onSubmit}>
                    <input placeholder={t('phone', {ns: 'login'})} type="text" name="phone" value={phone} onChange={event => setPhone(event.target.value)}/>
                    <button type="submit" className="button">{t('send', {ns: 'common'})}</button>
                </form>

            </div>

            <Language onChangeLanguage={onChangeLanguage}/>
            
        </div>
    );
}