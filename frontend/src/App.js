import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import {baseUrl} from './config';
import {supabase} from './config';

import './App.css';

import ViewArticle from './components/Articles/ViewArticle';
import WriteArticle from './components/Articles/WriteArticle';

function App(){
  return (
    <Router>
      <Routes>

        {/*article themselves*/}
        <Route 
          path = "/article/:id" 
          element = {<ViewArticle/>}
        />

        <Route 
          path = "/write-article" 
          element = {<WriteArticle/>}
        />
      </Routes>
    </Router>
  )
}

export default App;