const keyID = '1cd523efa9b38726cf820da00f775a4d';



function weatherBalloon( cityName, callback) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName+ '&appid=' + keyID)
        .then(catchError)
        .then(function(resp) {
            return resp.json() }) // Convert data to json
        .then(function(data) {

            let info = setDataForCity(data)
            callback(info)

        })
        .catch(error => {


            if (error === "Not Found"){
                alert("Такого города не существует! Попробуйте еще раз.")
            }
            else {
                alert(error)
            }

            localStorage.removeItem(cityName)
            hideLoaderOfList(cityName)

        });
}

function currWeather(lat,lon, callback) {
    hideElements()
    showLoader()

    fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + keyID)
        .then(catchError)
        .then(function (resp) {
            return resp.json()
        }) // Convert data to json
        .then(function (data) {

            let info = setDataForCity(data)
            callback(info)

        })
        .catch(function (error) {

            if (error === "Not Found"){
                alert("Город с такими координатами не был найден...")
            }
            else {
                alert(error)
            }
        })
}


function catchError(res) {

    if (!res.ok) {
        throw res.statusText
    }

    return res
}


