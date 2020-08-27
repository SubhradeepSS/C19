let my_chart;
function axesLinearChart(cases_list, recovered_list, deaths_list, active_list, dates) {

    if (my_chart) {
        my_chart.destroy();
    }
    let graph = document.getElementById('graph').getContext("2d");
    my_chart = new Chart(graph, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Confirmed',
                data: cases_list,
                fill: false,
                borderColor: '#FFF',
                backgroundColor: '#FFF',
                borderWidth: 1
            }, {
                label: 'Recovered',
                data: recovered_list,
                fill: false,
                borderColor: '#009688',
                backgroundColor: '#009688',
                borderWidth: 1
            }, {
                label: 'Deaths',
                data: deaths_list,
                fill: false,
                borderColor: '#A9A9A9',
                backgroundColor: '#A9A9A9',
                borderWidth: 1
            }, {
                label: 'Active',
                data: active_list,
                fill: false,
                borderColor: '#f44336',
                backgroundColor: '#f44336',
                borderWidth: 1
            }],
            labels: dates
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                xAxes: [{
                    ticks: {
                        fontSize: 10
                    }
                }],
                yAxes: [{
                    ticks: {
                        fontSize: 10
                    }
                }]
            },
        }
    });
}

const url = "https://api.covid19india.org/data.json";

fetch(url)
    .then(response => response.json())
    .then(DATA => {
        // console.log(data);
        let data = DATA.cases_time_series;
        let active = [], confirmed = [], death = [], recovered = [], date = [];

        data.forEach(element => {
            confirmed.push(parseInt(element.totalconfirmed));
            death.push(parseInt(element.totaldeceased));
            recovered.push(parseInt(element.totalrecovered));
            active.push(parseInt(element.totalconfirmed)-parseInt(element.totaldeceased)-parseInt(element.totalrecovered));
            date.push(element.date);
        });
        axesLinearChart(confirmed, recovered, death, active, date);
    })