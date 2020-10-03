const url = "https://covid-19india-api.herokuapp.com/helpline_numbers";
const cors = "https://cors-anywhere.herokuapp.com/";

let tableBody = document.getElementById("tableBody");

fetch(cors + url)
    .then(response => response.json())
    .then(data => {
        data.contact_details.forEach(e => {
            tableBody.innerHTML += `<tr>
                                    <td>${e.state_or_UT}</td>
                                    <td>${e.helpline_number}</td>
                                </tr>`
        })
    });

let searchState = document.getElementById('searchState');

search(searchState, true)