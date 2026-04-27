import React, { useContext } from "react";
import useInput from "../hooks/useInput";
import LocaleContext from "../context/LocaleContext";

function InputRegister({ register }) {
  const [ name, onNameChange ] = useInput('');
  const [ email, onEmailChange ] = useInput('');
  const [ password, onPasswordChange ] = useInput('');
  const [ confirmPassword, onConfirmPasswordChange ] = useInput('');
  const [ locale ] = useContext(LocaleContext);

  const onSubmitHandler = () => {
    if (password !== confirmPassword) {
      alert("Password and password confirm must same");
    } else {
      if (password.length < 6) {
        alert("password must contain atleast 6 characters");
      } else {
        register({ name, email, password });   
      }
    }
  }

  return (
    <div className="input-login">
      <label htmlFor="name">{locale === "id" ? "Nama" : "Name"}</label>
      <input type="text" id="name" value={name} onChange={onNameChange} />
      <label htmlFor="email">Email</label>
      <input type="email" id="email" value={email} onChange={onEmailChange} />
      <label htmlFor="password">{locale === "id" ? "Kata Sandi" : "Password"}</label>
      <input type="password" id="password" value={password} onChange={onPasswordChange} />
      <label htmlFor="confirmPassword">{locale === "id" ? "Konfirmasi Kata Sandi" : "Confirm Password"}</label>
      <input type="password" id="confirmPassword" value={confirmPassword} onChange={onConfirmPasswordChange} />
      <button type="button" onClick={onSubmitHandler}>{locale === "id" ? "Daftar" : "Register"}</button>
    </div>
  );
}

export default InputRegister;