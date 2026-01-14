"use client"; 
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Dropdown } from "react-bootstrap";
import { FaEllipsisV } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react"; // ✅ Import useSession

export default function LeadsPage() {
  const router = useRouter();
  const { data: session, status } = useSession(); // ✅ Get Google Session
  const [leads, setLeads] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const API_URL_LEADS = "https://hub-backend-tv3v.onrender.com/api/leads";
  
  const fetchLeads = async () => {
    try {
      const res = await fetch(API_URL_LEADS);
      if (!res.ok) throw new Error("API not responding");
      const data = await res.json();
      setLeads(data);
      setFiltered(data);
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 1. Wait until session is loading
    if (status === "loading") return;

    // 2. Check Role from both sources
    const localRole = localStorage.getItem("role"); // Manual Login
    const userEmail = session?.user?.email;        // Google Login

    // 🛡️ Admin Verification Logic
    const isActuallyAdmin = localRole === "admin" || userEmail === "yashika@anantya.ai";

    if (!isActuallyAdmin) {
      // If not admin, redirect to dashboard
      router.push("/dashboard");
    } else {
      // If admin, allow access and fetch data
      setIsAdmin(true);
      fetchLeads();
    }
  }, [status, session, router]); // ✅ Added status & session as dependencies

  const handleFilter = () => {
    if (!filterDate) return setFiltered(leads);
    setFiltered(
      leads.filter((l) =>
        new Date(l.createdAt).toISOString().startsWith(filterDate)
      )
    );
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`${API_URL_LEADS}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        const updated = leads.map((lead) =>
          lead._id === id ? { ...lead, status: newStatus } : lead
        );
        setLeads(updated);
        setFiltered(updated);
      }
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const handleSendEmail = (email) => (window.location.href = `mailto:${email}`);

  const handleSendWhatsApp = (phone) =>
    window.open(`https://wa.me/91${phone}`, "_blank");

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this lead?")) {
      try {
        const res = await fetch(`${API_URL_LEADS}/${id}`, { method: "DELETE" });
        if (res.ok) {
          const updated = leads.filter((l) => l._id !== id);
          setLeads(updated);
          setFiltered(updated);
        }
      } catch (err) {
        console.error("Failed to delete lead", err);
      }
    }
  };

  // ✅ Show loading state or nothing while checking admin status
  if (status === "loading" || !isAdmin) return null;

  return (
    <div className="d-flex flex-column" style={{ height: "100vh" }}>
      <Header />
      <div className="d-flex" style={{ height: "100%" }}>
        <Sidebar />
        <main className="flex-grow-1 p-4" style={{ overflowY: "auto", height: "calc(100vh - 70px)" }}>
          <div className="container mt-5 pt-4">
            
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
                        <td>
                          <a href={lead.website} target="_blank" rel="noreferrer">
                            {lead.website}
                          </a>
                        </td>
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
                              {["New", "Prospect", "In Progress", "Converted", "Closed"].map((status) => (
                                <Dropdown.Item key={status} onClick={() => handleStatusChange(lead._id, status)}>
                                  {status}
                                </Dropdown.Item>
                              ))}
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                        <td>
                          <Dropdown>
                            <Dropdown.Toggle variant="light" className="p-0 border-0 shadow-none">
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
            ) : (!loading && <p className="text-center py-4">No leads found.</p>)}
          </div>
        </main>
      </div>
    </div>
  );
}