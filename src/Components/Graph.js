import React, {useEffect, useState} from 'react';
import {Line} from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import axios from 'axios';
import 'chartjs-adapter-date-fns';
import '../Graph.scss';
import {useNavigate} from 'react-router-dom';
//axios.defaults.withCredentials = true;

const Graph = ({userData, date, updateGraph}) =>{

  let navigate = useNavigate();
    const atoken = JSON.parse(localStorage.getItem('token'));
    const [currentdate, setCurrentDate] = useState(null);
    const [previousdate, setPreviousDate] = useState(null);
    const [error, setError] = useState(null);
    const [weightdata, setWeightData] = useState([]);
    const [caloriedata, setCalorieData] = useState([]);



    //Settiing time interval to current date through 90 days prior
    //Using resulting data to populate graphs
    useEffect(()=>{
    
      setCurrentDate(date);
      const tempdate = new Date(Date.now());
     let difference = tempdate.getDate()-90;
     const tempdate2 = new Date(Date.now());
     tempdate.setDate(1);
     tempdate.setDate(difference);
      setPreviousDate(createDateString(tempdate));
      getMeals();
    

    },[userData, updateGraph]);

    const verifyToken = async () =>{
      if(atoken === undefined){
        navigate('/');
      }
     await axios.post(`http://www.mealstracker.com:3000/user/${userData.username}`,{ headers:{    
       "content-type": "application/json",
       "Authorization" : atoken,
     }, withCredentials: true} )
       .then(res => {
        if(res.data.accesstoken !== undefined){
         console.log(res.data.accesstoken);
         localStorage.setItem('token', JSON.stringify(res.data.accesstoken));
        }
   })
   .catch(error=>{
     navigate('/')
   })
   };








    //Formatting date string
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


//Retrieving weights and total calories calories over time interval
    const getMeals = async () =>{

      verifyToken();

       if(previousdate !== null && currentdate !== null && userData.username !== undefined){

         await axios.get(`http://www.mealstracker.com:3000/entry/${previousdate}/${currentdate}/${userData.username}`,{ headers:{    
        "content-type": "application/json",
        "Authorization" : atoken,
      }, withCredentials: true} )
        .then(res => {
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
        .catch(error=>
          {
          let message = error;
          if(!message.response)
          {
           setError('Error: Connection refused');
          }
          else{
           setError(message.response.status + " " + message.response.statusText);
          }  
        });
      }


    }

    const closeErrorHandler = (e) =>{
      e.preventDefault();
      setError(null);
      getMeals();
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
      <div>
        <div className="grapherror">{error}<div><div><button onClick={closeErrorHandler}name='okbutton' >Ok</button></div>
      </div>
      </div></div>}

        </div>

    )
}

export default Graph;
