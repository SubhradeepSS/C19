let chartConfig = {
  shapes: [
    {
      type: 'zingchart.maps',
      options: {
        bbox: [67.177, 36.494, 98.403, 6.965], // get bbox from zingchart.maps.getItemInfo('world-countries','ind');
        ignore: ['IND'], // ignore India because we are rendering a more specific India map below
        name: 'world.countries',
        panning: false, // turn of zooming. Doesn't work with bounding box
        style: {
          tooltip: {
            borderColor: '#000',
            borderWidth: '2px',
            fontSize: '18px'
          },
          controls: {
            visible: false // turn of zooming. Doesn't work with bounding box
          },
          hoverState: {
            alpha: .28
          }
        },
        zooming: false // turn of zooming. Doesn't work with bounding box
      }
    },
    {
      type: 'zingchart.maps',
      options: {
        name: 'ind',
        panning: false, // turn of zooming. Doesn't work with bounding box
        zooming: false,
        scrolling: false,
        style: {
          tooltip: {
            borderColor: '#000',
            borderWidth: '2px',
            fontSize: '18px'
          },
          borderColor: '#000',
          borderWidth: '2px',
          controls: {
            visible: false, // turn of zooming. Doesn't work with bounding box

          },
          hoverState: {
            alpha: .28
          },
          items: {
          },
          label: { // text displaying. Like valueBox
            fontSize: '15px',
            visible: false
          }
        },
        zooming: false // turn of zooming. Doesn't work with bounding box
      }
    }
  ]
}

const url = "https://api.covidindiatracker.com/state_data.json";

fetch(url)
  .then(response => response.json())
  .then(data => {
    data.forEach(element => {
      let id = element.id.replace("IN-", "");

      // Telangana state code: received from API: "TG", in Zingchart: "TL"
      if (id == "TG") {
        id = "TL";
      }

      chartConfig.shapes[1].options.style.items[id] = {
        tooltip: {
          text: `State : ${element.state}
          Active : ${element.active} (+${element.aChanges})
          Deaths : ${element.deaths} (+${element.dChanges})
          Recovered : ${element.recovered} (+${element.rChanges})
          Confirmed : ${element.confirmed} (+${element.cChanges})`
        },
        label: {
          visible: true
        }
      };
    });

    zingchart.loadModules('maps,maps-ind');
    zingchart.render({
      id: 'myChart',
      data: chartConfig,
      height: '100%',
      width: '100%',
    });
  });