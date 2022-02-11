import axios from 'axios';
import React, {useEffect, useState} from 'react';
import '../User.scss';

const Meals =({userData, setUserData})=>{

    const [meal, setMeal] = useState("");
    const [calories, setCalories] = useState(null);
    const atoken = JSON.parse(localStorage.getItem('token'));
    const [meals, setMeals] = useState({});
    const [fooditem, setFoodItem] = useState([]);
    const [mealsexist, setMealsExist] = useState(false);
    


    useEffect(()=>{
 
     getMeals();
    // setMealsExist(false);
         },[]);


    const createDateString = () =>{
    const today = new Date(Date.now());
    let num = today.getMonth() + 1;
    let month = num.toString();
    let adate = today.getDate().toString();
    const year = today.getFullYear().toString();
  //  console.log(year + "-" + month + "-" + adate);
    if(adate.length === 1){
        adate = "0" + adate;
    }
    if(month.length ===1){
        month = "0" + month;
    }
    return year + "-" + month + "-" + adate;
};

const todaysdate = createDateString();
const [date, setDate] = useState(todaysdate);

    const submitHandler =(e) =>{
        e.preventDefault();
    }

     const inputcaloriesHandler =(e)=>{
       console.log(e.target.value);
       setCalories(e.target.value)
    }

    const inputmealHandler = (e) =>{
        console.log(e.target.value);
        setMeal(e.target.value);
    }

    const dateHandler = (e)=>{
        console.log('date is changing');
        setDate(e.target.value);
    }
   
    const getMeals = () =>{
         axios.get(`http://18.213.166.93:3000/entry/${date}/PuffMagicDragon`,{ headers:{
        "content-type": "application/json",
        "Authorization" : atoken
      }} )
        .then(res => {
        console.log(res.data);
        if(res.data.length === 0){
           setMealsExist(false);
        }
        else{
            setMealsExist(true);
            setMeals(res.data[0]);
            setFoodItem(res.data[0].food_item);
            }
       })
       .catch(error => {
           console.log(error.response);
       })
    };
     
      fooditem.map(item=>
        console.log(item));

       
    const datesubmitHandler =(e) =>{
        e.preventDefault();
        getMeals();
    }


    return (

        <div >
        <form>
        <label name="date">Date: </label>
<       input className="inputdate" value={date} type='date' onChange={dateHandler}></input>
         <button onClick={datesubmitHandler} className="mealssubbutton" >Change Date</button>
        </form>

      <form className="mealclass">
        <label name="meallabel">Meal Description: </label>
       <input type="text" className="inputmeals" onChange={inputmealHandler}>
       </input>
        <label name="callabel">
           Calories 
            </label> 
         <input type="number" className="inputcalories" onChange={inputcaloriesHandler}></input>   
         <button onClick={submitHandler} className="mealssubbutton" >Submit</button>
      </form>

      {mealsexist?
           <div>{meals.weight}             
       <div >
           {fooditem.map(item=>(
           <div key={item._id}> {item.food_description} {item.meal_number} {item.calories}</div>
              )) }
           </div>
           </div>
           :<div></div>
           }
          
        </div>
    )
}

export default Meals;