"use client";
import { useState } from "react";

import { getImage } from "../app/utils/getImage";

export default function AgreementFormPopup() {
  const [showPopup, setShowPopup] = useState(false);

  const [form, setForm] = useState({
    onDate: "",
    effectiveDate: "",
    companyName: "",
    vendorCompany: "",
    gstType: "GST Number",   // NEW
    gstNumber: "",           // NEW VALUE
    companyAddress: "",
    pocName: "",
    pocDesignation: "",
    conversationCountry: "India",  // DEFAULT INDIA
    messagePort: [],         // MULTIPLE CHECKBOX SUPPORT

    validTime: "",
    validTime2: "",
    vendorCompany2: "",
    pocDesignation2: "",
    conversationCurrency: "",
    validTimeRecuring: "",
    oneTime: "",
    yearlyRecuring: "",
    marketingPrice: "",
    utilityPrice: "",
    authPrice: "",
    uiPrice: "",
    bilingCycle: "",
    platformFeatures: "",
    addon: "",
    addonName: "",
    addonFrequency: "",
    marketingPrice1: "",
    utilityPrice2: "",
    authPrice3: "",
    uiPrice4: "",
    currencyAmount: "",
    vendorCompany3: "",
    pocName3: "",
    pocDesignation3: "",
  });



  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/generate-agreement", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "Anantya-Agreement-2025.pdf";
    a.click();

    setShowPopup(false);
  };

  return (
    <>
      <button
        className="btn btn-success fw-semibold mt-2"
        onClick={() => setShowPopup(true)}
      >
       Create Agreement →
      </button>

      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            background: "rgba(0,0,0,0.55)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              width: "90%",
              maxWidth: "800px",
              maxHeight: "85vh",
              overflowY: "auto",
              background: "#fff",
              padding: "5px 30px 30px 30px",
              borderRadius: "18px",
              position: "relative",
            }}
          >
            <button
              onClick={() => setShowPopup(false)}
              style={{
                position: "absolute",
                top: "18px",
                right: "12px",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              ❌
            </button>

            <h4 className="mb-4 fw-bold text-center text-dark mt-3">
              Fill Agreement Details
            </h4>

            <form onSubmit={handleSubmit}>
              <div className="row g-3">

                {/* ---- 1. GST TYPE + NUMBER ---- */}
                <div className="col-md-6">
                  <label className="form-label fw-bold text-dark small">GST / Licence / Registration</label>
                  <select
                    className="form-control"
                    name="gstType"
                    value={form.gstType}
                    onChange={handleChange}
                  >
                    <option>GST Number</option>
                    <option>Licence Number</option>
                    <option>Registration Number</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label text-dark fw-bold small">{form.gstType}</label>
                  <input
                    className="form-control"
                    name="gstNumber"
                    value={form.gstNumber}
                    onChange={handleChange}
                  />
                </div>

                {/* ---- 2. COUNTRY SELECT ---- */}
                <div className="col-md-6">
                  <label className="form-label fw-bold text-dark small">Conversation Country</label>

                  <select
                    className="form-control"
                    name="conversationCountry"
                    value={form.conversationCountry}
                    onChange={handleChange}
                  >
                    {[
                      "India",
                      "Bahrain",
                      "Cyprus",
                      "Egypt",
                      "Iran",
                      "Iraq",
                      "Israel",
                      "Jordan",
                      "Kuwait",
                      "Lebanon",
                      "Oman",
                      "Palestine (West Bank and Gaza Strip)",
                      "Qatar",
                      "Saudi Arabia (KSA)",
                      "Syria",
                      "Turkey",
                      "United Arab Emirates (UAE)",
                      "Yemen"
                    ].map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* ---- 3. MESSAGE PORT OPTIONS ---- */}
                {/* ---- 3. MESSAGE PORT OPTIONS ---- */}
                <div className="col-md-6">
                  <label className="form-label text-dark fw-bold small">
                    Message Port (Select Any)
                  </label>

                  <div className="d-flex flex-wrap gap-3 mt-1">
                    {["Fail", "Sent", "Seen", "Delivered"].map((item) => (
                      <label key={item} className="d-flex align-items-center mt-3 me-3">
                        <input
                          type="checkbox"
                          checked={form.messagePort.includes(item)}
                          onChange={() => {
                            let updated = [...form.messagePort];

                            if (updated.includes(item)) {
                              updated = updated.filter((v) => v !== item);
                            } else {
                              updated.push(item);
                            }

                            setForm({ ...form, messagePort: updated });
                          }}
                        />
                        <span className="ms-2 text-dark small">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>



                {/* ---- OTHER FIELDS AUTO GENERATE ---- */}
                {Object.keys(form)
                  .filter(
                    (key) =>
                      !["gstType", "gstNumber", "conversationCountry", "messagePort"].includes(key)
                  )
                  .map((key) => (
                    <div className="col-md-6" key={key}>
                      <label className="form-label small text-dark fw-bold">
                        {key.replace(/([A-Z])/g, " $1").toUpperCase()}
                      </label>

                      <input
                        className="form-control"
                        name={key}
                        value={form[key]}
                        onChange={handleChange}
                      />
                    </div>
                  ))}

              </div>

              <button className="btn btn-success mt-4 py-2 mx-auto d-block w-75 fw-semibold">
                Download Agreement
              </button>
            </form>

          </div>
        </div>
      )}
    </>
  );
}
