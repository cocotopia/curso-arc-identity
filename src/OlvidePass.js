import "./App.css";
import React, { useState, useEffect } from "react";
import Identity from "@arc-publishing/sdk-identity";

function OlvidePass() {
  const urlBase = "https://api-sandbox.elcomercio.pe";
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dataLogin, setDataLogin] = useState({
    emailLogin: "",
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
    const { emailLogin } = dataLogin;
    Identity.requestResetPassword(emailLogin)
      .then((res) => {
        setSuccess(true);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Olvide Contraseña</p>
      </header>
      <section>
        {success ? (
          <p className="success">
            Se ha enviado un correo para restablecer su contraseña
          </p>
        ) : (
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
            <button type="button" name="btnlogin" onClick={handleSubmit}>
              Recuperar
            </button>
          </form>
        )}
      </section>
    </div>
  );
}

export default OlvidePass;
