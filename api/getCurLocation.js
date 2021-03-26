

function getLocation() {
    let defLat  = 37.6156
    let defLon = 55.7522
    navigator.geolocation.getCurrentPosition(position => {
        currWeather(position.coords.latitude, position.coords.longitude);
        refresh()
    }, error => {
        currWeather(defLat, defLon);
        refresh()
    })
}

function updateLocation(){

    let defLat  = 37.6156
    let defLon = 55.7522
    navigator.geolocation.getCurrentPosition(position => {
        currWeather(position.coords.latitude, position.coords.longitude);
    }, error => {
        currWeather(defLat, defLon)
    })
}


