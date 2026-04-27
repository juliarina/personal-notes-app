import React, {useContext} from "react";
import InputLogin from "../components/InputLogin";
import { Link } from "react-router-dom";
import { login } from "../utils/network-data";
import LocaleContext from "../context/LocaleContext";

function LoginPage({ loginSuccess }) {
    const [ locale ] = useContext(LocaleContext);

    const onLogin = async (userData) => {
        const { error, data } = await login(userData);

        if (!error) {
            loginSuccess(data);
        }
    } 

    return (
        <section className="login-page">
            <h2>{locale === "id" ? "Yuk, login untuk menggunakan aplikasi." : "Login to use app, please."}</h2>
            <InputLogin login={onLogin}/>
            <p>
                {locale === "id" ? "Belum punya akun?" : "Don't have account?"} <Link to="/register">{locale === "id" ? "Daftar di sini" : "Register here"}</Link>
            </p>
        </section>
    )
}

export default LoginPage;