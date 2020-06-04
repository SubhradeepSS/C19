function update(){
    const dict=0;
    fetch("js.json")
    .then(response => response.json())
    .then(json => {
        console.log(json);
        fetch("http://covid19-india-adhikansh.herokuapp.com/states")
        .then(response => response.json())
        .then(rsp => {
            let max_value=0;
            rsp.state.forEach(element => {
                max_value = Math.max(max_value, element.active);
            });
            //console.log(rsp.state);
            let i=0;
            rsp.state.forEach(element => {
                    confirmed = element.confirmed;
                    state = `State: ${element.name}`;
                    total = element.total;
                    active = element.confirmed;
                    cured = element.cured;
                    death = element.death;

                    let popup = new mapboxgl.Popup({ offset: 25 }).setText(
                        state + `\nActive: ${active}\nCured: ${cured}\nDeath: ${death}\nTotal: ${total}`
                        );
                    if(json.state[i]!==undefined)
                    {
                        longitude = json.state[i]["longi"];
                        latitude = json.state[i]["lati"];
                        color = `rgb(${Math.min(255,active)},0,0)`;
                        new mapboxgl.Marker({
                            draggable: false,
                            color: color
                            })
                            .setLngLat([longitude, latitude])
                            .addTo(map)
                            .setPopup(popup);
                    }
                    i++;
            });
        })
    });
}
update();