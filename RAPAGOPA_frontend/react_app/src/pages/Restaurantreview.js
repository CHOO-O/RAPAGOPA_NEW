import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Header from "../components/Header";
import { ReactComponent as Fullstar } from "../assets/full-star.svg";
import axios from "axios";

import "../styles/styles.css";
import "../styles/Review.css";

function Restaurantreview() {
  // =================== 로그인 여부 체크 ===================
  const nav = useNavigate();
  useEffect(() => {
    const loginData = sessionStorage.getItem("loginData");
    if (!loginData) {
      nav("/");
    }
  }, [nav]);

  // ===================== 진입 시 값 받아오기 =========================
  const { resNo } = useParams();
  const [reviewArray, setReviewArray] = useState([]);
  const [resName, setResName] = useState("");
  const [flArray, setFlArray] = useState([]);
  const [fkArray, setFkArray] = useState([]);

  useEffect(() => {
    getInfos();
    fetchDataFromDjangoServer();
  }, []);

  const getInfos = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/restaurant/${resNo}/name/`
      );
      setResName(response.data.restaurant_name);

      const flCodes = await axios.get(`http://127.0.0.1:8000/food-like-codes/`); //음식취향
      console.log(flCodes.data);
      setFlArray([...flCodes.data]);

      const fkCodes = await axios.get(`http://127.0.0.1:8000/food-kind-codes/`); //음식취향
      console.log(fkCodes.data);
      setFkArray([...fkCodes.data]);
    } catch (e) {
      console.log(e);
      alert("오류가 발생하였습니다. 다시 시도해주세요.");
    }
  };

  const fetchDataFromDjangoServer = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/reviews-with-user-info/${resNo}/`
      );
      console.log(response.data);
      setReviewArray([...response.data]);
    } catch (error) {
      console.error("Error fetching data from Django server:", error);
    }
  };

  const gotoForm = () => {
    nav("/reviewform");
  };

  return (
    <div className="header-padding">
      <Header />
      <div className="mypage-bgr">
        <div className="resName">{resName}</div>
        <div
          className="orange-button"
          onClick={gotoForm}
          style={{ marginBottom: "30px" }}
        >
          리뷰 작성하기
        </div>
        <div className="white-box">
          {reviewArray.length ? (
            reviewArray.map((reviewData) => (
              <div key={reviewData.id} className="review-container">
                <div className="review-column">
                  <div className="review-textcontainer">
                    <div className="review-texts">{reviewData.USER_NICKNM}</div>
                    <div className="review-texts">
                      {reviewData.USER_GENDER == "M" ? "남" : "여"}
                    </div>
                    <div className="review-texts">
                      {reviewData.USER_YEAR_OPEN_YN == "Y"
                        ? reviewData.USER_YEAR.slice(2, 4)
                        : ""}
                    </div>
                    <div className="review-texts">
                      {reviewData.USER_MBTI_OPEN_YN == "Y"
                        ? reviewData.USER_MBTI
                        : ""}
                    </div>
                    <div className="total-score">
                      <Fullstar />
                      {reviewData.TOT_SCORE}
                    </div>
                  </div>
                  <div className="review-tags">
                    {reviewData.USER_FOOD_CATE_1 ? (
                      <div className="tags">
                        #
                        {fkArray.map((item) => {
                          if (item.code_cd === reviewData.USER_FOOD_CATE_1) {
                            return item.code_nm;
                          }
                        })}
                      </div>
                    ) : (
                      ""
                    )}
                    {reviewData.USER_FOOD_CATE_2 ? (
                      <div className="tags">
                        #
                        {fkArray.map((item) => {
                          if (item.code_cd === reviewData.USER_FOOD_CATE_2) {
                            return item.code_nm;
                          }
                        })}
                      </div>
                    ) : (
                      ""
                    )}
                    {reviewData.USER_FOOD_LIKE_1 ? (
                      <div className="tags">
                        #
                        {flArray.map((item) => {
                          if (item.code_cd === reviewData.USER_FOOD_LIKE_1) {
                            return item.code_nm;
                          }
                        })}
                      </div>
                    ) : (
                      ""
                    )}
                    {reviewData.USER_FOOD_LIKE_2 ? (
                      <div className="tags">
                        #
                        {flArray.map((item) => {
                          if (item.code_cd === reviewData.USER_FOOD_LIKE_2) {
                            return item.code_nm;
                          }
                        })}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="review-review">{reviewData.FOOD_REVIEW}</div>
              </div>
            ))
          ) : (
            <div>아직 작성된 리뷰가 없는 식당입니다.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Restaurantreview;
