import React from "react";
import { Link } from "react-router-dom";
import { MdGTranslate, MdOutlineLightMode } from 'react-icons/md';
import { FiMoon } from "react-icons/fi";
import { TbLogout } from "react-icons/tb";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import LocaleContext from "../context/LocaleContext";

function Navigation({ user, logout }) {
    const [ theme, toggleTheme ] = useContext(ThemeContext);
    const [ locale , toggleLocale ] = useContext(LocaleContext);

    return (
        <>
            <nav className="navigation">
                <ul>
                    { 
                        (user !== null) &&
                        <li><Link to="/archives">{locale === "id" ? "Arsip" : "Archived" }</Link></li>
                    }
                </ul>
            </nav>
            <button className='toggle-locale' type='button' onClick={toggleLocale}><MdGTranslate /></button>
            <button className='toggle-theme' type='button' onClick={toggleTheme}>{theme === "dark" ? <MdOutlineLightMode /> : <FiMoon />}</button> 
            {
                (user !== null) &&
                <button className='button-logout' type='button' onClick={logout}><TbLogout />{user.name}</button>
            }
        </>
    )
}

export default Navigation;