import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import back from "../../assets/img/Signup/back.png";
import normalimg from "../../assets/img/Signup/normalimg.png";
import childimg from "../../assets/img/Signup/childimg.png";
import normalclickimg from "../../assets/img/Signup/normalclickimg.png";
import childclickimg from "../../assets/img/Signup/childclickimg.png";

const Signup = () => {
  const navigate = useNavigate();

  const [selectedType, setSelectedType] = useState(null);

  const handleTypeClick = (type) => {
    setSelectedType(type);
    console.log(`${type} 회원가입 선택됨`);
  };

  const handleSubmit = () => {
    if (!selectedType) {
      alert('가입 유형을 선택해주세요!');
    } else {
      if (selectedType === 'child') {
        navigate('/signupchild', { state: { userRole: 'child' } });
      } else {
        navigate('/signupadult', { state: { userRole: 'adult' } });
      }
    }
  };

  const handleBtnClick = () => {
    navigate('/');
  };

  return (
    <div className="signup-page">
      <header className="signup-header">
        <img className="back-button" src={back} alt="뒤로가기" onClick={handleBtnClick} />
        <h1>회원가입</h1>
      </header>
      <div className="textview">
        <p className="welcome-text">환영합니다!<br />가입 유형을 선택해주세요.</p>
      </div>
      <div className="type-selection">
        <div
          className={`type-card ${selectedType === 'child' ? 'selected' : ''}`}
          onClick={() => handleTypeClick('child')}
        >
          <img
            src={selectedType === 'child' ? childclickimg : childimg}
            alt="아동 회원"
          />
        </div>
        <div
          className={`type-card ${selectedType === 'adult' ? 'selected' : ''}`}
          onClick={() => handleTypeClick('adult')}
        >
          <img
            src={selectedType === 'adult' ? normalclickimg : normalimg}
            alt="일반 회원"
          />
        </div>
      </div>
      <button className="submit-button" onClick={handleSubmit}>
        가입 유형 선택하기
      </button>
    </div>
  );
};

export default Signup;
