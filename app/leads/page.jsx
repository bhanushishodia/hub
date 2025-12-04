"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Table, Button, Form, Dropdown } from "react-bootstrap";
import { FaFileCsv, FaFilter, FaEllipsisV } from "react-icons/fa";


export default function LeadsPage() {

    const dummyLeads = [
        {
            id: 1,
            name: "Rohit Sharma",
            email: "rohit@example.com",
            phone: "9876543210",
            companyName: "TechGrow",
            product: "Website Development",
            website: "https://techgrow.in",
            message: "Need a website for my startup",
            createdAt: new Date().toISOString(),
            status: "New",
        },
        {
            id: 2,
            name: "Sneha Verma",
            email: "sneha@example.com",
            phone: "9988776655",
            companyName: "Brandify",
            product: "Landing Page",
            website: "https://brandify.in",
            message: "Need high converting landing page",
            createdAt: new Date().toISOString(),
            status: "Prospect",
        }
    ];

    const [leads, setLeads] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [filterDate, setFilterDate] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // 🎯 Load API or dummy
    useEffect(() => {
        async function fetchData() {
            try {
                // ❌ Your API (currently commented)
                // const res = await fetch(API_URL, { cache: "no-store" });

                // if (!res.ok) throw new Error("API not responding");

                // const data = await res.json();
                // setLeads(data);
                // setFiltered(data);

                // 👉 Dummy Leads fallback
                setLeads(dummyLeads);
                setFiltered(dummyLeads);

            } catch (err) {
                setError("Showing dummy leads (API failed)");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    // 🎯 Filter Leads
    const handleFilter = () => {
        if (!filterDate) return setFiltered(leads);

        setFiltered(
            leads.filter((l) => (l.createdAt)?.includes(filterDate))
        );
    };

    // 🎯 Export CSV
    const exportCSV = () => {
        if (filtered.length === 0) return alert("No leads available");

        const header =
            "Sr No,Name,Email,Phone,Company,Product,Website,Message,Status,Captured At\n";

        const rows = filtered
            .map((lead, i) => {
                return `${i + 1},${lead.name},${lead.email},${lead.phone},${lead.companyName || ""
                    },${lead.product || ""},${lead.website || ""},${lead.message || ""},${lead.status || ""
                    },${new Date(lead.createdAt).toLocaleString()}`;
            })
            .join("\n");

        const csv = `data:text/csv;charset=utf-8,${header}${rows}`;
        const link = document.createElement("a");
        link.href = encodeURI(csv);
        link.download = "leads.csv";
        link.click();
    };

    // 🎯 Status Update
    const handleStatusChange = (id, newStatus) => {
        const updated = leads.map((lead) =>
            lead.id === id ? { ...lead, status: newStatus } : lead
        );
        setLeads(updated);
        setFiltered(updated);
    };

    // 🎯 Actions
    const handleSendEmail = (email) => {
        window.location.href = `mailto:${email}`;
    };

    const handleSendWhatsApp = (phone) => {
        window.open(`https://wa.me/91${phone}`, "_blank");
    };

    const handleEdit = (id) => {
        alert("Edit Lead: " + id);
    };

    const handleDelete = (id) => {
        if (confirm("Delete this lead?")) {
            const updated = leads.filter((l) => l.id !== id);
            setLeads(updated);
            setFiltered(updated);
        }
    };

    return (
        <div className="d-flex flex-column" style={{ height: "100vh" }}>
            <Header />

            <div className="d-flex" style={{ height: "100%" }}>
                <Sidebar />

                <main
                    className="flex-grow-1 p-4"
                    style={{ overflowY: "auto", height: "calc(100vh - 70px)" }}
                >
                    <div className="container mt-5 pt-4">

                        {/* 🔹 Top Bar */}
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h3 className="fw-bold">All Leads</h3>

                            <div className="d-flex gap-2 align-items-center lead"> <input type="date" className="form-control" onChange={(e) => setFilterDate(e.target.value)} style={{ width: "180px", flex: "0 0 auto" }} />
                                <button className="btn btn-primary" style={{ flex: "0 0 auto" }} onClick={handleFilter}> Filter </button>
                                <button className="btn btn-success" style={{ flex: "0 0 auto", borderRadius: "10px!important" }} onClick={exportCSV}> Export CSV </button>
                            </div>
                        </div>

                        {loading && <p className="text-center py-5">Loading leads...</p>}

                        {error && <div className="alert alert-warning">{error}</div>}

                        {!loading && filtered.length > 0 ? (
                            <div className="table-responsive shadow-sm bg-white rounded p-3">
                                <table className="table table-striped table-bordered">
                                    <thead className="table-gray">
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
                                                <td>{lead.companyName}</td>
                                                <td>{lead.product}</td>

                                                <td>
                                                    <a href={lead.website} target="_blank" className="text-primary">
                                                        {lead.website}
                                                    </a>
                                                </td>

                                                <td>{lead.message}</td>

                                                {/* ⭐ Status Badge Dropdown */}
                                                <td>
                                                    <Dropdown>
                                                        <Dropdown.Toggle variant="" className="p-0 border-0">
                                                            <span
                                                                className={`badge bg-${{
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
                                                            {["New", "Prospect", "In Progress", "Converted", "Closed"].map(
                                                                (status) => (
                                                                    <Dropdown.Item
                                                                        key={status}
                                                                        onClick={() => handleStatusChange(lead.id, status)}
                                                                    >
                                                                        {status}
                                                                    </Dropdown.Item>
                                                                )
                                                            )}
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </td>

                                                {/* ⭐ Actions Dropdown */}
                                                <td>
                                                    <Dropdown>
                                                        <Dropdown.Toggle variant="light" className="p-0 border-0">
                                                            <FaEllipsisV />
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu>
                                                            <Dropdown.Item
                                                                onClick={() => handleSendEmail(lead.email)}
                                                            >
                                                                Send Email
                                                            </Dropdown.Item>

                                                            <Dropdown.Item
                                                                onClick={() => handleSendWhatsApp(lead.phone)}
                                                            >
                                                                Send WhatsApp Message
                                                            </Dropdown.Item>

                                                            <Dropdown.Item onClick={() => handleEdit(lead.id)}>
                                                                Edit
                                                            </Dropdown.Item>

                                                            <Dropdown.Item
                                                                className="text-danger"
                                                                onClick={() => handleDelete(lead.id)}
                                                            >
                                                                Delete
                                                            </Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </td>

                                                <td>{new Date(lead.createdAt).toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            !loading && <p>No leads found.</p>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
