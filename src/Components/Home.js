import axios from 'axios';
import React, {useEffect} from 'react';
import Login from './Login';
import Register from './Register';
import {useNavigate} from 'react-router-dom';



const Home = ({isVisible, setVisible, userName, setUserName}) =>{

   //  const[logged, setLogged] = useState(false);
     let navigate = useNavigate();
     
 useEffect(()=>{

   signedIn();



 },[])

 const atoken = JSON.parse(localStorage.getItem('token'));
 const signedIn =()=>{
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
    .catch(err=>{
    // setLogged(false);
    })
 


 }










  

    return(
        <div className="homediv">
     <header className='Logo'>MealsTracker</header>
     <Login className="logclass" isVisible={isVisible} setVisible={setVisible}
      userName = {userName} setUserName={setUserName}/>
      <Register className= "regclass" isVisible={isVisible} setVisible={setVisible}
       userName = {userName} setUserName={setUserName} />
        </div>
    )
}

export default Home;