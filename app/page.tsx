"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


import { getImage } from "./utils/getImage";
const logo = getImage("hub-logo.png");
const login = getImage("login-hub.png");

useEffect(() => {
  require("bootstrap/dist/js/bootstrap.bundle.min.js");
}, []);


// ✔️ Multiple Users with Roles
const USERS = [
  {
    email: "admin@anantya.ai",
    password: "Bhanu@018",
    role: "admin",
  },
  {
    email: "user@anantya.ai",
    password: "Anantya@789",   // ✔️ Set a different password here
    role: "user",
  },
];

export default function KnowledgeHubLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");

    if (savedUsername && savedPassword) {
      setUsername(savedUsername);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

 const handleLogin = (e: any) => {
    e.preventDefault();

    // ✔️ Find matching user
    const matchedUser = USERS.find(
      (u) => u.email === username && u.password === password
    );

    if (matchedUser) {
      // Save remember me creds
      if (rememberMe) {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
      } else {
        localStorage.removeItem("username");
        localStorage.removeItem("password");
      }

      // ✔️ Save role & user email
      localStorage.setItem("user", matchedUser.email);
      localStorage.setItem("role", matchedUser.role);

      router.push("/dashboard");
    } else {
      setErrorMessage("Invalid username or password. Please try again.");
    }
  };

  const EyeIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );

  const EyeSlashIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.9 21.9 0 0 1 5.06-6.94"></path>
      <path d="M1 1l22 22"></path>
      <path d="M9.88 9.88A3 3 0 0 0 14.12 14.12"></path>
    </svg>
  );



  return (
    <div className="container-fluid vh-100 d-flex flex-column flex-md-row p-0">
      {/* Left Section */}
      <div className="col-12 col-md-7 d-flex flex-column justify-content-center align-items-start p-4 p-md-5">
        <div className="text-start">
          <h1 className="fw-bold mb-3 text-success">Welcome</h1>
          <p className="text-muted mb-4">
            to your 360° gateway for <br />
            <strong>Support and Engagement</strong>
          </p>
        </div>

        <img src={login} alt="Anantya Login" className="img-fluid" />
      </div>

      {/* Right Section */}
      <div className="col-12 col-md-5 bg-light d-flex flex-column justify-content-center align-items-center p-4 p-md-5">
        <img src={logo} alt="Anantya Logo" width="200" />
        <h4 className="fw-semibold mb-3 text-center">
          Explore the Knowledge Hub
        </h4>

        <form
          onSubmit={handleLogin}
          className=" p-4 rounded  w-100"
          style={{ maxWidth: "400px" }}
        >
          <div className="mb-3">
            <label className="form-label">User Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                aria-label="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="btn btn-outline-secondary"
                aria-pressed={showPassword}
                aria-label={showPassword ? "Hide password" : "Show password"}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? EyeSlashIcon : EyeIcon}
              </button>
            </div>
          </div>

          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label className="form-check-label small" htmlFor="rememberMe">
              Remember me
            </label>
          </div>

          {/* Error message */}
          {errorMessage && (
            <div className="alert alert-danger small py-2 mb-3 text-center">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-success w-100 fw-semibold d-block"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
