import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Main from './pages/Main/Main';
import Main2 from './pages/Main/Main2';
import NavBar from './components/Nav/Navbar';
import Search from './pages/Search/Search';
import Signin from "./pages/Signin/Signin";
import SearchPart from './pages/Search/SearchPart';
import Map from './pages/Map/Map';
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

const AppContent = () => {
  const location = useLocation();

  return (
    <div className="common-layout">
      <div className="app-main">
        <Routes>
          <Route path='/Main' element={<Main />} />
          <Route path='/Main2' element={<Main2 />} />
          <Route path='/Search' element={<Search />} />
          <Route path='/Searchpart' element={<SearchPart />} />
          <Route path="/" element={<Signin />} />
          <Route path='/Map' element={<Map />} />
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
          <Route path="/api/v1/oauth/kakao/" element={<Redirection />} />
        </Routes>
        {location.pathname !== '/' && <NavBar />}
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
