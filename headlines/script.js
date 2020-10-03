const url = "https://covid-19india-api.herokuapp.com/headlines";
const cors = "https://cors-anywhere.herokuapp.com/";

let accordion = document.getElementById('headlinesAccordion');

accordion.innerHTML = "Loading..."

fetch(cors + url)
    .then(response => response.json())
    .then(data => {
        let headlines = data.headlines;
        let summary = data.headlines_summary;

        accordion.innerHTML = ""
        headlines.forEach((h, idx) => {
            accordion.innerHTML += `<div class="card">
                    <div class="card-header" id="heading${idx}">
                        <h2 class="mb-0">
                            <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapse${idx}" aria-expanded="true" aria-controls="collapse${idx}">
                                ${h}
                        </button>
                        </h2>
                    </div>
                
                    <div id="collapse${idx}" class="collapse" aria-labelledby="heading${idx}" data-parent="#headlinesAccordion">
                        <div class="card-body">
                        ${summary[idx]}
                    </div>
                    </div>
                </div> `
        });
    });