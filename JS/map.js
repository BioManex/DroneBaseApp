import { LeafletMap, SimpleCRS, ImageOverlay, Icon, Marker} from "../Leaflet/leaflet.js";

const map = new LeafletMap('map', {zoomControl: false, crs: SimpleCRS, attributionControl: false});
const bounds = [[0,0], [400,400]];
new ImageOverlay('Resources/gridImage.png', bounds).addTo(map);
map.setView([200,200], 2);

const droneIcon = new Icon({
    iconUrl: "./Resources/mapDroneIcon.png",
    iconSize: [32, 32],
    iconAnchor: [12, 12]
});

const droneMarker = new Marker([200, 200], {icon: droneIcon, rotation: 45}).addTo(map);

function updateDronePosition(x, y, rotation) {
    droneMarker.setLatLng([x + 200, y + 200]);
    droneMarker.setRotation(rotation + 45);
}



