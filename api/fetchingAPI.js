const keyID = '1cd523efa9b38726cf820da00f775a4d';



function weatherBalloon( cityName, callback) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName+ '&appid=' + keyID)
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

    fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + keyID)
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




