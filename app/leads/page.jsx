<<<<<<< HEAD
"use client"; 
=======
"use client"; // <- ye line top par add karni hai
>>>>>>> 0a4b08817ff634f73d82985a02338ca3f6b7ae8c
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Dropdown } from "react-bootstrap";
import { FaEllipsisV } from "react-icons/fa";
<<<<<<< HEAD
import { useRouter } from "next/navigation"; // Import router for redirection

export default function LeadsPage() {
  const router = useRouter();
=======


export default function LeadsPage() {
>>>>>>> 0a4b08817ff634f73d82985a02338ca3f6b7ae8c
  const [leads, setLeads] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
<<<<<<< HEAD
  const [isAdmin, setIsAdmin] = useState(false); // State to track admin status

  const API_URL_LEADS = "https://hub-backend-tv3v.onrender.com/api/leads";
  
  // Function to fetch all leads from the backend
=======

//   const API_URL_LEADS = "http://localhost:4000/api/leads";

  const API_URL_LEADS = "https://hub-backend-tv3v.onrender.com/api/leads";
  
  // Fetch leads
>>>>>>> 0a4b08817ff634f73d82985a02338ca3f6b7ae8c
  const fetchLeads = async () => {
    try {
      const res = await fetch(API_URL_LEADS);
      if (!res.ok) throw new Error("API not responding");
      const data = await res.json();
      setLeads(data);
      setFiltered(data);
    } catch (err) {
<<<<<<< HEAD
      console.error("Fetch Error:", err);
=======
      console.error(err);
>>>>>>> 0a4b08817ff634f73d82985a02338ca3f6b7ae8c
      setError("Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
<<<<<<< HEAD
    // 🛡️ SECURITY CHECK: Get user role from localStorage
    const userRole = localStorage.getItem("role");

    if (userRole !== "admin") {
      // Redirect non-admin users back to dashboard immediately
      router.push("/dashboard");
    } else {
      // If user is admin, allow page access and fetch data
      setIsAdmin(true);
      fetchLeads();
    }
  }, [router]);

  // Filter the leads list based on selected date
=======
    fetchLeads();
  }, []);

  // Filter by date
>>>>>>> 0a4b08817ff634f73d82985a02338ca3f6b7ae8c
  const handleFilter = () => {
    if (!filterDate) return setFiltered(leads);
    setFiltered(
      leads.filter((l) =>
        new Date(l.createdAt).toISOString().startsWith(filterDate)
      )
    );
  };

<<<<<<< HEAD
  // Update lead status (e.g., from 'New' to 'Converted')
  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`${API_URL_LEADS}/${id}`, {
=======
  // Status Update
  const handleStatusChange = async (id, newStatus) => {
    try {
      await fetch(`${API_URL}/${id}`, {
>>>>>>> 0a4b08817ff634f73d82985a02338ca3f6b7ae8c
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

<<<<<<< HEAD
      if (res.ok) {
        const updated = leads.map((lead) =>
          lead._id === id ? { ...lead, status: newStatus } : lead
        );
        setLeads(updated);
        setFiltered(updated);
      }
=======
      const updated = leads.map((lead) =>
        lead._id === id ? { ...lead, status: newStatus } : lead
      );
      setLeads(updated);
      setFiltered(updated);
>>>>>>> 0a4b08817ff634f73d82985a02338ca3f6b7ae8c
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

<<<<<<< HEAD
  // Utility to send email via client's default mail app
  const handleSendEmail = (email) => (window.location.href = `mailto:${email}`);

  // Utility to open WhatsApp chat with lead
  const handleSendWhatsApp = (phone) =>
    window.open(`https://wa.me/91${phone}`, "_blank");

  // Delete lead from the database
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this lead?")) {
      try {
        const res = await fetch(`${API_URL_LEADS}/${id}`, { method: "DELETE" });
        if (res.ok) {
          const updated = leads.filter((l) => l._id !== id);
          setLeads(updated);
          setFiltered(updated);
        }
=======
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
>>>>>>> 0a4b08817ff634f73d82985a02338ca3f6b7ae8c
      } catch (err) {
        console.error("Failed to delete lead", err);
      }
    }
  };

<<<<<<< HEAD
  // Prevent rendering if user is not authorized
  if (!isAdmin) return null;

=======
>>>>>>> 0a4b08817ff634f73d82985a02338ca3f6b7ae8c
  return (
    <div className="d-flex flex-column" style={{ height: "100vh" }}>
      <Header />
      <div className="d-flex" style={{ height: "100%" }}>
        <Sidebar />
        <main className="flex-grow-1 p-4" style={{ overflowY: "auto", height: "calc(100vh - 70px)" }}>
          <div className="container mt-5 pt-4">
<<<<<<< HEAD
            
            {/* Page Title and Date Filter Section */}
=======
            {/* Optional: show ContactForm here for direct leads */}
            {/* <ContactForm onNewLead={handleNewLead} /> */}

>>>>>>> 0a4b08817ff634f73d82985a02338ca3f6b7ae8c
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

<<<<<<< HEAD
            {/* Error and Loading Handlers */}
            {loading && <p className="text-center py-5">Loading leads...</p>}
            {error && <div className="alert alert-warning">{error}</div>}

            {/* Leads Table Content */}
=======
            {loading && <p className="text-center py-5">Loading leads...</p>}
            {error && <div className="alert alert-warning">{error}</div>}

>>>>>>> 0a4b08817ff634f73d82985a02338ca3f6b7ae8c
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
<<<<<<< HEAD
                        <td>
                          <a href={lead.website} target="_blank" rel="noreferrer">
                            {lead.website}
                          </a>
                        </td>
                        <td>{lead.discussion}</td>
                        <td>
                          {/* Status Dropdown Picker */}
=======
                        <td><a href={lead.website} target="_blank">{lead.website}</a></td>
                        <td>{lead.discussion}</td>
                        <td>
>>>>>>> 0a4b08817ff634f73d82985a02338ca3f6b7ae8c
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
<<<<<<< HEAD
                              {["New", "Prospect", "In Progress", "Converted", "Closed"].map((status) => (
=======
                              {["New","Prospect","In Progress","Converted","Closed"].map((status) => (
>>>>>>> 0a4b08817ff634f73d82985a02338ca3f6b7ae8c
                                <Dropdown.Item key={status} onClick={() => handleStatusChange(lead._id, status)}>
                                  {status}
                                </Dropdown.Item>
                              ))}
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                        <td>
<<<<<<< HEAD
                          {/* Action Options Dropdown */}
=======
>>>>>>> 0a4b08817ff634f73d82985a02338ca3f6b7ae8c
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
<<<<<<< HEAD
            ) : (!loading && <p className="text-center py-4">No leads found.</p>)}
          </div>
        </main>
      </div>
    </div>
  );
}
=======
            ) : (!loading && <p>No leads found.</p>)}
          </div>
         
        </main>
      
      </div>
    </div>
  );
}
>>>>>>> 0a4b08817ff634f73d82985a02338ca3f6b7ae8c
