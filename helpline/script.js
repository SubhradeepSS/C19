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

searchState.addEventListener('input', () => {
    let inputText = searchState.value.toLowerCase();
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