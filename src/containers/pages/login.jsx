import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Modal, notification, Button } from "antd";
import logo from "../../assets/img/logo.png";
import { actionLogin } from "../../redux/actions/login/login";
import { Form, FloatingLabel } from 'react-bootstrap';
import '../../assets/css/login.css';
import ModalOlvidar from "../../components/modals/modalOlvidarPassword"

function Home({}) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const passwordInput = useRef(null);

  const openNotification = (msg) => {
    notification.open({
      message: "Error",
      description: msg,
      icon: <img src={logo} alt="Logo" style={{ width: '32px', height: '40px'}} />,
    });
  };

  const checkFields = () => {
    if (username.trim().length === 0 || password.trim().length === 0) {
      openNotification("You can't leave fields empty");
      return false;
    }
    return true;
  };

  const callback = (value) => {
    if (value.status) {
      localStorage.setItem("tokends", value.value);
      navigate("/patient");
      return;
    }
    openNotification("Username or password don't match");
  };

  const callbackError = (value) => {
    openNotification(value);
  };

  const acceptButtonHandler = () => {
    if (checkFields() === false) {
      return;
    }
    var params = {
      username: username,
      password: password,
    };
  
    dispatch(actionLogin(params, callback, callbackError));
  };

  const handleKeyDownUsername = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      passwordInput.current.focus();
    }
  }

  const handleKeyDownPassword = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      acceptButtonHandler();
    }
  }

  return (
    <div className="home-container">
      <ModalOlvidar show={show} setShow={setShow} />
      <div className="login-container">
        <div className="header">
          <img className="logo" src={logo} alt="Logo" />
          <h4 className="mt-2">Login</h4>
        </div>
        <form className="login-form" noValidate autoComplete="off">
          <FloatingLabel controlId="floatingInput" label="Username" className="mb-3">
            <Form.Control 
              onChange={(e) => setUserName(e.target.value)} 
              type="text" 
              placeholder="name@example.com" 
              onKeyDown={handleKeyDownUsername}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control 
              onChange={(e) => setPassword(e.target.value)} 
              type="password" 
              placeholder="Password" 
              ref={passwordInput}
              onKeyDown={handleKeyDownPassword}
            />
          </FloatingLabel>

          <Button
            type="primary"
            block
            className="mt-3 custom-button"
            onClick={() => acceptButtonHandler()}
          >
            Accept 
          </Button>

          <div className="forgot-password-link">
            <h6
              className="link-success link-pointer"
              onClick={() => setShow(true)}
            >
              Forgot your password?
            </h6>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Home;
