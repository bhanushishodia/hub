"use client";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Link from "next/link";

import { FaUsers, FaCheckCircle, FaChartLine } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

const leadsData = [
  { month: "Jan", leads: 100 },
  { month: "Feb", leads: 200 },
  { month: "Mar", leads: 300 },
  { month: "Apr", leads: 250 },
  { month: "May", leads: 400 },
  { month: "Jun", leads: 350 },
];

const conversionData = [
  { month: "Jan", rate: 20 },
  { month: "Feb", rate: 25 },
  { month: "Mar", rate: 30 },
  { month: "Apr", rate: 28 },
  { month: "May", rate: 35 },
  { month: "Jun", rate: 37 },
];

export default function DashboardPage() {
  return (
  <div className="d-flex flex-column" style={{ height: "100vh" }}>
            <Header />

            <div className="d-flex" style={{ height: "100%" }}>
                <Sidebar />

        <div className="container mt-5 py-5">
          <h2 className="mb-4">Dashboard Overview</h2>

          {/* Cards */}
          <div className="row g-4">
            <div className="col-md-4">
              <Link href="/leads" className="text-decoration-none text-dark">
                <Card
                  icon={<FaUsers />}
                  title="Total Leads"
                  value="1,200"
                />
              </Link>
            </div>

            <div className="col-md-4">
              <Card
                icon={<FaCheckCircle />}
                title="Converted Leads"
                value="450"
              />
            </div>

            <div className="col-md-4">
              <Card
                icon={<FaChartLine />}
                title="Conversion Rate"
                value="37.5%"
              />
            </div>
          </div>

          {/* Charts */}
          <div className="row mt-4">
            <div className="col-md-6">
              <div className="bg-white p-4 shadow-sm rounded">
                <h3 className="h5 mb-3">Leads Over Time</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={leadsData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="leads" fill="#0d6efd" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="col-md-6">
              <div className="bg-white p-4 shadow-sm rounded">
                <h3 className="h5 mb-3">Conversion Rate Over Time</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={conversionData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Line
                      type="monotone"
                      dataKey="rate"
                      stroke="#dc3545"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
             </div>
    </div>
  );
}

/* Reusable Card Component */
function Card({ icon, title, value }) {
  return (
    <div className="bg-white p-4 rounded shadow-sm d-flex align-items-center h-100">
      <div className="text-primary fs-1 me-3">{icon}</div>
      <div>
        <h4 className="h6 mb-1">{title}</h4>
        <p className="h5 fw-bold mb-0">{value}</p>
      </div>
    </div>
  );
}
