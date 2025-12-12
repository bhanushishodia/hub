"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const LeadSidebar = () => {
  const router = useRouter();
  const [active, setActive] = useState("dashboard");

  const menu = [
    { id: "dashboard", label: "Dashboard", icon: "bi-speedometer2", url: "./dash" },

    { id: "all", label: "All Leads", icon: "bi-collection", url: "/leads" },

    { id: "website", label: "Website Leads", icon: "bi-globe", url: "/leads/website" },

    { id: "events", label: "Talk To Events", icon: "bi-calendar2-event", url: "/leads/events" },

    { id: "ads", label: "Ads Leads", icon: "bi-badge-ad", url: "/leads/ads" },

    { id: "partner", label: "Partner Pages", icon: "bi-people-fill", url: "/partner" },

    { id: "other", label: "Other Pages", icon: "bi-grid", url: "/leads/otherpages" },

    { id: "settings", label: "Settings", icon: "bi-gear-wide-connected", url: "/settings" },

    { id: "logout", label: "Logout", icon: "bi-box-arrow-right", url: "/" },
  ];

  const handleClick = (item) => {
    setActive(item.id);
    router.push(item.url);
  };

  return (
    <div
      className="text-white d-flex flex-column align-items-center sidebar-scroll"
      style={{
        width: "115px",
        height: "calc(100vh - 64px)",
        marginTop: "64px",
        overflowY: "auto",
        background: "linear-gradient(92.5deg, #0a4763 -.68%, #099e8d 97.14%)"
      }}
    >
      <ul className="nav flex-column w-100">
        {menu.map((item) => (
          <li
            key={item.id}
            className={`sidebar-item text-center py-2 rounded mb-2
              ${active === item.id ? "text-white fw-semibold" : "text-light"}
            `}
            style={{ cursor: "pointer", transition: "0.3s" }}
            onClick={() => handleClick(item)}
          >
            <div className="d-flex flex-column align-items-center side">
              <i className={`bi ${item.icon} fs-4 mb-1`}></i>
              <span className="sidesmall">{item.label}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeadSidebar;
