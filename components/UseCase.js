"use client";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getImage } from "../app/utils/getImage";
const travelImg = getImage("hub/Meta-Verified-Integration.jpeg");
const bfsiImg = getImage("hub/bfsi.jpeg");


const IndustriesUseCase = () => {
    const [popupData, setPopupData] = useState({
        show: false,
        title: "",
        type: "",
        link: "",
    });

    const openPopup = (type, link) => {
        setPopupData({
            show: true,
            title: type,
            type,
            link,
        });
    };

    const closePopup = () => {
        setPopupData({ show: false });
    };

    const useCaseLinks = {
        "Education Sector": {
            "Decks": "/pdf/edtech-dec.pdf",
            "Emailer": "/education/emailer",
            "Posters": "/education/posters",
            "Videos": "/videos/edtech-video.mp4",
            "Blogs": "https://anantya.ai/blog/whatsapp-for-education",
            "WhatsApp Link": "/education/whatsapp-link-1",
        },

        "Travel Sector": {
            "Decks": "/pdf/travel-tech-dec.pdf",
            "Emailer": "/travel/emailer",
            "Posters": travelImg,
            "Videos": "/travel/videos",
            "Blogs": "https://anantya.ai/blog/whatsapp-for-travel",
            "WhatsApp Link": "/education/whatsapp-link-2",
        },

        "BFSI Sector": {
            "Decks": "/pdf/bfsi-dec.pdf",
            "Emailer": "/travel/emailer",
            "Posters": bfsiImg,
            "Videos": "/travel/videos",
            "Blogs": "https://anantya.ai/blog/whatsapp-business-api-for-banking-sector/",
            "WhatsApp Link": "/education/whatsapp-link-3",
        },
        "Real Estate Sector": {
            "Decks": "/education/decks",
            "Emailer": "/education/emailer",
            "Posters": "/education/posters",
            "Videos": "https://drive.google.com/drive/folders/18Ujz7NlZPV_hL39ksP7uIk832MtPljZ-",
            "Blogs": "https://anantya.ai/blog/whatsapp-for-education",
            "WhatsApp Link": "/education/whatsapp-link-4",
        },

        "Logistics Sector": {
            "Decks": "/pdf/logistics-dec.pdf",
            "Emailer": "/travel/emailer",
            "Posters": "https://drive.google.com/drive/folders/1lcLbpuVf1qpvMWSBMf4yWM3YdJWPg5MD",
            "Videos": "/travel/videos",
            "Blogs": "https://anantya.ai/blog/whatsapp-for-travel",
            "WhatsApp Link": "/education/whatsapp-link-5",
        },

        "Wholesale Sector": {
            "Decks": "https://drive.google.com/drive/folders/1lcLbpuVf1qpvMWSBMf4yWM3YdJWPg5MD",
            "Emailer": "/travel/emailer",
            "Posters": "https://drive.google.com/drive/folders/1lcLbpuVf1qpvMWSBMf4yWM3YdJWPg5MD",
            "Videos": "/travel/videos",
            "Blogs": "https://anantya.ai/blog/whatsapp-for-travel",
            "WhatsApp Link": "/education/whatsapp-link-6",
        },
        "Non-profit & Religious Sector": {
            "Decks": "/pdf/non-profit-dec.pdf",
            "Emailer": "/education/emailer",
            "Posters": "/education/posters",
            "Videos": "https://drive.google.com/drive/folders/18Ujz7NlZPV_hL39ksP7uIk832MtPljZ-",
            "Blogs": "https://anantya.ai/blog/whatsapp-for-education",
            "WhatsApp Link": "/education/whatsapp-link-7",
        },

        "Aviation Sector": {
            "Decks": "/pdf/aviation-dec.pdf",
            "Emailer": "/travel/emailer",
            "Posters": "https://drive.google.com/drive/folders/1lcLbpuVf1qpvMWSBMf4yWM3YdJWPg5MD",
            "Videos": "/travel/videos",
            "Blogs": "https://anantya.ai/blog/whatsapp-for-travel",
            "WhatsApp Link": "/education/whatsapp-link-8",
        },

        "Healthcare Sector": {
            "Decks": "/pdf/healthcare-dec.pdf",
            "Emailer": "/travel/emailer",
            "Posters": "https://drive.google.com/drive/folders/1lcLbpuVf1qpvMWSBMf4yWM3YdJWPg5MD",
            "Videos": "/travel/videos",
            "Blogs": "https://anantya.ai/blog/whatsapp-for-travel",
            "WhatsApp Link": "/education/whatsapp-link-9",
        },
        "Human Resources Sector": {
            "Decks": "/pdf/logistics-dec.pdf",
            "Emailer": "/travel/emailer",
            "Posters": "https://drive.google.com/drive/folders/1lcLbpuVf1qpvMWSBMf4yWM3YdJWPg5MD",
            "Videos": "/travel/videos",
            "Blogs": "https://anantya.ai/blog/whatsapp-for-travel",
            "WhatsApp Link": "/education/whatsapp-link-10",
        },

        // ...baaki industries bhi isi format me
    };

    const industries = Object.keys(useCaseLinks);

    const useCaseImages = {
        Decks: getImage("/hub/deck-hub.png"),
        Emailer: getImage("/hub/emailer-hub.png"),
        Posters: getImage("/hub/poster.png"),
        Videos: getImage("/hub/videos-hub.png"),
        Blogs: getImage("/hub/blog-hub.png"),
        "WhatsApp Link": getImage("/hub/wa-link-hub.png"),
    };

    const [activeIndustry, setActiveIndustry] = useState(industries[0]);

    const useCaseContent = { "Education Sector": ["Decks", "Emailer", "Posters", "Videos", "Blogs", "WhatsApp Link"], "Travel Sector": ["Decks", "Emailer", "Posters", "Videos", "Blogs", "WhatsApp Link"], "BFSI Sector": ["Decks", "Emailer", "Posters", "Videos", "Blogs", "WhatsApp Link"], "Real Estate Sector": ["Decks", "Emailer", "Posters", "Videos", "Blogs", "WhatsApp Link"], "Logistics Sector": ["Decks", "Emailer", "Posters", "Videos", "Blogs", "WhatsApp Link"], "Wholesale Sector": ["Decks", "Emailer", "Posters", "Videos", "Blogs", "WhatsApp Link"], "Non-profit & Religious Sector": ["Decks", "Emailer", "Posters", "Videos", "Blogs", "WhatsApp Link"], "Aviation Sector": ["Decks", "Emailer", "Posters", "Videos", "Blogs", "WhatsApp Link"], "Healthcare Sector": ["Decks", "Emailer", "Posters", "Videos", "Blogs", "WhatsApp Link"], "Human Resources Sector": ["Decks", "Emailer", "Posters", "Videos", "Blogs", "WhatsApp Link"], };

    return (
        <>
            {/* POPUP */}
            {popupData.show && (
                <div className="popup-overlay">
                    <div className="popup-box">
                        <button className="popup-close" onClick={closePopup}>
                            ×
                        </button>

                        <h5 className="popup-title text-dark ">{popupData.title}</h5>

                        {/* 1️⃣ Decks */}
                        {popupData.type === "Decks" && (
                            <div className="popup-content">
                                <iframe
                                    src={popupData.link}
                                    className="popup-iframe"
                                ></iframe>
                                <a
                                    href={popupData.link}
                                    target="_blank"
                                    className="btn btn-success d-block w-25 mx-auto  fw-semibold mt-3"
                                >
                                    Download PDF
                                </a>
                            </div>
                        )}

                        {/* 2️⃣ Posters */}
                        {popupData.type === "Posters" && (
                            <div className="popup-content text-center">
                                <img
                                    src={popupData.link}
                                    className="img-fluid rounded w-25 d-block mx-auto"
                                />
                                <a
                                    href={popupData.link} target="_blank"
                                    download
                                    className="btn btn-success mt-3"
                                >
                                    Download Image
                                </a>
                            </div>
                        )}

                        {/* 3️⃣ Videos */}
                        {popupData.type === "Videos" && (
                            <div className="popup-content text-center">
                                <iframe
                                    src={popupData.link}
                                    className="popup-iframe"
                                ></iframe>
                            </div>
                        )}
                        {/* 3️⃣ blogs */}
                        {popupData.type === "Blogs" && (
                            <div className="popup-content text-center">
                                <p className="text-muted">
                                    Click below to open Blog link:
                                </p>
                                <a href={popupData.link} target="_blank" className="btn btn-success mt-3">
                                    Open Blog
                                </a>
                            </div>
                        )}


                        {/* 4️⃣ WhatsApp Link */}
                        {popupData.type === "WhatsApp Link" && (
                            <div className="popup-content text-center">
                                <p className="text-muted">
                                    Click below to open WhatsApp link:
                                </p>
                                <a
                                    href={popupData.link}
                                    target="_blank"
                                    className="btn btn-success"
                                >
                                    Open WhatsApp Link
                                </a>
                            </div>
                        )}

                        {/* 5️⃣ Emailer */}
                        {popupData.type === "Emailer" && (
                            <div className="popup-content text-center p-5">
                                <h4>Coming Soon 🚀</h4>
                                <p>Emailer content will be available soon.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* MAIN UI */}
            <div className="container pb-5">
                <div className="text-center mb-4">
                    <div className="step-circle-wrapper d-flex justify-content-center mb-3">
                        <div
                            className="rounded-circle bg-info-circle text-black d-flex align-items-center justify-content-center step-circle"
                            style={{ width: "42px", height: "42px" }}
                        >
                            01
                        </div>
                    </div>

                    <h3 className="text-dark">
                        <span className="text-info-head">Industries-wise</span>{" "}
                        Use Case
                    </h3>
                    <p className="text-muted">
                        Industry-specific innovations that simplify, optimize,
                        and scale.
                    </p>
                </div>

                <div className="row">
                    {/* LEFT SIDE — INDUSTRY TABS */}
                    <div className="col-md-4 hub-industry">
                        <div className="hub-sidebar">
                            <ul className="nav flex-column nav-pills">
                                {industries.map((industry) => (
                                    <li className="nav-item mb-2" key={industry}>
                                        <button
                                            className={`nav-link text-start w-100 ${activeIndustry === industry
                                                ? "active"
                                                : ""
                                                }`}
                                            onClick={() =>
                                                setActiveIndustry(industry)
                                            }
                                        >
                                            {industry}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* RIGHT SIDE — CARDS */}
                    <div className="col-md-8 px-5">

                        <div className="row g-4">
                            {useCaseContent[activeIndustry].map(
                                (item, index) => (
                                    <div
                                        className="col-sm-6"
                                        key={index}
                                        onClick={() =>
                                            openPopup(
                                                item,
                                                useCaseLinks[
                                                activeIndustry
                                                ][item]
                                            )
                                        }
                                        style={{ cursor: "pointer" }}
                                    >
                                        <div className="card-hub-industry text-center border-0 shadow-sm px-4 py-3 rounded-4">
                                            <div
                                                className="bg-white d-flex justify-content-center align-items-center rounded-4 mx-2 mb-2"
                                                style={{
                                                    height: "120px",
                                                }}
                                            >
                                                <img
                                                    src={useCaseImages[item]}
                                                    alt={item}
                                                    style={{
                                                        maxWidth: "70px",
                                                        maxHeight: "70px",
                                                        objectFit:
                                                            "contain",
                                                    }}
                                                />
                                            </div>

                                            <h6 className="mb-0">{item}</h6>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default IndustriesUseCase;
