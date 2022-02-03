import React from 'react';
import './App.scss';

const Form = ({setInputText}) =>{



   const inputHandler =(e)=>{
       console.log(e.target.value);
       setInputText(e.target.value);
   };

   const submitHandler= (e) =>{
    e.preventDefault();
   }





    return(
        <form onSubmit= {submitHandler}>
        <label>
          <input onChange= {inputHandler} type="text" className="inputbox"/>
        </label>
        <input type="submit" value="Search" className="submitButton"/>
      </form>
    );
}

export default Form;