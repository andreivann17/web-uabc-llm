import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { notification, Button, Spin } from "antd";
import logo from "../../assets/img/logo.png";
import { actionLogin } from "../../redux/actions/login/login";
import { Form, FloatingLabel } from 'react-bootstrap';
import ModalOlvidar from "../../components/modals/modalOlvidarPassword";
import "../../assets/css/loginVoyager.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const passwordInput = useRef(null);

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const openNotification = (msg) => {
    notification.error({
      message: "Error",
      description: msg,
    });
  };

  const checkFields = () => {
    if (email.trim().length === 0 || password.trim().length === 0) {
openNotification("Please complete all fields correctly.");
      return false;
    }
    return true;
  };

  const callback = (token) => {
    localStorage.setItem("value-user", token);
    navigate("/retina");
  };

  const callbackError = (value) => {
    setLoading(false);
    openNotification(value);
  };

  const acceptButtonHandler = () => {
    if (!checkFields()) return;
    setLoading(true);
    const parametros = { email, password };
    dispatch(actionLogin(parametros, callback, callbackError));
  };

  const handleKeyDownemail = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      passwordInput.current?.focus();
    }
  };

  const handleKeyDownPassword = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      acceptButtonHandler();
    }
  };

  return (
    <div className="login-wrapper fade-in">
      <div className="login-container">
        <div className="login-left">
          <div className="text-center">
            <img src={logo} alt="UABC logo" style={{ width: 120 }} />
           <h2 className="login-title">Login</h2>
<p className="login-subtitle">Retina Analysis System - UABC</p>

          </div>

          <form className="login-form" noValidate autoComplete="off">
  <FloatingLabel controlId="floatingInput" label="Email" className="mb-3">
    <Form.Control
      onChange={(e) => setEmail(e.target.value)}
      type="email"
      placeholder="user@uabc.edu.mx"
      onKeyDown={handleKeyDownemail}
      aria-label="Email"
    />
  </FloatingLabel>

  <FloatingLabel controlId="floatingPassword" label="Password">
    <Form.Control
      onChange={(e) => setPassword(e.target.value)}
      type="password"
      placeholder="Password"
      ref={passwordInput}
      onKeyDown={handleKeyDownPassword}
      aria-label="Password"
    />
  </FloatingLabel>

  <Button
    type="primary"
    block
    className="custom-button mt-3"
    onClick={acceptButtonHandler}
    disabled={loading}
  >
    {loading ? <Spin size="small" /> : "Log In"}
  </Button>

  <div className="forgot-password-link">
    <span className="link-pointer" onClick={() => setShow(true)}>
      Forgot your password?
    </span>
  </div>
</form>


          <footer className="login-footer">
            © 2025 Universidad Autónoma de Baja California
          </footer>
        </div>

        <div className="login-right" role="presentation" />
      </div>

      <ModalOlvidar show={show} setShow={setShow} />
    </div>
  );
}

export default Login;
