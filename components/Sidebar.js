"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const LeadSidebar = () => {
  const router = useRouter();
  const [active, setActive] = useState("all");

  const menu = [
    { id: "all", label: "All Leads", icon: "bi-collection", url: "/leads" },

    { id: "home", label: "Home Page", icon: "bi-house-door", url: "/leads/home" },

    { id: "contact", label: "Contact Page", icon: "bi-person-lines-fill", url: "/leads/contact" },

    { id: "landing", label: "Landing Pages", icon: "bi-window-stack", url: "/leads/landing" },

    { id: "partner", label: "Partner Leads", icon: "bi-people-fill", url: "/leads/channel-partner-leads" },

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
      className="text-white d-flex flex-column align-items-center  sidebar-scroll "
      style={{
        width: "115px",
        height: "calc(100vh - 64px)", // header 64px fixed
        marginTop: "64px",
        overflowY: "auto",
        background: "#0a4d66",
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
