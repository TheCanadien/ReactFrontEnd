import React, {useState} from 'react';
import UserInfo from './UserInfo';
import Meals from './Meals';
import '../User.scss';

const User = () =>{

   const [meals, setMeals] = useState([]);
   const [userData, setUserData] = useState({});




    return (
        <div className="userpage">
        <UserInfo userData={userData} setUserData={setUserData}/>
        <Meals meals={meals} setMeals={setMeals} userData={userData} setUserData={setUserData}/>
        </div>
    )
}

export default User;