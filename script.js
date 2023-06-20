// const ctx = document.getElementById('myChart');
// function stockData() {
//     async function stockData() { 
//         const response = await fetch('http://127.0.0.1:5500/data.json');
//         const data = await response.json();
//         return data
//     }
//     stockData().then(data => {
//         const month = data.financialreport[0].financials.map(ele=>ele.date)
//         const profits = data.financialreport[0].financials.map(ele => ele.profits)
//         mychart.config.data.labels = month;
//         mychart.config.data.datasets[0].data = profits;
//         mychart.update()
//     })
// }

// script.js
// script.js
document.addEventListener('DOMContentLoaded', function () {
    // Sample data
    const data = [
        { date: '2023-06-01', value: 10 },
        { date: '2023-06-02', value: 15 },
        { date: '2023-06-03', value: 8 },
        { date: '2023-06-04', value: 12 },
        { date: '2023-06-05', value: 5 },
        { date: '2023-06-06', value: 22 },
        { date: '2023-06-07', value: 3 },
        { date: '2023-06-08', value: 8 },
        { date: '2023-06-09', value: 9 },
        { date: '2023-06-10', value: 1 },
        { date: '2023-06-11', value: 0 },
        { date: '2023-06-12', value: 15 },
        { date: '2023-06-13', value: 4 },
        // ...more data
        // ...more data
    ];

    // Constant array of weekdays
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Create initial chart
    createChart(data);

    // Retrieve the week value from the input element
    const weekInput = document.getElementById('weekInput');

    // Add an event listener to the input element
    weekInput.addEventListener('change', filterDataByWeek);

    // Filter data by week and update the chart
   
   
    function filterDataByWeek() {
        const selectedWeek = weekInput.value;
        const [year, week] = selectedWeek.split('-W');
        const weekStart = new Date(`${year}-01-01`);
        weekStart.setDate(weekStart.getDate() + (week - 1) * 7);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);

        const filteredData = data.filter((item) => {
            const currentDate = new Date(item.date);
            return currentDate >= weekStart && currentDate <= weekEnd;
        });

        updateChart(filteredData);
    }








    // Update the chart with the filtered data
    function updateChart(filteredData) {
        const labels = filteredData.map((item) => {
            const date = new Date(item.date);
            const weekday = weekdays[date.getDay()];
            return weekday.substring(0, 3);
        });
        const values = filteredData.map((item) => item.value);

        const ctx = document.getElementById('myChart').getContext('2d');
        if (window.myChart) {
            // If chart already exists, destroy it before creating a new one
            window.myChart.destroy();
        }
        window.myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Filtered Data',
                        data: values,
                        borderColor: 'rgba(83, 52, 115, 1)',
                        backgroundColor: 'transparent',
                        tension: 0.25,
                    },
                ],
            },
            options: {
                responsive: true,
                elements: {
                    point: {
                        backgroundColor: 'rgba(83, 52, 115, 1)',
                        borderColor: 'rgba(83, 52, 115, 1)',
                        
                        borderWidth : 5
                    },
                },
                scales: {
                    x: {
                        display: true,
                        ticks: {
                            callback: function (value, index, values) {
                                return weekdays[index]; // Display the weekday label as-is
                            }
                        }
                    },
                    y: {
                        display: true,
                    },
                },
            },
        });
    }









    // Create the initial chart
    function createChart(data) {

        const labels = data.map((item) => {
            const date = new Date(item.date);
            const weekday = weekdays[date.getDay()];
            return weekday
        });
        const values = data.map((item) => item.value);

        const ctx = document.getElementById('myChart').getContext('2d');
        window.myChart = new Chart(ctx, {
            type: 'line',
            
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Data',
                        data: values,
                        borderColor: 'rgba(83, 52, 115, 1)',
                        backgroundColor: 'green',
                        tension: 0.25
                    },
                ],
            },
            options: {
                
                responsive: true,
                plugins: {
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor : 'rgba(83, 52, 115, 1)',
                    }
                },
                elements: {
                    point: {
                        backgroundColor: 'rgba(83, 52, 115, 1)',
                        borderColor: 'rgba(83, 52, 115, 1)',
                        
                        borderWidth : 5
                    },
 
                },
                scales: {
                    x: {
                        display: true,
                        ticks: {
                            color: 'rgba(83, 52, 115, 1)',
                            callback: function (value, index, values) {
                                return value; // Display the weekday label as-is
                            }
                        },
                        border: {
                            color : 'rgba(83, 52, 115, 1)',
                        } 
                    },
                    y: {
                        display: true,
                        ticks: {
                            color: 'rgba(83, 52, 115, 1)',
                        },
                        border: {
                            color : 'rgba(83, 52, 115, 1)',
                        } 
                    },
                },
            },
        });
        
    }
});








