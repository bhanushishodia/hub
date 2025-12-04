import React, { useState } from "react";

const HubForm = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    question: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("/api/saveHubLead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) throw new Error("Failed");

    // parent update
    if (onSubmitSuccess) onSubmitSuccess(formData);

    setFormData({ name: "", email: "", question: "" });

    alert("Your request has been submitted!");
  } catch (err) {
    console.error(err);
    alert("Something went wrong!");
  }
};


  return (
    <div className="card shadow-sm border-0 rounded-3">
      <div className="card-body p-4">
        <h5 className="fw-semibold text-center mb-1">
          In what way can we help?
        </h5>
        <p className="text-center text-muted small mb-4">
          Feel free to reach out to us with your enquiry
        </p>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label className="form-label fw-semibold">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

       <div className="mb-3 text-start">
  <label className="form-label fw-semibold">Choose Consignment Department</label>

  <select
    name="email"
    className="form-control"
    value={formData.email}
    onChange={handleChange}
    required
  >
    <option value="">Select Department</option>
    <option value="help@anantya.ai">Product & CX — help@anantya.ai</option>
    <option value="marketing@anantya.ai">Marketing — marketing@anantya.ai</option>
    <option value="sales@anantya.ai">Sales — sales@anantya.ai</option>
    <option value="info@anantya.ai">General — info@anantya.ai</option>
  </select>
</div>


          <div className="mb-3 text-start">
            <label className="form-label fw-semibold">Write your question</label>
            <textarea
              name="question"
              className="form-control"
              rows="4"
              placeholder="Type your question here..."
              value={formData.question}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-success w-75 mx-auto d-block fw-semibold"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HubForm;
