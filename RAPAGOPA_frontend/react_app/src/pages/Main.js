import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { ReactComponent as Fullstar } from "../assets/full-star.svg";
import { ReactComponent as Arrow } from "../assets/rightarrow.svg";
import axios from "axios";

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

  // ===================== 진입 시 값 받아오기 =========================
  const [restArray, setRestArray] = useState([]);

  useEffect(() => {
    getInfos();
  }, []);

  const getInfos = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/restaurants/");
      console.log(response.data);
      setRestArray([...response.data]);
    } catch (e) {
      console.log(e);
      alert("오류가 발생하였습니다. 다시 시도해주세요.");
    }
  };

  // =================== 주소 클릭 시 네이버맵 새 창 열기 ==================
  const clickAddr = (e) => {
    e.preventDefault();
    const url = e.target.getAttribute("data");
    if (url) {
      window.open(url, "_blank");
    }
  };

  // ===================== 각 식당 리뷰 보러가기 =======================
  const gotoReview = (e) => {
    e.preventDefault();
    const resNo = e.target.getAttribute("data");
    // 여기서 resNo를 파라미터로 던져 리뷰테이블에서 값을 가져오기
    nav(`/restaurantreview/${resNo}`);
  };

  return (
    <div className="header-padding">
      <Header />
      <div className="mypage-bgr">
        <div className="white-box">
          {restArray.map((restaurantData) => (
            <div key={restaurantData.id} className="rstr-container">
              <div className="rstr-image"></div>
              <div className="rstr-middle">
                <div className="rstr-name">{restaurantData.RESTAURANT_NM}</div>
                <div className="total-score">
                  별점
                  <Fullstar />
                  {totScore}
                </div>
                <div
                  data={restaurantData.RESTAURANT_NAVER_URL}
                  onClick={clickAddr}
                >
                  {restaurantData.RESTAURANT_DORO_ADDR}
                  <Arrow className="right-arrow" />
                </div>
                <div>
                  영업시간
                  {restaurantData.RESTAURANT_TIME
                    ? " " +
                      restaurantData.RESTAURANT_TIME.slice(0, 2) +
                      ":" +
                      restaurantData.RESTAURANT_TIME.slice(2, 4) +
                      " ~ " +
                      restaurantData.RESTAURANT_TIME.slice(5, 7) +
                      ":" +
                      restaurantData.RESTAURANT_TIME.slice(7, 9)
                    : ""}
                </div>
                <div>
                  {restaurantData.RESTAURANT_BREAK_TIME
                    ? "쉬는시간 " +
                      restaurantData.RESTAURANT_BREAK_TIME.slice(0, 2) +
                      ":" +
                      restaurantData.RESTAURANT_BREAK_TIME.slice(2, 4) +
                      " ~ " +
                      restaurantData.RESTAURANT_BREAK_TIME.slice(5, 7) +
                      ":" +
                      restaurantData.RESTAURANT_BREAK_TIME.slice(7, 9)
                    : ""}
                </div>
              </div>
              <div className="rstr-right">
                <div className="tags">#{restaurantData.RESTAURANT_CATE}</div>
                <div
                  className="main-goto"
                  onClick={gotoReview}
                  data={restaurantData.RESTAURANT_NO}
                >
                  리뷰 보러가기
                  <Arrow className="right-arrow" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Main;
