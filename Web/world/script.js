const url = "https://covid-19india-api.herokuapp.com/global";
const cors = "https://cors-anywhere.herokuapp.com/";

let statsRow = document.getElementById('statsRow');
let updatesDiv = document.getElementById('updates');

fetch(cors + url)
.then(response => response.json())
.then(data => {
    let stats = data.data;
    let updates = data.updates;
    console.log(data);

    let confirmed_cases = stats.confirmed_cases;
    let active_cases = stats.active_cases;
    let recovered_cases = stats.recovered_cases;
    let death_cases = stats.death_cases;
    let active_rate = stats.active_rate;
    let death_rate = stats.death_rate;
    let recovered_rate = stats.recovered_rate;

    statsRow.innerHTML = `<h2><span class="badge badge-dark">Confirmed : ${confirmed_cases}</span>
                            <span class="badge badge-danger">Active : ${active_cases} (@${active_rate})</span>
                            <span class="badge badge-success">Recovered : ${recovered_cases} (@${recovered_rate})</span>
                            <span class="badge badge-secondary">Death : ${death_cases} (@${death_rate})</span></h2>`;
    
    updates.forEach(e => {
        updatesDiv.innerHTML += `<li class="list-group-item list-group-item-action my-1">${e}</li>`;
    });

});