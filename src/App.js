import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import LandingPage from "./pages/LandingPage";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/home" element={<HomePage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
