{/* <div class="card">
    <div class="card-header" id="headingOne">
        <h2 class="mb-0">
            <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse"
                data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                Collapsible Group Item #1
                        </button>
        </h2>
    </div>

    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne"
        data-parent="#accordionExample">
        <div class="card-body">
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
            3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt
            laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin
            coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes
            anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings
            occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard
            of them accusamus labore sustainable VHS.
                    </div>
    </div>
</div> */}

function axesLinearChart(id, cases_list, dates) {
    // console.log(dates);
    let graph = document.getElementById(`graph${id}`).getContext("2d");
    var chart = new Chart(graph, {
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
        // console.log(data);
        data.forEach((e, index) => {
            let state = e["State UT"];
            let dates = Object.keys(e);
            let cases = Object.values(e);
            cases.pop();
            dates.pop();

            // console.log(dates);
            // console.log(cases);
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

searchState.addEventListener('input', () => {
    let inputText = searchState.value.toLowerCase();
    let stateCard = document.getElementsByClassName('card');
    Array.from(stateCard).forEach(element => {
        let state = element.getElementsByTagName('button')[0].innerText.toLowerCase();
        if (state.includes(inputText)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})