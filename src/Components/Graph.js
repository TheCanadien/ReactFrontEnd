import React, {useEffect, useState} from 'react';
import {Line} from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { Chart } from 'chart.js';
import 'chartjs-adapter-date-fns';



const Graph = ({userData}) =>{

    const atoken = JSON.parse(localStorage.getItem('token'));
    const [currentdate, setCurrentDate] = useState(null);
    const [previousDate, setPreviousDate] = useState(null);

    useEffect(()=>{
    
    



    },[currentdate, previousDate]);

   //  months.forEach(element => console.log(element));
 const [dates, setDates] = useState([]);

    const calculateMonthPrior = ()=>{
     





    }


 



    const createDateString = (dateValue) =>{
        
        let date =  new Date(Date.now()); 
        if(dateValue!==undefined){
         date = new Date(dateValue);
        }
       // 
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


   // console.log(createDateString());











    const getMeals = async () =>{
        console.log('calling getMeals');
         await axios.get(`http://52.4.202.130:3000/entry/${currentdate}/${previousDate}${userData.username}`,{ headers:{    
        "content-type": "application/json",
        "Authorization" : atoken
      }} )
        .then(res => {
        })
        .catchv(res=>{

        });
    }


   const dateHandler = (e) =>{
    console.log(e.target.value);

   }

   const datesubmitHandler = (e) =>{
      e.preventDefault();
   }








    const state = {
        labels: ['January', 'February', 'March',
                 'April', 'May'],
        datasets: [
          {
            label: 'Rainfall',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [65,1, 359, 80, 81, 56]
          }
        ]
      }



    return(
        <div>
 {/*           
<div>

      <input className="graphdate" type='date' onChange={dateHandler}></input>
          <button onClick={datesubmitHandler} className="changegraphdate" >Change Date</button>

</div>
 */}

<script src="https://cdn.jsdelivr.net/npm/chart.js/dist/chart.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns/dist/chartjs-adapter-date-fns.bundle.min.js"></script>

            <Line
        data={state}
        options={{
          title:{
            display:true,
            text:'Average Rainfall per month',
            fontSize:20
          },
          legend:{
            display:true,
            position:'right'
          }
        }}
      /></div>
    )
}

export default Graph;