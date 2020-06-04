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

let netStats = document.getElementById('netStats');

function update() {

    fetch(netStatURL)
        .then(response => response.json())
        .then(data => {
            // let active_cases = data[1].active_cases;
            // let active_rate = data[1].active_rate;
            // let confirmed_cases = data[1].confirmed_cases;
            // let death_cases = data[1].death_cases;
            // let death_rate = data[1].death_rate;
            // let delta_change_active_cases = data[1].delta_change_active_cases;
            // let delta_change_death_cases = data[1].delta_change_death_cases;
            // let delta_change_recovered_cases = data[1].delta_change_recovered_cases;
            // let migrated_cases = data[1].migrated_cases;
            // let recovered_cases = data[1].recovered_cases;
            // let recovered_rate = data[1].recovered_rate;
            // let last_updated = data[1].last_updated;

            // netStats.innerHTML = `<span class="badge badge-danger">Active: ${active_cases}<br>+${delta_change_active_cases} @${active_rate}%</span>
            //                     <span class="badge badge-success">Recovered: ${recovered_cases}<br>+${delta_change_recovered_cases} @${recovered_rate}%</span>
            //                     <span class="badge badge-secondary" >Death: ${death_cases}<br>+${delta_change_death_cases} @${death_rate}</span>
            //                     <span class="badge badge-dark>Total: ${confirmed_cases}</span>
            //                     <span class="badge badge-dark>Migrated: ${migrated_cases}</span>
            //                     Last updates: ${last_updated}`
            //                     ;
            // console.log(data);
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
                                <span class="badge badge-secondary my-3 mx-3">Death:<br>${deaths}(+${dchanges})</span>
                                <span class="badge badge-dark my-3 mx-3">Total:<br>${confirmed}(+${cchanges})</span>
                                `;
        })


    fetch(url)
        .then(response => response.json())
        .then(data => {
            data.state.forEach(state => {
                let name = state.name;
                let active = state.active;
                let cured = state.cured;
                let death = state.death;
                let total = state.total;

                // statesList.push(name);

                // let html = "";
                stats.innerHTML += `<div class="card my-3 mx-3" style="width: 18rem;">
                                        <div class="card-header">
                                            <h3>${name}</h3>
                                        </div>
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item Active">Active: ${active}</li>
                                            <li class="list-group-item Cured">Cured: ${cured}</li>
                                            <li class="list-group-item Death">Death: ${death}</li>
                                            <li class="list-group-item">Total: ${total}</li>
                                        </ul>
                                    </div>`
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