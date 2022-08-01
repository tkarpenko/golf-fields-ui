import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { GetTranslation } from './app/staticFileRequests';
import { useSelector } from "react-redux";
import { selectUserToken } from './features/user/userSlice';
import Layout from './routes/layout/layout';
import Login from './routes/login/Login';
import Alerts from './features/alert/Alerts';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import './App.css';

export default function App() {

    const { t } = useTranslation(['common', 'login']);
    const [lang, setLang] = useState('');
    const apiToken = useSelector(selectUserToken);


    if (apiToken == null) {
        console.log('apiToken = ', apiToken);
        document.body.classList.add('login-page');
    } else {
        document.body.classList.remove('login-page');
    }


    useEffect(() => {
        if (lang !== i18next.language || lang === '') {
            loadLanguageFiles();
        }
    }, [lang, apiToken]);


    async function loadLanguageFiles() {
        const commonJson = await GetTranslation(`/locales/${i18next.language}/common.json`);
        i18next.addResourceBundle(i18next.language, 'common', commonJson);
        setLang(i18next.language);
    }

    return (
        <div>
            <Alerts />
            
            <Routes>

                <Route path="/" element={ ( apiToken == null ? (<Navigate to="/login" />) : (<Layout />) ) } />
                <Route path="*" element={<div>{t('pageNotFound', {ns: 'common'})}</div>} />
                <Route path="/login" element={<Login />} />

            </Routes>
        </div>
    );
}
