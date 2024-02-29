import React, { useState, useEffect } from "react";

import "../styles/styles.css";
import "../styles/Rating.css";
import { ReactComponent as Fullstar } from "../assets/full-star.svg";
import { ReactComponent as Greystar } from "../assets/grey-star.svg";

function Rating({ onChangeScore }) {
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const [score, setScore] = useState(0);

  const onClickStar = (e, idx) => {
    e.preventDefault();
    let clickedStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      if (i <= idx) clickedStates[i] = true;
      else clickedStates[i] = false;
    }

    setClicked(clickedStates);
    setScore(idx + 1);
    onChangeScore(idx + 1);
  };

  return (
    <div>
      <div className="rating-stars">
        <div onClick={(e) => onClickStar(e, 0)}>
          {clicked[0] ? <Fullstar /> : <Greystar />}
        </div>
        <div onClick={(e) => onClickStar(e, 1)}>
          {clicked[1] ? <Fullstar /> : <Greystar />}
        </div>
        <div onClick={(e) => onClickStar(e, 2)}>
          {clicked[2] ? <Fullstar /> : <Greystar />}
        </div>
        <div onClick={(e) => onClickStar(e, 3)}>
          {clicked[3] ? <Fullstar /> : <Greystar />}
        </div>
        <div onClick={(e) => onClickStar(e, 4)}>
          {clicked[4] ? <Fullstar /> : <Greystar />}
        </div>
        <div className="rating-score">{score}점</div>
      </div>
    </div>
  );
}

export default Rating;
