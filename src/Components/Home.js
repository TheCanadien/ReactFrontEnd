import axios from 'axios';
import React, {useEffect,useState} from 'react';
import Login from './Login';
import Register from './Register';
import {useNavigate} from 'react-router-dom';
//axios.defaults.withCredentials = true;
const Home = ({isVisible, setVisible, userName, setUserName}) =>{

    let navigate = useNavigate();
    const [error, setError] = useState(null);
    const atoken = JSON.parse(localStorage.getItem('token'));

 useEffect(()=>
 {
   signedIn();
 },[])

 //Route to home page if token does not exist
 const signedIn =()=>{
if(atoken=== null){
  navigate('/');
}
else{
//Verify user credentials from database before routing to personal user page
 axios.get('http://52.4.202.130:3000/entry/', { headers:{    
    "content-type": "application/json",
    "Authorization" : atoken
  }, withCredentials: true} )
    .then(res => { 
     console.log(res.data);
     const aName = res.data;
     setUserName(aName);
     navigate(`/account/${aName}`);
    })
    .catch(error=>{         
    let message = error;
    if(!message.response){
     setError('Error: Connection refused');
    }
    else{
     setError(message.response.status + " " + message.response.statusText);
    }  
    })
 }
 }


 const errorHandler=(e)=>
 {
  navigate('/');
  setError(null);
}

    return(
       <div>{!error?
        <div className="homediv">
     <header className='Logo'>MealsTracker</header>
     <Login className="logclass" isVisible={isVisible} setVisible={setVisible}
      userName = {userName} setUserName={setUserName}
      />
      <Register className= "regclass" isVisible={isVisible} setVisible={setVisible}
       userName = {userName} setUserName={setUserName}/>
        </div>
        :<div className="homeError"><div className="homeErrorMessage">{error}
        <div><button name='okbutton' onClick={errorHandler}>Ok</button></div></div></div>}
        </div>

    )
}

export default Home;
