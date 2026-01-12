"use client";
import { useState } from "react";
import { getImage } from "../app/utils/getImage";
const stage2 = getImage("/hub/stage-2.png");
export default function LeadStageSection() {
    const [active, setActive] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedPopup, setSelectedPopup] = useState(null);
    // Right side content mapping
    const contentPopup = {
        scheduleMeeting: {
            cards: [
                {
                    title: "Fast, engaging messages crafted to instant conversions.",
                    popups: [
                        {
                            heading: "WhatsApp Message",
                            content: `Hi [Name],
Thanks for confirming the timing for our demo on [Date] at [Time]. Please find below the Google
Meet link.
[insert the link here]
Looking forward to discussing how Anantya.ai can help [Company Name] improve customer
engagement on WhatsApp.
Please let me know if you have any specific areas you'd like us to cover.`
                        }
                    ]
                },
                {
                    title: "Smart, brand-aligned posts that boost visibility.",
                    popups: [
                        {
                            heading: "LinkedIn Message",
                            content: `Hi [First Name],
Thanks for confirming the demo time for [Date] at [Time]. Please find below the Google Meet link.
[insert the link here]
Excited to show you how Anantya.ai’s WhatsApp Business API platform can benefit [Company Name].
Feel free to share any particular questions or topics you want to discuss during the demo.`
                        }
                    ]
                },
                {
                    title: "Professional, persuasive emails that drive conversions.",
                    popups: [
                        {
                            heading: "Email Message",
                            content: `Hi [First Name],
Thanks for confirming the demo timing on [Date] at [Time].

Please find below the Google Meet link.
[insert the link here]

During the demo, we’ll explore how Anantya.ai can help [Company Name] automate and
personalize customer communication on WhatsApp.
If there’s anything specific you want us to focus on, please let me know.

Looking forward to our conversation!
Best regards,`
                        }
                    ]
                }
            ]
        },

        rescheduleMeeting: {
            cards: [
                {
                    title: "Fast, engaging messages crafted to instant conversions.",
                    popups: [
                        {
                            heading: "WhatsApp Message",
                            content: `Hi [Name],
I noticed you weren’t able to join our demo scheduled for [Date] at [Time]. I understand things can get busy.
Would you be available to reschedule for another time that suits you? I’m happy to accommodate your schedule.
Please let me know what works best for you.`
                        }
                    ]
                },
                {
                    title: "Smart, brand-aligned posts that boost visibility. ",
                    popups: [
                        {
                            heading: "Smart, brand-aligned posts that boost visibility.",
                            content: `Hi [First Name],
I saw we missed you for the demo on [Date] at [Time]. I understand things can get hectic.
Would you be open to rescheduling at a convenient time? I’d love to show you how Anantya.ai
can help [Company Name].
Please let me know what works for you.`
                        }
                    ]
                },
                {
                    title: "Professional, persuasive emails that drive conversions.",
                    popups: [
                        {
                            heading: "Email Message",
                            content: `Hi [First Name],
I noticed you weren’t able to join our demo scheduled for [Date] at [Time]. I completely understand that priorities can shift.

If you’re still interested, I’d be happy to find a new time that works better for you. Please let me know your availability, and I’ll do my best to accommodate.

Looking forward to connecting soon.
Best regards,`
                        }
                    ]
                }
            ]
        },

        followUp: {
            cards: [
                {
                    title: "Fast, engaging messages crafted to instant conversions.",
                    popups: [
                        {
                            heading: "WhatsApp Follow-up",
                            content: `Hi [Name],
Just a quick reminder about our Anantya.ai demo scheduled for [Date] at [Time].
Please join the Google Meet using this link: [Google Meet Link]

Looking forward to showing you how we can help [Company Name] boost customer engagement on WhatsApp. See you soon!`
                        }
                    ]
                },
                {
                    title: "Smart, brand-aligned posts that boost visibility. ",
                    popups: [
                        {
                            heading: "LinkedIn Follow-up",
                            content: `Hi [First Name],
This is a friendly reminder for our demo scheduled on [Date] at [Time].
Please use this Google Meet link to join: [Google Meet Link]

Excited to share how Anantya.ai can enhance customer communication for [Company Name].
See you soon!`
                        }
                    ]
                },
                {
                    title: "Professional, persuasive emails that drive conversions.",
                    popups: [
                        {
                            heading: "Email Message",
                            content: `Subject: Reminder: Anantya.ai Demo Scheduled for [Date & Time]

Hi [First Name],
Just a quick reminder about our upcoming demo on [Date] at [Time].
You can join the Google Meet using this link:
[Google Meet Link]

During the demo, we’ll explore how Anantya.ai can streamline and personalize your customer interactions on WhatsApp.
If you need to reschedule or have any questions, please feel free to reach out.

Looking forward to our discussion!
Best regards,`
                        }
                    ]
                }
            ]
        }
    };
    // Resolve content based on active state
    const rightContent =
        active === "calling"
            ? contentPopup.scheduleMeeting
            : active === "outreach"
                ? contentPopup.rescheduleMeeting
                : active === "follow"
                    ? contentPopup.followUp
                    : null;

    return (
        <div className="row align-items-center">

            {/* LEFT SIDE */}
            <div className="col-md-6">
                <h5 className="text-secondary text-start mb-4 fw-semibold ms-2">Stage 2</h5>

                <div className="d-flex flex-column gap-3">

                    {/* CARD 1 */}
                    <div
                        className="d-flex align-items-center justify-content-between p-3 rounded-4 shadow-sm bg-light"
                        onClick={() => setActive("calling")}
                        style={{ cursor: "pointer" }}
                    >
                        <div>
                            <h6 className="fw-bold mb-1 text-dark text-start">Schedule Meeting</h6>
                            <p className="mb-0 text-muted small">
                                Focus on what your business and customers really need.
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
                            <h6 className="fw-bold mb-1 text-dark text-start">Reschedule Meeting-</h6>
                            <p className="mb-0 text-muted small">
                                Spot where the platform can make the biggest impact.
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
                                Spot where the platform can make the biggest impact.
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
                            src={stage2}
                            alt="Lead Management"
                            className="img-fluid rounded-4 shadow"
                            style={{ width: "90%" }}
                        />
                    )}

                    {rightContent && (
                        <div className="custom-card-grid">
                            {rightContent.cards.map((card, index) => (
                                <div key={index} className="hub-card p-4 shadow rounded-4 bg-white text-start">

                                    <p className="text-muted">{card.title}</p>

                                    <button
                                        className="fw-semibold text-decoration-none link_hub bg-transparent border-0"
                                        onClick={() => {
                                            setSelectedPopup(card.popups[0]); // Correct!
                                            setShowPopup(true);
                                        }}
                                    >
                                        Experience Platform in Action  →
                                    </button>
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
