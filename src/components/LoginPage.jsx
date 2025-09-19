import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './LoginPage.css';
import 'boxicons/css/boxicons.min.css';

function LoginPage({setIsAuthenticated, setUser}) {
  const [isRegisterActive, setIsRegisterActive] = useState(false);

  // login form state
  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");


  // register form state
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  // toast
  const [toast, setToast] = useState(null); // { message, type } type = 'error'|'success'

  const navigate = useNavigate();

  function showToast(message, type = "error", ms = 3000) {
    setToast({ message, type });
    setTimeout(() => setToast(null), ms);
  }

  async function handleRegisterSubmit(e) {
    e.preventDefault();
    try {
      const API_BASE_URL = process.env.REACT_APP_API_URL || "https://full-stack-dev-backend.onrender.com";
      const res = await fetch(`${API_BASE_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: regName, email: regEmail, password: regPassword })
      });

      const data = await res.json();
      if (res.ok) {
        showToast("Registered successfully. You can login now.", "success");
        // optionally switch to login view
        setIsRegisterActive(false);
        // clear register fields
        setRegName(""); setRegEmail(""); setRegPassword("");
      } else {
        showToast(data.message || "Registration failed");
      }
    } catch (err) {
      showToast("Network error during registration");
      console.error(err);
    }
  }

  async function handleLoginSubmit(e) {
    e.preventDefault();
    try {
      const API_BASE_URL = process.env.REACT_APP_API_URL || "https://full-stack-dev-backend.onrender.com";
      const res = await fetch(`${API_BASE_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: loginName , password: loginPassword })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        // Save username for welcome page (or use a token approach)
        localStorage.setItem("username", data.user.name);
        localStorage.setItem("userId", data.user_id);   // store id for post creation
        setIsAuthenticated(true);
        setUser({ name: data.user.name, id: data.user_id });
        
      } else {
        // show the exact text required
        showToast(data.message || "either username or password is wrong");
      }
    } catch (err) {
      showToast("Network error during login");
      console.error(err);
    }
  }


  return (
    <>
      <div className={`container ${isRegisterActive ? "active" : ""}`}>
        {/* Login Form */}
        <div className="form-box login">
          <form onSubmit={handleLoginSubmit}>
            <h1>Login</h1>
            <div className="input-box">
              <input value={loginName} onChange={e => setLoginName(e.target.value)} type="text" placeholder="Username" required />
              <i className="bx bxs-user"></i>
            </div>
            <div className="input-box">
              <input value={loginPassword} onChange={e => setLoginPassword(e.target.value)} type="password" placeholder="Password" required />
              <i className="bx bxs-lock-alt"></i>
            </div>
            <div className="forgot-link">
              <a href="#">Forgot Password?</a>
            </div>
            <button type="submit" className="btn">Login</button>
            <p>or login with social platforms</p>
            <div className="social-icons">
              <a href="#"><i className="bx bxl-google" ></i></a>
              <a href="#"><i className="bx bxl-facebook" ></i></a>
              <a href="#"><i className="bx bxl-github" ></i></a>
              <a href="#"><i className="bx bxl-linkedin" ></i></a>
            </div>
          </form>
        </div>

        {/* Register Form */}
        <div className="form-box register">
          <form onSubmit={handleRegisterSubmit}>
            <h1>Registration</h1>
            <div className="input-box">
              <input value={regName} onChange={e => setRegName(e.target.value)} type="text" placeholder="Username" required />
              <i className="bx bxs-user"></i>
            </div>
            <div className="input-box">
              <input value={regEmail} onChange={e => setRegEmail(e.target.value)} type="email" placeholder="Email" required />
              <i className="bx bxs-envelope"></i>
            </div>
            <div className="input-box">
              <input value={regPassword} onChange={e => setRegPassword(e.target.value)} type="password" placeholder="Password" required />
              <i className="bx bxs-lock-alt"></i>
            </div>
            <button type="submit" className="btn">Register</button>
            <p>or register with social platforms</p>
            <div className="social-icons">
              <a href="#"><i className="bx bxl-google" ></i></a>
              <a href="#"><i className="bx bxl-facebook" ></i></a>
              <a href="#"><i className="bx bxl-github" ></i></a>
              <a href="#"><i className="bx bxl-linkedin" ></i></a>
            </div>
          </form>
        </div>

        {/* Toggle Panels */}
        <div className="toggle-box">
          <div className="toggle-panel toggle-left">
            <h1>Hello, Welcome!</h1>
            <p>Don't have an account?</p>
            <button className="btn register-btn" onClick={() => setIsRegisterActive(true)}>Register</button>
          </div>

          <div className="toggle-panel toggle-right">
            <h1>Welcome Back!</h1>
            <p>Already have an account?</p>
            <button className="btn login-btn" onClick={() => setIsRegisterActive(false)}>Login</button>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`toast ${toast.type === "error" ? "error" : "success"}`}>
          {toast.message}
        </div>
      )}
    </>
  );
}

export default LoginPage;
