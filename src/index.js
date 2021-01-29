import 'leaflet/dist/leaflet.css';
import './index.css';
import L from 'leaflet';

async function getFeatures() {    
    
    const arr = await fetch('/layer');
    var j = 0;
    var js = [];
    while(j < arr.length)
    {
        const obj = {sceneid: arr[j], geojson: arr[j+1]};
        js.push(obj);
        j=j+1;
    }
    const response = JSON.stringify(js);
    //  сonst response = await fetch('/layer');
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
