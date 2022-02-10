import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../User.scss';

const SetUserInfo =()=>{

    const atoken = JSON.parse(localStorage.getItem('token'));

  const [userData, setUserData] = useState({});
  const [userData1, setUserData1] = useState({});

  useEffect(()=>{
    getStuff(); 

     },[]);

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

<div name="auser" className="user">
       <div>Username: {userData.username}</div>
       <div>Profile Public: {JSON.stringify(userData.public)}</div>
       <div>Height: {userData.height} inches</div>
       <div>Weight: {userData.weight} lbs </div>
       <div>Birthdate: {d.toDateString().substring(3)}</div>
        </div>















  <div className= "editdiv">
<button onClick= {editForm}>Edit </button>
</div>
<form className = {edit? "editVisible" : "makeInvisible"} >
    <label> Birthdate:
   </label>   
    <input type='date' onChange={birthdateHandler}>
    </input>

    <label> Bodyweight:
   </label>   
    <input onChange={bodyweightHandler} type='number'  step="0.5">
    </input>
    <label>
        Height:
   </label>   
    <input onChange={heightHandler}type='number' step='0.5'>
    </input>
<div className = "checkdiv">
<label>
 Public profile:
   </label>   
    <input onChange={privHandler} type='checkbox' defaultChecked>
    </input>
    </div>
     <div className="infodiv">
    <input className="infosub" onClick={submitHandler} type="submit" value="Submit" />
    </div>
   </form>
   </div>
)
}

export default SetUserInfo;