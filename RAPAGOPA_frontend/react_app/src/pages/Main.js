import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { ReactComponent as Fullstar } from "../assets/full-star.svg";
import { ReactComponent as Arrow } from "../assets/rightarrow.svg";
import "../styles/styles.css";
import "../styles/Main.css";

function Main() {
  // TB_RESTAURANT에서 기본적으로 받아와야 할 정보
  // formData로 한번에 받아온 후 useState로 분배해줘야 할 것 같음
  const [resNm, setResNm] = useState("testName"); //식당명
  const [resAddr, setResAddr] = useState("testAddr"); //식당 주소
  const [resNaver, setResNaver] = useState(""); //네이버지도 URL
  const [totScore, setTotScore] = useState(0); // 해당 식당의 리뷰 별점의 평균 - 값 수정하신거 확인하고 받아오기

  // =================== 로그인 여부 체크 ===================
  const nav = useNavigate();
  useEffect(() => {
    const loginData = sessionStorage.getItem("loginData");
    if (!loginData) {
      nav("/");
    }
  }, [nav]);

  const clickAddr = (e) => {
    e.preventDefault();
    alert("새탭에 받아온 주소(resNaver) 이용해 띄우기 구현");
  };

  return (
    <div className="header-padding">
      <Header />
      <div className="mypage-bgr">
        <div className="white-box">
          <div className="rstr-container">
            <div className="rstr-image"></div>
            <div className="rstr-middle">
              <div className="rstr-name">식당이름</div>
              <div className="total-score">
                별점
                <Fullstar />
                {totScore}
              </div>
              <div onClick={clickAddr}>
                클릭시 네이버지도 링크 연결
                <Arrow className="right-arrow" />
              </div>
              <div>영업시간어쩌구</div>
              <div>전화번호클릭시복사기능?</div>
            </div>
            <div className="rstr-right">
              <div className="tags">#Cate</div>
              <div className="main-goto">
                리뷰 보러가기
                <Arrow className="right-arrow" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
