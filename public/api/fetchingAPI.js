function weatherBalloon( cityName, callback) {
    fetch(window.location.origin + '/weather/city?q=' + cityName)
        .then(function(resp) {
            return resp.json() }) // Convert data to json
        .then(function(data) {

            let info = setDataForCity(data)
            callback(info)

        })
        .catch(error => {

            alert("Такого города не существует! Попробуйте еще раз.")

            console.log(error)

            localStorage.removeItem(cityName)
            hideLoaderOfList(cityName)

        });
}

function currWeather(lat,lon, callback) {
    hideElements()
    showLoader()

    fetch(window.location.origin + '/weather/coordinates?lat=' + lat + '&lon=' + lon )
        .then(function (resp) {
            return resp.json()
        }) // Convert data to json
        .then(function (data) {

            let info = setDataForCity(data)
            callback(info)

        })
        .catch(function (error) {

            console.log(error)
            alert("Плохое интернет соединение !")

        })
}

function addToFavourites(city) {

}

function deleteFromFavourites(city) {

}




