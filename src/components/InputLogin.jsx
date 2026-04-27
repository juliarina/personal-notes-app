import React, { useContext } from "react";
import useInput from "../hooks/useInput";
import LocaleContext from "../context/LocaleContext";

function InputLogin({ login }) {
  const [ email, onEmailChange ] = useInput('');
  const [ password, onPasswordChange ] = useInput('');
  const [ locale ] = useContext(LocaleContext);

  const onSubmitHandler = () => {
    login({ email, password });
  }

  return (
    <div className="input-login">
      <label htmlFor="email">Email</label>
      <input type="email" id="email" value={email} onChange={onEmailChange} />
      <label htmlFor="password">{locale === "id" ? "Kata Sandi" : "Password"}</label>
      <input type="password" id="password" value={password} onChange={onPasswordChange} />
      <button type="button" onClick={onSubmitHandler}>{locale === "id" ? "Masuk" : "Login"}</button>
    </div>
  );
}

export default InputLogin;