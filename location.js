let getWrap = document.querySelector("#wrap");
let getinputedIp = document.querySelector("#inputDiv input")
let getResult = document.querySelector("#result");
let getIpAddess = document.querySelector("#ip h3");
let getLocation = document.querySelector("#location h3");
let getTimezone = document.querySelector("#timezone h3");
let getIsp = document.querySelector("#isp h3");
let getMap = document.querySelector("#map")

let getBrowserLocation = async function() {
      let curl = await fetch('https://geo.ipify.org/api/v2/country,city?apiKey=at_O0wKaCB6abjLxeWhJ7YWCRQoeR2mq');
      let Res = await curl.json();
      console.log(Res);
      uploadData(Res);
}

let manualIp = async function () {
  let ip = getinputedIp.value;
  let curl = await fetch('https://geo.ipify.org/api/v2/country?apiKey=at_O0wKaCB6abjLxeWhJ7YWCRQoeR2mq&ipAddress=' + ip);
  let Res = await curl.json();
  setTimeout(() => {
    alert("INVALID IP ADDRESS")
  },1000)
  
}

let uploadData = function (y) {
  getResult.style.display = "block";
  getLocation.innerHTML = y.location.city + ", " + y.location.country;
  getTimezone.innerHTML = "UTC " + y.location.timezone;
  getIsp.innerHTML = y.isp;
  getIpAddess.innerHTML = y.ip;
     loadMap(y);
}


let loadMap = function (x) {
  //alert(x.location.lat);
  
  let lat = x.location.lat;
  let lng = x.location.lng;
  var map = L.map('map').setView([lat, lng], 10);
  
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoic2F5a2VlZCIsImEiOiJja3o4NXBrNjkwNjRxMnVvMXNneTZiM24yIn0.0N8-JgmX_a8P22HmLWZ24g'
  }).addTo(map);
  
  L.marker([lat, lng]).addTo(map);
}

let clearMap = function () {

}



 
window.onload = setTimeout(() => {
   getBrowserLocation()
 }, 1000)
 