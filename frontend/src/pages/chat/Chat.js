import React, { useState, useEffect } from "react";
import {  Pie } from "react-chartjs-2";
import axios from "axios";

const Chat = () => {
  const [chartData, setChartData] = useState({});


  const chart = () => {
    let empSal = [];
    let empAge = [];
     axios
      .get("http://dummy.restapiexample.com/api/v1/employees")
      .then(res => {
        console.log(res);
        for (const obj of res.data.data) {
          empSal.push(parseInt(obj.employee_salary));
          empAge.push(parseInt(obj.employee_age));
        }
        setChartData({
          labels: empAge,
          datasets: [
            {
              label: "level of thiccness",
              data: empSal,
              backgroundColor: ["rgba(75, 192, 192, 0.6)"],
              borderWidth: 2
            
            }
          ]
        });
      })
      .catch(err => {
        console.log(err);
      });
    console.log(empSal, empAge);
  };

  useEffect(() => {
    chart();
  }, []);
  return (
    <div className="App">
      
      <div >
        <Pie
          data={chartData}
          options={{
            responsive: true,
            title: { text: "Livestock market prices", display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 5,
                    beginAtZero: true 
                  },
                  gridLines: {
                    display: false
                  }
                }
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false
                  }
                }
              ]
            }
          }}
        />

      </div>
    </div>
  );
};

export default Chat;