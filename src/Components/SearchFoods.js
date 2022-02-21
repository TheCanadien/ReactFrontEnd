import axios from 'axios';
import React, {useState} from 'react';
import '../Search.scss';
import { HashLink } from 'react-router-hash-link';

const SearchFoods = () =>{

const[searchFood, setSearchFood] = useState('');
const [foundFoods, setFoundFoods]= useState([]);
const [fooddetails, setFoodDetails] = useState({});
const [selected, setSelected] = useState(false);
const [numberofgrams, setNumberOfGrams] = useState(100); 
const [quantities, setQuantities] = useState([]);

const searchFoodsHandler = (e)=>{
  //console.log(e.target.value)  
  setSearchFood(e.target.value);
}


   const submitHandler =(e)=>{
    e.preventDefault();
   // console.log('button hit');
    console.log(searchFood);

   axios.get(`http://18.213.166.93:8080/api/foods/${searchFood}/`)
    .then(res => {
      console.log(res.data);
      setFoundFoods(res.data);
    ///////////////////////////
   })
   .catch(error => {
       console.log(error.response);
   })

   }

   const clickHandler = (e, item)=>{
console.log(item);
setSelected(true);
setNumberOfGrams(100);
setFoodDetails(item);
let obj = {}
Object.keys(item).forEach((key, index) =>{
 if(index >=2){ 
 obj[key] = (item[key] * numberofgrams/100).toFixed(2);
 }
})
setQuantities(obj);



    }

//console.log(item.food_type);
//setFoodDetails(item);

   const clearResultsHandler = (e) =>{
     e.preventDefault();
     setSelected(false);
     setFoundFoods([]);
     setSearchFood('');
   }


const inputGramsHandler = (e)=>{
setNumberOfGrams(e.target.value);
/*let obj = {}
Object.keys(fooddetails).forEach((key, index) =>{
 if(index >=2){ 
 obj[key] = (fooddetails[key] * numberofgrams/100);
 }
})
setQuantities(obj);
*/



}


const submitGramsHandler = (e)=>{
    e.preventDefault();
    let obj = {}
    Object.keys(fooddetails).forEach((key, index) =>{
     if(index >=2){ 
     obj[key] = (fooddetails[key] * numberofgrams/100).toFixed(2);
     }
    })
    setQuantities(obj);

}








    return(
        <div>
            <form id="foodForm">
                <label>Search for Food info:</label>
                <input value={searchFood} type="text" onChange={searchFoodsHandler}></input>
                <button type="submit" onClick={submitHandler}>Submit</button>
                <button onClick={clearResultsHandler}>clear</button>
            </form>
            <div></div>
          {selected? <div>
            <h3>Food Type:&nbsp; {fooddetails.food_type}</h3>
           <label>Change quantity</label> 
          <input onChange={inputGramsHandler} type="number" min="0"></input>
          <button onClick={submitGramsHandler}>Submit</button>
         <p>{numberofgrams} gram(s)</p>
        <p>Calories:&nbsp;&nbsp;{quantities.kcal}</p>
        <p>Protein:&nbsp;&nbsp;{quantities.protein} gram(s)</p>
        <p>Total Carbs:&nbsp;&nbsp;{quantities.carbohydrate} gram(s)</p>
        <p>Fiber:&nbsp;&nbsp;{quantities.fiber} gram(s)</p>
        <p>Sugars:&nbsp;&nbsp;{quantities.sugars} gram(s)</p>
        <p>Total Fats:&nbsp;&nbsp;{quantities.total_fat} gram(s)</p>
        <p>Monounsaturated Fats:&nbsp;&nbsp;{quantities.monounsaturated_fat} gram(s)</p>
        <p>Polyunsaturated Fats:&nbsp;&nbsp;{quantities.polyunsaturated_fat} gram(s)</p>
        <p>Saturated Fats:&nbsp;&nbsp;{quantities.saturated_fat} gram(s)</p>
        
              </div> :
          <div></div>}




            <ul className="foundFoods">
        {foundFoods.map(item =>(
           <li  key={item.id}className ="foodsList"> 
          <HashLink onClick={(e)=>clickHandler(e,item)} className='foodlinks' to="#foodForm">
          {item.food_type}
          </HashLink>
          </li>
          ))}
      </ul>

          



        </div>
    )
}

export default SearchFoods;