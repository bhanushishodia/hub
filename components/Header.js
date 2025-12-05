
"use client";
import React, { useEffect, useState } from "react";
import { getImage } from "../app/utils/getImage";
const logo = getImage("/hub-logo.png");

const HubHeader = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  // Fullscreen Toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Auto detect fullscreen exit (ESC)
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return (
    <header
      className="hub-header-lead  w-100 d-flex justify-content-between align-items-center px-3"
      style={{ position: "fixed", top: 0, zIndex: 10, height: "64px", }}
    >

      {/* Left: Logo */}
      <img src={logo} alt="Logo" width="190" style={{ cursor: "pointer" }} />

      {/* Center Title */}
      <div className="fs-5 text-white">
      Leads Management
      </div>

      {/* Right Icons Section */}
      <div className="d-flex align-items-center">

        {/* Fullscreen Icon */}
        <div className="mx-3" style={{ cursor: "pointer" }} onClick={toggleFullscreen}>
          {isFullscreen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 19v-2a2 2 0 0 1 2 -2h2"></path>
              <path d="M15 5v2a2 2 0 0 0 2 2h2"></path>
              <path d="M5 15h2a2 2 0 0 1 2 2v2"></path>
              <path d="M5 9h2a2 2 0 0 0 2 -2v-2"></path>
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 8V4h4"></path>
              <path d="M16 4h4v4"></path>
              <path d="M20 16v4h-4"></path>
              <path d="M8 20H4v-4"></path>
            </svg>
          )}
        </div>

     
        {/* Profile Dropdown */}
        <div className="position-relative ms-3">
          <img
            src="https://ik.imagekit.io/cloy701fl/images/login-2.png"
            alt="profile"
            className="rounded-circle"
            width="40"
            height="40"
            style={{ cursor: "pointer" }}
            onClick={() => setShowLogout(!showLogout)}
          />

       
        </div>
      </div>
    </header>
  );
};

export default HubHeader;
