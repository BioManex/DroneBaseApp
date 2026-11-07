let altChartButton = document.getElementById('alt-chart');
let lidarChartButton = document.getElementById('lidar-chart');

let lidarData = [
    {x: 15, y: 28},
    {x: 4, y: -15},
    {x: -3, y: 10}
];

let altitudeData = [
    {x: 1, y:6},
    {x: 2, y:4},
    {x: 3, y:10},
    {x: 4, y:8},
    {x: 5, y:9},
    {x: 6, y:14},
    {x: 7, y:16},

]

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
    animation: true
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
        options: lidarConfig
    }
);

lidarChartButton.addEventListener('click', function(){
    if(lidarChartButton.classList.contains('inactive-button')){
    chart.destroy();
    chart = new Chart(
    document.getElementById("data-chart"), {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Positions',
                data: lidarData,
                borderColor: '#00ffcc'
            }],
        },
        options: lidarConfig}
    );

    lidarChartButton.classList.add('active-button');
    lidarChartButton.classList.remove('inactive-button');
    altChartButton.classList.remove('active-button');
    altChartButton.classList.add('inactive-button');
    }
});
altChartButton.addEventListener('click', function(){
    if(altChartButton.classList.contains('inactive-button')){
    chart.destroy();
    chart = new Chart(
    document.getElementById("data-chart"), {
        type: 'line',
        data: {
            datasets: [{
                label: 'Positions',
                data: altitudeData,
                borderColor: '#00ffcc'
            }],
        },
        options: altitudeConfig}
    );

    lidarChartButton.classList.remove('active-button');
    lidarChartButton.classList.add('inactive-button');
    altChartButton.classList.add('active-button');
    altChartButton.classList.remove('inactive-button');
    }
});