const url = "https://covid-19india-api.herokuapp.com/global";
const cors = "https://cors-anywhere.herokuapp.com/";
const globalC = "https://api.covid19api.com/summary";

const statsRow = document.getElementById('statsRow');
const updatesDiv = document.getElementById('updates');
const tableBody = document.getElementById('tableBody');

statsRow.innerHTML = "Loading..."
updatesDiv.innerHTML = "Loading..."

fetch(cors + url)
    .then(response => response.json())
    .then(data => {
        const stats = data.data;
        const updates = data.updates;

        statsRow.innerHTML = `<h3><span class="badge badge-dark">Confirmed : ${stats.confirmed_cases}</span>
                            <span class="badge badge-danger">Active : ${stats.active_cases} (@${stats.active_rate})</span>
                            <span class="badge badge-success">Recovered : ${stats.recovered_cases} (@${stats.recovered_rate})</span>
                            <span class="badge badge-secondary">Death : ${stats.death_cases} (@${stats.death_rate})</span></h3>`;

        updatesDiv.innerHTML = ""
        updates.forEach(e => {
            updatesDiv.innerHTML += `<li class="list-group-item list-group-item-action my-1">${e}</li>`
        })
    })

fetch(globalC)
    .then(response => response.json())
    .then(data => {
        data.Countries.forEach(e => {
            tableBody.innerHTML += `<tr>
                                        <td>${e.Country}</td>
                                        <td>${e.TotalConfirmed} (+${e.NewConfirmed})</td>
                                        <td>${e.TotalRecovered} (+${e.NewRecovered})</td>
                                        <td>${e.TotalDeaths} (+${e.NewDeaths})</td> 
                                    </tr>` ;
        })
    })

const searchCountry = document.getElementById('searchCountry');
search(searchCountry, true)

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