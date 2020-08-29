const url = "https://covid-19india-api.herokuapp.com/global";
const cors = "https://cors-anywhere.herokuapp.com/";
const globalC = "https://api.covid19api.com/summary";

let statsRow = document.getElementById('statsRow');
let updatesDiv = document.getElementById('updates');
let tableBody = document.getElementById('tableBody');

fetch(cors + url)
    .then(response => response.json())
    .then(data => {
        let stats = data.data;
        let updates = data.updates;

        let confirmed_cases = stats.confirmed_cases;
        let active_cases = stats.active_cases;
        let recovered_cases = stats.recovered_cases;
        let death_cases = stats.death_cases;
        let active_rate = stats.active_rate;
        let death_rate = stats.death_rate;
        let recovered_rate = stats.recovered_rate;

        statsRow.innerHTML = `<h3><span class="badge badge-dark">Confirmed : ${confirmed_cases}</span>
                            <span class="badge badge-danger">Active : ${active_cases} (@${active_rate})</span>
                            <span class="badge badge-success">Recovered : ${recovered_cases} (@${recovered_rate})</span>
                            <span class="badge badge-secondary">Death : ${death_cases} (@${death_rate})</span></h3>`;

        updates.forEach(e => {
            updatesDiv.innerHTML += `<li class="list-group-item list-group-item-action my-1">${e}</li>`;
        });

    });

fetch(globalC)
    .then(response => response.json())
    .then(data => {
        data.Countries.forEach(e => {
            let country = e.Country;        
            let confirmed = e.TotalConfirmed;
            let cChanges = e.NewConfirmed;
            let deaths = e.TotalDeaths;
            let dChanges = e.NewDeaths;
            let recovered = e.TotalRecovered;
            let rChanges = e.NewRecovered;

            tableBody.innerHTML += `<tr>
                                        <td>${country}</td>
                                        <td>${confirmed} (+${cChanges})</td>
                                        <td>${recovered} (+${rChanges})</td>
                                        <td>${deaths} (+${dChanges})</td>
                                        
                                    </tr>` ;
        })
    })

let searchCountry = document.getElementById('searchCountry');

searchCountry.addEventListener('input', () => {
    let inputText = searchCountry.value.toLowerCase();
    let stateCard = document.getElementsByTagName('tr');
    Array.from(stateCard).forEach(element => {
        let td = element.getElementsByTagName('td');
        if (td[0] !== undefined) {
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

window.smoothScroll = (target) => {
    let scrollContainer = target;
    do { 
        scrollContainer = scrollContainer.parentNode;
        if (!scrollContainer) return;
        scrollContainer.scrollTop += 1;
    } while (scrollContainer.scrollTop == 0);

    let targetY = 0;
    do { 
        if (target == scrollContainer) 
            break;
        targetY += target.offsetTop;
    } while (target = target.offsetParent);

    scroll = (c, a, b, i) => {
        i++; 
        if(i > 30) 
            return;
        c.scrollTop = a + (b - a) / 30 * i;
        setTimeout(() =>  scroll(c, a, b, i), 20);
    }
    
    scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
}
