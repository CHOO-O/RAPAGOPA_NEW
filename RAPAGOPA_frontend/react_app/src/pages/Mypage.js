import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Dropdown from "../components/Dropdown";
import { ReactComponent as Userprofile } from "../assets/userprofile.svg";
import { ReactComponent as Camera } from "../assets/camera.svg";
import axios from "axios";

import "../styles/styles.css";
import "../styles/Mypage.css";

function Mypage() {
  const [age, setAge] = useState(); //나이(년도)
  const [MBTI, setMBTI] = useState(); //MBTI
  const [nickNm, setNickNm] = useState(); //닉네임
  const [intro, setIntro] = useState(); //소개글
  const [gender, setGender] = useState(); //성별
  const [imageUrl, setImageUrl] = useState(); //프로필이미지*
  const [openAge, setOpenAge] = useState(); //나이공개여부
  const [openMBTI, setOpenMBTI] = useState(); //MBTI공개여부

  // =================== 로그인 여부 체크 ===================
  const nav = useNavigate();
  useEffect(() => {
    const loginData = sessionStorage.getItem("loginData");
    if (!loginData) {
      nav("/");
    }
  }, [nav]);

  // ===================== 진입 시 값 받아오기 =========================
  useEffect(() => {
    getInfos();
  }, []);

  const getInfos = async () => {
    const loginDataString = sessionStorage.getItem("loginData");

    let id = null;
    if (loginDataString) {
      const loginData = JSON.parse(loginDataString);
      id = loginData.USER_ID;
      console.log(id);
    }

    try {
      const response = await axios.get(`http://127.0.0.1:8000/users/${id}/`);
      console.log(response.data);
      setNickNm(response.data.USER_NICKNM);
      setMBTI(response.data.USER_MBTI);
      setAge(response.data.USER_YEAR);
      setIntro(response.data.USER_INTRO);
      setGender(response.data.USER_GENDER);
      setOpenAge(response.data.USER_YEAR_OPEN_YN);
      setOpenMBTI(response.data.USER_MBTI_OPEN_YN);
      setImageUrl(response.data.USER_IMAGE_URL);
    } catch (e) {
      alert("오류가 발생하였습니다. 다시 시도해주세요.");
    }
  };

  // ===================== 이미지 관리 =========================
  const fileRef = useRef(null);
  const [uploadImg, setUploadImg] = useState(null);
  const handleImg = () => {
    fileRef.current.click();
  };

  const handleImgInput = (e) => {
    const file = e.target.files[0];
    setUploadImg(URL.createObjectURL(file));
  };

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
  const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

  const handleChangeForm = (e) => {
    switch (e.target.name) {
      case "nicknm":
        setNickOk(2);
        let tNm = e.target.value;
        if (tNm.length > 6) {
          tNm = tNm.substring(0, 6);
        }
        if (specialCharacters.test(tNm)) {
          tNm = tNm.replace(specialCharacters, "");
        }
        setNickNm(tNm);
        break;
      case "intro":
        let tItr = e.target.value;
        if (tItr.length > 30) {
          tItr = tItr.substring(0, 30);
        }
        setIntro(tItr);
        break;
    }
  };

  const handleChangeMBTI = (value) => {
    setMBTI(value);
  };

  const handleChangeAge = (value) => {
    setAge(value);
  };

  const handleChangeGender = (e) => {
    if (e.target.id == "male") {
      setGender("M");
    } else {
      setGender("F");
    }
  };

  const handleClickOpen = (e) => {
    //해당 체크박스들은 공개하고 싶지 않을 때 (N)일 때 체크가 되어야 함
    //받아오는 값은 Y / N로 받아옴
    // Y 일때 checked false, N일 때 checked true여야 함
    switch (e.target.name) {
      case "openAge":
        if (openAge == "Y") {
          setOpenAge("N");
        } else {
          setOpenAge("Y");
        }
        break;
      case "openMBTI":
        if (openMBTI == "Y") {
          setOpenMBTI("N");
        } else {
          setOpenMBTI("Y");
        }
        break;
    }
  };

  // ===================== 수정하기, 변경사항 저장 button =========================
  const [toggleChange, setToggleChange] = useState(true); //true일 때 수정하기 <-> false일 때 변경사항 저장
  const [isDisabled, setIsDisabled] = useState(true);
  const letChange = (e) => {
    e.preventDefault();
    setIsDisabled(false);
    setToggleChange(!toggleChange);
  };

  const saveChanges = async () => {
    const loginDataString = sessionStorage.getItem("loginData");

    let id = null;
    if (loginDataString) {
      const loginData = JSON.parse(loginDataString);
      id = loginData.USER_ID;
      console.log(id);
    }

    const userInfoToUpdate = {
      USER_ID: id,
      USER_NICKNM: nickNm, // nickNm은 상태로 관리되는 닉네임 정보
      USER_MBTI: MBTI, // mbti는 상태로 관리되는 MBTI 정보
      USER_YEAR: age, // age는 상태로 관리되는 나이 정보
      USER_INTRO: intro, // intro는 상태로 관리되는 소개 정보
      USER_GENDER: gender, // gender는 상태로 관리되는 성별 정보
      USER_YEAR_OPEN_YN: openAge, // openAge는 상태로 관리되는 출생 연도 공개 여부
      USER_MBTI_OPEN_YN: openMBTI, // openMBTI는 상태로 관리되는 MBTI 공개 여부
      USER_IMAGE_URL: uploadImg,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/update-user-info/",
        userInfoToUpdate
      );
      console.log(response.data); // 성공한 경우 응답 데이터 출력
      alert("수정이 완료되었습니다.");
      setIsDisabled(true);
      setToggleChange(!toggleChange);
      setNickOk(3);
    } catch (error) {
      alert("오류가 발생하였습니다. 다시 시도해주세요.");
    }
  };

  // -------------------- 닉네임 중복체크 ---------------
  const [nickOk, setNickOk] = useState(3);

  const nicknmCheck = async () => {
    const loginDataString = sessionStorage.getItem("loginData");
    let id = null;
    if (loginDataString) {
      const loginData = JSON.parse(loginDataString);
      id = loginData.USER_ID;
    }

    const userNicknm = {
      USER_ID: id,
      USER_NICKNM: nickNm,
    };
    console.log(userNicknm);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/nm_check/",
        userNicknm
      );
      console.log(response.data);
      if (response.data == 1) {
        setNickOk(1);
      } else {
        setNickOk(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="header-padding">
      <Header />
      <div className="mypage-bgr">
        <div className="white-box">
          <p className="mypage-title">기본 정보</p>
          <div className="mypage-sections">
            <form className="mypage-form" id="formProfile">
              <div
                className={isDisabled ? "mypage-img-disabled" : "mypage-img"}
                onClick={handleImg}
              >
                {imageUrl ? (
                  <>
                    <img
                      src={imageUrl}
                      alt="Profile"
                      className="mypage-uploadedimg"
                    />
                    <Camera className="mypage-camera" />
                  </>
                ) : uploadImg ? (
                  <>
                    <img
                      src={uploadImg}
                      alt="Uploaded"
                      className="mypage-uploadedimg"
                    />
                    <Camera className="mypage-camera" />
                  </>
                ) : (
                  <>
                    <Userprofile className="mypage-userprofile" />
                    <Camera className="mypage-camera" />
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileRef}
                  onChange={handleImgInput}
                  style={{ display: "none" }}
                />
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
                    placeholder="최대 6자까지 입력 가능합니다."
                    onChange={handleChangeForm}
                    disabled={isDisabled}
                  />
                  <button
                    type="button"
                    className="orange-button"
                    disabled={isDisabled}
                    onClick={nicknmCheck}
                  >
                    중복 확인
                  </button>
                  {nickOk === 2 && (
                    <span className="nickname-cert-fail">
                      닉네임 중복 확인을 해주세요.
                    </span>
                  )}
                  {nickOk === 1 && (
                    <span className="nickname-cert">
                      사용 가능한 닉네임입니다.
                    </span>
                  )}
                  {nickOk === 0 && (
                    <span className="nickname-cert-fail">
                      사용 불가능한 닉네임입니다.
                    </span>
                  )}
                </div>
                <div className="line-container">
                  <label>성별</label>
                  <div className="mypage-genders">
                    <label for="male" className="label-ex">
                      남
                      <input
                        className="radio-button"
                        id="male"
                        type="radio"
                        name="gender"
                        value="M"
                        onChange={handleChangeGender}
                        disabled={isDisabled}
                        checked={gender == "M"}
                      />
                    </label>
                    <label for="female" className="label-ex">
                      여
                      <input
                        className="radio-button"
                        type="radio"
                        name="gender"
                        value="F"
                        onChange={handleChangeGender}
                        disabled={isDisabled}
                        checked={gender == "F"}
                      />
                    </label>
                  </div>
                  <label for="age" className="label-ex">
                    나이
                    <Dropdown
                      id="age"
                      options={years}
                      name="age"
                      value={age}
                      disabled={isDisabled}
                      onChange={handleChangeAge}
                    />
                  </label>
                  <input
                    type="checkbox"
                    // className="radio-button"
                    name="openAge"
                    value="N"
                    onChange={handleClickOpen}
                    disabled={isDisabled}
                    checked={openAge == "N"}
                  />
                  <label for="MBTI" className="label-ex">
                    MBTI
                    <Dropdown
                      id="MBTI"
                      options={MBTIs}
                      name="MBTI"
                      value={MBTI}
                      disabled={isDisabled}
                      onChange={handleChangeMBTI}
                    />
                    <input
                      type="checkbox" // className="radio-button"
                      name="openMBTI"
                      value="N"
                      onChange={handleClickOpen}
                      disabled={isDisabled}
                      checked={openMBTI == "N"}
                    />
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
                    placeholder="최대 30자까지 입력 가능합니다."
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
          <div className="mypage-bottoms">
            <button type="button" className="orange-button">
              내 리뷰 관리
            </button>
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
                  disabled={nickOk === 1 || nickOk === 3 ? false : true}
                >
                  변경내용 저장
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mypage;
