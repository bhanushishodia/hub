"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, CheckCircle } from "lucide-react"; 
import "./signup.css";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); 
  const [errorMessage, setErrorMessage] = useState(""); 
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // 1. Validation
    if (!form.email.endsWith("@anantya.ai")) {
      setErrorMessage("Only @anantya.ai emails are allowed!");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    setIsSubmitting(true);

    try {
      // 2. API Call
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });

      const data = await res.json();

      if (res.ok) {
        // 3. Success Message (No Alert)
        setSuccessMessage("Signup Completed! Credentials have been sent to your email.");
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // 4. Redirect to Main Login Page (Fix: Not api/auth/signin)
        setTimeout(() => {
          router.push("/"); 
        }, 4000);
      } else {
        setErrorMessage(data.message || "Registration failed!");
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-bg">
      <div className="signup-box">
        <h2 className="text-center fw-bold mb-4">Create Account</h2>

        {/* Success Message Display */}
        {successMessage && (
          <div className="alert alert-success d-flex align-items-center mb-4 shadow-sm py-3" style={{ borderRadius: '10px', border: 'none', backgroundColor: '#d1e7dd' }}>
            <CheckCircle className="me-2 text-success" size={20} />
            <small className="fw-bold text-success">{successMessage}</small>
          </div>
        )}

        {/* Error Message Display */}
        {errorMessage && (
          <div className="alert alert-danger text-center small py-2 mb-3 border-0">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label className="form-label small fw-bold text-dark">Full Name</label>
            <input className="form-control signup-input" type="text" placeholder="John Doe" required 
              onChange={(e) => setForm({...form, name: e.target.value})} disabled={isSubmitting || !!successMessage} />
          </div>
          
          <div className="mb-3">
            <label className="form-label small fw-bold text-dark">Company Email</label>
            <input className="signup-input form-control" type="email" placeholder="name@anantya.ai" required 
              onChange={(e) => setForm({...form, email: e.target.value})} disabled={isSubmitting || !!successMessage} />
          </div>
          
          <div className="mb-3 position-relative">
            <label className="form-label small fw-bold text-dark">Password</label>
            <input className="signup-input form-control" type={showPass ? "text" : "password"} placeholder="Create Password" required 
              onChange={(e) => setForm({...form, password: e.target.value})} disabled={isSubmitting || !!successMessage} />
            <div className="password-icon-wrapper" onClick={() => setShowPass(!showPass)}>
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>

          <div className="mb-4 position-relative">
            <label className="form-label small fw-bold text-dark">Confirm Password</label>
            <input className="signup-input form-control" type={showConfirmPass ? "text" : "password"} placeholder="Confirm Password" required 
              onChange={(e) => setForm({...form, confirmPassword: e.target.value})} disabled={isSubmitting || !!successMessage} />
            <div className="password-icon-wrapper" onClick={() => setShowConfirmPass(!showConfirmPass)}>
              {showConfirmPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>
          
          <div className="d-flex justify-content-center mt-4">
            <button type="submit" className="btn btn-success signup-btn-custom fw-bold shadow-sm" disabled={isSubmitting || !!successMessage}>
              {isSubmitting ? "Processing..." : successMessage ? "Redirecting..." : "Sign Up"}
            </button>
          </div>
        </form>
        
        <p className="text-center mt-4 small text-muted">
          Already have an account? <Link href="/" className="text-success fw-bold text-decoration-none">Login</Link>
        </p>
      </div>
    </div>
  );
}