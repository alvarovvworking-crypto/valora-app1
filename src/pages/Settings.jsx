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
  const [website, setWebsite] = useState(
  localStorage.getItem("website") || ""
);

const [paymentTerms, setPaymentTerms] = useState(
  localStorage.getItem("paymentTerms") ||
    "50% al inicio y 50% al finalizar"
);

const [quoteValidity, setQuoteValidity] = useState(
  localStorage.getItem("quoteValidity") ||
    "30 días"
);

const [legalTerms, setLegalTerms] = useState(
  localStorage.getItem("legalTerms") ||
    "El inicio del proyecto requiere la aceptación formal del presupuesto."
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
    localStorage.setItem(
  "website",
  website
);

localStorage.setItem(
  "paymentTerms",
  paymentTerms
);

localStorage.setItem(
  "quoteValidity",
  quoteValidity
);

localStorage.setItem(
  "legalTerms",
  legalTerms
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
<br />

<input
  type="text"
  placeholder="Sitio web"
  value={website}
  onChange={(e) =>
    setWebsite(e.target.value)
  }
/>

<br />
<br />

<input
  type="text"
  placeholder="Condiciones de pago"
  value={paymentTerms}
  onChange={(e) =>
    setPaymentTerms(e.target.value)
  }
/>

<br />
<br />

<input
  type="text"
  placeholder="Validez del presupuesto"
  value={quoteValidity}
  onChange={(e) =>
    setQuoteValidity(e.target.value)
  }
/>

<br />
<br />

<textarea
  placeholder="Términos legales"
  value={legalTerms}
  onChange={(e) =>
    setLegalTerms(e.target.value)
  }
  rows={5}
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