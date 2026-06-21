import { jsPDF } from "jspdf";

function PDFGenerator({ quote }) {
  const generatePDF = () => {
    const doc = new jsPDF();

    const company =
      localStorage.getItem("company") || "";

    const cif =
      localStorage.getItem("cif") || "";

    const email =
      localStorage.getItem("email") || "";

    const phone =
      localStorage.getItem("phone") || "";

    const address =
      localStorage.getItem("address") || "";

    doc.setFontSize(24);
    doc.text("VALORA", 20, 20);

    doc.setFontSize(10);

    doc.text(company, 140, 20);
    doc.text(cif, 140, 26);
    doc.text(email, 140, 32);
    doc.text(phone, 140, 38);
    doc.text(address, 140, 44);

    doc.setFontSize(18);
    doc.text("PRESUPUESTO", 20, 35);

    doc.line(20, 40, 190, 40);

    doc.setFontSize(12);

    doc.text(
      `Presupuesto PRES-${String(quote.id).slice(-6)}`,
      20,
      55
    );

    doc.text(
      `Fecha: ${quote.created_at || ""}`,
      20,
      65
    );

    doc.text(
      `Cliente: ${quote.client}`,
      20,
      85
    );

    doc.text(
      `Proyecto: ${quote.project}`,
      20,
      95
    );

    doc.text(
      `Horas: ${quote.hours}`,
      20,
      115
    );

    doc.text(
      `Tarifa: ${quote.rate} €`,
      20,
      125
    );

    doc.text(
      `Subtotal: ${quote.subtotal} €`,
      20,
      145
    );

    doc.text(
      `IVA: ${quote.vat_amount} €`,
      20,
      155
    );

    doc.setFontSize(18);

    doc.text(
      `TOTAL: ${quote.total} €`,
      20,
      175
    );

    doc.setFontSize(12);

    doc.text(
      `Estado: ${quote.status}`,
      20,
      195
    );

    doc.save(
      `Presupuesto-${quote.client}.pdf`
    );
  };

  return (
    <button onClick={generatePDF}>
      PDF
    </button>
  );
}

export default PDFGenerator;