import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios'

let getHeatMapData = [];

axios.get("https://api.covidindiatracker.com/state_data.json")
  .then(resp => {
    resp.data.forEach(state => {
      getHeatMapData.push({
        id: state.id.substr(3),
        state: state.state,
        value: state.active,
        text: `Active: ${state.active}(+${state.achanges}) ; Confirmed: ${state.confirmed}(+${state.cchanges}) ; Deaths: ${state.deaths}(+${state.dchanges}) ; Recovered: ${state.recovered}(+${state.rchanges})`
      })
    })
  })
  .then(() => {
    console.log(getHeatMapData)
    ReactDOM.render(
      <React.StrictMode>
        <App getHeatMapData={getHeatMapData} />
      </React.StrictMode>,
      document.getElementById('root')
    );
  })

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
