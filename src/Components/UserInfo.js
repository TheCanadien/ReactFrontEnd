import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../User.scss';
import Graph from './Graph';
import {useNavigate} from 'react-router-dom';
//axios.defaults.withCredentials = true;

const UserInfo =({userData, setUserData, date, setDate, updateGraph})=>{

    const atoken = JSON.parse(localStorage.getItem('token'));
    let navigate = useNavigate();
    const [weight, setWeight] = useState(null);
    const [birthdate, setBirthdate] = useState(null);
    const [height, setHeight] = useState(null);
    const [priv, setPriv] = useState(true);
    const [edit, setEdit] = useState(false);
    const [bdayexists, setBdayExists] = useState(false); 
    const [heightexists, setHeightExists] = useState(false);
    const [weightexists, setWeightExists] = useState(false);
    const [error, setError] = useState(null);
    const [submitError, setSubmitError] = useState(null);

     useEffect(()=>{
      getStuff(); 
  
       },[]);


       const verifyToken = async () =>{
        if(atoken === undefined){
          navigate('/');
        }
       await axios.post(`http://www.mealstracker.com:3000/user/${userData.username}`,{ headers:{    
         "content-type": "application/json",
         "Authorization" : atoken,
       }, withCredentials: true} )
         .then(res => {
          if(res.data.accesstoken !== undefined){
           console.log(res.data.accesstoken);
           localStorage.setItem('token', JSON.stringify(res.data.accesstoken));
          }
     })
     .catch(error=>{
       navigate('/')
     })
     };




  
       //Get user info 
         const getStuff = async () =>{

         // verifyToken();


         await axios.get('http://www.mealstracker.com:3000/user', { headers:{
          "content-type": "application/json",
          "Authorization" : atoken,
        },withCredentials: true} )
          .then(res => {
          setUserData(res.data);
          if(res.data.birthday !== undefined){
              setBdayExists(true);   
           }
           else{
             setBdayExists(false);
           }
          if(res.data.height !== undefined){
            setHeightExists(true);
          }
          else{
            setHeightExists(false);
          }
          if(res.data.weight !== undefined){
            setWeightExists(true);
          }
          else{
            setWeightExists(false);
          }
         })
         .catch(error => {
             let message = error;
             if(!message.response)
             {
              setError('Error: Connection refused');
             }  
             else
             { 
             if(message.response !== undefined && message.response.data === 'Access Denied')
             {
              navigate('/');
             }
             else{
               setError(message.response.status + " " +  message.response.statusText);
             }
             }
         })
      
      };
     
    //Submit user profile data  
    const submitHandler = (e)=>{

      //verifyToken();

      e.preventDefault();
       let userData1 = {};

       if(weight !== null){
         userData1['weight'] = weight;
         setWeightExists(true);
       }
       if(birthdate !== null){
         userData1['birthday'] = birthdate;
         setBdayExists(true);
       }
       if(height !== null){
       userData1['height'] = height;
       setHeightExists(true);
       }
       userData1['public'] = priv;
        axios.patch('http://www.mealstracker.com:3000/user', userData1, { headers:{
        "content-type": "application/json",
        "Authorization" : atoken
      }} )
        .then(res => {
     //   setUserData1(res.data);
        setUserData(res.data);
       })
       .catch(error => {
        let message = error;
        if(!message.response)
        {
         setSubmitError('Error: Connection refused');
        }
        else{
          if(message.response !== undefined && message.response.data === 'Access Denied'){
            navigate('/');
           }
          else{    
         setSubmitError(message.response.status + " " + message.response.statusText);
          }
        }      
       })
        setEdit(false);
     }

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

const signoutHandler=(e)=>{
e.preventDefault();
localStorage.removeItem('token');
navigate('/');
}

const userInfoErrorHandler =(e)=>{
  e.preventDefault();
  setError(null);
  getStuff();
}

const editUserInfoErrorHandler =(e)=>{
  e.preventDefault();
  setSubmitError(null);
}

return(

<div className="editText">

  <div>
  {<Graph userData={userData} date={date} updateGraph={updateGraph}/>}
  </div>

{!submitError?
<div>
{!error?
<div className="infoDiv">
<div name="auser" className="user">
       <div>Username: {userData.username}</div>
       <div>Profile Public: {JSON.stringify(userData.public)}</div>
      {heightexists? <div>Height: {userData.height} inches</div>: <div>Height: </div>}
       {weightexists? <div>Weight: {userData.weight} lbs </div>: <div>Weight: </div>}
       
      {bdayexists? <div>Birthdate: {userData.birthday.substring(0,10)}</div> : <div>Birthdate: </div>}
       {heightexists && weightexists? <div>BMI: {((userData.weight/userData.height**2)*703).toFixed(2)}</div>:<div>BMI: </div>} 
        </div>
  <div className= "editdiv">
<button name="editbutton" onClick= {editForm}>Edit </button>
<button onClick={signoutHandler} className="signout">Sign out</button>
</div>
</div>:<div><div name="infoErrorDiv">{error}<div><button onClick={userInfoErrorHandler}name="okbutton">OK</button></div></div></div>}
</div>:<div><div name="submitError">{submitError}<div><button onClick={editUserInfoErrorHandler}name="okbutton">OK</button></div></div></div>}

<div>
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

   </div>
)
}

export default UserInfo;
