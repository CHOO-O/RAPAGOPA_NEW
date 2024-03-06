import React, { useState } from "react";
import Header from "../components/Header";
import Rating from "../components/Rating";

import "../styles/styles.css";
import "../styles/Reviewform.css";

function Reviewform() {
  const [score, setScore] = useState(1);

  const handleScoreChange = (newScore) => {
    setScore(newScore); // Rating 컴포넌트에서 변경된 score 값을 부모 컴포넌트의 상태에 반영
    console.log(newScore);
  };

  const submitForm = (e) => {};

  return (
    <div className="header-padding">
      <Header />
      <div className="mypage-bgr">
        <div className="white-box">
          <div className="rvform-top">
            <div className="rvform-title">리뷰 작성하기</div>
            <div className="rvform-ment">
              작성 완료 시 총점은 평균치로 보여집니다.
            </div>
          </div>
          <div className="ratings-container">
            <div className="rating-container">
              맛&nbsp;&nbsp;&nbsp;&nbsp;
              <Rating id="taste" onChangeScore={handleScoreChange} />
            </div>
            <div className="rating-container">
              양&nbsp;&nbsp;&nbsp;&nbsp;
              <Rating id="taste" onChangeScore={handleScoreChange} />
            </div>
            <div className="rating-container">
              가격&nbsp;&nbsp;&nbsp;&nbsp;
              <Rating id="taste" onChangeScore={handleScoreChange} />
            </div>
          </div>
          <input type="text" className="rvform-input" />
          <div className="orange-button" onClick={submitForm}>
            리뷰 작성하기
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reviewform;
