{/* <div class="card my-3 mx-3" style="width: 18rem;">
    <div class="card-header">
        Featured
        </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">Cras justo odio</li>
        <li class="list-group-item">Dapibus ac facilisis in</li>
        <li class="list-group-item">Vestibulum at eros</li>
    </ul>
</div> */}

{/* <span class="badge badge-danger">Active</span>
      <span class="badge badge-success">Cured</span>
      <span class="badge badge-secondary">Death</span>
      <span class="badge badge-dark">Total</span> */}

let stats = document.getElementById('stats');
const url = "http://covid19-india-adhikansh.herokuapp.com/states";
// const netStatURL = "https://covid-19india-api.herokuapp.com/all";
const netStatURL = "https://api.covidindiatracker.com/total.json";
// const newURL = "https://covid-19india-api.herokuapp.com/v2.0/country_data";
const stateData = "https://api.covidindiatracker.com/state_data.json";

let netStats = document.getElementById('netStats');

function update() {

    fetch(netStatURL)
        .then(response => response.json())
        .then(data => {
            let active = data["active"];
            let confirmed = data["confirmed"];
            let recovered = data["recovered"];
            let deaths = data["deaths"];
            let achanges = data["achanges"];
            let cchanges = data["cchanges"];
            let rchanges = data["rchanges"];
            let dchanges = data["dchanges"];

            netStats.innerHTML = `<span class="badge badge-danger my-3 mx-3">Active:<br>${active}(+${achanges})</span>
                                <span class="badge badge-success my-3 mx-3">Recovered:<br>${recovered}(+${rchanges})</span>
                                <span class="badge badge-secondary my-3 mx-3">Deaths:<br>${deaths}(+${dchanges})</span>
                                <span class="badge badge-dark my-3 mx-3">Confirmed:<br>${confirmed}(+${cchanges})</span>
                                `;
        })


    fetch(stateData)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            data.forEach(element => {
                let state = element.state;
                let active = element.active;
                let confirmed = element.confirmed;
                let recovered = element.recovered;
                let deaths = element.deaths;
                let aChanges = element.aChanges;
                let dChanges = element.dChanges;
                let cChanges = element.cChanges;
                let rChanges = element.rChanges;

                stats.innerHTML += `<div class="card my-3 mx-3" style="width: 18rem;">
                                        <div class="card-header">
                                            <h3>${state}</h3>
                                        </div>
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item Active">Active: ${active} (+${aChanges})</li>
                                            <li class="list-group-item Cured">Cured: ${recovered} (+${rChanges})</li>
                                            <li class="list-group-item Death">Deaths: ${deaths} (+${dChanges})</li>
                                            <li class="list-group-item">Confirmed: ${confirmed} (+${cChanges})</li>
                                        </ul>
                                    </div>`;
            })

        })

}

update();


let searchState = document.getElementById('searchState');

searchState.addEventListener('input', () => {
    let inputText = searchState.value.toLowerCase();
    let stateCard = document.getElementsByClassName('card');
    Array.from(stateCard).forEach(element => {
        let state = element.getElementsByTagName('h3')[0].innerText.toLowerCase();
        if (state.includes(inputText)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})