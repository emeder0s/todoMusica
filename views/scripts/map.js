

navigator.geolocation.getCurrentPosition((position) => {
    localStorage.setItem("coords", JSON.stringify([position.coords.latitude, position.coords.longitude]))
});
var coords = JSON.parse(localStorage.getItem("coords"));
console.log(coords)
const mapId = "map";                                       //* Id index del mapa
const initialCoordinates = coords;       //* Cordenadas iniciales (Plaza Sol en Madrid [lat, lng])
const map = L.map(mapId).setView(initialCoordinates, 13);
//* const Map = (Nos inserta el mapa en el div "map").(Centrada en la cordenada inicial, Zoom = 5)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var appleIcon = L.icon({
    iconUrl: './img/apple.png',
    iconSize: [38, 38], // size of the icon
    shadowSize: [0,0], // size of the shadow
    iconAnchor: [20,20], // point of the icon which will correspond to marker's location
    popupAnchor: [0,0] // point from which the popup should open relative to the iconAnchor
});
var alcampoIcon = L.icon({
    iconUrl: './img/alcampo.png',
    iconSize: [38, 38], // size of the icon
    shadowSize: [0,0], // size of the shadow
    iconAnchor: [20,20], // point of the icon which will correspond to marker's location
    popupAnchor: [0,0] // point from which the popup should open relative to the iconAnchor
});
var todomusicaIcon = L.icon({
    iconUrl: './img/todomusica.png',


    iconSize: [38, 38], // size of the icon
    shadowSize: [0,0], // size of the shadow
    iconAnchor: [20,20], // point of the icon which will correspond to marker's location
    popupAnchor: [0,0] // point from which the popup should open relative to the iconAnchor
});

function showAlcampo() {
    fetch("/jsons/alcampo.json")
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
            for (let i = 0; i < res.length; i++) {
                var marker = L.marker([res[i].lat, res[i].lon], { icon: alcampoIcon }).addTo(map);
                marker.bindPopup(`<b>${res[i].display_name}</b><br><a onclick="selectstore(${res[i].place_id})">Selecionar Punto de Recogida</a>`);
            }

        });
}
function showApple() {
    fetch("/jsons/applestore.json")
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
            for (let i = 0; i < res.length; i++) {
                var marker = L.marker([res[i].lat, res[i].lon], { icon: appleIcon }).addTo(map);
                marker.bindPopup(`<b>${res[i].display_name}</b><br><a <a onclick="selectstore(${res[i].place_id})">Selecionar Punto de Recogida</a>`);
            }

        });
}
function showTodomusica() {
    fetch("/jsons/centers.json")
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
            for (let i = 0; i < res.length; i++) {
                var marker = L.marker([res[i].coordinates.split(", ")[0],res[i].coordinates.split(", ")[1]], { icon: todomusicaIcon }).addTo(map);
                marker.bindPopup(`<b>${res[i].center_name}</b><p>${res[i].address + " " + res[i].phone_number}</p><br><a onclick="selectstore(${res[i]._id.$oid})">Selecionar Punto de Recogida</a>`);
            }

        });
}

function selectstore(id_tienda){
    
}