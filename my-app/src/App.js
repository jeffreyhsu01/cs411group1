import React from 'react';
import './App.css';
import MapComponent from './map/map.js';
import mapboxgl from 'mapbox-gl';
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

function App() {
  return (
    <div className="App">
        <div style={{alignItems: 'center'}}>
          <MapComponent></MapComponent>
        </div>
    </div>
  );
}

export default App;
