import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './component.tsx/navigation/login';
import Main from './component.tsx/navigation/main';
import Liste from './component.tsx/liste';
import View from './component.tsx/view';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Liste />} />
          <Route path="/view/:id" element={<View />} />
        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App;
