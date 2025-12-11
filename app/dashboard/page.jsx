"use client"; // required for client-side hooks in app/ directory
import React, { useState, useRef, useEffect } from "react";
import UseCase from "@/components/UseCase";
import { useSession, signOut } from "next-auth/react";
import { getImage } from "../utils/getImage";
import 'bootstrap/dist/css/bootstrap.min.css';
import EventSlider from "@/components/EventSlider";
import HubForm from "@/components/forms/HubForm";
import Lead from "@/components/Lead";
import Stage2 from "@/components/Stage2";
import Stage3 from "@/components/Stage3";
import Stage4 from "@/components/Stage4";
import Stage5 from "@/components/Stage5";

import { useRouter } from "next/navigation";
const whatsappHealthcareImg = getImage('/blog/whatsapp-for-healthcare.webp');
const ApiGovermentImg = getImage("blog/how-whatsapp-business-api-can-improve-government-gmployment-services.webp");// Fetching images dynamically using the getImage function

const EducationImg = getImage("blog/whatsapp-for-education.webp");
const RestaurantsImg = getImage("blog/whatsapp-business-for-restaurants.webp");
const TravelImg = getImage("blog/whatsapp-business-api-for-travel.webp");
const RetailImg = getImage("blog/whatsapp-business-for-retail.webp");
const playIcon = getImage("/whatsapp-pricing/play_icon.svg");
const demoVideoThumbnail = getImage("/whatsapp-pricing/demo-video.png");
const stage1 = getImage("/hub/stage-1.png");
const stage2 = getImage("/hub/stage-2.png");
const stage3 = getImage("/hub/stage-3.png");
const stage4 = getImage("/hub/stage-4.png");
const stage5 = getImage("/hub/stage-5.png");
const stage6 = getImage("/hub/negotiation.png");
const sop1 = getImage("/hub/sop-1.png");
const sop2 = getImage("/hub/sop-2.png");
const sop3 = getImage("/hub/sop-3.png");
const update1 = getImage("/hub/update-1.png");
const update2 = getImage("/hub/update-2.png");
const update3 = getImage("/hub/update-3.png");


const tools = [
  { name: "LeadSquared", img: getImage("/integation-hub/lead.png") },
  { name: "HubSpot", img: getImage("/integation-hub/hubspot.png") },
  { name: "WOO", img: getImage("/integation-hub/woo-commerce.png") },
  { name: "Zapier", img: getImage("/integation-hub/zapier.png") },
  { name: "Salesforce", img: getImage("/integation-hub/salesforce.png") },
  { name: "Shopify", img: getImage("/integation-hub/images.png") },
  { name: "Zoho", img: getImage("/integation-hub/zoho.png") },
  { name: "Google Sheet", img: getImage("/integation-hub/g-sheet.png") },
  { name: "Calendly", img: getImage("/integation-hub/calandy.png") },
  { name: "Zendesk", img: getImage("/integation-hub/zendesk.png") },
  { name: "Facebook", img: getImage("/integation-hub/fb.png") },
];

// TOP par sector images list define karo
const sectors = [
  {
    name: "Travel Sector",
    img: getImage("/api/travel.png"),
  },
  {
    name: "Education Sector",
    img: getImage("/api/education.png"),
  },
  {
    name: "Human Resources Sector",
    img: getImage("/api/hr.png"),
  },
  {
    name: "Real Estate Sector",
    img: getImage("/api/real-estate.png"),
  },
  {
    name: "BFSI Sector",
    img: getImage("/api/bfsi.png"),
  },
  {
    name: "Healthcare Sector",
    img: getImage("/api/health.png"),
  },
  {
    name: "Aviation Sector",
    img: getImage("/api/aviation.png"),
  },
  {
    name: "Wholesale Sector",
    img: getImage("/api/wholesale.png"),
  },
  {
    name: "Logistics Sector",
    img: getImage("/api/logistices.png"),
  },
  {
    name: "Non-profit & Religious places Sector",
    img: getImage("/api/non-profit.png"),
  },
];


const blogCards = [
  {
    imgSrc: whatsappHealthcareImg,
    title: "How to Use WhatsApp for Healthcare: A Simple Guide",
    description:
      "With a large user base of 2.79 billion people globally, WhatsApp is not only just for chatting; it’s also helping to save lives!",
    link: "https://anantya.ai/blog/whatsapp-for-healthcare-a-simple-guide",

  },

  {
    imgSrc: ApiGovermentImg,
    title: "How WhatsApp Business API Can Improve Government Employment Services",
    description:
      "We all know there is a huge craze in India for government jobs, and securing one is a dream for many. But what we don't know is that nearly 220 million ",
    link: "https://anantya.ai/blog/whatsapp-business-api-for-government-service",

  },

  {
    imgSrc: EducationImg,
    title: "WhatsApp for Education: Benefits & Use Cases",
    description:
      "Nowadays, everybody is added to WhatsApp groups, be it for chit-chat or sharing information with each other. For example, when a student is admitted..",
    link: "https://anantya.ai/blog/whatsapp-for-education",

  },
  {
    imgSrc: RestaurantsImg,
    title: "WhatsApp for Restaurants: Unlock Benefits and Explore Use Cases",
    description:
      "Giving your customers outstanding services while managing a business effectively is a tough challenge for restaurants nowadays...",
    link: "https://anantya.ai/blog/whatsapp-business-for-restaurants",

  },
  {
    imgSrc: TravelImg,
    title: "WhatsApp Business API for Travel: Benefits & Use Cases in 2025",
    description:
      "Have you ever scrolled Instagram or YouTube shorts just to see what's trending, on an average 10 out of 1 reel/shorts always turns out to be a travel reel...",
    link: "https://anantya.ai/blog/whatsapp-for-travel",

  },
  {
    imgSrc: RetailImg,
    title: "WhatsApp for Retail : Benefits & Use Cases",
    description:
      "In today's fast-paced world, a retail industry can only be successful depending on how their connection with its customers is....",
    link: "https://anantya.ai/blog/whatsapp-business-for-retail",

  },
  // Add other card data objects here
];

export default function KnowledgeHubDashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const fullRef = useRef(null);

  const [activeTab, setActiveTab] = useState("home");
  const [isPlaying, setIsPlaying] = useState(false); // State to control video playback
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);


  // ✅ check local login cookie
  const hasLocalAuth =
    typeof document !== "undefined" &&
    document.cookie.includes("localAuth=true");
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  useEffect(() => {
    //  allow Google OR local login
    if (status === "unauthenticated" && !hasLocalAuth) {
      router.push("/");
    }
  }, [status, hasLocalAuth, router]);

  //  loader only for google auth

  //  loader only for google auth
  if (status === "loading") return null;

  //  block rendering if no auth at all
  if (!session && !hasLocalAuth) return null;

  const handleLogout = () => {
    //  clear local auth too
    document.cookie = "localAuth=; Max-Age=0; path=/";
    signOut({ callbackUrl: "/" });
  };



  const toggleFullscreen = () => {
    if (typeof document !== "undefined") {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };



  const logo = getImage("hub-logo.png");
  const hubImage = getImage("hub-main.png");
  const meta = getImage("/whatsapp-pricing/Meta.png");


  const handlePlay = () => {
    setIsPlaying(true);
  };

  // SEARCH DATA - IDs must match your sections
  const searchData = [
    { display: "Product Demo", id: "section-01", keywords: ["demo", "product"] },
    { display: "Lead Management Process", id: "section-02", keywords: ["lead", "management"] },

    { display: "Stage 1", id: "stage-1", keywords: ["stage 1"] },
    { display: "Stage 2", id: "stage-2", keywords: ["stage 2"] },
    { display: "Stage 3", id: "stage-3", keywords: ["stage 3"] },
    { display: "Stage 4", id: "stage-4", keywords: ["stage 4"] },
    { display: "Stage 5", id: "stage-5", keywords: ["stage 5"] },
    { display: "Stage 6", id: "stage-6", keywords: ["stage 6"] },

    // Negotiation group with multiple keyword displays
    { display: "Pricing", id: "stage-6", keywords: ["pricing", "price"] },
    { display: "Proposal", id: "stage-6", keywords: ["proposal"] },
    { display: "Quotation", id: "stage-6", keywords: ["quotation", "quote"] },
    { display: "Negotiation", id: "stage-6", keywords: ["negotiation", "deal"] }
  ];




  // When typing in input
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchValue(value);

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const filtered = searchData.filter(item =>
      item.display.toLowerCase().includes(value) ||
      item.keywords.some(keyword => keyword.includes(value))
    );

    setSuggestions(filtered);
  };



  // When user clicks suggestion
  const goToSection = (id) => {
    if (typeof window !== "undefined") {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }

    setSuggestions([]);
    setSearchValue("");
  };



  const handleSuggestionClick = (id) => {
    if (typeof window !== "undefined") {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }

    setSuggestions([]);
    setSearchValue("");
  };

  return (
    <div className="container-fluid p-0">
      {/* ===== STICKY HEADER ===== */}
      <header className="sticky-top hub-header shadow-sm py-1 px-3 d-flex align-items-center justify-content-between">
        {/* Left: Logo */}
        <div className="d-flex align-items-center gap-3">
          <img src={logo} alt="Anantya.ai Logo" width="190" />
        </div>

        {/* Middle: Search Bar */}
        {/* Middle: Search Bar */}
        <div className="search-bar-header d-none d-md-flex align-items-center">
          <div className="position-relative w-100" style={{ minWidth: "400px" }}>

            {/* SEARCH INPUT */}
            <input
              type="text"
              className="form-control ps-3 pe-5"
              placeholder="What are you looking for today ?"
              style={{ borderRadius: "30px" }}
              value={searchValue}
              onChange={handleSearch}
            />

            {/* Search Button */}
            <button
              className="btn btn-success position-absolute top-50 end-0 translate-middle-y me-2 d-flex align-items-center justify-content-center"
              style={{ borderRadius: "50%", width: "32px", height: "32px" }}
            >
              <i className="bi bi-search"></i>
            </button>

            {/* SUGGESTIONS BOX */}
            {suggestions.length > 0 && (
              <ul
                className="list-group hublist position-absolute w-100 mt-2 shadow"
                style={{ zIndex: 1000 }}
              >
                {suggestions.map((item, index) => (
                  <li
                    key={index}
                    className="list-group-item list-group-item-action border-0"
                    style={{ cursor: "pointer" }}
                    onClick={() => goToSection(item.id)}
                  >
                    {item.display}
                  </li>
                ))}
              </ul>
            )}

          </div>
          <button onClick={toggleFullscreen} className="btn ms-3 d-flex align-items-center">
            {isFullscreen ? (
              // Fullscreen Exit Icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 8v-2a2 2 0 0 1 2-2h2" />
                <path d="M4 16v2a2 2 0 0 0 2 2h2" />
                <path d="M16 4h2a2 2 0 0 1 2 2v2" />
                <path d="M16 20h2a2 2 0 0 0 2-2v-2" />
              </svg>
            ) : (
              // Fullscreen Enter Icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M15 19v-2a2 2 0 0 1 2-2h2" />
                <path d="M15 5v2a2 2 0 0 0 2 2h2" />
                <path d="M5 15h2a2 2 0 0 1 2 2v2" />
                <path d="M5 9h2a2 2 0 0 0 2-2v-2" />
              </svg>
            )}
          </button>

          <button onClick={handleLogout} className="logout-icon-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="logout-svg"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>


        {/* Right: Tabs */}
        <div className="d-flex align-items-center gap-3">
          <button
            className={`btn-hub ${activeTab === "home"
              ? "btn-success text-white"
              : "btn-outline-success"
              }`}
            onClick={() => setActiveTab("home")}
          >
            Pre Sales
          </button>
        </div>
      </header>

      {/* ===== PAGE CONTENT ===== */}
      <div className="row g-0 min-vh-100">
        {/* ===== LEFT SIDEBAR ===== */}
        <div
          className="sidebar d-flex flex-column align-items-center py-0"
          style={{
            maxWidth: "115px",
            width: "115px", // fixed width
            minHeight: "100vh", background: "linear-gradient(92.5deg, #0a4763 -.68%, #099e8d 97.14%)"
          }}
        >

          <ul className="nav flex-column text-white w-100 text-center my-auto">
            {[
              { id: "home", icon: "bi-house-door", label: "Home" },
              {
                id: "comprehensive",
                icon: "bi-journal-text",
                label: "Comprehensive<br />Resources",
              },
              {
                id: "tailored",
                icon: "bi-people",
                label: "Tailored <br /> Resources",
              },
              {
                id: "leads",
                icon: "bi-person-lines-fill",
                label: "Leads <br /> Management",
                url: "/leads", // ⭐ ONLY LEADS HAS URL
              },
              {
                id: "operations",
                icon: "bi-gear",
                label: "Operational <br /> Processes",
              },
              {
                id: "updates",
                icon: "bi-newspaper",
                label: "Updates &<br /> News",
              },
              { id: "integration", icon: "bi-plug", label: "Integration" },
              { id: "know", icon: "bi-info-circle", label: "Know More" },
            ].map((item) => (
              <li
                key={item.id}
                className={`nav-item px-3 d-flex flex-column align-items-center sidebar-item ${activeTab === item.id ? "active-sidebar" : ""
                  }`}
                onClick={() => {
                  setActiveTab(item.id);

                  // ⭐ Navigate ONLY IF URL EXISTS (means only for leads)
                  if (item.url) {
                    router.push(item.url);
                  }
                }}
              >
                <i className={`bi ${item.icon} fs-4 mb-0`}></i>

                <small
                  className="text-white"
                  style={{ marginTop: "0px" }}
                  dangerouslySetInnerHTML={{ __html: item.label }}
                />
              </li>
            ))}
          </ul>

        </div>

        {/* ===== MAIN CONTENT ===== */}
        <div
          className="main-content px-4 pt-4 text-center flex-grow-1"
          style={{
            width: "calc(100% - 115px)", // sidebar ke baad bacha space
          }}
        >
          {activeTab === "home" && (
            <>
              {/* 🟩 Section 1: Hero Text */}
              <div id="home-hero-section">
                <h6 className="text-muted">Your Guide Starts Here</h6>
                <h2 className="fw-bold text-dark">
                  <span>Anantya’s</span> Knowledge Hub
                </h2>
                <p className="text-muted mb-3 fw-semibold">
                  Your Support Center for Smarter, Faster, Insight-Driven Sales
                </p>

                <p className="text-secondary mb-4">
                  With end-to-end information at your fingertips, this smart hub
                  brings clarity, speed, and control to <br /> everything you do.
                </p>
              </div>

              {/* 🟩 Section 2: Badge + Meta Partner */}
              <div className="hub mt-4 text-black" id="home-badge-meta">
                <span className="badge-hub">
                  Powered by Official WhatsApp Business API &nbsp;
                  {/* SVG same as before */}
                </span>

                <a
                  href="https://www.facebook.com/business/partner-directory/search?solution_type=messaging&platforms=whatsapp&id=4336810659772608&section=overview"
                  className="meta-link"
                  style={{ textDecoration: "none", position: "relative", zIndex: 9999 }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>
                    <img src={meta} className="img-fluid meta_logo text-black" alt="Meta Logo" />
                    <u style={{ textDecoration: "underline" }}>
                      Meta <small>Tech Partner</small>
                    </u>
                  </span>
                </a>
              </div>

              {/* 🟩 Section 3: Main Hub Image */}
              <div
                id="home-main-image"
                className="integration-icons d-flex flex-wrap justify-content-center gap-4 mt-1"
                style={{ position: "relative", top: "-140px" }}
              >
                <img
                  src={hubImage}
                  alt="Hub"
                  width="100%"
                  style={{
                    marginTop: "0",
                    maxWidth: "1000px",
                    height: "auto",
                  }}
                />
              </div>
            </>
          )}


          {activeTab === "comprehensive" && (
            <div id="comprehensive-section">
              <section className="pb-5">
                <div className="container text-center" id="stage-1">
                  {/* Top Circle Number */}
                  <div className="step-circle-wrapper d-flex justify-content-center mb-3">
                    <div
                      className="rounded-circle bg-info-circle text-black d-flex align-items-center justify-content-center step-circle"
                      style={{ width: "42px", height: "42px" }}
                    >
                      01
                    </div>
                  </div>


                  {/* Heading */}
                  <h3 className="fw-bold text-dark">
                    <span className="text-info-head">Product / Panel</span> Demo
                  </h3>
                  <p className="text-muted mx-auto" style={{ maxWidth: "650px" }}>
                    Powered by automation, real-time monitoring, and data-driven
                    visualization, you can simplify processes, accelerate response times,
                    and grow with ease.
                  </p>
                </div>

                {/* Main Content */}
                <div className="container mt-5">
                  <div className="row align-items-center">
                    {/* Left Section */}
                    <div className="col-md-6 mb-4 mb-md-0 text-start">
                      <button
                        className="btn btn-warning fw-semibold rounded-3 mb-4"
                        style={{ backgroundColor: "#FFF7C0" }}
                      >
                        Explore Anantya Platform
                      </button>

                      <h5 className="fw-bold text-black">
                        About <span className="text-info-head text-start">Anantya Panel</span>
                      </h5>

                      <ul className="text-muted mt-3">
                        <li>
                          Anantya.ai Dashboard is a single, unified command center for
                          effortless customer interactions.
                        </li>
                        <li>
                          It consolidates all—agents, messages, and analytics, into one
                          easy-to-use console.
                        </li>
                      </ul>

                      <a
                        href="https://www.youtube.com/watch?v=0ulAJS1P3rI&t=30s" target="_blank"
                        className="fw-semibold text-decoration-none ms-md-4  d-inline-block"
                        style={{ color: "#8C8B00" }}
                      >
                        Experience Platform in Action →
                      </a>
                    </div>

                    {/* Right Section */}
                    <div className="col-md-6 text-center">
                      <div className="video-wrapper">
                        {!isPlaying ? (
                          <>
                            <img
                              src={demoVideoThumbnail}
                              alt="Video Thumbnail"
                              className="video-thumbnail"
                            />
                            <div className="helpdesk-video-icon__button" onClick={handlePlay}>
                              <img src={playIcon} className="img-fluid" alt="Play Icon" />
                            </div>
                          </>
                        ) : (

                          <video className="video-frame" controls autoPlay>
                            <source src="/videos/demo-video.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>

                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="py-5">
                <div className="container text-center mb-5" id="stage-2">
                  {/* Circle Number */}

                  <div className="step-circle-wrapper step-circle-wrapper-yellow d-flex justify-content-center mb-3">
                    <div
                      className="rounded-circle bg-warning text-white d-flex align-items-center justify-content-center step-circle"
                      style={{ width: "42px", height: "42px" }}
                    >
                      02
                    </div>
                  </div>


                  {/* Heading */}
                  <h3 className="fw-bold">
                    <span className="text-info-head">Lead Management Process</span>
                  </h3>
                  <p className="text-muted mx-auto" style={{ maxWidth: "650px" }}>
                    Developed strategies and templates for initiating, engaging, and
                    converting leads using effective messaging at every stage of the
                    outreach process.
                  </p>
                </div>

                {/* Main Row */}
                <div className="container">
                  <Lead />
                </div>
              </section>

              <section className="py-5">
                <div className="container text-center mb-5" id="stage-3">
                  {/* Circle Number */}
                  <div className="step-circle-wrapper step-circle-wrapper-green d-flex justify-content-center mb-3">
                    <div
                      className="rounded-circle text-dark d-flex align-items-center justify-content-center step-circle step-circle-green"
                      style={{
                        width: "42px",
                        height: "42px",
                      }}
                    >
                      03
                    </div>
                  </div>


                  {/* Heading */}

                </div>

                {/* Main Row */}
                <div className="container">
                  <Stage2 />
                </div>
              </section>
              <section className="py-5">
                <div className="container text-center mb-5" id="stage-4">
                  {/* Circle Number */}
                  <div className="step-circle-wrapper step-circle-wrapper-blue2 d-flex justify-content-center mb-3">
                    <div
                      className="rounded-circle text-dark d-flex align-items-center justify-content-center step-circle step-circle-blue2"
                      style={{
                        width: "42px",
                        height: "42px",
                      }}
                    >
                      04
                    </div>
                  </div>

                </div>

                <div className="container">
                  <Stage3 />

                </div>
              </section>
              <section className="py-5">
                <div className="container text-center mb-5" id="stage-5">
                  {/* Circle Number */}
                  <div className="step-circle-wrapper step-circle-wrapper-pink d-flex justify-content-center mb-3">
                    <div
                      className="rounded-circle text-dark d-flex align-items-center justify-content-center step-circle step-circle-pink"
                      style={{
                        width: "42px",
                        height: "42px",
                      }}
                    >
                      05
                    </div>
                  </div>

                </div>

                <div className="container">
                  <Stage4 />

                </div>
              </section>
              <div className="container my-5">
                {/* ---------- Stage 6 ---------- */}
                <div className="text-center mb-5">
                  <div className="step-circle-wrapper step-circle-wrapper-orange d-flex justify-content-center mb-3">
                    <div
                      className="rounded-circle text-dark d-flex align-items-center justify-content-center step-circle step-circle-orange"
                      style={{
                        width: "42px",
                        height: "42px",
                      }}
                    >
                      06
                    </div>
                  </div>
                  <div className="row align-items-center mt-4">
                    <Stage5 />
                  </div>
                </div>

                {/* ---------- Stage 7 ---------- */}
                <div className="text-center mt-5" id="stage-6">
                  <div className="step-circle-wrapper step-circle-wrapper-blue7 d-flex justify-content-center mb-3">
                    <div
                      className="rounded-circle text-dark d-flex align-items-center justify-content-center step-circle step-circle-blue7"
                      style={{
                        width: "42px",
                        height: "42px",
                      }}
                    >
                      07
                    </div>
                  </div>

                  <h4 className="fw-bold  text-info-head">Negotiation</h4>
                  <p className="text-muted small">
                    Smarter discussions, stronger deals, seamless closures.
                  </p>

                  <div className="row align-items-center mt-4">
                    <div className="col-md-6 text-start">
                      <span className="badge bg-success-subtle text-success px-3 py-2 mb-2  btn btn-warning fw-semibold rounded-3 mb-4">
                        Negotiation
                      </span>
                      <h5 className="fw-bold text-dark">
                        <span className="text-info-head"> Master Negotiations</span> with Ease
                      </h5>
                      <ul className="text-muted small">
                        <li>
                          Guidelines for negotiating deals, including obtaining approvals
                          from Regional Head and Product Head.
                        </li>
                        <li className="my-3">Negotiation primarily occurs via email.</li>
                      </ul>

                      <a
                        href="/pdf/Anantya_Global_Conversation_Rate.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="fw-semibold ms-4 text-decoration-none"
                        style={{ color: "#198754", fontWeight: 600 }}
                      >
                        Global pricing &rarr;
                      </a>

                      <a
                        href="/pdf/Final Anantya Neo Planspdf.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="fw-semibold ms-3 text-decoration-none"
                        style={{ color: "#198754", fontWeight: 600 }}
                      >
                        Proposal &rarr;
                      </a>



                    </div>

                    <div className="col-md-6 text-center">
                      <img src={stage6} alt="Negotiation Illustration" className="img-fluid rounded-4 shadow-sm" style={{ width: "80%" }} />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {activeTab === "tailored" && (
            <div id="tailored-education">
              <UseCase />
            </div>
          )}
          {activeTab === "leads" && (
            <div id="leads-management">
              <UseCase />
            </div>
          )}

          {activeTab === "operations" && (
            <div id="operation">
              <section className="pb-5 ">
                <div className="container">
                  <div className="px-md-4">
                    <div className="step-circle-wrapper d-flex justify-content-center mb-3">
                      <div
                        className="rounded-circle bg-info-circle text-black d-flex align-items-center justify-content-center step-circle"
                        style={{ width: "42px", height: "42px" }}
                      >
                        01
                      </div>
                    </div>
                    <h3 className="fw-bold mb-3">
                      <span className="text-info-head">SOP & SLA</span>
                    </h3>
                    <p className="text-muted">
                      Ensuring every process runs smooth, smart, and on time.
                    </p>
                  </div>
                  <div className="row row-cols-1 row-cols-md-3 g-4 pt-4 px-md-0 px-3 blog-content">
                    <div className="col">
                      <div className="sop_card px-4 mb-4 h-100 text-start" data-wow-delay="0s">
                        <img src={sop1} className="img-fluid" alt="blog-image" />
                        <span
                          className="badge rounded-pill mt-3"
                          style={{
                            backgroundColor: "rgba(201, 255, 242, 1)",
                            color: "#000",
                            padding: "6px 12px",
                            fontSize: "12px",
                            fontWeight: 600,
                            border: "1px solid rgba(0,0,0,0.1)"
                          }}
                        >
                          Pre-Sales
                        </span>

                        <h5><a href="/blog/whatsapp-business-api-india-2025-guide">Pre-Sales SOP & SLA</a></h5>
                        <div className="info">
                          <div className="text small text-black mb-2 ">Outlines how Anantya.ai automates lead engagement, follow-ups, and communication to boost response speed and conversion rates.
                          </div>
                          <a
                            href="/pdf/Onboarding-SOP&SLA.pdf"
                            className="read-more-link"
                            download
                            aria-label="Onboarding SOP & SLA"
                            title="Onboarding SOP & SLA"
                          >
                            Download Now <span className="arrow">→</span>

                          </a>


                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div className="sop_card px-4  mb-4" data-wow-delay="0s">
                        <img src={sop2} className="img-fluid" alt="blog-image" />
                        <span
                          className="badge rounded-pill mt-3"
                          style={{
                            backgroundColor: "rgba(201, 255, 242, 1)",
                            color: "#000",
                            padding: "6px 12px",
                            fontSize: "12px",
                            fontWeight: 600,
                            border: "1px solid rgba(0,0,0,0.1)"
                          }}
                        >
                          Onboarding
                        </span>
                        <h5><a href="/blog/whatsapp-business-api-india-2025-guide">Onboarding SOP & SLA</a></h5>
                        <div className="info">
                          <div className="text small text-black mb-2">Covers client onboarding steps, automation templates, and best practices for a smooth and consistent start. </div>
                          <a
                            href="/pdf/Onboarding-SOP&SLA.pdf"
                            className="read-more-link"
                            download
                            aria-label="Onboarding SOP & SLA"
                            title="Onboarding SOP & SLA"
                          >
                            Download Now <span className="arrow">→</span>

                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div className="sop_card px-4 mb-4" data-wow-delay="0s">
                        <img src={sop3} className="img-fluid" alt="blog-image" />
                        <span
                          className="badge rounded-pill mt-3"
                          style={{
                            backgroundColor: "rgba(201, 255, 242, 1)",
                            color: "#000",
                            padding: "6px 12px",
                            fontSize: "12px",
                            fontWeight: 600,
                            border: "1px solid rgba(0,0,0,0.1)"
                          }}
                        >
                          Explore Integration
                        </span>
                        <h5><a href="/blog/whatsapp-business-api-india-2025-guide">Integration Process</a></h5>
                        <div className="info">
                          <div className="text small text-black mb-2"> Explains how Anantya.ai connects with CRMs, e-commerce, and payment systems for seamless integration and workflow efficiency. </div>
                          <a
                            href="/pdf/Integration-Process.pdf"
                            className="read-more-link"
                            download
                            aria-label="Integration Process"
                            title="Integration Process"
                          >
                            Download Now<span className="arrow">→</span>

                          </a>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === "updates" && (
            <div id="updates">
              <div className="step-circle-wrapper step-circle-wrapper-green d-flex justify-content-center mb-3">
                <div
                  className="rounded-circle text-dark d-flex align-items-center justify-content-center step-circle step-circle-green"
                  style={{
                    width: "42px",
                    height: "42px",
                  }}
                >
                  01
                </div>
              </div>
              <h3 className="text-info-head">Event Highlights</h3>
              <p className="text-muted">
                Showcasing how Anantya.ai drives digital transformation and empowers <br /> businesses through innovation & connection
              </p>

              <EventSlider />

              <div className="step-circle-wrapper step-circle-wrapper-orange d-flex justify-content-center mb-3">
                <div
                  className="rounded-circle text-dark d-flex align-items-center justify-content-center step-circle step-circle-orange"
                  style={{
                    width: "42px",
                    height: "42px",
                  }}
                >
                  02
                </div>
              </div>
              <h3 className="text-info-head">Blog</h3>
              <p className="text-muted">
                Explore real-world applications and the latest advancements in <br /> WhatsApp automation with Anantya.ai.
              </p>
              <div className="row row-cols-1 row-cols-md-3 g-4 py-5 px-md-0 px-3 blog-content">
                {blogCards.slice(0, 6).map((card, index) => (
                  <div className="col" key={index}>
                    <div className="blog_card p-4 mb-4" data-wow-delay={`${index * 0.2}s`}>
                      <img src={card.imgSrc} className="img-fluid" alt="blog-image" />

                      <h5 className="my-3">
                        <a href={card.link}>{card.title}</a>
                      </h5>

                      <div className="info">
                        {/* <div className="text">{card.description}</div> */}
                        <a
                          href={card.link}
                          className="read-more-link"
                          aria-label={`Read more about ${card.title}`}
                          title={`Read more about ${card.title}`}
                        >
                          Read More
                          <span className="arrow">→</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>



              <div className="step-circle-wrapper step-circle-wrapper-blue7 d-flex justify-content-center mb-3">
                <div
                  className="rounded-circle text-dark d-flex align-items-center justify-content-center step-circle step-circle-blue7"
                  style={{
                    width: "42px",
                    height: "42px",
                  }}
                >
                  03
                </div>
              </div>

              <h3 className="text-info-head">Updates</h3>
              <p className="text-muted">
                Stay informed with the newest developments, product enhancements, and <br /> announcements from Anantya.ai.
              </p>
              <div className="row row-cols-1 row-cols-md-3 g-4 py-4 mb-3 px-md-0 px-3 blog-content">
                <div className="col">
                  <div className="sop_card p-4 " data-wow-delay="0s">
                    <img src={update1} className="img-fluid" alt="blog-image" />

                    <h5 className="liner_color">Build Points</h5>
                    <div className="info">
                      <div className="text small text-black mb-2">Stay updated with the latest build points, new features, and improvements. </div>
                      <a
                        href="/pdf/Build-v5.9.0.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="read-more-link"
                        aria-label="Read more and download Build-v5.9.0"
                      >
                        Explore new build updates <span className="arrow">→</span>
                      </a>

                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="sop_card p-4  " data-wow-delay="0s">
                    <img src={update2} className="img-fluid" alt="blog-image" />

                    <h5 className="liner_color"> Meta Updates</h5>
                    <div className="info">
                      <div className="text small text-black mb-2">Covers client onboarding steps, automation templates, and best practices for a smooth and consistent start. </div>
                      <a href="/blog/whatsapp-business-api-india-2025-guide" className="read-more-link" aria-label="Read more about WhatsApp Business API in 2025: The Complete Guide for Indian Businesses." title="Read more about WhatsApp Business API in 2025: The Complete Guide for Indian Businesses.">Explore updates <span className="arrow">→</span>

                      </a>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="sop_card p-4 " data-wow-delay="0s">
                    <img src={update3} className="img-fluid" alt="blog-image" />

                    <h5 className="liner_color">Anantya Updates</h5>
                    <div className="info">
                      <div className="text small text-black mb-2"> Explore the latest innovations, releases, and accomplishments from Anantya. </div>
                      <a href="/blog/whatsapp-business-api-india-2025-guide" className="read-more-link" aria-label="Read more about WhatsApp Business API in 2025: The Complete Guide for Indian Businesses." title="Read more about WhatsApp Business API in 2025: The Complete Guide for Indian Businesses.">Explore updates <span className="arrow">→</span>


                      </a>
                    </div>
                  </div>
                </div>

              </div>


            </div>
          )}

          {activeTab === "integration" && (
            <div id="integration">
              <div className="integration-section container text-center pb-5">
                {/* Step 1 */}
                <div className="step-circle-wrapper step-circle-wrapper-orange d-flex justify-content-center mb-3">
                  <div
                    className="rounded-circle text-dark d-flex align-items-center justify-content-center step-circle step-circle-orange"
                    style={{
                      width: "42px",
                      height: "42px",
                    }}
                  >
                    01
                  </div>
                </div>

                {/* Heading */}

                <h3 className="fw-bold text-dark"><span className=" text-info-head">Integration</span> Tools </h3>
                <p className="text-muted">
                  This section highlights tools that integrate seamlessly with Anantya.ai,
                  enabling smooth data flow, better lead <br /> management, optimized campaigns,
                  and automated communication.
                </p>

                {/* Integration Cards */}
                <div className="row justify-content-center g-4 pt-2 pb-4">
                  {tools.map((tool, index) => (
                    <div key={index} className="col-6 col-md-3 col-lg-2">
                      <div className="rounded-3  p-3 bg-white h-100 d-flex flex-column justify-content-center align-items-center" style={{ boxShadow: "0px 0px 9.9px 0px rgba(0, 0, 0, 0.14)" }}>

                        {/* ICON IMAGE */}
                        <img
                          src={tool.img}
                          alt={tool.name}
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "contain",
                            borderRadius: "10px",
                          }}
                        />

                        <p className="mb-0 text-black small mt-2">{tool.name}</p>
                      </div>
                    </div>
                  ))}
                </div>


                {/* Step 2 */}
                <div className="position-relative  mt-5">
                  <div className="step-circle-wrapper step-circle-wrapper-green d-flex justify-content-center mb-3">
                    <div
                      className="rounded-circle text-dark d-flex align-items-center justify-content-center step-circle step-circle-green"
                      style={{
                        width: "42px",
                        height: "42px",
                      }}
                    >
                      02
                    </div>
                  </div>
                </div>

                {/* API Section */}
                <h3 className="fw-bold text-info-head">
                  API <span className="text-dark">Integration</span>
                </h3>
                <p className="text-muted mb-4">
                  This section provides industry-specific API documentation and resources for
                  implementing tailored <br /> WhatsApp automation and integrations.
                </p>

                {/* API Sectors */}
                {/* API Sectors */}
                <div className="row justify-content-center g-4 py-4">
                  {sectors.map((item, index) => (
                    <div key={index} className="col-6 col-md-3 col-lg-2">
                      <div
                        className=" rounded-3 p-3  h-100 d-flex flex-column justify-content-center align-items-center"
                        style={{
                          boxShadow:
                            "0px 0px 4px 0px rgba(0, 0, 0, 0.25), 0px -3px 4px -1px rgba(0, 102, 255, 0.46) inset"
                        }}
                      >

                        {/* ICON IMAGE */}
                        <img
                          src={item.img}
                          alt={item.name}
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "contain",
                            borderRadius: "10px",
                          }}
                        />

                        {/* NAME */}
                        <p className="text-black mb-0 small text-center mt-2">
                          {item.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>

          )}

          {activeTab === "know" && (
            <div id="know">

              <section className="pb-5 ">
                <div className="container">
                  <div className="px-md-4">
                    <div className="step-circle-wrapper d-flex justify-content-center mb-3">
                      <div
                        className="rounded-circle bg-info-circle text-black d-flex align-items-center justify-content-center step-circle"
                        style={{ width: "42px", height: "42px" }}
                      >
                        01
                      </div>
                    </div>
                    <h2 className="fw-bold mb-3 text-dark">
                      <span className="text-info-head">Raise a Request</span> & FAQ
                    </h2>
                    <p className="text-muted">
                      Powered by automation, real-time monitoring, and data-driven
                      visualization, you can simplify <br /> processes, accelerate response
                      times, and grow with ease.
                    </p>
                  </div>
                  <div className="row align-items-center">
                    {/* Left Content */}
                    <div className="col-md-7 mb-4 mb-md-0 hub" style={{ position: "relative", zIndex: 1000 }}>
                      <div className="accordion" id="faqAccordion">

                        {/* Q1 */}
                        <div className="accordion-item custom-accordion">
                          <h2 className="accordion-header" id="q1">
                            <button
                              className="accordion-button bg-transparent text-dark shadow-none"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#a1"
                              aria-expanded="true"
                              aria-controls="a1"
                              style={{ position: "relative", zIndex: 20 }}
                            >
                              Q1. What is Anantya.ai?
                            </button>
                          </h2>
                          <div
                            id="a1"
                            className="accordion-collapse collapse show"
                            aria-labelledby="q1"
                            data-bs-parent="#faqAccordion"
                          >
                            <div className="accordion-body text-dark">
                              Anantya.ai is a Communication Platform as a Service (CPaaS) powered by the WhatsApp Business API
                              with omnichannel capabilities. Our platform helps businesses streamline customer communication,
                              manage lead inventory, drive better conversions, and boost conversions through WhatsApp Business API,
                              intelligent chatbots, and marketing automation tools.
                            </div>
                          </div>
                        </div>

                        {/* Q2 */}
                        <div className="accordion-item custom-accordion">
                          <h2 className="accordion-header" id="q2">
                            <button
                              className="accordion-button collapsed bg-transparent text-dark shadow-none"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#a2"
                              aria-expanded="false"
                              aria-controls="a2"
                              style={{ position: "relative", zIndex: 20 }}
                            >
                              Q2. What are the features do you offer?
                            </button>
                          </h2>
                          <div
                            id="a2"
                            className="accordion-collapse collapse"
                            aria-labelledby="q2"
                            data-bs-parent="#faqAccordion"
                          >
                            <div className="accordion-body text-dark">
                              <ul>
                                <li>API integration with CRM/ERP systems</li>
                                <li>Personalized chatbot that can be customized to your needs</li>
                                <li>An easy-to-use interface that is easy to implement</li>
                                <li>Multi-user live chat and instant messaging</li>
                                <li>Supports both business-initiated and user-initiated conversations</li>
                                <li>Multi-device and multi-agent setup</li>
                                <li>Bulk notifications and promotional broadcasts</li>
                                <li>Labelling and grouping for targeted information sharing</li>
                                <li>Welcome messages, away messages, and quick replies</li>
                                <li>Admin dashboard with analytical reports</li>
                                <li>Customer feedback tracking</li>
                                <li>Ability to send rich images, videos, documents, and voice notes</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* Q3 */}
                        <div className="accordion-item custom-accordion">
                          <h2 className="accordion-header" id="q3">
                            <button
                              className="accordion-button collapsed bg-transparent text-dark shadow-none"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#a3"
                              aria-expanded="false"
                              aria-controls="a3"
                              style={{ position: "relative", zIndex: 20 }}
                            >
                              Q3. How can Anantya.ai help in my business?
                            </button>
                          </h2>
                          <div
                            id="a3"
                            className="accordion-collapse collapse"
                            aria-labelledby="q3"
                            data-bs-parent="#faqAccordion"
                          >
                            <div className="accordion-body text-dark">
                              Anantya.ai helps businesses enhance customer engagement, automate repetitive tasks, and increase
                              conversion rates. With chatbots and WhatsApp automation, businesses can handle queries instantly,
                              capture leads efficiently, and drive more sales through personalized marketing campaigns.
                              <br /><br />
                              In addition, we provide integrations with Facebook and Instagram, as well as seamless connectivity
                              to popular CRMs such as Salesforce, Zoho, LeadSquared, and many others — helping you streamline
                              operations and scale your business effectively.
                              <br /><br />
                              Our solution is industry-agnostic, meaning it can be customized to meet your specific business needs.
                            </div>
                          </div>
                        </div>

                        {/* Q4 */}
                        <div className="accordion-item custom-accordion">
                          <h2 className="accordion-header" id="q4">
                            <button
                              className="accordion-button collapsed bg-transparent text-dark shadow-none"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#a4"
                              aria-expanded="false"
                              aria-controls="a4"
                              style={{ position: "relative", zIndex: 20 }}
                            >
                              Q4. What are your Unique Selling Points?
                            </button>
                          </h2>
                          <div
                            id="a4"
                            className="accordion-collapse collapse"
                            aria-labelledby="q4"
                            data-bs-parent="#faqAccordion"
                          >
                            <div className="accordion-body  text-dark">
                              <strong>Exceptional Customer Support:</strong><br />
                              We take customer support very seriously. Every client is assigned a key account manager who guides
                              you through each step — from onboarding to campaign optimization — ensuring you get the most out of our platform.
                              <br /><br />

                              <strong>Customizable and User-Friendly Platform:</strong><br />
                              Our platform is designed to adapt to your business needs. Whether it’s automation flows, message templates,
                              or reporting dashboards, you can customize the interface and workflows to match your unique processes —
                              all without technical complexity.
                              <br /><br />

                              <strong>Built-in Lead Management and SMS Fallback:</strong><br />
                              We provide a comprehensive Lead Management System to help you organize, track, and nurture leads efficiently.
                              Additionally, our SMS fallback ensures your message is delivered even when WhatsApp is unavailable —
                              guaranteeing uninterrupted communication with your customers.
                            </div>
                          </div>
                        </div>

                        {/* Q5 */}
                        <div className="accordion-item custom-accordion">
                          <h2 className="accordion-header" id="q5">
                            <button
                              className="accordion-button collapsed bg-transparent text-dark shadow-none"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#a5"
                              aria-expanded="false"
                              aria-controls="a5"
                              style={{ position: "relative", zIndex: 20 }}
                            >
                              Q5. Do you provide us with leads?
                            </button>
                          </h2>
                          <div
                            id="a5"
                            className="accordion-collapse collapse"
                            aria-labelledby="q5"
                            data-bs-parent="#faqAccordion"
                          >
                            <div className="accordion-body  text-dark">
                              Anantya.ai does not directly generate leads. However, we can connect you with vendors who specialize
                              in lead generation and can provide relevant databases for your target audience.
                              <br /><br />
                              Once you have the leads, our platform helps you capture, manage, and engage them effectively through
                              WhatsApp, website widgets, Instagram, and Facebook — ensuring no opportunity is missed.
                            </div>
                          </div>
                        </div>
                        {/* Q6 */}
                        <div className="accordion-item custom-accordion">
                          <h2 className="accordion-header" id="q6">
                            <button
                              className="accordion-button collapsed bg-transparent text-dark shadow-none"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#a6"
                              aria-expanded="false"
                              aria-controls="a6"
                              style={{ position: "relative", zIndex: 20 }}
                            >
                              Q6. How long does Meta take to approve a template?
                            </button>
                          </h2>
                          <div
                            id="a6"
                            className="accordion-collapse collapse"
                            aria-labelledby="q6"
                            data-bs-parent="#faqAccordion"
                          >
                            <div className="accordion-body  text-dark">
                              Usually within <strong>1–15 minutes</strong>, but in some cases up to <strong>24 hours</strong> depending on Meta’s evaluation system.
                            </div>
                          </div>
                        </div>

                        {/* Q7 */}
                        <div className="accordion-item custom-accordion">
                          <h2 className="accordion-header" id="q7">
                            <button
                              className="accordion-button collapsed bg-transparent text-dark shadow-none"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#a7"
                              aria-expanded="false"
                              aria-controls="a7"
                              style={{ position: "relative", zIndex: 20 }}
                            >
                              Q7. What media formats does WhatsApp support?
                            </button>
                          </h2>
                          <div
                            id="a7"
                            className="accordion-collapse collapse"
                            aria-labelledby="q7"
                            data-bs-parent="#faqAccordion"
                          >
                            <div className="accordion-body  text-dark">
                              WhatsApp supports the following formats:
                              <br /><br />
                              <ul>
                                <li>Images (JPG, PNG)</li>
                                <li>Videos (MP4)</li>
                                <li>Documents (PDF, DOC, XLS, PPT)</li>
                                <li>Audio (AAC, MP3, M4A)</li>
                                <li>Stickers (WebP)</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* Q8 */}
                        <div className="accordion-item custom-accordion">
                          <h2 className="accordion-header" id="q8">
                            <button
                              className="accordion-button collapsed bg-transparent text-dark shadow-none"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#a8"
                              aria-expanded="false"
                              aria-controls="a8"
                              style={{ position: "relative", zIndex: 20 }}
                            >
                              Q8. Why are my WhatsApp templates paused?
                            </button>
                          </h2>
                          <div
                            id="a8"
                            className="accordion-collapse collapse"
                            aria-labelledby="q8"
                            data-bs-parent="#faqAccordion"
                          >
                            <div className="accordion-body text-dark">
                              Meta pauses templates when they receive a high number of negative user interactions, such as:
                              <ul>
                                <li>Blocks</li>
                                <li>User reports</li>
                                <li>Low-quality feedback</li>
                              </ul>
                              When paused, delivery stops temporarily to protect user experience.
                            </div>
                          </div>
                        </div>

                        {/* Q9 */}
                        <div className="accordion-item custom-accordion">
                          <h2 className="accordion-header" id="q9">
                            <button
                              className="accordion-button collapsed bg-transparent text-dark shadow-none"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#a9"
                              aria-expanded="false"
                              aria-controls="a9"
                              style={{ position: "relative", zIndex: 20 }}
                            >
                              Q9. Why is my Quality Rating low on Meta?
                            </button>
                          </h2>
                          <div
                            id="a9"
                            className="accordion-collapse collapse"
                            aria-labelledby="q9"
                            data-bs-parent="#faqAccordion"
                          >
                            <div className="accordion-body  text-dark">
                              Quality ratings drop due to:
                              <ul>
                                <li>High opt-outs or blocks</li>
                                <li>Repeated promotional messages</li>
                                <li>Sending to cold or outdated lists</li>
                                <li>Poorly written or misleading templates</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* Q10 */}
                        <div className="accordion-item custom-accordion">
                          <h2 className="accordion-header" id="q10">
                            <button
                              className="accordion-button collapsed bg-transparent text-dark shadow-none"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#a10"
                              aria-expanded="false"
                              aria-controls="a10"
                              style={{ position: "relative", zIndex: 20 }}
                            >
                              Q10. What is a Healthy Ecosystem Failure?
                            </button>
                          </h2>
                          <div
                            id="a10"
                            className="accordion-collapse collapse"
                            aria-labelledby="q10"
                            data-bs-parent="#faqAccordion"
                          >
                            <div className="accordion-body  text-dark">
                              A Healthy Ecosystem Failure occurs when WhatsApp detects unusual activity such as:
                              <ul>
                                <li>High message errors</li>
                                <li>Invalid numbers</li>
                                <li>Low-quality user responses</li>
                              </ul>
                              Meta temporarily restricts sending until the issue is resolved to maintain platform health.
                            </div>
                          </div>
                        </div>


                      </div>
                    </div>



                    {/* Right Form */}
                    <div className="col-md-5 ps-md-5">
                      <HubForm />

                    </div>
                  </div>
                </div>
              </section>


            </div>
          )}
          <div className=" text-center text-black py-3 mt-auto border-top ">

            <h6 className="mb-0 small">
              © {new Date().getFullYear()} Anantya.ai Inc. All rights reserved.
            </h6>

          </div>

        </div>

      </div>

      {/* ===== CSS STYLES ===== */}
      <style jsx>{`
      .sidebar {
  color: white;
  min-height: 100vh;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;  /* vertical scroll */
  overflow-x: hidden; /* horizontal scroll disable */
}

/* Hide scrollbar (Chrome, Safari) */
.sidebar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar (Firefox) */
.sidebar {
  scrollbar-width: none;
}

        .sidebar small{
          font-size: 9px;
        }

        .sidebar-item {
          cursor: pointer;
          transition: background-color 0.2s;
          text-align: center;
        }

        .sidebar-item:hover {
          background-color: rgba(255, 255, 255, 0.15);
        }

        .active-sidebar {
          background-color: rgba(255, 255, 255, 0.25);
        }

        .main-content {
          background-color: #f8f9fa;
        }

        @media (max-width: 767px) {
          header {
            flex-direction: column;
            gap: 10px;
            text-align: center;
          }

          .sidebar {
            flex-direction: row;
            overflow-x: auto;
            min-height: auto;
            padding: 10px;
          }

          .sidebar ul {
            flex-direction: row;
            gap: 15px;
          }

          .sidebar-item {
            font-size: 13px;
            white-space: nowrap;
          }
        }
      `}</style>
    </div>
  );
}
