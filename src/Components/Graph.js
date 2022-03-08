import React, {useEffect, useState} from 'react';
import {Line} from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import axios from 'axios';
import 'chartjs-adapter-date-fns';
//import { setDate } from 'date-fns';
import '../Graph.scss';


const Graph = ({userData, date, updateGraph}) =>{

    const atoken = JSON.parse(localStorage.getItem('token'));
    const [currentdate, setCurrentDate] = useState(null);
    const [previousdate, setPreviousDate] = useState(null);
    const [error, setError] = useState(null);


    useEffect(()=>{
    


      setCurrentDate(date);
      const tempdate = new Date(Date.now());
      tempdate.setDate(-60);
      setPreviousDate(createDateString(tempdate));

      getMeals();
    

    },[userData, updateGraph]);

 

    const createDateString = (dateValue) =>{
        
        let date =  new Date(Date.now()); 
        if(dateValue!==undefined){
         date = new Date(dateValue);
        }
        let num = date.getMonth() + 1;
        let month = num.toString();
        let adate = date.getDate().toString();
        const year = date.getFullYear().toString();
        if(adate.length === 1){
            adate = "0" + adate;
        }
        if(month.length ===1){
            month = "0" + month;
        }
        return year + "-" + month + "-" + adate;
    }



    //  console.log(currentdate);
     // console.log(previousdate);







    const [weightdata, setWeightData] = useState([]);
    const [caloriedata, setCalorieData] = useState([]);



    const getMeals = async () =>{

       if(previousdate !== null && currentdate !== null && userData.username !== undefined){

         await axios.get(`http://52.4.202.130:3000/entry/${previousdate}/${currentdate}/${userData.username}`,{ headers:{    
        "content-type": "application/json",
        "Authorization" : atoken
      }} )
        .then(res => {
      //    console.log(res);
     
        const mealdata = res.data;
        let weights = [];
        let calories = [];
        if(res.data.length > 0)
        {
        mealdata.forEach(item=>{
        if(item.weight !==undefined){
          weights.push({x: item.date.substring(0,10), y: item.weight});
        }
        calories.push({x: item.date.substring(0,10), y: item.total_calories},);

        })
        setWeightData(weights);
        setCalorieData(calories);        
      }
        })
        .catch(error=>{
    
          console.log(error.response);
          let message = error;
          if(!message.response){
            console.log('Error: Can not connect to network');
           setError('Error: Connection refused');
          }
          else{
           setError(message.response.status + " " + message.response.statusText);
          }  
         console.log(error);
        });
      }


    }

    const closeErrorHandler = (e) =>{
      e.preventDefault();
      setError(null);
      getMeals();
    }


   const dateHandler = (e) =>{
    console.log(e.target.value);
    setCurrentDate(e.target.value);

   }

   const datesubmitHandler = (e) =>{
      e.preventDefault();
      console.log(e.target.value);
      console.log(e.target.value);
   }

   
   const weightstate = {
    datasets: [
      {
        label: 'Daily Weight',
        fill: false,
        lineTension: 0.5,
        borderWidth: 2,
        data: weightdata,     
        pointBorderColor: 'red',
        pointBackgroundColor: 'black',
        borderColor: 'black',
      }
    ]
  }

    const calstate = {
        datasets: [
          {
            label: 'Daily Calories',
            fill: false,
            lineTension: 0.5,
            borderWidth: 2,
            data: caloriedata,     
            pointBorderColor: 'red',
            pointBackgroundColor: 'black',
            borderColor: 'black',
          }
        ]
      }


    return(
        <div>
 {          
<div>
       {/*}
      <input className="graphdate" type='date' onChange={dateHandler}></input>
          <input value={currentdate} className="graphdate2" type='date' onChange={dateHandler}></input>
 <button onClick={datesubmitHandler} className="changegraphdate" >Change Date</button>*/}


</div>
 }

{!error?
<div>
<script src="https://cdn.jsdelivr.net/npm/chart.js/dist/chart.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns/dist/chartjs-adapter-date-fns.bundle.min.js"></script>

         <div className="graphsdiv">
            <div className="calGraph" >
            <Line 
        data={calstate}
        options={{
          scales:{
            x:{
              type: 'time',
              time:{
                unit: 'day'
              }
            },
            y:{
              beginAtZero: true
            }
          },
           maintainAspectRatio: false,
        }}
      />
      </div>

      <div className="weightGraph" >
            <Line 
        data={weightstate}
        options={{
          scales:{
            x:{
              type: 'time',
              time:{
                unit: 'day'
              },
            },
            y:{
              beginAtZero: true
            }
          },
           maintainAspectRatio: false,
       
        }}
      />
      </div>
      </div>
      </div>:
      <div><div className="grapherror">{error}<div><div><button onClick={closeErrorHandler}name='okbutton' >Ok</button></div>



      </div>
      </div></div>}






      
      </div>


    )
}

export default Graph;