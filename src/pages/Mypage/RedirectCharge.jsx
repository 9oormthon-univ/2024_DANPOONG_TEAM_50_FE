import { useEffect, useState } from "react";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
const RedirectCharge = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pgToken = location.state?.pgToken;
  const [token, setToken] = useState(0);
  const tid = localStorage.getItem("tid");
  console.log(pgToken, tid);

  useEffect(() => {
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
    }
    if (pgToken && tid) {
      console.log(pgToken, tid);
      approveCharge();
    }
  }, [pgToken, tid, token]);

  const approveCharge = async () => {
    console.log("일단 들어옴");
    try {
      const response = await fetch(
        `https://api.mymoo.site/api/v1/payment/approve?pg_Token=${pgToken}&tid=${tid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Received data:", data);
      }
    } catch (error) {
      console.error("Login request error:", error);
    }
  };
  return (
    <div>
      <div>결제 중..</div>
    </div>
  );
};
export default RedirectCharge;
