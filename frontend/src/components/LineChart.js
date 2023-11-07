import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'


const LineChart = ({ data }) => {
    const dates = data.map(entry => entry.date);
    const responseTimes = data.map(entry => entry.averageResponse);

    const chartData = {
        labels: dates,
        datasets: [
            {
                label: 'Average Response Time',
                data: responseTimes,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderWidth: 4
            }
        ]
    }

    const chartOptions = {
        maintainAspectRatio: false,
        scales: {
            x: {
                type: 'time', // Use a time scale for the X-axis
                time: {
                    unit: 'day', // Customize the time unit as needed
                },
            },
            y: {
                beginAtZero: true, // Customize as needed
            },
        },
    }
        ;
    return (
        <div className="w-full">
            <Line data={ chartData } />
            {/* <Bar data={ chartData } options={ chartOptions } />  */ }
            { console.log(chartData) }
        </div>
    );
}

export default LineChart;