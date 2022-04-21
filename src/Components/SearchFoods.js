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
const [gramschanged, setGramsChanged] = useState(100);
const [error, setError] = useState(null);

const searchFoodsHandler = (e)=>
{  
  setSearchFood(e.target.value);
}

//Search for food in food database
   const submitHandler =(e)=>{
    e.preventDefault();
    setError(null);
    if(searchFood !== '')
    {
  axios.get(`https://52.4.202.130:8080/api/foods/${searchFood}/`)
    .then(res => {
      setFoundFoods(res.data);
   })
   .catch(error => {
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
   }

const clickHandler = (e, item)=>{
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
setNumberOfGrams(100);
setGramsChanged(100);
    }

   const clearResultsHandler = (e) =>{
     e.preventDefault();
     setSelected(false);
     setFoundFoods([]);
     setSearchFood('');
     setGramsChanged(100);
   }

const inputGramsHandler = (e)=>{
setNumberOfGrams(e.target.value);
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
    setGramsChanged(numberofgrams);
}

const closeWarningHandler =(e)=>{
  e.preventDefault();
  setError(null);
}

    return(
        <div className="searchFoods" id="formdiv">

          {!error?<div>
            <form  id={fooddetails.food_type}>
                <label className="searchFoodLabel"><h1>Search for Food info:</h1></label>
                <input id="fooddetails" className="foodsearch" value={searchFood} type="text" onChange={searchFoodsHandler}></input>
                <div>
                <button className="searchsub" type="submit" onClick={submitHandler}>Submit</button>
                <button onClick={clearResultsHandler}>clear</button>
                </div>
            </form>
          {selected? <div className= "details" >
            <h3>Food Type:&nbsp; {fooddetails.food_type}</h3>
           <label>Change quantity</label> 
          <input value={numberofgrams} className="gramsinput" onChange={inputGramsHandler} type="number" min="0"></input>
          <button className="submitQuantity" onClick={submitGramsHandler}>Submit</button>
         <p>{gramschanged} gram(s)</p>
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

            <ul className={foundFoods.length >0 ? "foundFoods" : "hidden"}>
        {foundFoods.map(item =>(
           <li   key={item.id}className ="foodsList"> 
          <HashLink  onClick={(e)=>clickHandler(e,item)} className='foodlinks' to="#fooddetails">
          {item.food_type}
          </HashLink>       
          </li>
          ))}
      </ul>
</div>:<div> <div className="searchError">  {error} <div ><button name='okbutton' onClick={closeWarningHandler}>Ok</button>
      </div>
      </div></div>}

        </div>
    )
}

export default SearchFoods;
