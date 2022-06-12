import "./App.css";
import React, { useState, useEffect } from "react";
import Identity from "@arc-publishing/sdk-identity";

function Registro({ handleLogged }) {
  const urlBase = "https://api-sandbox.elcomercio.pe";
  const [error, setError] = useState(false);
  const [dataRegistro, setDataRegistro] = useState({
    emailRegistro: "",
    passRegistro: "",
    nombresRegistro: "",
    apepaternoRegistro: "",
    apematernoRegistro: "",
    telRegistro: "",
    tipdocRegistro: "",
    numdocRegistro: "",
  });

  useEffect(() => {
    Identity.apiOrigin = urlBase;
  });

  const handleInput = (event) => {
    const { value, name } = event.target;
    setDataRegistro({
      ...dataRegistro,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const {
      emailRegistro,
      passRegistro,
      nombresRegistro,
      apepaternoRegistro,
      apematernoRegistro,
      telRegistro,
      tipdocRegistro,
      numdocRegistro,
    } = dataRegistro;
    Identity.signUp(
      {
        userName: emailRegistro,
        credentials: passRegistro,
        password: "password",
      },
      {
        firstName: nombresRegistro,
        lastName: apepaternoRegistro,
        secondLastName: apematernoRegistro,
        displayName: emailRegistro,
        email: emailRegistro,
        contacts: [
          {
            phone: telRegistro,
            type: "HOME",
          },
        ],
        attributes: [
          {
            name: "typeDocument",
            value: tipdocRegistro,
            type: "String",
          },
          {
            name: "document",
            value: numdocRegistro,
            type: "String",
          },
        ],
      }
    )
      .then((res) => {
        handleLogged();
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Registro</p>
      </header>
      <section>
        <form>
          {error && <p className="alert">{error}</p>}
          <input
            type="email"
            name="emailRegistro"
            placeholder="Ingresa Correo"
            required
            onChange={handleInput}
          />
          <br />
          <input
            type="password"
            name="passRegistro"
            placeholder="Ingresa Contraseña"
            required
            onChange={handleInput}
          />
          <br />

          <input
            type="text"
            name="nombresRegistro"
            placeholder="Ingresa Nombres"
            required
            onChange={handleInput}
          />
          <br />

          <input
            type="text"
            name="apepaternoRegistro"
            placeholder="Ingresa Apellido Paterno"
            required
            onChange={handleInput}
          />
          <br />

          <input
            type="text"
            name="apematernoRegistro"
            placeholder="Ingresa tus Apellidos Materno"
            required
            onChange={handleInput}
          />

          <br />

          <input
            type="text"
            name="telRegistro"
            placeholder="Ingresa Teléfono"
            required
            onChange={handleInput}
          />
          <br />
          <input
            type="text"
            name="tipdocRegistro"
            placeholder="Ingresa Tipo Documento"
            required
            onChange={handleInput}
          />

          <br />

          <input
            type="text"
            name="numdocRegistro"
            placeholder="Ingresa tus Número Documento"
            required
            onChange={handleInput}
          />
          <br />
          <button type="button" name="btnlogin" onClick={handleSubmit}>
            Registrarme
          </button>
        </form>
      </section>
    </div>
  );
}

export default Registro;
