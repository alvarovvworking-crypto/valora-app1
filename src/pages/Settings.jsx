import { useState } from "react";

function Settings() {
  const [company, setCompany] = useState(
    localStorage.getItem("company") || ""
  );

  const [cif, setCif] = useState(
    localStorage.getItem("cif") || ""
  );

  const [email, setEmail] = useState(
    localStorage.getItem("email") || ""
  );

  const [phone, setPhone] = useState(
    localStorage.getItem("phone") || ""
  );

  const [address, setAddress] = useState(
    localStorage.getItem("address") || ""
  );

  const saveSettings = () => {
    localStorage.setItem(
      "company",
      company
    );

    localStorage.setItem(
      "cif",
      cif
    );

    localStorage.setItem(
      "email",
      email
    );

    localStorage.setItem(
      "phone",
      phone
    );

    localStorage.setItem(
      "address",
      address
    );

    alert("Configuración guardada");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Configuración Empresa</h1>

      <br />

      <input
        type="text"
        placeholder="Nombre empresa"
        value={company}
        onChange={(e) =>
          setCompany(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="CIF"
        value={cif}
        onChange={(e) =>
          setCif(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Teléfono"
        value={phone}
        onChange={(e) =>
          setPhone(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Dirección"
        value={address}
        onChange={(e) =>
          setAddress(e.target.value)
        }
      />

      <br />
      <br />

      <button onClick={saveSettings}>
        Guardar
      </button>
    </div>
  );
}

export default Settings;