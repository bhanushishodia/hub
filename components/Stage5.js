"use client";
import { useState } from "react";
import { getImage } from "../app/utils/getImage";
import { title } from "process";

const stage5 = getImage("/hub/stage-5.png");

export default function LeadStageSection() {

    const [activeCard, setActiveCard] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedPopup, setSelectedPopup] = useState(null);

    // POPUP CONTENT
    const contentPopup = {
        raisePi: {
            heading: "Raise PI",

            content: `Hi Sagar,

Kindly generate an invoice for (_Company Name_). 
I've attached the Registration Certificate and the signed Agreement as a PDF for you to look over.

Company Name

Description                                     Amount (INR)
--------------------------------------------------------
Meta Business Verification & Number Migration   ---
Platform charges - Annually                     ---
Total                                           ---
--------------------------------------------------------

Regards,`
        },


        sharePi: {
            heading: "Share PI",
            title: "Share Proforma Invoice via:",
            cards: [
                {
                    title: "WhatsApp Message",
                    heading: "WhatsApp Message",
                    content: `Hi [Name],
Please find attached the Proforma Invoice for the services discussed.

Kindly review and let me know if you have any questions or need any clarifications.

Once the payment is made, I would appreciate it if you could kindly share the proof of payment for our reference.

Looking forward to your confirmation so we can proceed.
Best regards,
[Your Name]
Anantya.ai`
                },
                {
                    title: "LinkedIn Message",
                    heading: "LinkedIn Message",
                    content: `Hi [First Name],
I’m sharing the Proforma Invoice as per our recent discussions. Please have a look at the attached document.

If you have any questions or require further details, feel free to reach out.

Once the payment is made, I would appreciate it if you could kindly share the proof of payment for our reference.

Looking forward to your confirmation to move forward.
Best regards,`
                },
                {
                    title: "Email Message",
                    heading: "Email Message",
                    content: `Hi [First Name],
As discussed, please find attached the Proforma Invoice for the services proposed by Anantya.ai.

Kindly review the document and let me know if you have any questions or require any modifications.

Once the payment is made, please share the proof of payment for our reference.

We look forward to your confirmation so we can proceed with the next steps.
Thank you for your consideration.
Best regards`
                }
            ]
        }
    };

    return (
        <div className="row align-items-center">

            {/* LEFT SIDE  */}
            <div className="col-md-6">
                <h5 className="text-secondary text-start mb-4 fw-semibold ms-2">Stage 5</h5>

                <div className="d-flex flex-column gap-3">

                    {/* Card 1 : Raise PI */}
                    <div
                        className="d-flex align-items-center justify-content-between p-3 rounded-4 shadow-sm bg-light"
                        style={{ cursor: "pointer" }}
                        onClick={() => setActiveCard("raisePi")}
                    >
                        <div>
                            <h6 className="fw-bold mb-1 text-dark text-start">Raise PI</h6>
                            <p className="mb-0 text-muted small">Raise PI (content from PDF)</p>
                        </div>

                        <div
                            className="rounded-3 d-flex align-items-center justify-content-center"
                            style={{
                                width: "50px",
                                height: "50px",
                                backgroundColor: "#FFF8CC",
                            }}
                        >
                            <i className="bi bi-receipt fs-4 text-warning"></i>
                        </div>
                    </div>

                    {/* Card 2 : Share PI */}
                    <div
                        className="d-flex align-items-center justify-content-between p-3 rounded-4 shadow-sm bg-light"
                        style={{ cursor: "pointer" }}
                        onClick={() => setActiveCard("sharePi")}
                    >
                        <div>
                            <h6 className="fw-bold mb-1 text-dark text-start">Share PI</h6>
                            <p className="mb-0 text-muted small">Share PI via WhatsApp, LinkedIn, Email</p>
                        </div>

                        <div
                            className="rounded-3 d-flex align-items-center justify-content-center"
                            style={{
                                width: "50px",
                                height: "50px",
                                backgroundColor: "#FFF8CC",
                            }}
                        >
                            <i className="bi bi-share fs-4 text-warning"></i>
                        </div>
                    </div>

                </div>
            </div>

            {/* RIGHT SIDE */}
            {/* RIGHT SIDE */}
            <div className="col-md-6 text-center mt-5 mt-md-0 px-5">

                {!activeCard ? (
                    <img
                        src={stage5}
                        alt="Lead Management"
                        className="img-fluid rounded-4 shadow" style={{ width: "90%" }}
                    />
                ) : (
                    <>
                        {/* RAISE PI — Single Card (full width like your design) */}
                        {activeCard === "raisePi" && (
                            <div className="position-relative mt-3">
                                <div className="single-card-wrapper">
                                    <div className="hub-card p-4 shadow rounded-4 bg-white-hub text-start w-100">

                                        <p className="text-muted">Generate the PI using this message format</p>

                                        <button
                                            className="fw-semibold text-decoration-none link_hub bg-transparent border-0 mt-2"
                                            onClick={() => {
                                                setSelectedPopup(contentPopup.raisePi);
                                                setShowPopup(true);
                                            }}
                                        >
                                            View Message →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* SHARE PI — Multiple Cards */}
                        {activeCard === "sharePi" && (
                            <div className="custom-card-grid mt-3">
                                {contentPopup.sharePi.cards.map((item, index) => (
                                    <div key={index} className="hub-card p-4 shadow rounded-4 bg-white-hub text-start">

                                        <p className="text-muted">{item.title}</p>

                                        <button
                                            className="fw-semibold text-decoration-none link_hub bg-transparent border-0"
                                            onClick={() => {
                                                setSelectedPopup(item);
                                                setShowPopup(true);
                                            }}
                                        >
                                            View Message →
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
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
