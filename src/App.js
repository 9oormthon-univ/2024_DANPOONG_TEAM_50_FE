import { useEffect, React } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Main from "./pages/Main/Main";
import Main2 from "./pages/Main/Main2";
import NavBar from "./components/Nav/Navbar";
import Search from "./pages/Search/Search";
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signup/Signup";
import Signupadult from "./pages/Signup/SignUpAdult";
import Signupchild from "./pages/Signup/SignUpChild";
import SearchPart from "./pages/Search/SearchPart";
import Map from "./pages/Map/Map";
import Order from "./pages/Order/Order";
import OrderPay from "./pages/Order/OrderPay";
import OrderMenu from "./pages/Order/OrderMenu";
import OrderFinish from "./pages/Order/OrderFinish";
import Donate from "./pages/Donate/Donate";
import QrScan from "./pages/shop/QrScan";
import Thanks from "./pages/Thanks/Thanks";
import DonateFinish from "./pages/Donate/DonateFinish";
import ShopFinish from "./pages/shop/ShopFinish";
import ThanksFinish from "./pages/Thanks/ThanksFinish";
import DonateList from "./pages/Donate/DonateList";
import Mypage from "./pages/Mypage/Mypage";
import DonateDetail from "./pages/Donate/DonateDetail";
import Redirection from "./pages/Signin/Redirection";
import { useNavigate } from "react-router-dom";
import Heart from "./pages/Heart/Heart";
import DonateCharge from "./pages/Mypage/DonateCharge";
import RedirectCharge from "./pages/Mypage/RedirectCharge";
import DonateChargeFinish from "./pages/Mypage/DonateChargeFinish";

const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentUrl = new URL(window.location.href);

    // 도메인 확인: 루트 경로인지 && 쿼리에 `code`가 포함되어 있는지
    if (
      currentUrl.hostname === "mymoo.site" && // 메인 도메인 확인
      currentUrl.pathname === "/" && // 루트 경로 확인
      currentUrl.searchParams.has("code") // `code` 쿼리 파라미터 확인
    ) {
      const code = currentUrl.searchParams.get("code"); // code 파라미터 값 가져오기
      navigate("/intro", { state: { code } });
    }
    // 카카오페이 토큰 저장
    if (
      currentUrl.hostname === "mymoo.site" && // 메인 도메인 확인
      currentUrl.pathname === "/" && // 루트 경로 확인
      currentUrl.searchParams.has("pg_token") // `code` 쿼리 파라미터 확인
    ) {
      const pgToken = currentUrl.searchParams.get("pg_token"); // code 파라미터 값 가져오기
      navigate("/my/charge/redirect", { state: { pgToken } });
    }
  }, [navigate]);

  return (
    <div className="common-layout">
      <div className="app-main">
        <Routes>
          <Route path="/Main" element={<Main />} />
          <Route path="/Main2" element={<Main2 />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/Searchpart" element={<SearchPart />} />
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signupchild" element={<Signupchild />} />
          <Route path="/signupadult" element={<Signupadult />} />
          <Route path="/Map" element={<Map />} />
          <Route path="/order/:place" element={<OrderMenu />} />
          <Route path="/order/" element={<Order />} />
          <Route path="/orderpay" element={<OrderPay />} />
          <Route path="/finish" element={<OrderFinish />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/shop" element={<QrScan />} />
          <Route path="/donate/finish" element={<DonateFinish />} />
          <Route path="/shop/finish" element={<ShopFinish />} />
          <Route path="/thanks" element={<Thanks />} />
          <Route path="/thanks/finish" element={<ThanksFinish />} />
          <Route path="/my" element={<Mypage />} />
          <Route path="/my/donatelist" element={<DonateList />} />
          <Route path="/my/donatedetail" element={<DonateDetail />} />
          <Route path="/intro" element={<Redirection />} />
          <Route path="/heart" element={<Heart />} />
          <Route path="/my/charge" element={<DonateCharge />} />
          <Route path="/my/charge/redirect" element={<RedirectCharge />} />
          <Route path="/my/charge/finish" element={<DonateChargeFinish />} />
        </Routes>
        {location.pathname !== "/" && <NavBar />}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
