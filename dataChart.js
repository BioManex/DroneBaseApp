let altChartButton = document.getElementById('alt-chart');
let lidarChartButton = document.getElementById('lidar-chart');

let lidarData = [
    {x: 15, y: 28},
    {x: 4, y: -15},
    {x: -3, y: 10}
];

const lidarConfig = {
    scales: {
        x: {
            type: 'linear',
            position: 'center',
            min: -40,
            max: 40,
            grid: {
                display: false
            },
            border: {
                display: true,
                color: '#000000'
            },
            ticks: {
                display: false
            }
        },
        y: {
            type: 'linear',
            position: 'center',
            min: -40,
            max: 40,
            grid: {
                display: false
            },
            border: {
                display: true,
                color: '#000000'
            },
            ticks: {
                display: false
            }
        },
    },
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        },
    },
    animation: false
}

const altitudeConfig = {
    scales: {
        x: {
            type: 'linear',
            grid: {
                display: true
            },
            border: {
                display: true,
                color: '#000000'
            },
            ticks: {display: false}
        },
        y: {
            type: 'linear',
            grid: {
                display: true
            },
            border: {
                display: true,
                color: '#000000'
            },
        },
    },
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        },
    },
    animation: true
}

let chart = new Chart(
    document.getElementById("data-chart"), {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Positions',
                data: lidarData,
                borderColor: '#00ffcc'
            }],
        },
        options: lidarConfig});

lidarChartButton.addEventListener('click', function(){
    chart.options = lidarConfig;
    chart.type = 'scatter';
    chart.update();
    lidarChartButton.classList.add('active-button');
    lidarChartButton.classList.remove('inactive-button');
    altChartButton.classList.remove('active-button');
    altChartButton.classList.add('inactive-button');
});
altChartButton.addEventListener('click', function(){
    chart.options = altitudeConfig;
    chart.type = 'line';
    chart.update();
    lidarChartButton.classList.remove('active-button');
    lidarChartButton.classList.add('inactive-button');
    altChartButton.classList.add('active-button');
    altChartButton.classList.remove('inactive-button');
});