"use client"; // <- ye line top par add karni hai
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Dropdown } from "react-bootstrap";
import { FaEllipsisV } from "react-icons/fa";


export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

//   const API_URL_LEADS = "http://localhost:4000/api/leads";

  const API_URL_LEADS = "https://hub-backend-tv3v.onrender.com/api/leads";
  
  // Fetch leads
  const fetchLeads = async () => {
    try {
      const res = await fetch(API_URL_LEADS);
      if (!res.ok) throw new Error("API not responding");
      const data = await res.json();
      setLeads(data);
      setFiltered(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Filter by date
  const handleFilter = () => {
    if (!filterDate) return setFiltered(leads);
    setFiltered(
      leads.filter((l) =>
        new Date(l.createdAt).toISOString().startsWith(filterDate)
      )
    );
  };

  // Status Update
  const handleStatusChange = async (id, newStatus) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const updated = leads.map((lead) =>
        lead._id === id ? { ...lead, status: newStatus } : lead
      );
      setLeads(updated);
      setFiltered(updated);
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  // Handle new lead from ContactForm
  const handleNewLead = (newLead) => {
    setLeads((prev) => [newLead, ...prev]);
    setFiltered((prev) => [newLead, ...prev]);
  };

  const handleSendEmail = (email) => (window.location.href = `mailto:${email}`);
  const handleSendWhatsApp = (phone) =>
    window.open(`https://wa.me/91${phone}`, "_blank");

  const handleDelete = async (id) => {
    if (confirm("Delete this lead?")) {
      try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        const updated = leads.filter((l) => l._id !== id);
        setLeads(updated);
        setFiltered(updated);
      } catch (err) {
        console.error("Failed to delete lead", err);
      }
    }
  };

  return (
    <div className="d-flex flex-column" style={{ height: "100vh" }}>
      <Header />
      <div className="d-flex" style={{ height: "100%" }}>
        <Sidebar />
        <main className="flex-grow-1 p-4" style={{ overflowY: "auto", height: "calc(100vh - 70px)" }}>
          <div className="container mt-5 pt-4">
            {/* Optional: show ContactForm here for direct leads */}
            {/* <ContactForm onNewLead={handleNewLead} /> */}

            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-bold">All Leads</h3>
              <div className="d-flex gap-2 align-items-center lead">
                <input
                  type="date"
                  className="form-control"
                  onChange={(e) => setFilterDate(e.target.value)}
                  style={{ width: "180px" }}
                />
                <button className="btn btn-primary" onClick={handleFilter}>
                  Filter
                </button>
              </div>
            </div>

            {loading && <p className="text-center py-5">Loading leads...</p>}
            {error && <div className="alert alert-warning">{error}</div>}

            {!loading && filtered.length > 0 ? (
              <div className="table-responsive shadow-sm bg-white rounded p-3">
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Company</th>
                      <th>Product</th>
                      <th>Website</th>
                      <th>Message</th>
                      <th>Status</th>
                      <th>Actions</th>
                      <th>Captured</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((lead, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{lead.name}</td>
                        <td>{lead.email}</td>
                        <td>{lead.phone}</td>
                        <td>{lead.organization}</td>
                        <td>{lead.product}</td>
                        <td><a href={lead.website} target="_blank">{lead.website}</a></td>
                        <td>{lead.discussion}</td>
                        <td>
                          <Dropdown>
                            <Dropdown.Toggle variant="" className="p-0 border-0">
                              <span
                                className={`badge bg-${
                                  {
                                    New: "primary",
                                    Prospect: "info",
                                    "In Progress": "warning",
                                    Converted: "success",
                                    Closed: "danger",
                                  }[lead.status] || "secondary"
                                }`}
                              >
                                {lead.status || "New"}
                              </span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              {["New","Prospect","In Progress","Converted","Closed"].map((status) => (
                                <Dropdown.Item key={status} onClick={() => handleStatusChange(lead._id, status)}>
                                  {status}
                                </Dropdown.Item>
                              ))}
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                        <td>
                          <Dropdown>
                            <Dropdown.Toggle variant="light" className="p-0 border-0">
                              <FaEllipsisV />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item onClick={() => handleSendEmail(lead.email)}>Send Email</Dropdown.Item>
                              <Dropdown.Item onClick={() => handleSendWhatsApp(lead.phone)}>Send WhatsApp</Dropdown.Item>
                              <Dropdown.Item className="text-danger" onClick={() => handleDelete(lead._id)}>Delete</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                        <td>{new Date(lead.createdAt).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (!loading && <p>No leads found.</p>)}
          </div>
        </main>
      </div>
    </div>
  );
}
