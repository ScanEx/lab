import 'leaflet/dist/leaflet.css';
import './index.css';
import L from 'leaflet';

async function getFeatures() {    
    
  /* 
    const first = await fetch('/layer');  
    const tbuf = first.toString('utf8');
    const tjson = JSON.stringify(tbuf);
    const rows = await tjson.json();
    console.log()
*/

    const response = await fetch('/layer');
    const rows = await response.json();

    return rows.map(({geojson, sceneid}) => {
        return {type: 'Feature', geometry: geojson, properties: {sceneid}};
    });
}

window.addEventListener('load', async () => {    
    const map = L.map('map').setView([60, 120.0], 4);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const features = await getFeatures();
    if (Array.isArray(features)) {
        L.geoJSON({type: 'FeatureCollection', features}).addTo(map);
    }
});
