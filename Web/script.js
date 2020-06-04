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
const netStatURL = "http://covid19-india-adhikansh.herokuapp.com/summary";

let netStats = document.getElementById('netStats');

function update() {

    fetch(netStatURL)
    .then(response => response.json())
    .then(data => {
        let activeT = data["Active cases"];
        let curedT = data["Cured/Discharged/Migrated"];
        let deathT = data["Death"];
        let totalT = data["Total Cases"]
        netStats.innerHTML = `<span class="badge badge-danger">Active: ${activeT}</span>
                                <span class="badge badge-success">Cured: ${curedT}</span>
                                <span class="badge badge-secondary">Death: ${deathT}</span>
                                <span class="badge badge-dark">Total: ${totalT}</span>`
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
                                            <b>${name}</b>
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
        let state = element.getElementsByTagName('b')[0].innerText.toLowerCase();
        if(state.includes(inputText)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })
})