import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Dropdown from "../components/Dropdown";
import { ReactComponent as Userprofile } from "../assets/userprofile.svg";
import { ReactComponent as Camera } from "../assets/camera.svg";

import "../styles/styles.css";
import "../styles/Mypage.css";

function Mypage() {
  // ===================== selectbox 관리 =========================
  const years = Array.from(
    { length: 2024 - 1940 + 1 },
    (_, index) => 2024 - index
  );
  const MBTIs = [
    "ISTJ",
    "ISTP",
    "ISFJ",
    "ISFP",
    "INTJ",
    "INTP",
    "INFJ",
    "INFP",
    "ESTJ",
    "ESTP",
    "ESFJ",
    "ESFP",
    "ENTJ",
    "ENTP",
    "ENFJ",
    "ENFP",
  ];

  //===================== form states =========================
  const [age, setAge] = useState();
  const [MBTI, setMBTI] = useState();
  const [nickNm, setNickNm] = useState();
  const [intro, setIntro] = useState();
  const handleChangeForm = (e) => {
    switch (e.target.name) {
      case "nicknm":
        setNickNm(e.target.value);
        break;
      case "intro":
        setIntro(e.target.value);
        break;
    }
  };

  const handleChangeMBTI = (value) => {
    setMBTI(value);
  };

  const handleChangeAge = (value) => {
    setAge(value);
  };

  // ===================== 수정하기, 변경사항 저장 button =========================
  const [toggleChange, setToggleChange] = useState(true); //true일 때 수정하기 <-> false일 때 변경사항 저장
  const [isDisabled, setIsDisabled] = useState(true);
  const letChange = (e) => {
    e.preventDefault();
    setIsDisabled(false);
    setToggleChange(!toggleChange);
  };

  const saveChanges = (e) => {
    e.preventDefault();
    const formDataProfile = new FormData(formProfile);
    formDataProfile.append("age", age);
    formDataProfile.append("MBTI", MBTI);
    for (const keyValue of formDataProfile) console.log(keyValue);
    alert("변경 사항을 저장하시겠습니까? Y/N"); // 확인 창 만들고 Y일 시 fetch 진행, N일시 취소할 것
    // fetch(API주소, {
    //   method: "POST",
    //   body: new FormData(formProfile),
    // });
    setIsDisabled(true);
    setToggleChange(!toggleChange);
  };

  return (
    <div className="header-padding">
      <Header />
      <div className="mypage-bgr">
        <div className="white-box">
          <p className="mypage-title">기본 정보</p>
          <div className="mypage-sections">
            <form className="mypage-form" id="formProfile">
              <div className="mypage-img">
                <Userprofile className="mypage-userprofile" />
                <Camera className="mypage-camera" />
              </div>
              <div className="mypage-profiles">
                <div className="line-container">
                  <label for="nicknm">닉네임</label>
                  <input
                    id="nicknm"
                    className="nickname-input"
                    type="text"
                    name="nicknm"
                    value={nickNm}
                    placeholder="최대 n자까지 설정할 수 있습니다"
                    onChange={handleChangeForm}
                    disabled={isDisabled}
                  />
                  <button type="button" className="orange-button">
                    중복 확인
                  </button>
                  {/* <span className="nickname-cert">
                    사용 가능한 닉네임입니다
                  </span> */}
                </div>
                <div className="line-container">
                  <label>성별</label>
                  <label for="male" className="label-ex">
                    남
                  </label>
                  <input
                    className="radio-button"
                    id="male"
                    type="radio"
                    name="gender"
                    value="male"
                    onChange={handleChangeForm}
                    disabled={isDisabled}
                    defaultChecked="true"
                  />
                  <label>
                    여
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      onChange={handleChangeForm}
                      disabled={isDisabled}
                    />
                  </label>
                  <label for="age">나이</label>
                  <Dropdown
                    id="age"
                    options={years}
                    name="age"
                    value={age}
                    disabled={isDisabled}
                    onChange={handleChangeAge}
                  />
                  <input type="checkbox" />
                  <label>
                    MBTI
                    <Dropdown
                      options={MBTIs}
                      name="MBTI"
                      value={MBTI}
                      disabled={isDisabled}
                      onChange={handleChangeMBTI}
                    />
                    <input type="checkbox" />
                  </label>
                </div>
                <div className="line-container">
                  <label for="intro">소개글</label>
                  <input
                    id="intro"
                    className="intro-input"
                    type="text"
                    name="intro"
                    onChange={handleChangeForm}
                    value={intro}
                    placeholder="최대 n자까지 설정할 수 있습니다"
                    disabled={isDisabled}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="mypage-sections">
            <div className="tags">#맵찔</div>
            <div className="tags">#최대길이여섯</div>
            <div className="tags-add">+</div>
          </div>
          <button type="button" className="red-button">
            비밀번호 변경
          </button>
          <div>
            {toggleChange === true ? (
              <button
                type="button"
                className="orange-button"
                onClick={letChange}
              >
                수정하기
              </button>
            ) : (
              <button
                type="button"
                className="orange-button"
                onClick={saveChanges}
              >
                변경내용 저장
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mypage;
