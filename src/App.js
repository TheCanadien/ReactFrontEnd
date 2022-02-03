import './App.css';
import './App.scss';
import Nav from './Nav';
import FormFormat from './FormFormat';
import React, {useState} from 'react';

function App() {

  
  const [isSearch, setSearch] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const [isRegister, setRegister] = useState(false);


  return (
    <div className="App">
      <Nav setSearch= {setSearch} setLogin={setLogin} setRegister={setRegister}
       isLogin = {isLogin} isSearch = {isSearch} isRegister = {isRegister}
      />
      <FormFormat setSearch = {setSearch} setLogin={setLogin} setRegister={setRegister}
       isLogin = {isLogin} isSearch = {isSearch} isRegister = {isRegister} />
    </div>
  );
}

export default App;
