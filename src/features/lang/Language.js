import styles from './Language.module.css';
import i18next from 'i18next';
import { useState } from 'react';


export default function Language(props) {

    const [isActive, setIsActive] = useState(false);

    const languages = [
        {name: 'ua', displayName: 'Українська'},
        {name: 'en', displayName: 'English'},
    ];

    function changeLanguage(lang) {
        i18next.changeLanguage(lang);
        props.onChangeLanguage(lang);
    }
    

    function toggelLanguage() {
        setIsActive(!isActive);
    }


    return (
        <div className={styles.language_container}>

            <div className={styles.language_dropdown_container}>

                <button type="button" className={styles.language_button} onClick={toggelLanguage}>
                    <i className="icon-globe"></i>
                </button>

                <ul className={`${styles.language_dropdown} ${isActive ? styles.language_dropdownActive : ''}`}>
                    {languages.map((lang) => (
                        <li key={lang.name} onClick={() => changeLanguage(lang.name)}>{lang.displayName}</li>
                    ))}
                </ul>

            </div>
            
        </div>
    );
}