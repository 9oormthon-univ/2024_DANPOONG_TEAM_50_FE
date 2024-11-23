import { React, useEffect } from "react";

export default function Redirection() {
  const logincode = new URL(window.location.href).searchParams.get("code");
  useEffect(() => {
    if (logincode) {
      sendLoginRequest();
      console.log("ss");
    }
  }, []);

  const sendLoginRequest = async () => {
    try {
      const response = await fetch(
        `https://api.mymoo.site/api/v1/oauth/kakao/callback?code=${logincode}`,
        {
          method: "POST",
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

        // setLoginSuccess(true);
        // setIsNewMember(data.isNewMember);

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
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
