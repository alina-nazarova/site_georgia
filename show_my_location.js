let map = null;
let ourCoords = {
    latitude: 56.32734532413528,
    longitude: 44.02566075393573
};//56.32734532413528, 44.02566075393573

window.onload = getMyLocation;

function getMyLocation() {
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
    displayLocation,
    displayError);
    }
    else {
        alert("Геолокация не поддерживается(");
    }
}

function displayLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let div = document.getElementById("location");
    div.innerHTML = "<b>Ваша широта: </b>" + latitude + ", <b>долгота: </b>" + longitude;
    let km = computeDistance(position.coords, ourCoords);
    let distance = document.getElementById("distance");
    distance.innerHTML = "<b>Расстояние </b>" + km + " км от 1 корпуса НГТУ им. Р.Е. Алексеева";
    showMap(position.coords);
}

function computeDistance(startCoords, destCoords) {
    let startLatRads = degreesToRadians(startCoords.latitude);
    let startLongRads = degreesToRadians(startCoords.longitude);
    let destLatRads = degreesToRadians(destCoords.latitude);
    let destLongRads = degreesToRadians(destCoords.longitude);
    let Radius = 6371; 
    let distance = Math.acos(Math.sin(startLatRads) *
    Math.sin(destLatRads) +
    Math.cos(startLatRads) * Math.cos(destLatRads) *
    Math.cos(startLongRads - destLongRads)) * Radius;
    return distance;
}

function degreesToRadians(degrees) {
    radians = (degrees * Math.PI)/180;
    return radians;
}

function showMap(coords) {
    let googleLatAndLong = new google.maps.LatLng(coords.latitude,
    coords.longitude);
    let mapOptions = {
        zoom: 15,
        center: googleLatAndLong,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    let mapDiv = document.getElementById("map");
    map = new google.maps.Map(mapDiv, mapOptions);
    let title = "Ваше местоположение";
    let content = "Вы здесь: " + coords.latitude + ", " + coords.longitude;
    addMarker(map, googleLatAndLong, title, content);
}

function addMarker(map, latlong, title, content) {
    let markerOptions = {
		position: latlong,
		map: map,
		title: title,
		clickable: true
	};

	const pos = {
		lat: 56.32734532413528,
		lng: 44.02566075393573,
	};

	let markerOptions2 = {
		position: pos,
		map: map,
		title: title,
		clickable: true
	};

	let marker = new google.maps.Marker(markerOptions);

	let marker2 = new google.maps.Marker(markerOptions2);


	let infoWindowOptions = {
		content: content,
		position: latlong
	};

	let infoWindow = new google.maps.InfoWindow(infoWindowOptions);

	google.maps.event.addListener(marker, 'click', function () {
		infoWindow.open(map);
	});
}

function displayError(error) {
    let errorTypes = {
        0: "Неизвестная ошибка",
        1: "Доступ запрещен",
        2: "Позиция недоступна",
        3: "Время ожидания запроса"
    };
    let errorMessage = errorTypes[error.code];
        if (error.code == 0 || error.code == 2) {
        errorMessage = errorMessage + " " + error.message;
    }
    let div = document.getElementById("location");
    div.innerHTML = errorMessage;
}
