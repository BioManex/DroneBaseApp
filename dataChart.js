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
            min: 0,
            max: 40,
            grid: {
                display: true
            },
            border: {
                display: true,
                color: '#000000'
            },
        },
        y: {
            type: 'linear',
            min: 0,
            max: 40,
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

new Chart(
    document.getElementById("data-chart"), {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Positions',
                data: lidarData,
                backgroundColor: '#00ffcc'
            }],
        },
        options: lidarConfig});