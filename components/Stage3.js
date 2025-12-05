"use client";
import { useState } from "react";

import { getImage } from "../app/utils/getImage";
const stage3 = getImage("/hub/stage-3.png");

export default function LeadStageSection() {
  const [activeCard, setActiveCard] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPopup, setSelectedPopup] = useState(null);

  const contentPopup = {
    shareProposal: {
      heading: "Proposal Email",
      content: `Dear {Name},
I hope you are doing well!

It was great connecting with you. Following our discussion regarding the WhatsApp Business
API and its implementation for _______, I wanted to share a quick summary of the challenges
identified and the solutions we proposed to streamline your business communication and lead
management process:

Challenges :
- manually handling customer queries over calls.
- No centralized platform for leads from sources like Facebook, Instagram, and IndiaMART.
- Unorganized data.
- Data is maintained manually in Excel sheets.
- Products are currently listed only on the website, limiting exposure and sales opportunities.

Solution:
1. Process Automation
2. Social Media Integration
3. Lead Management System
4. Google sheet integration
5. Cart and catalogue

I am also sharing the proposal with you. Please take a look at the features outlined and let me
know which ones align best with your requirements.

Looking forward to your response!
`
    },

    followUp: {
      heading: "Follow-up Email",
      content: `Hi {Name},
I hope you are doing well.

Just wanted to check if you had a chance to review the proposal. Please let me know if you
have any questions or if there’s anything we can clarify to move things forward.

Looking forward to hearing from you.
Regards,
Your Name`
    },
  };

  return (
    <div className="row align-items-center">

      {/* LEFT SIDE */}
      <div className="col-md-6">
        <h5 className="text-secondary text-start mb-4 fw-semibold ms-2">Stage 3</h5>

        <div className="d-flex flex-column gap-3">

          {/* Card 1 */}
          <div
            className="d-flex align-items-center justify-content-between p-3 rounded-4 shadow-sm bg-light"
            style={{ cursor: "pointer" }}
            onClick={() => setActiveCard("shareProposal")}
          >
            <div>
              <h6 className="fw-bold mb-1 text-dark text-start">Share Proposal</h6>
              <p className="mb-0 text-muted small">Email format for sharing proposal</p>
            </div>

            <div
              className="rounded-3 d-flex align-items-center justify-content-center"
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: "#FFF8CC",
              }}
            >
              <i className="bi bi-envelope fs-4 text-warning"></i>
            </div>
          </div>

          {/* Card 2 */}
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
      </div>

      {/* RIGHT SIDE */}
      <div className="col-md-6 text-center mt-5 mt-md-0 px-5">

        {!activeCard ? (
          <img
            src={stage3}
            alt="Lead Management"
            className="img-fluid rounded-4 shadow"
            style={{ width: "90%" }}
          />
        ) : (
          <div className="single-card-wrapper">
            <div className="hub-card p-4 shadow rounded-4 bg-white text-start">
              <p className="text-muted">
                {activeCard === "shareProposal" ? "Share Proposal" : "Follow-up"}
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
