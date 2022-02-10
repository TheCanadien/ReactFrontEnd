import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../User.scss';

const GetUserInfo = ()=>{

    
     const atoken = JSON.parse(localStorage.getItem('token'));
     const [userData, setUserData] = useState({});
     //console.log(atoken);

     useEffect(()=>{
    getStuff(); 

     },[]);

       const getStuff =() =>{
       axios.get('http://18.213.166.93:3000/user', { headers:{
        "content-type": "application/json",
        "Authorization" : atoken
      }} )
        .then(res => {
         console.log(res);
        setUserData(res.data);

       })
       .catch(error => {
           console.log(error.response);
       })
    
    };
    const d = new Date(userData.birthday);

    return (
        <div name="auser" className="user">
       <div>Username: {userData.username}</div>
       <div>Profile Public: {JSON.stringify(userData.public)}</div>
       <div>Height: {userData.height} inches</div>
       <div>Weight: {userData.weight} lbs </div>
       <div>Birthdate: {d.toDateString().substring(3)}</div>
        </div>
    )
}

export default GetUserInfo;