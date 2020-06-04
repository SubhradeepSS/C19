document.addEventListener('DOMContentLoaded',update);

function update(){
    fetch("https://corona.lmao.ninja/v2/countries?yesterday&sort")
    .then(response => response.json())
    .then(rsp => {
        //console.log(rsp.data);
        rsp.forEach(element => {
            country = element.country;
            latitude = element.countryInfo.lat;
            longitude = element.countryInfo.long;
            cases = element.cases;
            death = element.death;
            recovered = element.recovered;
            
            color = `rgb(${Math.min(cases,255)},0,0)`;
            
            popup=`${country}:${cases}`;

            new mapboxgl.Marker({
                draggable: false,
                color: color
                })
                .setLngLat([longitude, latitude])
                .setPopup(popup)
                .addTo(map);
        });
    })
}