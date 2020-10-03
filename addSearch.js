function search(input_element, is_table) {
    input_element.addEventListener('input', () => {
        let inputText = input_element.value.toLowerCase();
        
        if(!is_table){
            let stateCard = document.getElementsByClassName('card');
            Array.from(stateCard).forEach(element => {
                let state = element.getElementsByTagName('button')[0].innerText.toLowerCase();
                if (state.includes(inputText)) {
                    element.style.display = "block";
                }
                else {
                    element.style.display = "none";
                }
            })
        }
        
        else{
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
        }  
    })
}
