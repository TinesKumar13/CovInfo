import React from 'react';
import { Doughnut } from 'react-chartjs-2';

function PieChart({total , recovered , death}) {

    var data = {
        datasets: [{
            data: [total , recovered , death],
            backgroundColor: ['#AD0B39', '#DD882C' , '#292F36'],
            
        }],
        labels: [
            'Active Cases',
            'Recovered',
            'Deaths'
        ],
    
    };
    return (

        <Doughnut data ={data} width={350}/>

    )
}

export default PieChart
