import React, { useState } from "react";

const HubForm = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    userEmail: "",
    departmentEmail: "",
    question: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/sendHubMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed");

      if (onSubmitSuccess) onSubmitSuccess(formData);

      setFormData({
        name: "",
        userEmail: "",
        departmentEmail: "",
        question: ""
      });

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

          {/* USER NAME */}
          <div className="mb-3 text-start">
            <label className="form-label fw-semibold">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* USER EMAIL */}
          <div className="mb-3 text-start">
            <label className="form-label fw-semibold">Your Email Address</label>
            <input
              type="email"
              name="userEmail"
              className="form-control"
              value={formData.userEmail}
              onChange={handleChange}
              required
            />
          </div>

          {/* SELECT DEPARTMENT */}
          <div className="mb-3 text-start">
            <label className="form-label fw-semibold">Choose Consignment Department</label>
            <select
              name="departmentEmail"
              className="form-control"
              value={formData.departmentEmail}
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

          {/* MESSAGE */}
          <div className="mb-3 text-start">
            <label className="form-label fw-semibold">Write your question</label>
            <textarea
              name="question"
              className="form-control"
              rows="4"
              value={formData.question}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-success w-75 mx-auto d-block fw-semibold">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default HubForm;
