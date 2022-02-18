import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Meals = ({userData, setUserData, date, setDate})=>{



    const [entryInfo, setEntryInfo] = useState({});
    const atoken = JSON.parse(localStorage.getItem('token'));
    const [fooditem, setFoodItem] = useState([]);
    const [mealsexist, setMealsExist] = useState(false);
    const [dateChanged, setDateChanged] = useState(date);


    useEffect(()=>{
 
      getMeals();
          },[userData]);


////////////////////////////////////////////////////////////////////////////////////////
const getMeals = async () =>{
   console.log('calling getMeals');
  //console.log(userData.name);
  //  axios.get(`http://18.213.166.93:3000/entry/${date}/${userData.username}`,{ headers:{
    await axios.get(`http://18.213.166.93:3000/entry/${date}/${userData.username}`,{ headers:{    
   "content-type": "application/json",
   "Authorization" : atoken
 }} )
   .then(res => {

    //console.log(res);
    if(res.data.length === 0){
       // console.log('nada');
        console.log(res.data);
        setMealsExist(false);
      
     }
     else{
    setFoodItem(res.data.food_item); 
    //console.log(res);
    setMealsExist(true);
     setEntryInfo(res.data)
     }
  })
  .catch(error => {
      console.log(error.response);
  })
};

    // fooditem.map(item=>
      //console.log(item));

     
      const datesubmitHandler =(e) =>{
        e.preventDefault();
        setDateChanged(date);
        getMeals();
    }
    
    const dateHandler = (e)=>{
      console.log('date is changing');
      setDate(e.target.value);
  }
////////////////////////////////////////////////////////////////////
//const [mealInfo, setMealInfo] = useState({food_description: ""| String, calories: null | Number, weight: null | Number, meal_number: null | Number});

const [calories, setCalories] = useState(0);

const inputCaloriesHandler =(e)=>{
 console.log(e.target.value);
  setCalories(e.target.value);
}

const [weight, setWeight]  = useState(0);
 const inputWeightHandler = (e) =>{
   console.log(e.target.value);
   setWeight(e.target.value);
 }

const [mealnumber, setMealNumber] = useState(1);

const [foodDescription, setFoodDescription] = useState('');
const inputFoodHandler = (e) =>{
 console.log(e.target.value);
 setFoodDescription(e.target.value);
}

////////////////////////////////////////////////////////////////

const addmeal =
{
"user_name": userData.username,
 "date": dateChanged,
 "weight": weight,
 "food_item" : [{
 "meal_number" : "1",
 "food_description" : foodDescription,
 "calories" : calories}
 ]
}
/////////////////////////////////////////////////////////


const submitHandler =(e) =>{
  e.preventDefault();

  if(!mealsexist){
  axios.post('http://18.213.166.93:3000/entry/', addmeal, { headers:{
    "content-type": "application/json",
    "Authorization" : atoken
  }} )
    .then(res => {
    console.log(res.data);
    setMealsExist(true);
    setFoodItem(res.data.food_item);
   })
   .catch(error => {
       console.log(error.response);
   })
  }
  else{
    delete addmeal.date;
    const nextmealnumber = fooditem.length + 1;
    addmeal.food_item[0].meal_number = nextmealnumber;
    axios.patch(`http://18.213.166.93:3000/update/${dateChanged}/${userData.username}`, addmeal, { headers:{
        "content-type": "application/json",
        "Authorization" : atoken
      }} )
        .then(res => {
        console.log(res.data);
        console.log(nextmealnumber-1);
        console.log('does exist');
       setFoodItem([...fooditem, res.data.food_item[nextmealnumber-1]]);
       setCalories(0);
       setFoodDescription('');
       setWeight(0);
       })
       .catch(error => {
           console.log(error.response);
       })
    }

    fooditem.map(item=>
      console.log(item));
  }






    return (
        <div>  
            <h1>{dateChanged}</h1>
            <form>
          <label name="date">Date: </label>
<         input className="inputdate" value={date} type='date' onChange={dateHandler}></input>
          <button onClick={datesubmitHandler} className="mealssubbutton" >Change Date</button>
           </form>
            {mealsexist?
               <div>{entryInfo.weight}  
       <div >
           {fooditem.map(item=>(
           <div key={item._id}> {item.food_description} {item.meal_number} {item.calories}</div>
              )) }
           </div>  </div>
           :<div></div>
         
           }

       <form>   
       <label name="callabel">
           Calories 
            </label> 
         <input type="number" value={calories} className="inputcalories" onChange={inputCaloriesHandler} min="0"></input>
         <label name="fooddescription">
         FoodDescription:
            </label> 
         <input type="text" value={foodDescription} className="MealType" onChange={inputFoodHandler}></input>   
         <label name="currentweight">
         Weight:
            </label> 
         <input type="number" value={weight} className="weight" onChange={inputWeightHandler} min="0" step="0.5"></input>   
         <button onClick={submitHandler} className="mealssubbutton" >Submit</button>


      </form>


          </div>

    )
}

export default Meals;