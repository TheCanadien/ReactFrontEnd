import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home'
import User from './Components/User'
import React, {useState} from 'react';
import axios from 'axios';

function App() {

  const [isVisible, setVisible] = useState(false);
  const [userName, setUserName] =useState('');


  /*
  axios.interceptors.response.use((response)=>{
   if(response.data.accesstoken !== undefined){
    localStorage.setItem('token', JSON.stringify(response.data.accesstoken)); 
   } 
  return response;
  },

  (error)=>{

  
  })

*/
/*
const verifyToken = () =>{
  //if(atoken === undefined && atoken === null){
   // navigate('/');
  //}

  axios.get(`http://www.mealstracker.com:3000/user/${userData.username}`,{ headers:{    
   "content-type": "application/json",
   "Authorization" : atoken,
 }, withCredentials: true} )
   .then(res => {
    if(res.data.accesstoken !== undefined || res.data.accesstoken === null){
     console.log("old token " + atoken);
     localStorage.setItem('token', JSON.stringify(res.data.accesstoken));     
     //localStorage.setItem('token', JSON.stringify(res.data.accesstoken));
     console.log('setting new token ' + localStorage.getItem('token'));
   //  setToken(res.data.accesstoken);     
    }
})
.catch(error=>{
//  navigate('/')
console.log(error);
})


};
*/


axios.interceptors.response.use((response)=>{
 return response;
 },

 (error)=>{
 let message = error;
 console.log('this is error ' + message);
 
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
