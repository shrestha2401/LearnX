import React from 'react'
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, ArcElement, Legend} from "chart.js"
import {Line, Doughnut} from "react-chartjs-2"
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, ArcElement, Legend);
export const LineChart = () => {
  const labels = getLastYearMonths();
  const options = {
    responsive : true,
    plugins:{
        legend:{
            position:"bottom"
        },
        title:{
            display:true,
            text: 'Yearly Views',
        }
    }
  }

  const Data = {
    labels,
    datasets:[
        {label:"Views",
        data: [1,2,3,4],
        borderColor:"rgba(107, 70, 193, 0.5)",
        backgroundColor : "#6b46c"

    }
    ]
  };

  return <Line options = {options} data = {Data} />
}

export const DoughnutChart = () => {

    const Data = {
        labels:["Subscribers", "Non-Subscribers"],
      datasets:[
          {label:"Users",
          data: [15,20],
          borderColor:["rgb(62, 12, 171)", "rgb(214, 43, 129)"],
          backgroundColor : ["rgba(62,12,171,0.3","rgba(214,43,129, 0.3)"],
          borderWidth: 1
  
      }
      ]
    };

    return <Doughnut data={Data} />
}

function getLastYearMonths() {

    const labels = [];
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

    const currentMonth = new Date().getMonth();
    const remain = 11-currentMonth;
    for (let i = currentMonth; i< months.length; i-- ){

        const element = months[i];
        labels.unshift(element);
        if (i === 0) break;
    }

    for (let i=11; i > remain; i--){
        if (i=== currentMonth) break;
        const element = months[i];
        labels.unshift(element)
        
    }
    console.log(labels);
    return labels
   
}
