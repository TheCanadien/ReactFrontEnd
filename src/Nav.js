import React from "react";
import './App.scss'
import Form from './Form'
import FormFormat from './FormFormat'



function Nav({setRegister,setLogin,setSearch, isLogin, isRegister, isSearch}){

  const handleSearch= () =>{
       setSearch(!isSearch);
       setLogin(false);
       setRegister(false);
       
       console.log('shit 1');
   
}

   const handleLogin = () =>{
    setLogin(!isLogin);
    setSearch(false);
    setRegister(false);
       console.log('shit 2');
   }


   const handleRegister= () =>{
    setRegister(!isRegister);
    setLogin(false);
    setSearch(false);
    console.log('shit 3');
}



    return(
        <nav className="Nav">
           <ul>
            <li><button onClick={handleSearch}>Search</button></li>
            <li><button onClick={handleLogin}> Login</button></li>
            <li><button onClick={handleRegister}>Reigster</button></li>
           </ul>
            
            </nav>
    );
}

export default Nav;