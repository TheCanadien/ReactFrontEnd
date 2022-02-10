import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home'
import User from './Components/User'
import React, {useState} from 'react';

function App() {

  const [isVisible, setVisible] = useState(false);
  const [userName, setUserName] =useState('');

  return (

    <div className="App">
   <Router>
   <Routes>
   <Route index element={<Home isVisible={isVisible} setVisible={setVisible}
    userName = {userName} setUserName={setUserName}/>} />
   <Route path="user/:id" element={<User/>} />
   </Routes>
   </Router>
   
    </div>
    
  );
}

export default App;
