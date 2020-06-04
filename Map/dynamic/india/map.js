function update(){
    const dict=0;
    fetch("js.json")
    .then(response => response.json())
    .then(json => {
        //console.log(json);
        fetch("http://covid19-india-adhikansh.herokuapp.com/states")
        .then(response => response.json())
        .then(rsp => {
            // let MAX_VALUE = 0;
            // rsp.state.forEach(element => {
            //     MAX_VALUE  = Math.max(element.confirmed,MAX_VALUE );
            // });
            // let MIN_VALUE = MAX_VALUE;
            // rsp.state.forEach(element => {
            //     MIN_VALUE  = Math.min(element.confirmed,MIN_VALUE );
            // });
            // //console.log(rsp.state);
            let i=0;
            rsp.state.forEach(element => {
                    // confirmed = element.confirmed;
                    state = element.name;
                    total = element.total;
                    active = element.active;
                    cured = element.cured;
                    death = element.death;
                    // let x = confirmed;
                    // red = (( x * 100 ) * 255) / ( MAX_VALUE - MIN_VALUE );
                    // red = Math.min(x, 255);
                    // console.log(red)

                    let popup = new mapboxgl.Popup({ offset: 25 }).setText(
                        `State: ${state}` + `; Active: ${active}; Cured: ${cured}; Death: ${death}; Total: ${total}`
                        );
                    if(json.state[i]!==undefined)
                    {
                        longitude = json.state[i]["longi"];
                        latitude = json.state[i]["lati"];
                        color = `rgb(${Math.min(active,255)},0,0)`;
                        marker = new mapboxgl.Marker({
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