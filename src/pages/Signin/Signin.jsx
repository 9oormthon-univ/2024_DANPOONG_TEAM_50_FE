import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState, RecoilRoot} from 'recoil';
import logo from "../../assets/img/Signin/logo.png";
import VlineImg from "../../assets/img/Signin/VlineImg.png";
import WlineImg from "../../assets/img/Signin/WlineImg.png";
import NaverLogoImage from "../../assets/img/Signin/naver.png";
import KakaoLogoImage from "../../assets/img/Signin/kakao.png";
import GoogleLogoImage from "../../assets/img/Signin/google.png";
import FacebookLogoImage from "../../assets/img/Signin/facebook.png";
import { SigninAPI } from '../../apis/user.jsx';
import { userTokenState } from '../../stores/user.jsx';


const Signin = () => {
    const navigate = useNavigate();
    const [isEmail, setIsEmail] = useState(false);
    const [isPassword, setIsPassword] = useState(false);
    const setUserToken = useSetRecoilState(userTokenState);

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: '',
      });

    const handleChangeEmail = (e) => {
        const emailRegex =
      /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
        const emailCurrent = e.target.value;
      
        setLoginInfo({
          ...loginInfo,
          email: emailCurrent,
        });

        setIsEmail(emailRegex.test(emailCurrent));
    };

    const handleChangePassword = (e) => {
        const passwordCurrent = e.target.value;
    
        setLoginInfo({
          ...loginInfo,
          password: passwordCurrent,
        });
    
        setIsPassword(passwordCurrent.length >= 5);
    };

    //const redirect_uri = `${location.origin}/social-account`; //Redirect URI
    //const KAKAO_KEY = '77ddf1baeb87f4a9752ed437db43cd96'; //kakao REST API KEY
    //const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_KEY}&redirect_uri=${redirect_uri}&response_type=code`;

    //const handleKakaoLogin = () => {
        //window.location.href = kakaoURL;
    //};

    const handleStartBtnClick = async () => {
      console.log("로그인 버튼 클릭");
      try {
          const res = await SigninAPI(loginInfo);
          console.log("서버 응답 데이터:", res.data); 
  
          if (res.data.accessToken) {
              console.log("로그인 성공:", res.data);
              setUserToken(res.data.accessToken);
  
              const { accessToken, refreshToken, userRole, accountId } = res.data;
              localStorage.setItem(
                  'mymoo',
                  JSON.stringify({
                      'user-token': accessToken,
                      'refresh-token': refreshToken,
                      role: userRole,
                      accountId: accountId,
                  })
              );

              if (userRole === 'DONATOR') {
                  navigate('/Main2'); 
              } else if (userRole === 'CHILD') {
                  navigate('/Main');
              } else if (userRole === 'STORE') {
                  navigate('/Shop');
              } else {
                  alert('권한이 없는 사용자입니다.');
              }
          } else {
              console.log("로그인 실패: 서버 응답에서 성공 상태를 찾을 수 없습니다.");
          }
      } catch (error) {
          if (error.response) {
              const { code } = error.response.data;
              console.log("에러 코드:", code);
              if (code === 'WRONG_PASSWORD') {
                  alert('비밀번호가 틀렸습니다.');
              } else if (code === 'NOT_FOUND_EMAIL') {
                  alert('존재하지 않는 이메일입니다.');
              }
          } else {
              console.error("로그인 실패:", error.message);
          }
      }
  };
  
      
      const handleSignupClick = () => {
        navigate('/signupadult'); // 회원가입 페이지로 이동
      };

    return (
        <div className={"signin-page"}>
            <div className={"LogoSection"}>
                <img className={"logo"} src={logo} alt=""/>
            </div>

            <div className={"SignInSection"}>
                <input
                        className={"IdInputBox"}
                        onChange={handleChangeEmail}
                        type="text"
                        placeholder="이메일"
                        name="email"
                        value={loginInfo.email}
                />

                <input
                        className={"PwInputBox"}
                        onChange={handleChangePassword}
                        type="password"
                        placeholder="비밀번호"
                        name="password"
                        value={loginInfo.password}
                />

                <button
                        disabled={!(isEmail && isPassword)}
                        className={"StartBtn"}
                        onClick={handleStartBtnClick}
                >
                로그인
                </button>
            </div>

            <div className={"TextTotalComponent"}>
                    <div className={"TextDiv"}>아이디 찾기</div>
                    <img className={"VlineImg"} src={VlineImg} alt="Vline"/>
                    <div className={"TextDiv"}>비밀번호 찾기</div>
                    <img className={"VlineImg"} src={VlineImg} alt="Vline"/>
                    <div className={"TextDiv"}>회원가입</div>
            </div>

            <div className={"LineTotalComponent"}>
                <img className={"WlineImg"} src={WlineImg} alt="Wline"/>
                <div className={"TextDivw"}>간편 로그인</div>
                <img className={"WlineImg"} src={WlineImg} alt="Wline"/>
            </div>

            <div className={"SocialButtonSection"}>
            <div className="naver-section" type="button">
                <img src={NaverLogoImage} alt="naver-logo" />
            </div>

            <div className="kakao-section" type="button" >
                <img src={KakaoLogoImage} alt="kakao-logo" id="kakao_id_login"/>
            </div>

            <div className="google-section" type="button">
                <img src={GoogleLogoImage} alt="google-logo" id="google_id_login"/>
            </div>

            <div className="facebook-section" type="button">
                <img src={FacebookLogoImage} alt="facebook-logo" id="facebook_id_login"/>
            </div>

            </div>

        </div>
        );
    };

    const SigninWithRecoil = () => (
        <RecoilRoot>
          <Signin />
        </RecoilRoot>
      );
      
      export default SigninWithRecoil;
