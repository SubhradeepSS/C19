function axesLinearChart(id, cases_list, dates) {
    let graph = document.getElementById(`graph${id}`).getContext("2d");
    new Chart(graph, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Confirmed',
                data: cases_list,
                fill: false,
                borderColor: '#FFF',
                backgroundColor: '#FFF',
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

const url = "https://covid-india-cases.herokuapp.com/statetimeline/";
let accordionExample = document.getElementById("accordionExample");

fetch(url)
    .then(response => response.json())
    .then(data => {
        data.forEach((e, index) => {
            let state = e["State UT"];
            let dates = Object.keys(e);
            let cases = Object.values(e);
            cases.pop();
            dates.pop();

            let new_div = ` <div class="card">
                    <div class="card-header" id="heading${index}">
                        <h2 class="mb-0">
                            <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse"
                                data-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                                ${state}
                            </button>
                        </h2>
                    </div>
                
                    <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}"
                        data-parent="#accordionExample">
                        <div class="card-body">
                            <div class="chart">
                                <canvas id="graph${index}"></canvas>
                            </div>
                        </div>
                    </div>
                </div> `;
            $('#accordionExample').append(new_div);
            axesLinearChart(index, cases, dates);
        });
    });

let searchState = document.getElementById('search_State');

search(searchState, false)