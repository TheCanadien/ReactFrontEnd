import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home'
import User from './Components/User'
import React, {useState} from 'react';
import axios from 'axios';

function App() {

  const [isVisible, setVisible] = useState(false);
  const [userName, setUserName] =useState('');


  axios.interceptors.response.use((response)=>{
   if(response.data.accesstoken !== undefined){
    localStorage.setItem('token', JSON.stringify(response.data.accesstoken)); 
   } 
  return response;
  },

  (error)=>{
  
  })















  return (

    <div className="App">
   <Router>
   <Routes>
   <Route index element={<Home isVisible={isVisible} setVisible={setVisible}
    userName = {userName} setUserName={setUserName}/>} />
   <Route path="account/:id" element={<User/>} />
   </Routes>
   </Router>
   
    </div>
    
  );
}

export default App;
