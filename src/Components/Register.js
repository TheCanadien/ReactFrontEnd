import React, {useState} from 'react';
import '../Home.scss';
import axios from 'axios';

const Register = ({isVisible, setVisible,  userName, setUserName}) =>{

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);

//Register new User
const submitHandler = (e) =>{
e.preventDefault();

setError(null);

const userLogin = {
"name": name,
"password": password,
"email":  email,
};

    axios.post('https://www.mealstracker.com:3000/api/user/register', JSON.stringify(userLogin), { headers:{
      "content-type": "application/json",
    }})
     .then(res => {
      setVisible(!isVisible);
    })
    .catch(error => {
      let message = error;
      if(!message.response){
       setError('Error: Connection refused');
      }  
      else{
      if(message.response.status === 400){
      setError(message.response.data.replaceAll('"', ''));
      }
      else{
        setError(message.response.status + " " + message.response.statusText);
      }
    }
  })

setPassword('');
setEmail('');
setName('');
       }

   const userHandler = (e)=>{
   setName(e.target.value);
      }
      
  const passHandler = (e)=>{
  setPassword(e.target.value);
      }
         
  const emailHandler = (e)=>{
  setEmail(e.target.value);
      } 

      const makeInvisible= (e) =>{
        setVisible(!isVisible);
        e.preventDefault();
    }

    const closeWarningHandler =(e)=>{
      e.preventDefault();
      setError(null);
    }

   return(
        <div>



      {!error?
      <div className="register">
     <form className= {isVisible ? 'makeVisibile' : 'makeInvisible'} id="registerForm">

    <label className="usernameLabel"> UserName :</label>
        <div><input value={name} onChange={userHandler}  type="text" name="username2" /></div>  
         <label className="emailLabel">Email :</label>
         <div> <input value={email} onChange={emailHandler}type="email" name="email" /></div>
         <label className="passwordLabel"> Password:</label>
         <div><input value={password} onChange={passHandler} type="password" name="password2"/></div> 
        <input className="regsubButton" onClick={submitHandler} type="submit" value="Register" />
      <div>  <button className={isVisible ? "closeButton" : 'makeInvisible'} onClick={makeInvisible}>X</button></div>
   </form>
  </div> :<div className="warning"> <div className="warningPrompt">  {error}<div><button name='okbutton' onClick={closeWarningHandler}>Ok</button>
      </div>
      </div></div>}
   </div>
    )
}

export default Register;
