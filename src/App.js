import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './pages/Main/Main'
import Main2 from './pages/Main/Main2'
import NavBar from './components/Nav/Navbar';
import Search from './pages/Search/Search';
import SearchPart from './pages/Search/SearchPart';
import Map from './pages/Map/Map';

const App = () => {
  return (
      <BrowserRouter>
          <div className="app-container">
              <Routes>
                  <Route path='/' element={<Main />} />
                  <Route path='/donation' element={<Main2 />} />
                  <Route path='/Search' element={<Search />} />
                  <Route path='/Searchpart' element={<SearchPart />} />
                  <Route path='/Map' element={<Map />} />
              </Routes>
              <NavBar />
          </div>
      </BrowserRouter>
  );
};

export default App;