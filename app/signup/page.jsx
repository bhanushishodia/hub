"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react"; // Icons import kiye
import "./signup.css";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!form.email.endsWith("@anantya.ai")) {
      alert("Only @anantya.ai emails are allowed!");
      return;
    }
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
    });

    if (res.ok) {
      alert("Registration Successful!");
      router.push("/api/auth/signin");
    } else {
      alert("Registration failed!");
    }
  };

  return (
    <div className="signup-bg">
      <div className="signup-box">
        <h2 className="text-center fw-bold mb-4">Create Account</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label className="form-label small fw-bold text-dark">Full Name</label>
            <input className="form-control signup-input" type="text" placeholder="John Doe" required 
              onChange={(e) => setForm({...form, name: e.target.value})} />
          </div>
          
          <div className="mb-3">
            <label className="form-label small fw-bold text-dark">Company Email</label>
            <input className="signup-input form-control" type="email" placeholder="name@anantya.ai" required 
              onChange={(e) => setForm({...form, email: e.target.value})} />
          </div>
          
          {/* Password Field with Lucide Icon */}
          <div className="mb-3 position-relative">
            <label className="form-label small fw-bold text-dark">Password</label>
            <input className="signup-input form-control" type={showPass ? "text" : "password"} placeholder="Create Password" required 
              onChange={(e) => setForm({...form, password: e.target.value})} />
            <div className="password-icon-wrapper" onClick={() => setShowPass(!showPass)}>
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>

          {/* Confirm Password Field with Lucide Icon */}
          <div className="mb-4 position-relative">
            <label className="form-label small fw-bold text-dark">Confirm Password</label>
            <input className="signup-input form-control" type={showConfirmPass ? "text" : "password"} placeholder="Confirm Password" required 
              onChange={(e) => setForm({...form, confirmPassword: e.target.value})} />
            <div className="password-icon-wrapper" onClick={() => setShowConfirmPass(!showConfirmPass)}>
              {showConfirmPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>
          
          <div className="d-flex justify-content-center mt-4">
            <button type="submit" className="btn btn-success signup-btn-custom fw-bold shadow-sm">
              Sign Up
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