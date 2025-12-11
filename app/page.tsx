"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getImage } from "./utils/getImage";
import { signIn } from "next-auth/react";

const logo = getImage("hub-logo.png");
const login = getImage("login-hub.png");

// ✔️ Multiple Users with Roles
const USERS = [
  { email: "admin@anantya.ai", password: "Yashika@018", role: "admin" },
  { email: "user@anantya.ai", password: "Anantya@789", role: "user" },
];

export default function KnowledgeHubLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  // ✔️ Bootstrap JS
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);


  // ✔️ Google Auth Error Handling
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get("error");

    if (error === "AccessDenied") {
      setErrorMessage("Only @anantya.ai email IDs are allowed.");
      window.history.replaceState(null, "", "/");
    }
  }, []);




  // ✔️ Remember Me
  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");

    if (savedUsername && savedPassword) {
      setUsername(savedUsername);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

const handleLogin = async (e: any) => {
  e.preventDefault();

  const result = await signIn("credentials", {
    redirect: false,
    email: username,
    password: password,
  });

  console.log("SignIn Result:", result); // Debug

  // ❌ Invalid credentials → show error
  if (result?.error) {
    setErrorMessage("Invalid username or password.");
    return;
  }

  // ✅ Login successful
  if (result?.ok) {

    // 👉 Remember Me
    if (rememberMe) {
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
    } else {
      localStorage.removeItem("username");
      localStorage.removeItem("password");
    }

    // ⭐ MOST IMPORTANT FIX ⭐
    // 👉 Manual login ke liye cookie set karna zaroori hai
    document.cookie = "localAuth=true; path=/";

    router.push("/dashboard");
    return;
  }

  setErrorMessage("Login failed, please try again.");
};



  // Icons
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

        <form onSubmit={handleLogin} className="pb-4 px-3 rounded w-100" style={{ maxWidth: "400px" }}>


          <div className="mb-3">
            <label className="form-label">User Name</label>
            <input
              type="text"
              name="email"   // ✅ Add this
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
                name="password"   // ✅ Add this
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="btn btn-outline-secondary"
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

          {errorMessage && (
            <div className="alert alert-danger small py-2 mb-3 text-center">
              {errorMessage}
            </div>
          )}

          <button type="submit" className="btn btn-success w-100 d-block mx-auto fw-semibold">
            Login
          </button>

        </form>

        <div className="divider-container">
          <div className="divider-line"></div>
          <div className="divider-text">Or continue </div>
          <div className="divider-line"></div>
        </div>
        <button
          className="btn btn-google mt-3"
          onClick={() =>
            signIn("google", {
              callbackUrl: "/dashboard",
            })
          }
        ><svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width={15} className="LgbsSe-Bz112c"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g></svg>
          &nbsp; Sign in with Google
        </button>


        <div className="small version-text mt-3 text-dark fw-semibold muted small">Version 1.0.4
        </div>
      </div>
    </div>
  );
} 