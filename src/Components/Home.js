import axios from 'axios';
import React, {useEffect,useState} from 'react';
import Login from './Login';
import Register from './Register';
import {useNavigate} from 'react-router-dom';



const Home = ({isVisible, setVisible, userName, setUserName}) =>{

   //  const[logged, setLogged] = useState(false);
     let navigate = useNavigate();
    const [error, setError] = useState(null);

 useEffect(()=>{

   signedIn();



 },[])

 const atoken = JSON.parse(localStorage.getItem('token'));
 console.log(atoken);
 const signedIn =()=>{
if(atoken=== null){
  navigate('/');
}
else{
 axios.get('http://52.4.202.130:3000/entry/', { headers:{    
    "content-type": "application/json",
    "Authorization" : atoken
  }} )
    .then(res => {
    // setLogged(true);  
     console.log(res.data);
     const aName = res.data;
     setUserName(aName);
     navigate(`/account/${aName}`);
    })
    .catch(error=>{
            
    let message = error;
    if(!message.response){
      console.log('Error: Can not connect to network');
     setError('Error: Connection refused');
    }
    else{
     setError(message.response.status + " " + message.response.statusText);
    }  
      
      

 
    })
 


 }
 }


 const errorHandler=(e)=>{
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