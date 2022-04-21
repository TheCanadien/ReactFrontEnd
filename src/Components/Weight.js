import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Weight = () =>{


    const submitWeightHandler = (e)=>{
        e.preventDefault();
      
        if(mealsexist){
        const addWeight = {"weight" : weight}
        console.log(addWeight);
        setWeightPrompt(false);
      
        
        axios.patch(`https://www.mealstracker.com:3000/user/${dateChanged}/${userData.username}`, addWeight, { headers:{
          "content-type": "application/json",
          "Authorization" : atoken,
        }, withCredentials: true} )
          .then(res => {
          console.log(res);
          setDailyWeight(weight);
          setWeight(0);
      ///////////////////////////////////
      setUpdateGraph(!updateGraph);
      ////////////////////////////////////////
         })
         .catch(error => {
             console.log(error.response);
         })
        }
        else{
           setWeightPrompt(true);
        }
      
      }


















    return<div>
     {!weightprompt?   <div name="bodyweightdiv">
          <label name="currentweight">
          Daily Bodyweight in lbs: {dailyWeight}
            </label> 
         <input type="number" value={weight} className="weight" onChange={inputWeightHandler} min="0" step="0.5"></input>   
         <button className= "weightsbutton" onClick={submitWeightHandler}>Submit</button>
         </div>
        :<div className="weightprompt">Must submit a meal before weight can be saved
        <div onClick={weightPromptHandler}><button>X</button></div>
        </div>}


    </div>
}

export default Weight;
