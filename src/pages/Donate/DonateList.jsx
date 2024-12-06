import { useEffect, useState, React } from "react";
import OrderNavbar from "../../components/Nav/OrderNavbar";
import DonatePrice from "../../components/Donate/DonatePrice";
import SortImg from "../../assets/img/Search/sort.png";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const DonateList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [donateList, setDonateList] = useState([]);
  const [token, setToken] = useState("");
  useEffect(() => {
    console.log("here");
    const storedData = localStorage.getItem("mymoo");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      console.log(parsedData);
      setToken(parsedData["user-token"]);
    }
  }, []);

  useEffect(() => {
    if (token) {
      console.log(token);
      const fetchStore = () => {
        fetch(`https://api.mymoo.site/api/v1/donations/accounts?limit=20000`, {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            console.log("Response status:", response.status);
            return response.json();
          })
          .then((data) => {
            console.log("Fetched data:", data);
            setDonateList(data.donations);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      };

      fetchStore();
    }
    // 가게 정보
  }, [token]);
  return (
    <div className="donatelist-page">
      <OrderNavbar text="후원내역" />
      <div className="donatelist-main">
        <div className="sort-img">
          <img src={SortImg} alt="img" className="img-width" />
        </div>
        {donateList.map((donate) => (
          <DonatePrice
            key={donate.donationId}
            id={donate.donationId}
            price={donate.point}
            donator={""}
            date={donate.donatedAt}
            place={donate.store}
            donateStatus={donate.isUsed}
          />
        ))}
      </div>
    </div>
  );
};
export default DonateList;
