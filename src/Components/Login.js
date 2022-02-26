import React, {useState} from 'react';
import '../Home.scss';
//import { HashLink } from 'react-router-hash-link';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Login = ({isVisible, setVisible, userName, setUserName}) =>{

 const [password, setPassword] = useState('');
 const [name, setName] = useState('');
 let navigate = useNavigate();



  const submitHandler = (e) =>{
  e.preventDefault();
  console.log(userName);

  ///////////////////////////////////////////////////////


    const userLogin = {
     "name" : name,
     "password" : password,
     };
     
   // console.log(userLogin);
       axios.post('http://52.4.202.130:3000/api/user/login', JSON.stringify(userLogin),{ headers:{
         "content-type": "application/json",
       }}

       )
         .then(res => {
           console.log('This is header');
          console.log(res.headers);
          console.log('This is the body');
          console.log(res);
          localStorage.setItem('token', JSON.stringify(res.data.accesstoken));
          setUserName(name);
          setPassword('');
          setName(''); 
       
          navigate(`/account/${name}`);

          
        })
        .catch(error => {
            console.log(error.response);
        })

    
  }


  const makeVisible= (e) =>{
    setVisible(!isVisible);

    e.preventDefault();
}

const userHandler = (e)=>{

  setName(e.target.value);
  console.log(e.target.value);
}

const passHandler = (e)=>{
  console.log(e.target.value);
  setPassword(e.target.value);
}



    return(
        <div>
        <form className= {isVisible ? 'makeOpaque' : ''} name="logform">  
      <label className="logUserLabel">UserName :</label>
       <div> <input value={name} onChange={userHandler} type="text" name="uname"  disabled=   {isVisible ? "disabled" : ''}                 
       
       /></div>
       <label className="logPassLabel">Password :</label>
       <div> <input value={password} onChange={passHandler}type="password" name="pword" disabled=   {isVisible ? "disabled" : ''}
       /></div> 
        <div>
        <input className="logbutton" onClick={submitHandler}  type="submit" value="Log in" disabled=   {isVisible ? "disabled" : ''}
        />
        </div>
        <button className={isVisible ? "invisiblebutton" : 'registerbutton'} onClick={makeVisible}
        disabled=   {isVisible ? "disabled" : ''}>Register</button> 
      </form>
      </div>
    )
}

export default Login;