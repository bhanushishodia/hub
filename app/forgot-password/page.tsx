"use client";
import { useState } from "react";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMsg("Sending...");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // 👈 Ye line zaroori hai
        body: JSON.stringify({ email }),
      });
      
      const data = await res.json();
      setMsg(data.message);
    } catch (err) {
      setMsg("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center bg-light">
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow bg-white" style={{width: '400px'}}>
        <h4 className="mb-3 text-success fw-bold">Forgot Password</h4>
        <p className="text-muted small">Enter your email and we'll send you a reset link.</p>
        
        <input 
          type="email" 
          className="form-control mb-3" 
          placeholder="Enter Registered Email" 
          value={email} 
          onChange={(e)=>setEmail(e.target.value)} 
          required 
        />
        
        <button disabled={loading} className="btn btn-success w-100 fw-bold">
          {loading ? "Processing..." : "Send Reset Link"}
        </button>

        <div className="mt-3 text-center">
           <Link href="/" className="small text-decoration-none text-muted">Back to Login</Link>
        </div>

        {msg && (
          <div className={`mt-3 p-2 small text-center rounded ${msg.includes("success") ? "bg-success-subtle text-success" : "bg-danger-subtle text-danger"}`}>
            {msg}
          </div>
        )}
      </form>
    </div>
  );
}