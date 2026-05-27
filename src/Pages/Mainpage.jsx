import { useState } from "react";
import { useNavigate } from "react-router-dom";

const defaultUsers = [
  { email: "demo@store.com", password: "demo123" },
];

function MainPage() {
  const [mode, setMode] = useState("login");
  const [users, setUsers] = useState(defaultUsers);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleRegister = (event) => {
    event.preventDefault();

    if (!email || !password || !confirmPassword) {
      setMessageType("error");
      setMessage("Please fill in all fields to register.");
      return;
    }

    if (password !== confirmPassword) {
      setMessageType("error");
      setMessage("Passwords do not match. Please try again.");
      return;
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (users.some((user) => user.email === normalizedEmail)) {
      setMessageType("error");
      setMessage("This email is already registered. Please log in.");
      return;
    }

    setUsers((prevUsers) => [
      ...prevUsers,
      { email: normalizedEmail, password },
    ]);
    setMessageType("success");
    setMessage("Registration successful! Please log in to continue.");
    setMode("login");
    resetForm();
  };

  const handleLogin = (event) => {
    event.preventDefault();

    const normalizedEmail = email.toLowerCase().trim();
    const foundUser = users.find(
      (user) => user.email === normalizedEmail && user.password === password
    );

    if (!foundUser) {
      setMessageType("error");
      setMessage("Invalid email or password. Please try again.");
      return;
    }

    setCurrentUser(foundUser);
    setMessageType("success");
    setMessage(`Welcome back, ${normalizedEmail}! Redirecting to products...`);
    resetForm();
    navigate("/products");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setMode("login");
    setMessageType("success");
    setMessage("You have been logged out.");
    resetForm();
    navigate("/");
  };

  return (
    <div className="main-page">
      <section className="hero-section">
        <div className="hero-copy">
          <h1>Welcome to the online store</h1>
          <p>
            Sign in or register below to continue. The form is centered for a
            cleaner login experience.
          </p>
          <div className="auth-toggle">
            <button
              type="button"
              className={mode === "login" ? "toggle-button active" : "toggle-button"}
              onClick={() => {
                setMode("login");
                setMessage("");
              }}
            >
              Login
            </button>
            <button
              type="button"
              className={mode === "register" ? "toggle-button active" : "toggle-button"}
              onClick={() => {
                setMode("register");
                setMessage("");
              }}
            >
              Register
            </button>
          </div>
        </div>

        <div className="auth-card">
          {currentUser ? (
            <div className="auth-success">
              <h2>Logged in as</h2>
              <p>{currentUser.email}</p>
              <button className="primary-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <form onSubmit={mode === "login" ? handleLogin : handleRegister}>
              <h2>{mode === "login" ? "Login to continue" : "Create an account"}</h2>

              <label>
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="auth-input"
                  placeholder="you@example.com"
                />
              </label>

              <label>
                Password
                <div className="password-row">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="auth-input"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="show-password"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </label>

              {mode === "register" && (
                <label>
                  Confirm Password
                  <div className="password-row">
                    <input
                      type={showConfirm ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                      className="auth-input"
                      placeholder="Confirm password"
                    />
                    <button
                      type="button"
                      className="show-password"
                      onClick={() => setShowConfirm((s) => !s)}
                      aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
                    >
                      {showConfirm ? "Hide" : "Show"}
                    </button>
                  </div>
                </label>
              )}

              <button type="submit" className="primary-button">
                {mode === "login" ? "Login" : "Register"}
              </button>
            </form>
          )}

          {message && (
            <div className={`auth-message ${messageType}`}>{message}</div>
          )}
        </div>
      </section>
    </div>
  );
}

export default MainPage;
