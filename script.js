const netStatURL = "https://api.covidindiatracker.com/total.json";
const stateData = "https://api.covidindiatracker.com/state_data.json";

let netStats = document.getElementById('netStats');
let tableBody = document.getElementById('tableBody');

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

            netStats.innerHTML = `<h3><span class="badge badge-danger my-3 mx-2">Active: ${active}(+${achanges})</span>
                                <span class="badge badge-success my-3 mx-2">Recovered: ${recovered}(+${rchanges})</span>
                                <span class="badge badge-secondary my-3 mx-2">Deaths: ${deaths}(+${dchanges})</span>
                                <span class="badge badge-dark my-3 mx-2">Confirmed: ${confirmed}(+${cchanges})</span></h3>
                                `;
        })


    fetch(stateData)
        .then(response => response.json())
        .then(data => {
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

                tableBody.innerHTML += `<tr>
                                        <td>${state}</td>
                                        <td>${active} (+${aChanges})</td>
                                        <td>${recovered} (+${rChanges})</td>
                                        <td>${deaths} (+${dChanges})</td>
                                        <td>${confirmed} (+${cChanges})</td>
                                    </tr>`
            })

        })

}

update();

let searchState = document.getElementById('searchState');

searchState.addEventListener('input', () => {
    let inputText = searchState.value.toLowerCase();
    let stateCard = document.getElementsByTagName('tr');
    Array.from(stateCard).forEach(element => {
        let td = element.getElementsByTagName('td');
        if(td[0] !== undefined){
            let state = td[0].innerText.toLowerCase();
            if (state.includes(inputText)) {
                element.style.display = "table-row";
            }
            else {
                element.style.display = "none";
            }
        }
    })
})