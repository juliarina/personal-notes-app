import React, { useContext } from "react";
import InputRegister from "../components/InputRegister";
import { Link } from "react-router-dom";
import { register } from "../utils/network-data";
import { useNavigate } from "react-router-dom";
import LocaleContext from "../context/LocaleContext";

function RegisterPage() {
    const [ locale ] = useContext(LocaleContext);

    const navigate = useNavigate(); 
    const onregisterHandle = async (user) => {
        const { error } = await register(user);
        if (!error) {
            navigate("/");
        }
    }

    return (
        <section className="register-page">
            <h2>{locale === "id" ? "Isi form untuk mendaftar akun." : "Fill the form to register account."}</h2>
            <InputRegister register={onregisterHandle}/>
            <p>{locale === "id" ? "Sudah punya akun?" : "Already have an account?"} <Link to="/">{locale === "id" ? "Masuk di sini" : "Login here"}</Link></p>
        </section>
    )
}

export default RegisterPage;