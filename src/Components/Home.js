import React from 'react';
import Login from './Login';
import Register from './Register';

const Home = ({isVisible, setVisible, userName, setUserName}) =>{

  

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