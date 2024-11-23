import { React, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Redirection() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const logincode = searchParams.get("code");
  useEffect(() => {
    if (logincode) {
      sendLoginRequest();
      console.log(logincode);
    }
  }, []);

  const sendLoginRequest = async () => {
    try {
      const response = await fetch(
        `https://api.mymoo.site/api/v1/oauth/kakao/callback?code=${logincode}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Received data:", data);

        const accessToken = data.accessToken;
        const refreshToken = data.refreshToken;
        const accountId = data.accoutId;
        const userRole = data.userRole;
        const isNewUser = data.isNewUser;
        // setLoginSuccess(true);
        // setIsNewMember(data.isNewMember);
        localStorage.setItem(
          "mymoo",
          JSON.stringify({
            "user-token": accessToken,
            "refresh-token": refreshToken,
            role: userRole,
            accountId: accountId,
          })
        );

        setTimeout(() => {
          if (isNewUser === true) {
            navigate("/");
          } else {
            if (userRole === "DONATOR") {
              navigate("/Main2");
            } else if (userRole === "CHILD") {
              navigate("/Main");
            } else if (userRole === "STORE") {
              navigate("/Shop");
            } else {
              alert("권한이 없는 사용자입니다.");
            }
          }
        });
      } else {
        console.error("Network response was not ok");
      }
    } catch (error) {
      console.error("Login request error:", error);
    }
  };
  return (
    <div>
      <div>로그인중</div>
    </div>
  );
}
