
"use client";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getImage } from "../app/utils/getImage";
const IndustriesUseCase = () => {

    const useCaseLinks = {
    "Education Sector": {
        "Decks": "/education/decks",
        "Emailer": "/education/emailer",
        "Posters": "/education/posters",
        "Videos": "https://drive.google.com/drive/folders/18Ujz7NlZPV_hL39ksP7uIk832MtPljZ-",
        "Blogs": "https://anantya.ai/blog/whatsapp-for-education",
        "WhatsApp Link": "/education/whatsapp-link",
    },

    "Travel Sector": {
        "Decks": "https://drive.google.com/drive/folders/1lcLbpuVf1qpvMWSBMf4yWM3YdJWPg5MD",
        "Emailer": "/travel/emailer",
        "Posters": "https://drive.google.com/drive/folders/1lcLbpuVf1qpvMWSBMf4yWM3YdJWPg5MD",
        "Videos": "/travel/videos",
        "Blogs": "https://anantya.ai/blog/whatsapp-for-travel",
        "WhatsApp Link": "/education/whatsapp-link",
    },

    "BFSI Sector": {
        "Decks": "/bfsi/decks",
        "Emailer": "/bfsi/emailer",
        "Blogs": "/bfsi/blogs",
        "WhatsApp Link": "/bfsi/whatsapp-link",
    },

    // ...baaki industries bhi isi format me
};

    const industries = [
        "Education Sector",
        "Travel Sector",
        "BFSI Sector",
        "Real Estate Sector",
        "Logistics Sector",
        "Wholesale Sector",
        "Non-profit & Religious Sector",
        "Aviation Sector",
        "Healthcare Sector",
        "Human Resources Sector",
    ];

    // 6 images list
    const useCaseImages = {
        "Decks": getImage("/hub/deck-hub.png"),
        "Emailer": getImage("/hub/emailer-hub.png"),
        "Posters": getImage("/hub/poster.png"),
        "Videos": getImage("/hub/videos-hub.png"),
        "Blogs": getImage("/hub/blog-hub.png"),
        "WhatsApp Link": getImage("/hub/wa-link-hub.png"),
    };


    const [activeIndustry, setActiveIndustry] = useState("Education Sector");

    const useCaseContent = {
        "Education Sector": ["Decks", "Emailer", "Posters", "Videos", "Blogs", "WhatsApp Link"],
        "Travel Sector": ["Decks", "Emailer", "Posters", "Videos", "Blogs", "WhatsApp Link"],
        "BFSI Sector": ["Decks", "Emailer", "Posters", "Videos", "Blogs", "WhatsApp Link"],
        "Real Estate Sector": ["Decks", "Posters", "Videos"],
        "Logistics Sector": ["Emailer", "Videos", "Blogs"],
        "Wholesale Sector": ["Decks", "Posters", "WhatsApp Link"],
        "Non-profit & Religious Sector": ["Videos", "Blogs"],
        "Aviation Sector": ["Decks", "Emailer", "Videos"],
        "Healthcare Sector": ["Decks", "Posters", "Videos", "Blogs"],
        "Human Resources Sector": ["Decks", "Emailer", "Blogs", "WhatsApp Link"],
    };

    return (
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
                    <span className="text-info-head">Industries-wise</span> Use Case
                </h3>
                <p className="text-muted">
                    Industry-specific innovations that simplify, optimize, and scale.
                </p>
            </div>

            <div className="row">
                {/* Left Sidebar (Tabs) */}
                <div className="col-md-4 hub-industry">
                    <ul className="nav flex-column nav-pills">
                        {industries.map((industry) => (
                            <li className="nav-item mb-2" key={industry}>
                                <button
                                    className={`nav-link text-start w-100 ${activeIndustry === industry ? "active" : ""
                                        }`}
                                    onClick={() => setActiveIndustry(industry)}
                                >
                                    {industry}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right Content Area */}
                <div className="col-md-8 px-5">
                    
                      <div className="hub-sidebar"> 
                    <div className="row g-4">
                        {useCaseContent[activeIndustry].map((item, index) => (
                            <div className="col-sm-6" key={index}>
                                <a href={useCaseLinks[activeIndustry][item]} className="text-decoration-none" target="_blank">
                                <div className="card-hub-industry text-center border-0 shadow-sm px-4 py-1 rounded-4">

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
                                                objectFit: "contain",
                                            }}
                                        />
                                    </div>

                                    <h6 className="mb-0">{item}</h6>
                                </div>
                                </a>
                            </div>
                        ))}
                    </div>
                    </div>
                        
                </div>
            </div>
        </div>
    );
};

export default IndustriesUseCase;
