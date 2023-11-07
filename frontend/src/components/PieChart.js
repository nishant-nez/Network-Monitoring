import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart as ChartJS } from 'chart.js/auto';

// ChartJS.register(ChartDataLabels);


const PieChart = ({ data }) => {
    const downVolume = parseFloat((data.downs / data.total) * 100).toFixed(2);
    const upVolume = 100 - downVolume;
    // const dates = data.map(entry => entry.date);
    // const responseTimes = data.map(entry => entry.averageResponse);

    const chartData = {
        labels: ['Up Times', 'Down Times'],
        datasets: [
            {
                data: [upVolume, downVolume],
                backgroundColor: ['#66b382', '#bd4c50'],
                borderWidth: 4
            }
        ]
    }

    const chartOptions = {
        maintainAspectRatio: false, // Customize as needed
        plugins: [ChartDataLabels],
    };

    return (
        <div className="w-full flex items-center justify-center h-[42vh]">
            <Pie data={ chartData } options={ chartOptions } />
            {/* <Bar data={ chartData } options={ chartOptions } />  */ }
            {/* { console.log('DATAAA::') }
            { console.log(data) } */}
        </div>
    );
}

export default PieChart;