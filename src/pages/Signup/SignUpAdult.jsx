import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // useLocation 추가
import back from "../../assets/img/Signup/back.png";
import { SignupAPI } from "../../apis/user.jsx"; // Signup API 가져오기

const Signupadult = () => {
  const [nickname, setNickName] = useState("");
  const [birthdate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation(); // useLocation 사용
  const userRole = location.state?.userRole || "DONATOR"; // userRole 가져오기, 기본값 설정

  const onChangeNickName = (e) => {
    setNickName(e.target.value);
  };

  const onChangeBirthDate = (e) => {
    setBirthDate(e.target.value);
  };

  const onChangePhonenumber = (e) => {
    setPhonenumber(e.target.value);
  };

  const onChangeEmail = (e) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);
    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage("이메일 형식을 다시 확인해주세요");
    } else {
      setEmailMessage("");
    }
  };

  const handleChangeNewPassword = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const onChangeConfirmPassword = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (value !== password) {
      setPasswordErrorMessage("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordErrorMessage("");
    }
  };

  // 회원가입 요청
  const onApply = async () => {
    if (email && password && nickname && phonenumber) {
      const userInfo = {
        email,
        password,
        nickname,
        phoneNumber: phonenumber,
        userRole: "DONATOR", // 서버 요구사항에 맞춤
        cardNumber: "0000000000000000", // 일반회원은 0으로 채운 16자리
      };
      
      console.log("회원가입 요청 데이터:", userInfo); // 요청 데이터 확인

      try {
        // 회원가입 API 호출
        const response = await SignupAPI(userInfo);

        if (response.status === 201) {
          console.log("회원가입 성공:", response.data);
          alert("회원가입이 성공적으로 완료되었습니다.");
          navigate("/signin");
        }
      } catch (error) {
        console.error("회원가입 요청 실패:", error.response?.data || error.message);
        alert("회원가입 중 오류가 발생했습니다.");
      }
    } else {
      alert("입력값을 확인해주세요.");
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="signupadult-page">
      <header className="signup-header">
        <img
          className="back-button"
          src={back}
          alt="뒤로가기"
          onClick={handleGoBack}
        />
        <h1>회원가입</h1>
      </header>
      <div className="form-container">
        <h2 className="section-title">회원정보</h2>
        <form>
          <label className="label">
            <div className="label2">
              <span>닉네임</span>
              <span className="required">*</span>
            </div>
            <input
              className="input-box"
              type="text"
              id="nickname"
              name="nickname"
              value={nickname}
              placeholder="ex) 마이무"
              onChange={onChangeNickName}
            />
          </label>
          <label className="label">
            <div className="label2">
              <span>생년월일</span>
              <span className="required">*</span>
            </div>
            <input
              className="input-box"
              type="text"
              id="birthdate"
              name="birthdate"
              value={birthdate}
              placeholder="ex) 20001021"
              onChange={onChangeBirthDate}
            />
          </label>
          <label className="label">
            <div className="label2">
              <span >이메일 주소</span>
              <span className="required">*</span>
            </div>
            <input
              className="input-box"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChangeEmail}
              placeholder="ex) mymoo1234@naver.com"
            />
            <p className="error-message">{emailMessage}</p>
          </label>
          <label className="label">
            <div className="label2">
              <span>비밀번호</span>
              <span className="required">*</span>
            </div>
            <input
              className="input-box"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChangeNewPassword}
              placeholder="영문/특수문자/숫자 포함 8자리 이상"
            />
          </label>
          <label className="label">
            <div className="label2">
              <span>비밀번호 확인</span>
              <span className="required">*</span>
            </div>
            <input
              className="input-box"
              type="password"
              id="passwordCheck"
              name="passwordCheck"
              value={confirmPassword}
              onChange={onChangeConfirmPassword}
              placeholder="비밀번호를 확인해주세요."
            />
            <p className="error-message">{passwordErrorMessage}</p>
          </label>
          <label className="label">
            <div className="label2">
              <span>전화번호</span>
              <span className="required">*</span>
            </div>
            <input
              className="input-box"
              type="text"
              id="phonenumber"
              name="phonenumber"
              value={phonenumber}
              onChange={onChangePhonenumber}
              placeholder="01000000000"
            />
          </label>
          {nickname &&
          birthdate &&
          email &&
          password &&
          confirmPassword &&
          phonenumber ? (
            <button className="sucbutton" type="button" onClick={onApply}>
              회원가입
            </button>
          ) : (
            <button className="button" type="button">회원가입</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Signupadult;
