"use client";
import { useState, Suspense } from "react"; // Added Suspense
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

// 1. Create a sub-component for the form
function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();
      setMessage(data.message);

      if (res.ok) {
        setTimeout(() => router.push("/"), 3000);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded shadow bg-white" style={{ width: "400px" }}>
      <h4 className="mb-3 text-success fw-bold">Set New Password</h4>
      {!token ? (
        <div className="alert alert-danger small">Invalid or missing token.</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label className="form-label small fw-semibold">New Password</label>
            <input type="password" title="password" className="form-control" placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="mb-3 text-start">
            <label className="form-label small fw-semibold">Confirm Password</label>
            <input type="password" title="confirm-password" className="form-control" placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>
          <button disabled={loading} className="btn btn-success w-100 fw-bold">
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      )}
      {message && (
        <div className={`mt-3 p-2 small text-center rounded ${message.includes("successfully") ? "bg-success-subtle text-success" : "bg-danger-subtle text-danger"}`}>
          {message}
        </div>
      )}
    </div>
  );
}

// 2. Wrap the form in Suspense in the main export
export default function ResetPassword() {
  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center bg-light">
      <Suspense fallback={<div className="text-success fw-bold">Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}