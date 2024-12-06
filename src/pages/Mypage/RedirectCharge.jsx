import { useEffect } from "react";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
const RedirectCharge = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pgToken = location.state?.pgToken;
  const tid = localStorage.getItem("tid");
  console.log(pgToken, tid);

  useEffect(() => {
    if (pgToken && tid) {
      console.log(pgToken, tid);
      approveCharge();
    }
  }, [pgToken, tid]);

  const approveCharge = async () => {
    console.log("일단 들어옴");
    try {
      const response = await fetch(
        `https://api.mymoo.site/api/v1/payment/approve?pgToken=${pgToken}&tid=${tid}`,
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
