import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './pages/Main/Main'
import NavBar from './components/Nav/Navbar';
import Search from './pages/Search/Search';
import SearchPart from './pages/Search/SearchPart';

const App = () => {
  return (
      <BrowserRouter>
          <div className="app-container">
              <Routes>
                  <Route path='/' element={<Main />} />
                  <Route path='/Search' element={<Search />} />
                  <Route path='/Searchpart' element={<SearchPart />} />
              </Routes>
              <NavBar />
          </div>
      </BrowserRouter>
  );
};

export default App;