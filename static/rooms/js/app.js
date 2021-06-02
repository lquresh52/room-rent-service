var roomAddress = document.querySelector('#address');

var addresses = document.querySelector('#addresses')
var addressInput = document.querySelector('#id_address');
var coordXInput = document.querySelector('#id_coordX');
var coordYInput = document.querySelector('#id_coordY');

function showAddresses(){
    addresses.innerHTML = '';
    if (addressData.length > 0){
        addressData.forEach(address => {

            addresses.innerHTML += `<div class="result" onclick="selectAddress(${address.lat},${address.lon},'${address.display_name}')">
            ${address.display_name}
            </div>`;
        });
    }
    
}

function selectAddress(x,y,name){
    addressInput.value = name;
    coordXInput.value = x;
    coordYInput.value = y;
    mymap.flyTo([x,y], 16);
    marker.closePopup();
    marker.setLatLng([x,y]);
    marker.closePopup();
}


function findAddresses(){
    var url = "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" + roomAddress.value;
    fetch(url)
            .then(response => response.json())
            .then(data => addressData = data)
            .then(showAddress => showAddresses())
            .catch(error => console.log(error))
}


var mymap = L.map('mapid').setView([48.8588897, 2.3200410217200766], 12)

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    // attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibHF1cmVzaDUyIiwiYSI6ImNrcGVlOWcyazAxdTgydm54ajBpZnBzdTQifQ.ASWrkx6WZlPxAyy8_iJ1hw'
}).addTo(mymap);

var marker = L.marker([48.8588897, 2.3200410217200766]).addTo(mymap);