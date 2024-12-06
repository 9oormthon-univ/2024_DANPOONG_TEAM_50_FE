import React, { useEffect, useState } from "react";
import { userTokenState, userState } from "../../stores/user.jsx";
import { useRecoilState, useRecoilValue, RecoilRoot } from "recoil";
import { getUserInfoAPI } from "../../apis/user.jsx";
import { useNavigate } from "react-router-dom";
import adultProfile from "../../assets/img/Mypage/adultprofile.png";
import alarmImg from "../../assets/img/Mypage/alarm.png";
import balanceImg from "../../assets/img/Mypage/balance.png";
import cardImg from "../../assets/img/Mypage/card.png";
import childProfile from "../../assets/img/Mypage/childprofile.png";
import couponImg from "../../assets/img/Mypage/coupon.png";
import donateImg from "../../assets/img/Mypage/donate.png";
import noticeImg from "../../assets/img/Mypage/notice.png";
import phoneImg from "../../assets/img/Mypage/phone.png";
import pointImg from "../../assets/img/Mypage/point.png";
import policyImg from "../../assets/img/Mypage/policy.png";
import questionImg from "../../assets/img/Mypage/question.png";
import reviewImg from "../../assets/img/Mypage/review.png";
import reviewcolorImg from "../../assets/img/Mypage/reviewcolor.png";
import searchImg from "../../assets/img/Mypage/search.png";
import goImg from "../../assets/img/Mypage/go.png";
import settingImg from "../../assets/img/Mypage/setting.png";
import balance2Img from "../../assets/img/Mypage/balance2.png";
import point2Img from "../../assets/img/Mypage/point2.png";
import coupon2Img from "../../assets/img/Mypage/coupon2.png";
import chargeImg from "../../assets/img/Mypage/charge.png";

const MyPage = () => {
  const [token, setToken] = useRecoilState(userTokenState);
  console.log("JWT 토큰:", token); // Recoil 상태에서 가져온 JWT 토큰 출력
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState); // 사용자 정보 상태 관리

  const goDonateList = () => {
    navigate("/my/donatelist");
  };
  // 사용자 정보를 가져오는 함수
  const fetchUserInfo = async () => {
    try {
      const responseData = await getUserInfoAPI(); // 사용자 정보 API 호출
      setUser({
        accountId: responseData.accountId,
        email: responseData.email,
        phone_number: responseData.phone_number,
        nickname: responseData.nickname,
        point: responseData.point,
        profileImageUrl: responseData.profileImageUrl,
        userRole: responseData.role,
      });
    } catch (error) {
      console.error("사용자 정보를 가져오는 중 오류 발생:", error);
    }
  };
  const goOut = () => {
    navigate("/");
  };
  // 컴포넌트가 마운트될 때 사용자 정보 가져오기
  useEffect(() => {
    // Recoil 상태에 토큰이 없는 경우 로컬 스토리지에서 가져옴
    if (!token) {
      const storedData = localStorage.getItem("mymoo");
      if (storedData) {
        const { "user-token": storedToken } = JSON.parse(storedData);
        if (storedToken) {
          setToken(storedToken); // Recoil 상태에 토큰 저장
        } else {
          console.error("로컬 스토리지에 JWT 토큰이 없습니다.");
        }
      } else {
        console.error("로컬 스토리지에 데이터가 없습니다.");
      }
    } else {
      // 토큰이 존재하면 사용자 정보 가져오기
      fetchUserInfo();
    }
  }, [token, setToken]);

  return (
    <div>
      <div className="mypage-page">
        <header className="mypage-header">
          <h1>My</h1>
          <div className="header-icons">
            <img className="searchImg" src={searchImg} alt="검색" />
            <img className="alarmImg" src={alarmImg} alt="알림" />
          </div>
        </header>

        <section className="profile-section">
          <img
            src={user.userRole === "CHILD" ? childProfile : adultProfile}
            alt="프로필"
            className="profile-image"
          />
          <div className="profile-info">
            <div className="profile-info2">
              <h2>
                {user.nickname}
                <span className="badge">
                  {user.userRole === "CHILD" ? "아동회원" : "일반회원"}
                </span>
              </h2>
            </div>
            <p>{user.email}</p>
          </div>
        </section>

        <section className="stats-section">
          {user.userRole === "CHILD" ? (
            <>
              <div className="stat">
                <p>잔액</p>
                <img src={balanceImg} alt="잔액" />
                <p>12,000원</p>
              </div>
              <div className="stat">
                <p>포인트</p>
                <img src={pointImg} alt="포인트" />
                <p>{user.point}p</p>
              </div>
              <div className="stat">
                <p>쿠폰</p>
                <img src={couponImg} alt="쿠폰" />
                <p>1장</p>
              </div>
            </>
          ) : (
            <>
              <div className="stat">
                <p>잔액</p>
                <img src={balance2Img} alt="잔액" />
                <p>12,000원</p>
              </div>
              <div className="stat">
                <p>포인트</p>
                <img src={point2Img} alt="포인트" />
                <p>{user.point}p</p>
              </div>
              <div className="stat">
                <p>쿠폰</p>
                <img src={coupon2Img} alt="쿠폰" />
                <p>1장</p>
              </div>
            </>
          )}
          {user.userRole === "CHILD" && (
            <div className="stat">
              <p>리뷰</p>
              <img src={reviewcolorImg} alt="리뷰" />
              <p>2개</p>
            </div>
          )}
        </section>

        <section className="menu-section">
          <h3>활동 관리</h3>
          <ul>
            {user.userRole === "CHILD" ? (
              <>
                <li>
                  <img src={donateImg} alt="후원 내역" />
                  <span>금액권 사용 내역</span>
                  <img className="donatego" src={goImg} alt="이동" />
                </li>
                <li>
                  <img src={reviewImg} alt="리뷰 관리" />
                  <span>리뷰 관리</span>
                  <img src={goImg} alt="이동" />
                </li>
                <li>
                  <img src={cardImg} alt="카드 관리" />
                  <span>아동 카드 관리</span>
                  <img src={goImg} alt="이동" />
                </li>
              </>
            ) : (
              <>
                <li onClick={goDonateList}>
                  <img src={donateImg} alt="후원 내역" />
                  <span>후원 내역</span>
                  <img className="donatego" src={goImg} alt="이동" />
                </li>
                <li onClick={() => navigate("/my/charge")}>
                  <img src={chargeImg} alt="충전하기" />
                  <span>충전하기</span>
                  <img src={goImg} alt="이동" />
                </li>
              </>
            )}
          </ul>
        </section>
      </div>
      <section className="menu-section menu-selection-2">
        <h3>문의 및 알림</h3>
        <ul>
          <li>
            <img src={noticeImg} alt="공지사항" />
            <span>공지사항</span>
            <img src={goImg} alt="이동" />
          </li>
          <li>
            <img src={questionImg} alt="자주 묻는 질문" />
            <span>자주 묻는 질문</span>
            <img src={goImg} alt="이동" />
          </li>
          <li>
            <img src={phoneImg} alt="고객센터" />
            <span>고객센터</span>
            <img src={goImg} alt="이동" />
          </li>
          <li>
            <img src={policyImg} alt="약관 및 정책" />
            <span>약관 및 정책</span>
            <img src={goImg} alt="이동" />
          </li>
          <li>
            <img src={settingImg} alt="환경 설정" />
            <span>환경 설정</span>
            <img src={goImg} alt="이동" />
          </li>
          <li
            onClick={goOut}
            style={{ textAlign: "center", marginLeft: "-0.5rem" }}
          >
            <span>로그아웃</span>
          </li>
        </ul>
      </section>
    </div>
  );
};

const MyPageWithRecoil = () => (
  <RecoilRoot>
    <MyPage />
  </RecoilRoot>
);

export default MyPageWithRecoil;
