var mapId = "registerMap";
var Longitude, Latitude;
//var Longitude = '39.752863237304666', Latitude = '21.381081868477278';

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    ShowMessageSwal("w:", "Geolocation is not supported by this browser.");
  }
}

function showPosition(position = "") {
  if (
    typeof customeLongitude !== "undefined" &&
    typeof customeLatitude !== "undefined"
  ) {
    Longitude = customeLongitude;
    Latitude = customeLatitude;
  } else {
    Longitude = position.coords.latitude;
    Latitude = position.coords.longitude;
  }
  initMap(Longitude, Latitude);
}

getLocation();

function initMap(longitude = Longitude, latitude = Latitude) {
  if (typeof google === "object" && typeof google.maps === "object") {
    const map = new google.maps.Map(document.getElementById(mapId), {
      zoom: 7,
      center: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
    });
    const myLatlng = new google.maps.LatLng(
      parseFloat(latitude),
      parseFloat(longitude)
    );
    addMarker(myLatlng, "Default Marker", map);
    $("#latForm").val(latitude);
    $("#lngForm").val(longitude);
    map.addListener("click", function (event) {
      addMarker(event.latLng, "Click Generated Marker", map);
      handleEvent(event);
    });
  }
}

function handleEvent(event) {
  $("#latForm").val(event.latLng.lat());
  $("#lngForm").val(event.latLng.lng());
}

var currentMarker;

function addMarker(latlng, title, map) {
  if (currentMarker) {
    currentMarker.setMap(null);
  }
  var marker = new google.maps.Marker({
    position: latlng,
    map: map,
    title: title,
    draggable: true,
  });
  marker.addListener("click", () => {
    map.setZoom(16);
    map.setCenter(marker.getPosition());
  });
  marker.addListener("drag", handleEvent);
  marker.addListener("dragend", handleEvent);
  currentMarker = marker;
}

document.writeln(
  `<script async defer src="https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap"></script>`
);
