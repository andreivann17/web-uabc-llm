import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Modal, Button, Input, Row, Form } from "antd";
import Modalmensaje from "./modalMensaje";
import { actionNewPassword } from "../../redux/actions/login/login";
import Toast from "../toasts/toast";
import { useDispatch } from "react-redux";
import logo from "../../assets/img/logo.jpg";

function Home({ show, setShow, clave }) {
  const handleClose = () => setShow(false);
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [msg, setMsg] = useState("");
  const [showmsg, setShowmsg] = useState(false);
  const [showtoast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const inputRef2 = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      inputRef2.current.focus()
    }
  }

  const handleKeyDown2 = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      btn_aceptar();
    }
  }

  const comprobar = () => {
    if (pass1.trim().length == 0 || pass2.trim().length == 0) {
      setMsg("You cannot leave fields empty");
      setShowmsg(true);
      return false;
    }
    if (pass1.trim() != pass2.trim()) {
      setMsg("Invalid password, they must match");
      setShowmsg(true);
      return false;
    }
    return true;
  }

  const callback = () => {
    setShow(false);
    setMsg("Your password has been updated!");
    setShowToast(true);
  }

  const btn_aceptar = () => {
    if (comprobar() == false) {
      return;
    }
    var parametros = {
      clave: clave,
      pass: pass1
    };
    dispatch(actionNewPassword(parametros, callback, () => true))
  }

  return (
    <>
      <Modalmensaje show={showmsg} setShow={setShowmsg} msg={msg} />
      <Toast show={showtoast} msg={msg} setShow={setShowToast} />
      <Modal
        title="Password Recovery"
        visible={show}
        onCancel={handleClose}
        footer={[
          <Button key="cancel" onClick={handleClose}>
            Cancel
          </Button>,
          <Button key="submit" className="custom-button" type="primary" onClick={() => btn_aceptar()}>
            Submit
          </Button>,
        ]}
      >
        <div style={{ marginBottom: '2rem',marginTop:30 }}>
          <h6>Enter your new password.</h6>
        </div>
        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[
            { required: true, message: 'Please input the new password!' },
            { max: 15, message: 'Password cannot be longer than 15 characters!' }
          ]}
        >
          <Input
            required
            type="password"
            value={pass1}
            onChange={(ev) => setPass1(ev.target.value)}
            ref={inputRef}
            autoFocus
            onKeyDown={handleKeyDown}
          />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[
            { required: true, message: 'Please confirm the new password!' },
            { max: 15, message: 'Password cannot be longer than 15 characters!' }
          ]}
        >
          <Input
            required
            type="password"
            value={pass2}
            onChange={(ev) => setPass2(ev.target.value)}
            ref={inputRef2}
            onKeyDown={handleKeyDown2}
          />
        </Form.Item>
      </Modal>
    </>
  );
}

export default Home;
