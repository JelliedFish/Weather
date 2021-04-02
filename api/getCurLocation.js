

getLocation()
function getLocation() {

    initLoaders()

    let defLat  = 37.6156
    let defLon = 55.7522
    navigator.geolocation.getCurrentPosition(position => {

        currWeather(position.coords.latitude, position.coords.longitude, function (data){
            weatherForCurCity(data)
        });

        updateList();


    }, error => {

        currWeather(defLat, defLon, function (data){
            weatherForCurCity(data)
        });

        updateList();

        console.log(error)
    })
}

function updateLocation(){

    let defLat  = 37.6156
    let defLon = 55.7522
    navigator.geolocation.getCurrentPosition(position => {
        currWeather(position.coords.latitude, position.coords.longitude, function (data){
            weatherForCurCity(data)
        });

    }, error => {

        currWeather(defLat, defLon, function (data){
            weatherForCurCity(data)
        })

        console.log(error)

    })
}



