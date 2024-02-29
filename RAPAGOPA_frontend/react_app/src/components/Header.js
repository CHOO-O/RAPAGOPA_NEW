import React from "react";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";
import "../styles/styles.css";

function Header() {
  const nav = useNavigate();

  // ===================== 로고 클릭 =======================
  const onClickLogo = () => {
    nav("/main");
  };

  // ===================== 마이페이지 클릭 =======================
  const onClickMypg = () => {
    nav("/mypage");
  };

  return (
    <div className="header">
      <Logo className="header-logo" onClick={onClickLogo} />
      <div className="header-buttons">
        <div className="orange-button" onClick={onClickMypg}>
          마이페이지
        </div>
        <div className="orange-button">로그아웃</div>
      </div>
    </div>
  );
}

export default Header;
