import React from "react";
import './App.module.css';
import { Route, Routes } from 'react-router-dom'
import Join from "./components/Join/Join"
import Chat from "./components/Chat/Chat"
const App=()=> {
  return (
    <div className={App}>
      <Routes>
        <Route path="/" element={<Join/>}/>
        <Route path="/chat" element={<Chat/>}/>
        </Routes>
    </div>
  
  );
}

export default App;