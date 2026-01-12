"use client";
import { useState } from "react";

import { getImage } from "../app/utils/getImage";
import Pdf from "@/components/Pdf";
const stage4 = getImage("/hub/stage-4.png");


export default function LeadStageSection() {

    const [activeCard, setActiveCard] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedPopup, setSelectedPopup] = useState(null);

    const contentPopup = {
        shareAgreement: {
            heading: "Share Agreement",
            content: `Hi {Name},
I hope you are doing well.
We are excited to onboard you.

As discussed, please find attached the agreement for your review.

If you have any questions or require clarification on any point, please feel free to let me know.

Once you’re comfortable, kindly sign and return the document so we can proceed.

Looking forward to your feedback.
Regards,
Your Name`
        },

        followUp: {
            heading: "Follow-up",
            content: `Hi {Name},
I hope this message finds you well.

I wanted to follow up regarding the agreement shared earlier. If you’ve had a chance to review it, please let me know if there are any questions or points you’d like to discuss.

We’re eager to move forward as soon as you’re ready.

Looking forward to your response.
Regards,
Your Name`
        },
    };

    return (
        <div className="row align-items-center">

            {/* LEFT SIDE */}
            <div className="col-md-6">
                <h5 className="text-secondary text-start mb-4 fw-semibold ms-2">Stage 4</h5>

                <div className="d-flex flex-column gap-3">

                    {/* Card 1 : Share Agreement */}
                    <div
                        className="d-flex align-items-center justify-content-between p-3 rounded-4 shadow-sm bg-light"
                        style={{ cursor: "pointer" }}
                        onClick={() => setActiveCard("shareAgreement")}
                    >
                        <div>
                            <h6 className="fw-bold mb-1 text-dark text-start">Share Agreement</h6>
                            <p className="mb-0 text-muted small">Email format for sharing agreement</p>
                        </div>

                        <div
                            className="rounded-3 d-flex align-items-center justify-content-center"
                            style={{
                                width: "50px",
                                height: "50px",
                                backgroundColor: "#FFF8CC",
                            }}
                        >
                            <i className="bi bi-file-earmark-text fs-4 text-warning"></i>
                        </div>
                    </div>

                    {/* Card 2 : Follow Up */}
                    <div
                        className="d-flex align-items-center justify-content-between p-3 rounded-4 shadow-sm bg-light"
                        style={{ cursor: "pointer" }}
                        onClick={() => setActiveCard("followUp")}
                    >
                        <div>
                            <h6 className="fw-bold mb-1 text-dark text-start">Follow-up</h6>
                            <p className="mb-0 text-muted small">Email format for follow-up</p>
                        </div>

                        <div
                            className="rounded-3 d-flex align-items-center justify-content-center"
                            style={{
                                width: "50px",
                                height: "50px",
                                backgroundColor: "#FFF8CC",
                            }}
                        >
                            <i className="bi bi-reply fs-4 text-warning"></i>
                        </div>
                    </div>

                </div>
                <div className="text-start mt-4 mx-3 me-4">
                    <a
                        href="/pdf/Anantya-Short-Agreement-2025.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="fw-semibold text-decoration-none text-success me-4"
                    >
                        Agreement &rarr;
                    </a>
                    <Pdf />
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="col-md-6 text-center mt-5 mt-md-0 px-5">

                {!activeCard ? (
                    <img
                        src={stage4}
                        alt="Lead Management"
                        className="img-fluid rounded-4 shadow"
                        style={{ width: "90%" }}
                    />
                ) : (
                    <div className="single-card-wrapper">
                        <div className="hub-card p-4 shadow rounded-4 bg-white text-start">
                            <p className="text-muted">
                                {activeCard === "shareAgreement" ? "Share Agreement" : "Follow-up"}
                            </p>

                            <button
                                className="fw-semibold text-decoration-none link_hub bg-transparent border-0"
                                onClick={() => {
                                    setSelectedPopup(contentPopup[activeCard]);
                                    setShowPopup(true);
                                }}
                            >
                                View Message →
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* POPUP */}
            {showPopup && selectedPopup && (
                <div className="popup-overlay" onClick={() => setShowPopup(false)}>
                    <div className="popup-box" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setShowPopup(false)}>×</button>

                        <h2 className="popup-heading">{selectedPopup.heading}</h2>
                        <pre className="popup-content">{selectedPopup.content}</pre>

                        <button
                            className="copy-btn"
                            onClick={() => navigator.clipboard.writeText(selectedPopup.content)}
                        >
                            📋 Copy
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}
