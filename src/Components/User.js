import React, {useState, useEffect} from 'react';
import UserInfo from './UserInfo';
import Meals from './Meals';
import '../User.scss';




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
const [updateGraph, setUpdateGraph] = useState(false);

//////////////////////////////////////////////////////////////////////////////


    return (
        <div className="userpage">

       <div>   
       <UserInfo userData={userData} setUserData={setUserData} date={date} setDate={setDate}
         updateGraph= {updateGraph}
       />
      </div>
     


       <div>
        <Meals userData={userData} setUserData={setUserData}  date={date} setDate={setDate} 
          updateGraph={updateGraph} setUpdateGraph={setUpdateGraph}
        />
        </div>
        </div>
    )
}

export default User;