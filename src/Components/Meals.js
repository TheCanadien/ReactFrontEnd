import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../Meals.scss'
import SearchFoods from './SearchFoods';
import {useNavigate} from 'react-router-dom';

const Meals = ({userData, setUserData, date, setDate, updateGraph, setUpdateGraph})=>
{
  let navigate = useNavigate();
    const [atoken, setAToken] = useState(JSON.parse(localStorage.getItem('token')));  
//JSON.parse(localStorage.getItem('token'));
    const [fooditem, setFoodItem] = useState([]);
    const [mealsexist, setMealsExist] = useState(false);
    const [dateChanged, setDateChanged] = useState(date);
   const [dailyWeight, setDailyWeight] = useState(0);
   const [totalCalories, setTotalCalories] = useState(0);
   const [emptyedit, setEmptyEdit] = useState(false);
   const [maxdate, setMaxDate] = useState(date);
   const [error, setError] = useState(null);
   const [mealserrors, setMealsErrors] = useState(null);
  //const [dateselected, setDateSelected] = useState(date);




   //Default get meal data for current date
    useEffect(()=>
    {
     if(userData.username !== undefined){     
      getMeals();
     verifyToken();
    }
          },[userData, date, atoken]);


const verifyToken = () =>{
   //if(atoken === undefined && atoken === null){
    // navigate('/');
   //}

   axios.get(`http://www.mealstracker.com:3000/user/${userData.username}`,{ headers:{    
    "content-type": "application/json",
    "Authorization" : atoken,
  }, withCredentials: true} )
    .then(res => {
     if(res.data.accesstoken !== undefined || res.data.accesstoken === null){
      console.log("old token " + atoken);
      localStorage.setItem('token', JSON.stringify(res.data.accesstoken));
     setAToken(res.data.accesstoken);
      //localStorage.setItem('token', JSON.stringify(res.data.accesstoken));
      console.log('setting new token ' + localStorage.getItem('token'));
     }
})
.catch(error=>{
//  navigate('/')
console.log(error);
})
};



//
const getMeals = async () =>
{
verifyToken();

    await axios.get(`http://www.mealstracker.com:3000/entry/${dateChanged}/${userData.username}`,{ headers:{    
   "content-type": "application/json",
   "Authorization" : atoken,
 }, withCredentials: true} )
   .then(res => {
//    verifyToken();
    console.log(res.data);
  if(res.data.length === 0){
        setMealsExist(false);
        setDailyWeight(0);
        setWeight(0);
        setTotalCalories(0);
     }
     else{
    const fooddata = res.data.food_item;
    setTotalCalories(res.data.total_calories);
    fooddata.map((item, index) =>{
     
     item.edit=false;  
     if(index < fooddata.length-1){
     return  item.deletable=false; 
     }
     else{
      return item.deletable=true; 
     }
    })

    setFoodItem(fooddata);
    if(res.data.weight !== null){
    setDailyWeight(res.data.weight);
    setWeight(0);
    }
    else{
      setDailyWeight(0);
    }
    setMealsExist(true);
     }
  })
  .catch(error => {
      console.log(error);
    
      let message = error;
      if(!message.response){
        console.log('Error: Can not connect to network');
       setMealsErrors('Error: Connection refused');
      }
      else{
        if(message.response !== undefined && message.response.data === 'Access Denied'){
          navigate('/');
         }
        else{    
       setMealsErrors(message.response.status + " " + message.response.statusText);
        }
      }  

  })
};
     
//Retrieve meal data for new date
      const datesubmitHandler =(e) =>{
        e.preventDefault();
        setDate(dateChanged);
        getMeals();
    }
    
    const dateHandler = (e)=>
    {
      setDateChanged(e.target.value)
  }


const [calories, setCalories] = useState(0);
const inputCaloriesHandler =(e)=>{
  setCalories(e.target.value);
}

const [weight, setWeight]  = useState(0);
 const inputWeightHandler = (e) =>{
   setWeight(e.target.value);
 }

const [foodDescription, setFoodDescription] = useState('');
const inputFoodHandler = (e) =>{
 setFoodDescription(e.target.value);
}

const addmeal =
{
"user_name": userData.username,
 "date": dateChanged,
 "food_item" : [{
 "meal_number" : "1",
 "food_description" : foodDescription,
 "calories" : calories}
 ]
}


const  [emptysubmit, setEmptySubmit] = useState(false);

//Add meal data
const submitHandler =(e) =>{


 // verifyToken();



  e.preventDefault();
if(foodDescription !== '' && calories !== 0)
{
setEmptySubmit(false);

//If first meal for the given date, post to database
  if(!mealsexist)
  {
  axios.post('http://www.mealstracker.com:3000/entry/', addmeal, { headers:{
    "content-type": "application/json",
    "Authorization" : atoken,
  },withCredentials:true} )
    .then(res =>
       {
    setMealsExist(true);
    const foodinfo = res.data.food_item;
    foodinfo[0].edit = false;
    foodinfo[0].deletable = true;
    setFoodItem(foodinfo);
    setTotalCalories(addmeal.food_item[0].calories);
    setCalories(0);
    setFoodDescription('');
    setWeight(0);
  
//Update graph based on recent db submission
setUpdateGraph(!updateGraph);
   })
   .catch(error => 
    {

    let message = error;
    if(!message.response)
    {
     setError('Error: Connection refused');
    }
    else{
     setError(message.response.status + " " + message.response.statusText);
    }  
   })
  }
  else{


    //If one meal already exists in db for that date, patch to add another
    delete addmeal.date;
    const nextmealnumber = fooditem.length + 1;
    addmeal.food_item[0].meal_number = nextmealnumber;
    axios.patch(`http://www.mealstracker.com:3000/update/${dateChanged}/${userData.username}`, addmeal, { headers:{
        "content-type": "application/json",
        "Authorization" : atoken,
      },withCredentials:true} )
        .then(res => {
        const fooddata =  res.data.food_item[nextmealnumber-1];
        fooddata.edit = false;
        fooddata.deletable = true;
     let array = fooditem.map(item=>
      {
         return {...item, deletable: false}
       })
       setFoodItem([...array, fooddata]);
       setTotalCalories(parseInt(totalCalories) + parseInt(addmeal.food_item[0].calories));
       setCalories(0);
       setFoodDescription('');
       setUpdateGraph(!updateGraph);
       })
       .catch(error =>
         {
        let message = error;
        if(!message.response)
        {
         setError('Error: Connection refused');
        }
        else
        {
         setError(message.response.status + " " + message.response.statusText);
        }  
       })
    }
    }
    else
    {
    setEmptySubmit(true);   
  }
  }

const [editCal, setEditCal] = useState(0);
const editCaloriesHandler = (e) =>
{
 console.log(e.target.value);
 setEditCal(e.target.value);
} 
const [editFood, setEditFood] = useState('');
const editFoodHandler = (e) =>
{
  console.log(e.target.value);
  setEditFood(e.target.value);
}

const foodEditHandler = (e, itemid) =>
{
  e.preventDefault();
   setFoodItem(fooditem.map(item=> {
    if(item._id === itemid){
      return {...item, edit: !item.edit}
    } 
    return item;
    }))

}

//Edit meal data
const submitEditHandler = (e, item) =>
{


  //verifyToken();

 e.preventDefault();

if(editFood !== '' && editCal !== 0 )
{
 setEmptyEdit(false);
 let previousCal = 0;

const found = fooditem.find(items => items._id === item._id)
  previousCal = found.calories;


 console.log(item);
const updated = {
  "previouscal" : previousCal,
  "food_item":[{
 "calories" : editCal,
 "food_description" : editFood,
 "_id" : item._id,
 "meal_number": item.meal_number,
  }],
 
}

 axios.patch(`http://www.mealstracker.com:3000/update/${dateChanged}/${userData.username}/${item.meal_number}`, updated , { headers:{
  "content-type": "application/json",
  "Authorization" : atoken,
}, withCredentials: true} )
  .then(res => {
     setFoodItem(fooditem.map(items=> {
      if(items._id === item._id){
        setTotalCalories(parseInt(totalCalories) -parseInt(previousCal) +parseInt(updated.food_item[0].calories));
        return {...items, calories: editCal, food_description: editFood, edit:false} 
      } 
      return items;
      }))
      setEditCal(0);
      setEditFood('');
      setUpdateGraph(!updateGraph);

 })
 .catch(error => {
  let message = error;
  if(!message.response)
  {
    console.log('Error: Can not connect to network');
   setMealsErrors('Error: Connection refused');
  }
  else{
    if(message.response !== undefined && message.response.data === 'Access Denied'){
      navigate('/');
     }
    else{    
   setMealsErrors(message.response.status + " " + message.response.statusText);
    }
  } 
 })
}
else{
  setEmptyEdit(true);
}

}

//Delete a meal from list
const deleteFoodHandler = (e, item) =>{

  //verifyToken();


  console.log(item);
 e.preventDefault();
 let reducecals = 0;

const found = fooditem.find(items => items._id === item._id)
  reducecals = found.calories;

if(fooditem.length >1){
axios.patch(`http://www.mealstracker.com:3000/entry/${dateChanged}/${userData.username}/${item.meal_number}`, {"reducecals": reducecals}, { headers:{
  "content-type": "application/json",
  "Authorization" : atoken,
}, withCredentials: true} )
  .then(res => {
   let array = fooditem.map((items, index)=>{
    if(index === fooditem.length-2){
      return {...items, deletable:true}
    }
    return items
    ;
   })
   array.pop();
   setFoodItem(array);
   setTotalCalories(parseInt(totalCalories)- parseInt(reducecals));
   setUpdateGraph(!updateGraph);
    })
 .catch(error => {
  
  let message = error;
  if(!message.response)
  {
   setMealsErrors('Error: Connection refused');
  }
  else{
    if(message.response !== undefined && message.response.data === 'Access Denied'){
      navigate('/');
     }
    else{    
   setMealsErrors(message.response.status + " " + message.response.statusText);
    }
  } 

 })
}
//Delete entire object for date if only one meal is left
if(fooditem.length ===1){
  axios.delete(`http://www.mealstracker.com:3000/entry/${dateChanged}/${userData.username}`, { headers:{
    "content-type": "application/json",
    "Authorization" : atoken,
  }, withCredentials: true} )
    .then(res => {
     let array = fooditem;
     array.pop();
     setFoodItem(array);
     setMealsExist(false);
     setDailyWeight(0);
     setWeight(0);
     setTotalCalories(0);
     setUpdateGraph(!updateGraph);
   })
   .catch(error => {
    
    let message = error;
      if(!message.response)
      {
       setMealsErrors('Error: Connection refused');
      }
      else{
        if(message.response !== undefined && message.response.data === 'Access Denied'){
          navigate('/');
         }
        else{    
       setMealsErrors(message.response.status + " " + message.response.statusText);
        }
      } 
   })
  }

}

const [weightError, setWeightError] = useState(null);
const [weightprompt, setWeightPrompt] = useState(false);

//Submit weight of the date provided at least one meal data already exists
const submitWeightHandler = (e)=>{

  //verifyToken();
  e.preventDefault();

  if(mealsexist)
  {
  const addWeight = {"weight" : weight}
  setWeightPrompt(false);
  axios.patch(`http://www.mealstracker.com:3000/user/${dateChanged}/${userData.username}`, addWeight, { headers:{
    "content-type": "application/json",
    "Authorization" : atoken,
  }, withCredentials: true} )
    .then(res => 
      {
    setDailyWeight(parseInt(weight,10));
    setWeight(0);
    setUpdateGraph(!updateGraph);
   })
   .catch(error => {
    let message = error;
    if(!message.response) 
    {
     setWeightError('Error: Connection refused');
    }
    else{
     setWeightError(message.response.status + " " + message.response.statusText);
    }  
    
   })
  }
  else{
     setWeightPrompt(true);
  }

}


const weightErrorWarningHandler=(e)=>{
  e.preventDefault();
  setWeightError(null);
}

const submitErrorHandler =(e)=>{
  e.preventDefault();
  setError(null);
}

const promptHandler =(e)=>{
  e.preventDefault();
  setEmptySubmit(!emptysubmit);
}

const weightPromptHandler = (e)=>{
  e.preventDefault();
  setWeightPrompt(!weightprompt);
}

const mealsErrorHandler = (e)=>{
  e.preventDefault();
  setMealsErrors(null);
  getMeals();
}

    return (
        <div  className="fooddiv">  
         <div className="leftside">
           {!error?
           <div>
           <h1 className="mealinfoheader">Enter Meal Info</h1>
         <p name="mealp">Meal {mealsexist? (fooditem.length +1) : "1"}:  </p>
      {!emptysubmit?<form name="foodsubform">   
 
         <label name="fooddescription">
         FoodDescription:
            </label> 
         <input type="text" value={foodDescription} className="MealType" onChange={inputFoodHandler}></input>  
         <label name="callabel">
           Calories: 
            </label> 
         <input type="number" value={calories} className="inputcalories" onChange={inputCaloriesHandler} min="0"></input>
         <button onClick={submitHandler} className="mealbutton" >Submit</button>
      </form>
      :<div className="prompt"><p>Food Description can not be blank</p><p>and calories must be greater than 0</p>
        <div><button onClick={promptHandler}>OK</button></div>
        </div>}
        </div>:<div><div className="mealsuberror">{error}<button name='okbutton' onClick={submitErrorHandler}>Ok</button></div></div>}
      <SearchFoods/>
      </div>
      <div className="meals" >
            <h1>{date}</h1>
            <div className="totalcals">Total Daily Calories: {totalCalories}</div>
           <form>
          <input className="inputdate" value={dateChanged} type='date' onChange={dateHandler} max ={maxdate}></input>
          <button onClick={datesubmitHandler} className="changeDate" >Change Date</button>
          </form>
       {!weightError?
       <div>
          <form>    
       {!weightprompt?  
       <div name="bodyweightdiv">
          <label name="currentweight">
          Daily Bodyweight in lbs: {dailyWeight}
            </label> 
         <input type="number" value={weight} className="weight" onChange={inputWeightHandler} min="0" step="0.5"></input>   
         <button className= "weightsbutton" onClick={submitWeightHandler}>Submit</button>
         </div>
        :<div className="weightprompt">Must submit a meal before weight can be saved
        <div onClick={weightPromptHandler}><button>X</button></div> 
        </div>}
 
           </form>
           </div>:<div className="weightError">{weightError} <div ><button name='okbutton' onClick={weightErrorWarningHandler}>Ok</button></div></div>}
                 
          {!mealserrors?
           <div>
            {mealsexist?
               <div>
       <div className="entrydiv" >
           {fooditem.map(item=>(
    <div className= "mealdetails" key={item._id} >
        {!item.edit? <div name="mealdata"><div name="fooddescal">Meal Number: {item.meal_number}  Calories: {item.calories}</div> {item.food_description} </div>: 
<div name="editdiv">
<form name="editform">   
<div>
<label name="calorieseditlabel">
    Calories: 
     </label> 
  <input type="number"  className="inputeditcalories" onChange={editCaloriesHandler} min="0"></input>
  </div>
  <div>
  <label name="foodeditdescription">
  FoodDescription:
     </label> 
  <input type="text"  className="editmeal" onChange={editFoodHandler}></input>  
  </div>
  <button  className="subedditbutton" onClick={(e)=>submitEditHandler(e, item)} >Submit</button>
  <button name="closebutton" onClick={(e) => foodEditHandler(e, item._id)}>Close</button>
</form>
</div>}
          
  <button className={!item.edit? "foodeditbutton" : "nodelete"} onClick={(e) => foodEditHandler(e, item._id)}>{!item.edit? "edit" : "X"}</button>
  <button className={item.deletable? "deletefoodbutton" : "nodelete"} onClick={(e) => deleteFoodHandler(e, item)}>delete</button>
   </div> 
              )) }
           </div>  </div>
           :<div></div>}
         </div>
         :<div><div name="mealserrors">{mealserrors}<div ><button onClick={mealsErrorHandler} name="okbutton">OK</button></div></div></div>}
  </div>
  </div>
  )
}

export default Meals;
