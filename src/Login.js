import "./App.css";
import React, { useState, useEffect } from "react";
import Identity from "@arc-publishing/sdk-identity";

function Login({ handleLogged, handleShowRegister, handleShowOlvide }) {
  const urlBase = "https://api-sandbox.elcomercio.pe";
  const [error, setError] = useState(false);
  const [dataLogin, setDataLogin] = useState({
    emailLogin: "",
    passLogin: "",
  });

  useEffect(() => {
    Identity.apiOrigin = urlBase;
  });

  const handleInput = (event) => {
    const { value, name } = event.target;
    setDataLogin({
      ...dataLogin,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const { emailLogin, passLogin } = dataLogin;
    Identity.login(emailLogin, passLogin, { rememberMe: true })
      .then((res) => {
        handleLogged();
      })
      .catch((err) => {
        setError("Correo o contraseña inválidos");
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Ingresar</p>
      </header>
      <section>
        <form>
          {error && <p className="alert">{error}</p>}
          <input
            type="email"
            name="emailLogin"
            placeholder="Ingresa tu Correo"
            required
            onChange={handleInput}
          />
          <br />
          <input
            type="password"
            name="passLogin"
            placeholder="Ingresa tu Contraseña"
            required
            onChange={handleInput}
          />
          <br />

          <a href="#" className="link" onClick={handleShowOlvide}>
            Olvide mi contraseña
          </a>

          <br />
          <button type="button" name="btnlogin" onClick={handleSubmit}>
            Inciar sesión
          </button>

          <br />
          <a href="#" className="link" onClick={handleShowRegister}>
            Registrarme
          </a>
        </form>
      </section>
    </div>
  );
}

export default Login;
