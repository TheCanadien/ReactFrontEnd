import React, {useState} from 'react';
import '../Home.scss';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
axios.defaults.withCredentials = true;






const Login = ({isVisible, setVisible, userName, setUserName}) =>{

 const [password, setPassword] = useState('');
 const [name, setName] = useState('');
 let navigate = useNavigate();
 const [error, setError] = useState(null);

 //Log user in
  const submitHandler = (e) =>{
  e.preventDefault();
    setError(null);
    const userLogin = {
     "name" : name,
     "password" : password,
     };
  
       axios.post('http://52.4.202.130:3000/api/user/login', JSON.stringify(userLogin),{ headers:{
         "content-type": "application/json",
         'withCredentials': true, 
       }}

       )
         .then(res => {
          localStorage.setItem('token', JSON.stringify(res.data.accesstoken));
          setUserName(name);
          setPassword('');
          setName(''); 
//          navigate(`/account/${name}`);
        })
        .catch(error => {
          let message = error;
          if(!message.response)
          {
           setError('Error: Connection refused');
          }  
          else
          {
          if(message.response.status === 400){
          setError(message.response.data.replaceAll('"', ''));
          }
          else{
            setError(message.response.status + " " + message.response.statusText);
          }
        }
        })
  }

console.log('test');
const closeWarningHandler =(e)=>{
  e.preventDefault();
  setError(null);
}

  const makeVisible= (e) =>{
    setVisible(!isVisible);
    e.preventDefault();
}

const userHandler = (e)=>{
  setName(e.target.value);
}

const passHandler = (e)=>{
  setPassword(e.target.value);
}

    return(
        <div>
          {!error?<div className="login"> 
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
      :<div className="warning"> <div className="warningPrompt">  {error}<div><button name='okbutton' onClick={closeWarningHandler}>Ok</button>
      </div>
      </div></div>}
      </div>
    )
}

export default Login;
