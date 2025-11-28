"use client";
import { useState } from "react";

import { getImage } from "../app/utils/getImage";
const stage1 = getImage("/hub/stage-1.png");
export default function LeadStageSection() {
  const [active, setActive] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPopup, setSelectedPopup] = useState(null);
  // Right side content mapping
  const contentData = {
    calling: {
      cards: [
        {

          desc: "Your quick guide to confident client pitching",
          pdf: "/pdf/Calling-Pitch.pdf",
          linkText: "Get Pitch-Ready →",
          popup: false
        },
      ],
    },

    outreach: {
      cards: [
        {
          desc: "Fast, engaging messages crafted to instant conversions.",
          linkText: "Experience Platform in Action  →",
          pdf: "",                         // 👈 PDF nahi
          popup: true
        },
        {
          desc: "Smart, brand-aligned posts that boost visibility. ",
          linkText: "Experience Platform in Action  →",
          pdf: "",                         // 👈 PDF nahi
          popup: true

        },
        {

          desc: "Professional, persuasive emails that drive conversions.",
          pdf: "/pdf/Outreach-Email.pdf",
          linkText: "Experience Platform in Action  →",
        },
      ],
    },

    follow: {
      cards: [
        {

          desc: "Fast, engaging messages crafted to instant conversions.",

          linkText: "Experience Platform in Action  →",
          pdf: "",                         // 👈 PDF nahi
          popup: true
        },
        {

          desc: "Smart, brand-aligned posts that boost visibility. ",

          linkText: "Experience Platform in Action  →",
          pdf: "",                         // 👈 PDF nahi
          popup: true
        },
        {

          desc: "Professional, persuasive emails that drive conversions.",

          linkText: "Experience Platform in Action  →",
          pdf: "",                         // 👈 PDF nahi
          popup: true
        },

      ],
    },
  };
  const contentPopup = {
    coldOutreach: {
      cards: [
        {
          title: "Cold Outreach - WhatsApp",
          buttonText: "Open WhatsApp Script",
          popups: [
            {
              heading: "WhatsApp Message",
              content: `
Hi [Name],
I am [Your Name] from Anantya.ai, a Omnichannel platform powered by WhatsApp Business API. We basically help businesses engage with their customers in a better and smarter way...

I had a quick look at [Company Name] and was curious...

Would you be available this week for a quick call?
Regards,`
            }
          ]
        },

        {
          title: "Cold Outreach - LinkedIn",
          buttonText: "Open LinkedIn Script",
          popups: [
            {
              heading: "LinkedIn Message",
              content: `
Hi [First Name],
I work with Anantya.ai, where we help businesses use WhatsApp Business API...

If you’re open to it, I’d love to connect...
`
            }
          ]
        }
      ]
    },

    followUp: {
      cards: [
        {
          title: "Follow Up - WhatsApp",
          buttonText: "Open WhatsApp Follow-up",
          popups: [
            {
              heading: "WhatsApp Follow-up",
              content: `
Hi [Name],
Just wanted to quickly check if you had a chance to review my previous message...

Would you be open to a quick 10–15 minute call?
Looking forward to your response!
`
            }
          ]
        },

        {
          title: "Follow Up - LinkedIn",
          buttonText: "Open LinkedIn Follow-up",
          popups: [
            {
              heading: "LinkedIn Follow-up",
              content: `
Hi [First Name],
I hope you’re well. I wanted to follow up on my last message...

Please let me know a convenient time for you.
Thanks!
`
            }
          ]
        },

        {
          title: "Follow Up - Email",
          buttonText: "Open Email Script",
          popups: [
            {
              heading: "Follow-up Email",
              content: `
Subject: Following up: Boosting Customer Engagement for [Company Name]

Hi [First Name],
I wanted to follow up on the email I sent regarding how Anantya.ai can help...

Would you be available for a quick 15-minute call?
Best regards,
`
            }
          ]
        }
      ]
    }
  };
  return (
    <div className="row align-items-center">

      {/* LEFT SIDE */}
      <div className="col-md-6">
        <h5 className="text-secondary text-start mb-4 fw-semibold ms-2">Stage 1</h5>

        <div className="d-flex flex-column gap-3">

          {/* CARD 1 */}
          <div
            className="d-flex align-items-center justify-content-between p-3 rounded-4 shadow-sm bg-light"
            onClick={() => setActive("calling")}
            style={{ cursor: "pointer" }}
          >
            <div>
              <h6 className="fw-bold mb-1 text-dark text-start">Calling Pitch</h6>
              <p className="mb-0 text-muted small">
                Turning every call into opportunity that clicks
              </p>
            </div>
            <div
              className="rounded-3 d-flex align-items-center justify-content-center"
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: "#FFF8CC",
              }}
            >
              <i className="bi bi-hand-index-thumb fs-4 text-warning"></i>
            </div>
          </div>

          {/* CARD 2 */}
          <div
            className="d-flex align-items-center justify-content-between p-3 rounded-4 shadow-sm bg-light"
            onClick={() => setActive("outreach")}
            style={{ cursor: "pointer" }}
          >
            <div>
              <h6 className="fw-bold mb-1 text-dark text-start">Cold Outreach</h6>
              <p className="mb-0 text-muted small">
                Where first contact meets lasting connection
              </p>
            </div>
            <div
              className="rounded-3 d-flex align-items-center justify-content-center"
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: "#FFE8E5",
              }}
            >
              <i className="bi bi-broadcast fs-4 text-danger"></i>
            </div>
          </div>

          {/* CARD 3 */}
          <div
            className="d-flex align-items-center justify-content-between p-3 rounded-4 shadow-sm bg-light"
            onClick={() => setActive("follow")}
            style={{ cursor: "pointer" }}
          >
            <div>
              <h6 className="fw-bold mb-1 text-dark text-start">Follow Up</h6>
              <p className="mb-0 text-muted small">
                Because consistency closes what curiosity starts
              </p>
            </div>
            <div
              className="rounded-3 d-flex align-items-center justify-content-center"
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: "#DFF9FB",
              }}
            >
              <i className="bi bi-person-lines-fill fs-4 text-info"></i>
            </div>
          </div>

        </div>
      </div>

      {/* RIGHT SIDE */}
      {/* RIGHT SIDE */}
      <div className="col-md-6 text-center mt-5 mt-md-0 px-5">
        <div className="position-relative">

          {/* Default Image */}
          {!active && (
            <img
              src={stage1}
              alt="Lead Management"
              className="img-fluid rounded-4 shadow"
              style={{ width: "80%" }}
            />
          )}

          {active && (
            <div
              className={
                contentData[active].cards.length === 1
                  ? "single-card-wrapper"
                  : "custom-card-grid"
              }
            >
              {contentData[active].cards.map((card, index) => (
                <div key={index} className="hub-card p-4 shadow rounded-4 bg-white-hub text-start">

                  <h5 className="fw-bold text-dark">{card.title}</h5>
                  <p className="text-muted">{card.desc}</p>

                  {card.popup ? (
                    <button
                      onClick={() => {
                        const popupSet =
                          active === "outreach"
                            ? contentPopup.coldOutreach.cards[index].popups[0]
                            : contentPopup.followUp.cards[index].popups[0];

                        setSelectedPopup(popupSet);
                        setShowPopup(true);
                      }}
                      className="fw-semibold text-decoration-none link_hub bg-transparent border-0"
                    >
                      {card.linkText}
                    </button>

                  ) : (
                    <a
                      href={card.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="fw-semibold text-decoration-none link_hub"
                    >
                      {card.linkText}
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {showPopup && selectedPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>

            <button className="close-btn" onClick={() => setShowPopup(false)}>×</button>

            <h2 className="popup-heading">{selectedPopup.heading}</h2>


            <pre className="popup-content">{selectedPopup.content}</pre>
            <button
              className="copy-btn"
              onClick={() => {
                navigator.clipboard.writeText(selectedPopup.content);
              }}
            >
              📋 Copy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
