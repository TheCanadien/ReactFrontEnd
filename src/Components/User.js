import React, {useState} from 'react';
import UserInfo from './UserInfo';
import Meals from './Meals';
import '../User.scss';
import SearchFoods from './SearchFoods';
//import UpdateMeals from './UpdateMeals';

const User = () =>{

  
///////////////////////////////////////////////////////////////////////
const createDateString = () =>{
    const today = new Date(Date.now());
    let num = today.getMonth() + 1;
    let month = num.toString();
    let adate = today.getDate().toString();
    const year = today.getFullYear().toString();
    if(adate.length === 1){
        adate = "0" + adate;
    }
    if(month.length ===1){
        month = "0" + month;
    }
    return year + "-" + month + "-" + adate;
};
///////////////////////////////////////////////
const [userData, setUserData] = useState({});
const todaysdate = createDateString();
const [date, setDate] = useState(todaysdate);
//////////////////////////////////////////////////////////////////////////////

    return (
        <div className="userpage">
       <UserInfo userData={userData} setUserData={setUserData}/>
        <Meals  userData={userData} setUserData={setUserData}  date={date} setDate={setDate}/>
        <div><SearchFoods/></div>
        </div>
    )
}

export default User;