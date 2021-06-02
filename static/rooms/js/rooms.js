
var mymap = L.map('mapid').setView([48.8588897, 2.3200410217200766], 12)

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    // attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibHF1cmVzaDUyIiwiYSI6ImNrcGVlOWcyazAxdTgydm54ajBpZnBzdTQifQ.ASWrkx6WZlPxAyy8_iJ1hw'
}).addTo(mymap);


var rooms;
var url = '/roomapi/';

fetch(url)
    .then(response => response.json())
    .then(data => rooms = data)
    .then(showrooms => showRooms())
    .then(centerroom => centerRoom())


function showRooms(){
    rooms.forEach(room => {
        let pop = L.popup({
            closeOnClick: true,
        }).setContent(`<img src="${room.picture}" style="width: 150px;">`)

        let coords = [room.coordX, room.coordY]

        let marker = L.marker(coords).addTo(mymap).bindPopup(pop)

        let tooltip = L.tooltip({
            permanent: true
        }).setContent('₹' + room.price)

        marker.bindTooltip(tooltip).openTooltip();
    });
}


var roos = document.querySelectorAll('.room')
console.log(roos);

function centerRoom(){
    rooms.forEach((room, index) => {
        roos[index].addEventListener("mouseover", () => {
            mymap.flyTo([room.coordX, room.coordY], 12)
        })
    })
}