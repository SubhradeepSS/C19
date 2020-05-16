function update(){
    fetch("/data.json")
    .then(response => response.json())
    .then(rsp => {
        console.log(rsp.data);
        rsp.data.forEach(element => {
            latitude = element.latitude;
            longitude = element.longitude;
            cases = element.infected;
            if(cases>255){
                color = 'rgb(255,0,0)';
            }
            else{
                color = `rgb(${cases},0,0)`;
            }

            new mapboxgl.Marker({
                draggable: false,
                color: color
                })
                .setLngLat([longitude, latitude])
                .addTo(map);
        });
    })
}

update();

function show_data(){
    const json_data = '/output.json';
    map.on('load', function() {
        map.addSource('places', {
        'type': 'geojson',
        'data': json_data
        });
         
        // Add a layer showing the places.
        map.addLayer({
        'id': 'places',
        'type': 'symbol',
        'source': 'places',
        'layout': {
        'icon-image': '{icon}-15',
        'icon-allow-overlap': true
        }
        });
         
        // Create a popup, but don't add it to the map yet.
        var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
        });
         
        map.on('mouseenter', 'places', function(e) {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';
         
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.description;
         
        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
         
        // Populate the popup and set its coordinates
        // based on the feature found.
        popup
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map);
        });
         
        map.on('mouseleave', 'places', function() {
        map.getCanvas().style.cursor = '';
        popup.remove();
        });
    })
}

//show_data();

function heat_map(){
    map.on('load', function() {
        // Add a geojson point source.
        // Heatmap layers also work with a vector tile source.
        map.addSource('earthquakes', {
        'type': 'geojson',
        'data':
        '/output.json'
        });
         
        map.addLayer(
        {
        'id': 'earthquakes-heat',
        'type': 'heatmap',
        'source': 'earthquakes',
        'maxzoom': 9,
        'paint': {
        // Increase the heatmap weight based on frequency and property magnitude
        'heatmap-weight': [
        'interpolate',
        ['linear'],
        ['get', 'infected'],
        0,
        0,
        6,
        1
        ],
        // Increase the heatmap color weight weight by zoom level
        // heatmap-intensity is a multiplier on top of heatmap-weight
        'heatmap-intensity': [
        'interpolate',
        ['linear'],
        ['zoom'],
        0,
        1,
        9,
        3
        ],
        // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
        // Begin color ramp at 0-stop with a 0-transparancy color
        // to create a blur-like effect.
        'heatmap-color': [
        'interpolate',
        ['linear'],
        ['heatmap-density'],
        0,
        'rgba(33,102,172,0)',
        0.2,
        'rgb(103,169,207)',
        0.4,
        'rgb(209,229,240)',
        0.6,
        'rgb(253,219,199)',
        0.8,
        'rgb(239,138,98)',
        1,
        'rgb(178,24,43)'
        ],
        // Adjust the heatmap radius by zoom level
        'heatmap-radius': [
        'interpolate',
        ['linear'],
        ['zoom'],
        0,
        2,
        9,
        20
        ],
        // Transition from heatmap to circle layer by zoom level
        'heatmap-opacity': [
        'interpolate',
        ['linear'],
        ['zoom'],
        7,
        1,
        9,
        0
        ]
        }
        },
        'waterway-label'
        );
         
        map.addLayer(
        {
        'id': 'earthquakes-point',
        'type': 'circle',
        'source': 'earthquakes',
        'minzoom': 7,
        'paint': {
        // Size circle radius by earthquake magnitude and zoom level
        'circle-radius': [
        'interpolate',
        ['linear'],
        ['zoom'],
        7,
        ['interpolate', ['linear'], ['get', 'infected'], 1, 1, 6, 4],
        16,
        ['interpolate', ['linear'], ['get', 'infected'], 1, 5, 6, 50]
        ],
        // Color circle by earthquake magnitude
        'circle-color': [
        'interpolate',
        ['linear'],
        ['get', 'infected'],
        1,
        'rgba(33,102,172,0)',
        2,
        'rgb(103,169,207)',
        3,
        'rgb(209,229,240)',
        4,
        'rgb(253,219,199)',
        5,
        'rgb(239,138,98)',
        6,
        'rgb(178,24,43)'
        ],
        'circle-stroke-color': 'white',
        'circle-stroke-width': 1,
        // Transition from heatmap to circle layer by zoom level
        'circle-opacity': [
        'interpolate',
        ['linear'],
        ['zoom'],
        7,
        0,
        8,
        1
        ]
        }
        },
        'waterway-label'
        );
        });
}
show_data()