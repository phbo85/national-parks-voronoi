import './styles.css';
import React, { useState } from 'react';
import MapGL, { Source, Layer } from 'react-map-gl';
import npData from './data.json';
import voronoi from '@turf/voronoi';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoicGhibyIsImEiOiItbVZnWG8wIn0.iodkyfuuo5Ddh5n9tMzpTw';

const pointLayer = {
  id: 'points',
  type: 'symbol',
  source: 'points',
  layout: {
    'text-field': ['get', 'Name'],
    'text-offset': [0, 0],
    'text-anchor': 'top',
    'icon-size': 50
  },
  paint: {
    'text-color': '#fff',
    'text-halo-color': 'rgba(0,255,0,0.5)',
    'text-halo-width': 1,
    'text-halo-blur': 5,
    'icon-color': '#f00'
  }
};
const dataLayer = {
  id: 'data',
  type: 'line',
  paint: {
    'line-color': '#39ff14',
    'line-blur': 2,
    'line-width': 3
  }
};
const initialViewport = {
  longitude: -100,
  latitude: 40,
  zoom: 3,
  pitch: 30,
  bearing: 0
};

const voronoiPolygons = voronoi(npData);

export default function Map() {
  const [viewport, setViewport] = useState(initialViewport);

  return (
    <>
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={setViewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={['data']}
      >
        <Source type="geojson" data={npData}>
          <Layer {...pointLayer} />
        </Source>
        <Source type="geojson" data={voronoiPolygons}>
          <Layer {...dataLayer} />
        </Source>
      </MapGL>
    </>
  );
}
