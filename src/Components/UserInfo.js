import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../User.scss';
//import Graph from './Graph';
import {useNavigate} from 'react-router-dom';


const UserInfo =({userData, setUserData})=>{

    const atoken = JSON.parse(localStorage.getItem('token'));
    let navigate = useNavigate();

  const [userData1, setUserData1] = useState({});

 
     useEffect(()=>{
      getStuff(); 
  
       },[]);
  
         const getStuff = async () =>{
         await axios.get('http://18.213.166.93:3000/user', { headers:{
          "content-type": "application/json",
          "Authorization" : atoken
        }} )
          .then(res => {
         //  console.log(res);
          setUserData(res.data);
  
         })
         .catch(error => {
             console.log(error.response);
             if(error.response.data === 'Access Denied'){
              navigate('/');
             }
         })
      
      };
      const d = new Date(userData.birthday);

    const [weight, setWeight] = useState(null);
    const [birthdate, setBirthdate] = useState(null);
    const [height, setHeight] = useState(null);
    const [priv, setPriv] = useState(true);
    const [edit, setEdit] = useState(false);

    const submitHandler = (e)=>{
      e.preventDefault();

       if(weight !== null){
         userData1['weight'] = weight;
       }
       if(birthdate !== null){
         userData1['birthday'] = birthdate;
       }
       if(height !== null){
       userData1['height'] = height;
       }
       userData1['public'] = priv;
      
       console.log(userData1);

        axios.patch('http://18.213.166.93:3000/user', userData1, { headers:{
        "content-type": "application/json",
        "Authorization" : atoken
      }} )
        .then(res => {
         console.log(res);
        setUserData1(res.data);

       })
       .catch(error => {
           console.log(error.response);
       })
        setEdit(false);
         getStuff();

     }
////////////////////////////////////////////////////////
const birthdateHandler = (e)=>{
    console.log(birthdate);
    setBirthdate(e.target.value);
  } 
  const bodyweightHandler = (e)=>{
    console.log(e.target.value);
    setWeight(e.target.value);
  } 
  const heightHandler = (e)=>{
    console.log(e.target.value);
    setHeight(e.target.value);
  } 
  const privHandler = (e)=>{
    console.log(e.target.value);
    setPriv(!priv);
  } 

const editForm = ()=>{
  setEdit(!edit);
}



return(
<div className="editText">
  <div>
  {/*<Graph userData={userData}/>*/}
  </div>
<div name="auser" className="user">
       <div>Username: {userData.username}</div>
       <div>Profile Public: {JSON.stringify(userData.public)}</div>
       <div>Height: {userData.height} inches</div>
       <div>Weight: {userData.weight} lbs </div>
       <div>Birthdate: {d.toDateString().substring(3)}</div>
       <div>BMI: {((userData.weight/userData.height**2)*703).toFixed(2)}</div> 
        </div>

  <div className= "editdiv">
<button name="editbutton" onClick= {editForm}>Edit </button>
</div>
<form className = {edit? "editVisible" : "invisible"} >
    <label> Birthdate:
   </label>   
    <input className="birthdateinput" type='date' onChange={birthdateHandler} disabled= {edit? "" : "disabled"}>
    </input>

    <label> Bodyweight:
   </label>   
    <input className="weightinput" onChange={bodyweightHandler} type='number'  step="0.5" disabled= {edit? "" : "disabled"}>
    </input>
    <label>
        Height:
   </label>   
    <input className="heightinput" onChange={heightHandler}type='number' step='0.5' disabled= {edit? "" : "disabled"}>
    </input>
<div className = "checkdiv">
<label name="profile">
 Public profile:
   </label>   
    <input onChange={privHandler} type='checkbox' defaultChecked  disabled= {edit? "" : "disabled"}>
    </input>
    </div>
     <div className="infodiv">
    <input className="infosub" onClick={submitHandler} type="submit" value="Submit"  disabled= {edit? "" : "disabled"} />
    </div>
   </form>
   </div>
)
}

export default UserInfo;