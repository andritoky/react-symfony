import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './component.tsx/navigation/login';
import Main from './component.tsx/navigation/main';
import Liste from './component.tsx/liste';
import View from './component.tsx/view';
import Update from './component.tsx/update';
import Add from './component.tsx/add';
import Article from './component.tsx/article';
import ArticleView from './component.tsx/articleview';
import AddArticle from './component.tsx/addArticle';
import FormStep from './component.tsx/FORMULAIRE/formStep';

function App() {
  return (
    <div className="App" data-testid="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Article />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Liste />} />
          <Route path="/add" element={<Add />} />
          <Route path="/view/:id" element={<View />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/article" element={<Article />} />
          <Route path="/article/add" element={<AddArticle />} />
          <Route path="/article/view/:id" element={<ArticleView />} />
          <Route path="/formStep" element={<FormStep />} />
        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App;
