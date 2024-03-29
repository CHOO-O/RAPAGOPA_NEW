import React, { useState } from "react";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../styles/styles.css";
import "../styles/Login.css";

function Login() {
  const nav = useNavigate();
  const [id, setId] = useState();
  const [pwd, setPwd] = useState();

  // ===================== ID =========================
  const onInputid = (e) => {
    setId(e.target.value);
  };

  // ===================== PWD =======================
  const onInputpwd = (e) => {
    setPwd(e.target.value);
  };

  // ===================== Login =======================

  // const [sesData, setSesData] = useState();
  const onClickLogin = async () => {
    try {
      const loginData = {
        USER_ID: id,
        USER_PWD: pwd,
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/login/",
        loginData
      );
      console.log(response.data);
      console.log(response);
      if (response.status == 200) {
        sessionStorage.setItem("loginData", JSON.stringify(loginData));
        nav("/main");
      } else {
        alert("아이디/비밀번호를 확인해주세요.");
      }
    } catch (e) {
      alert("아이디/비밀번호를 확인해주세요.");
    }
  };

  return (
    <div className="login-bgr">
      <Logo className="login-logo" />
      <div className="login-box">
        <input
          className="input-box"
          type="text"
          placeholder="아이디 입력"
          value={id}
          onChange={onInputid}
        />
        <input
          className="input-box"
          type="password"
          placeholder="비밀번호 입력"
          value={pwd}
          onChange={onInputpwd}
        />
        <span className="find-id-pwd">아이디/비밀번호를 까먹었나요?</span>
      </div>
      <button className="orange-bigbutton" onClick={onClickLogin}>
        로그인
      </button>
    </div>
  );
}

export default Login;
