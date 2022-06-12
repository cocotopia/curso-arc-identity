import "./App.css";
import React, { useState, useEffect } from "react";
import Identity from "@arc-publishing/sdk-identity";

function Pefil({ handleCloseSession, userprofile }) {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dataRegistro, setDataRegistro] = useState({});

  useEffect(() => {
    Identity.getUserProfile().then((res) => {
      const {
        email,
        firstName,
        lastName,
        secondLastName,
        contacts,
        attributes,
      } = res;

      const phonUser = contacts[0].phone;
      const tipDocUser = attributes[0].value;
      const numDocUser = attributes[1].value;

      setDataRegistro({
        emailRegistro: email,
        nombresRegistro: firstName,
        apepaternoRegistro: lastName,
        apematernoRegistro: secondLastName,
        telRegistro: phonUser,
        tipdocRegistro: tipDocUser,
        numdocRegistro: numDocUser,
      });
    });
  }, [setDataRegistro]);

  const handleInput = (event) => {
    const { value, name } = event.target;
    setDataRegistro({
      ...dataRegistro,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const {
      nombresRegistro,
      apepaternoRegistro,
      apematernoRegistro,
      telRegistro,
      tipdocRegistro,
      numdocRegistro,
    } = dataRegistro;
    Identity.updateUserProfile({
      firstName: nombresRegistro,
      lastName: apepaternoRegistro,
      secondLastName: apematernoRegistro,
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
    })
      .then((res) => {
        console.log(res);
        setSuccess("Tus datos han sido guardados correctamente!");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const {
    emailRegistro,
    nombresRegistro,
    apepaternoRegistro,
    apematernoRegistro,
    telRegistro,
    tipdocRegistro,
    numdocRegistro,
  } = dataRegistro;

  return (
    <div className="App">
      <header className="App-header">
        <p>Bienvenido a tu Perfil</p>
      </header>
      <section>
        <form>
          {error && <p className="alert">{error}</p>}

          {success && <p className="success">{success}</p>}

          <input
            type="email"
            name="emailRegistro"
            placeholder="Ingresa Correo"
            required
            onChange={handleInput}
            value={emailRegistro}
            disabled
          />
          <br />

          <input
            type="text"
            name="nombresRegistro"
            placeholder="Ingresa Nombres"
            required
            onChange={handleInput}
            value={nombresRegistro}
          />
          <br />

          <input
            type="text"
            name="apepaternoRegistro"
            placeholder="Ingresa Apellido Paterno"
            required
            onChange={handleInput}
            value={apepaternoRegistro}
          />
          <br />

          <input
            type="text"
            name="apematernoRegistro"
            placeholder="Ingresa tus Apellidos Materno"
            required
            onChange={handleInput}
            value={apematernoRegistro}
          />

          <br />

          <input
            type="text"
            name="telRegistro"
            placeholder="Ingresa Teléfono"
            required
            onChange={handleInput}
            value={telRegistro}
          />
          <br />
          <input
            type="text"
            name="tipdocRegistro"
            placeholder="Ingresa Tipo Documento"
            required
            onChange={handleInput}
            value={tipdocRegistro}
          />

          <br />

          <input
            type="text"
            name="numdocRegistro"
            placeholder="Ingresa tus Número Documento"
            required
            onChange={handleInput}
            value={numdocRegistro}
          />
          <br />
          <button type="button" name="btnlogin" onClick={handleSubmit}>
            Actualizar Datos
          </button>

          <br />
          <a href="#" className="link" onClick={handleCloseSession}>
            Cerrar Sesion
          </a>
        </form>
      </section>
    </div>
  );
}

export default Pefil;
