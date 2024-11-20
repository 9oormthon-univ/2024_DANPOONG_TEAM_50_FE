import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './pages/Main/Main'
import NavBar from './components/Nav/Navbar';

const App = () => {
  return (
      <BrowserRouter>
          <div className="app-container">
              <Routes>
                  <Route path='/' element={<Main />} />
              </Routes>
              <NavBar />
          </div>
      </BrowserRouter>
  );
};

export default App;