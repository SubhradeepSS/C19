import React from 'react';
import './App.css';
import IndiaTotal from './components/IndiaTotal'
import WorldTotal from './components/WorldTotal'
import IndiaState from './components/IndiaState'
import CountryData from './components/CountryData'

function App() {
  return (
    <div className="App">
      <IndiaTotal />
      <IndiaState />
      <WorldTotal />
      <CountryData />
    </div>
  );
}

export default App;
