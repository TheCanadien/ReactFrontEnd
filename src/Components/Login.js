import React, {useState} from 'react';
import '../Home.scss';
import { HashLink } from 'react-router-hash-link';
import axios from 'axios';

const Login = ({isVisible, setVisible, userName, setUserName}) =>{

 const [password, setPassword] = useState('');
 const [name, setName] = useState('');




  const submitHandler = (e) =>{
  e.preventDefault();
  console.log(userName);

  ///////////////////////////////////////////////////////


    const userLogin = {
     "name" : name,
     "password" : password,
     };
     
     console.log(userLogin);
       axios.post('http://18.213.166.93:3000/api/user/login', JSON.stringify(userLogin),{ headers:{
         "content-type": "application/json",
       }}

       )
         .then(res => {
           console.log('This is header');
          console.log(res.headers);
          console.log('This is the body');
          console.log(res);
          localStorage.setItem('token', JSON.stringify(res.data.accesstoken));
        })
        .catch(error => {
            console.log(error.response);
        })
      // localStorage.setItem('butter', 'toast'); 
    setUserName(name);
    setPassword('');
    setName(''); 
    
    
    ///////////////////////////////////////////////////////////////
    
    
    
  
  }
  const makeVisible= (e) =>{
    setVisible(!isVisible);
    console.log('shit');
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
      <label>UserName :</label>
       <div> <input value={name} onChange={userHandler} type="text" name="uname"  disabled=   {isVisible ? "disabled" : ''}                 
       
       /></div>
       <label>Password :</label>
       <div> <input value={password} onChange={passHandler}type="password" name="pword" disabled=   {isVisible ? "disabled" : ''}
       /></div> 
        <div>
        <input className="subButton" onClick={submitHandler}  type="submit" value="Log in" disabled=   {isVisible ? "disabled" : ''}
        />
        </div>
        <button className={isVisible ? "invisiblebutton" : 'registerbutton'} onClick={makeVisible}
        disabled=   {isVisible ? "disabled" : ''}>Register</button> 
      </form>
      </div>
    )
}

export default Login;