const netStatURL = "https://api.covidindiatracker.com/total.json";
const stateData = "https://api.covidindiatracker.com/state_data.json";

let netStats = document.getElementById('netStats');
let tableBody = document.getElementById('tableBody');

netStats.innerHTML = "Loading..."

function update() {
    fetch(netStatURL)
        .then(response => response.json())
        .then(data => {

            netStats.innerHTML = `<h3><span class="badge badge-danger my-3 mx-2">Active: ${data["active"]}(+${data["achanges"]})</span>
                                <span class="badge badge-success my-3 mx-2">Recovered: ${data["recovered"]}(+${data["rchanges"]})</span>
                                <span class="badge badge-secondary my-3 mx-2">Deaths: ${data["deaths"]}(+${data["dchanges"]})</span>
                                <span class="badge badge-dark my-3 mx-2">Confirmed: ${data["confirmed"]}(+${data["cchanges"]})</span></h3>
                                `;
        })

    fetch(stateData)
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                tableBody.innerHTML += `<tr>
                                        <td>${element.state}</td>
                                        <td>${element.active} (+${element.aChanges})</td>
                                        <td>${element.recovered} (+${element.rChanges})</td>
                                        <td>${element.deaths} (+${element.dChanges})</td>
                                        <td>${element.confirmed} (+${element.cChanges})</td>
                                    </tr>`
            })

        })

}

update();

let searchState = document.getElementById('searchState');

search(searchState, true)