import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Meals = ({userData, setUserData, date, setDate})=>{



    const [entryInfo, setEntryInfo] = useState({});
    const atoken = JSON.parse(localStorage.getItem('token'));
    const [fooditem, setFoodItem] = useState([]);
    const [mealsexist, setMealsExist] = useState(false);
    const [dateChanged, setDateChanged] = useState(date);
  //  const [editfooditem, setEditFoodItem] = useState([]);


    useEffect(()=>{
 
      getMeals();
          },[userData]);

const getMeals = async () =>{
   console.log('calling getMeals');
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
    const fooddata = res.data.food_item;
    fooddata.map((item, index) =>{
     
     item.edit=false;  
     if(index < fooddata.length-1){
     return  item.deletable=false; 
     }
     else{
      return item.deletable=true; 
     }
    })

    //setFoodItem(res.data.food_item);
    setFoodItem(fooddata);

    //console.log(res);
    setMealsExist(true);
     setEntryInfo(res.data)
     }
  })
  .catch(error => {
      console.log(error.response);
  })
};
     
      const datesubmitHandler =(e) =>{
        e.preventDefault();
        setDateChanged(date);
        getMeals();
    }
    
    const dateHandler = (e)=>{
      console.log('date is changing');
      setDate(e.target.value);
  }

 //fooditem.forEach(element => console.log(element));








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

const [foodDescription, setFoodDescription] = useState('');
const inputFoodHandler = (e) =>{
 console.log(e.target.value);
 setFoodDescription(e.target.value);
}

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

    const foodinfo = res.data.food_item;
    foodinfo[0].edit = false;
    foodinfo[0].deletable = true;
   // console.log(foodinfo);


   //setFoodItem(res.data.food_item);
    setFoodItem(foodinfo);

    setCalories(0);
    setFoodDescription('');
    setWeight(0);
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

        ///////////////////////////////////////////////////////////
        const fooddata =  res.data.food_item[nextmealnumber-1]
        
         fooddata.edit = false;
         fooddata.deletable = true;
      console.log(fooddata);
       let array = fooditem.map(item=>{
         return {...item, deletable: false}
       })
        setFoodItem([...array, fooddata]);

      console.log('here');
   
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



///////////////////////////////////////////////////////////////////////////////////////

const [editCal, setEditCal] = useState(0);
const editCaloriesHandler = (e) =>{
 console.log(e.target.value);
 setEditCal(e.target.value);
} 
const [editFood, setEditFood] = useState('');
const editFoodHandler = (e) =>{
  console.log(e.target.value);
  setEditFood(e.target.value);
}




const foodEditHandler = (e, itemid) =>{
  e.preventDefault();
 // console.log(itemid);
  //setIsSelected(!isSelected);
  //console.log(isSelected); 
   setFoodItem(fooditem.map(item=> {
    if(item._id === itemid){
      return {...item, edit: !item.edit}
    } 
    return item;
    }))

}

const submitEditHandler = (e, item) =>{
 e.preventDefault();


 console.log(item);
const updated = {
  "food_item":[{
 "calories" : editCal,
 "food_description" : editFood,
 "_id" : item._id,
 "meal_number": item.meal_number
  }]
}
console.log(updated);

 axios.patch(`http://18.213.166.93:3000/update/${dateChanged}/${userData.username}/${item.meal_number}`, updated , { headers:{
  "content-type": "application/json",
  "Authorization" : atoken
}} )
  .then(res => {
    console.log(res);
    ///////////////////////////

    setFoodItem(fooditem.map(items=> {
      if(items._id === item._id){
        return {...items, calories: editCal, food_description: editFood, edit:false}
      } 
      return items;
      }))
      setEditCal(0);
      setEditFood('');
 })
 .catch(error => {
     console.log(error.response);
 })

}

const deleteFoodHandler = (e, item) =>{
  console.log(item);
 e.preventDefault();
///////////////////////////////////////////////////////////////////////////////////////



if(fooditem.length >1){
axios.patch(`http://18.213.166.93:3000/entry/${dateChanged}/${userData.username}/${item.meal_number}`, {"dummy": "dummy"}, { headers:{
  "content-type": "application/json",
  "Authorization" : atoken
}} )
  .then(res => {
    console.log(res);
    //console.log(atoken);
    ///////////////////////////
  
   let array = fooditem.map((items, index)=>{
    if(index === fooditem.length-2){
      return {...items, deletable:true}
    }
    return items
    ;
   })
   array.pop();
   setFoodItem(array);


  ///////////////////////////
 })
 .catch(error => {
     console.log(error.response);
 })
}
if(fooditem.length ===1){
  axios.delete(`http://18.213.166.93:3000/entry/${dateChanged}/${userData.username}`, { headers:{
    "content-type": "application/json",
    "Authorization" : atoken
  }} )
    .then(res => {
      console.log(res);
     // console.log(atoken);
      ///////////////////////////
    
     let array = fooditem;
     array.pop();
     setFoodItem(array);
     setMealsExist(false);
  
    ///////////////////////////
   })
   .catch(error => {
       console.log(error.response);
   })
  }









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

           <div  key={item._id} >
           {!item.edit? `${item.food_description} ${item.meal_number} ${item.calories}`: 
<div>
  <p> {item.food_description} {item.meal_number} {item.calories}   </p>
<form>   
<label name="callabel">
    Calories 
     </label> 
  <input type="number"  className="inputcalories" onChange={editCaloriesHandler} min="0"></input>
  <label name="fooddescription">
  FoodDescription:
     </label> 
  <input type="text"  className="MealType" onChange={editFoodHandler}></input>   
  <button onClick={(e)=>submitEditHandler(e, item)} className="mealssubbutton" >Submit</button>
</form>
</div>


           }
           <button onClick={(e) => foodEditHandler(e, item._id)}>{!item.edit? "edit" : "X"}</button>
           <button className={item.deletable? "" : "nodelete"} onClick={(e) => deleteFoodHandler(e, item)}>delete</button>
           </div>
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