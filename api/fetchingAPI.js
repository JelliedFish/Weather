
const key = '1cd523efa9b38726cf820da00f775a4d';


function weatherBalloon( cityName ) {

    document.getElementById("element-"+cityName)
        .getElementsByClassName("header_of_city")[0].style.visibility = "collapse"
    document.getElementById("element-"+cityName)
        .getElementsByClassName("conditions")[0].style.visibility = "collapse"
    document.getElementById("loader-"+cityName).style.visibility = "visible"


    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName+ '&appid=' + key)
        .then(function(resp) {
            return resp.json() }) // Convert data to json
        .then(function(data) {

            document.getElementById("element-"+cityName)
                .getElementsByClassName("header_of_city")[0]
                .getElementsByClassName("name")[0].innerHTML = cityName

            document.getElementById("element-"+cityName)
                .getElementsByClassName("header_of_city")[0]
                .getElementsByClassName("temperature")[0].innerHTML =  Math.round(data.main.temp - 273.15)+"°C"


            document.getElementById("element-"+cityName)
                .getElementsByClassName("conditions")[0]
                .getElementsByClassName("condition-element-wind")[0]
                .getElementsByClassName("condition_value")[0].innerHTML = "Скорость ветра: " + data.wind.speed + " м/c"


            document.getElementById("element-"+cityName)
                .getElementsByClassName("conditions")[0]
                .getElementsByClassName("condition-element-cloud")[0]
                .getElementsByClassName("condition_value")[0].innerHTML =  data.clouds.all + "%"


            document.getElementById("element-"+cityName)
                .getElementsByClassName("conditions")[0]
                .getElementsByClassName("condition-element-pressure")[0]
                .getElementsByClassName("condition_value")[0].innerHTML= data.main.pressure + " ГПа"


            document.getElementById("element-"+cityName)
                .getElementsByClassName("conditions")[0]
                .getElementsByClassName("condition-element-humidity")[0]
                .getElementsByClassName("condition_value")[0].innerHTML = data.main.humidity + "%"


            document.getElementById("element-"+cityName)
                .getElementsByClassName("conditions")[0]
                .getElementsByClassName("condition-element-coordinates")[0]
                .getElementsByClassName("condition_value")[0].innerHTML = "["+ data.coord.lon+", " + data.coord.lat + "]"

            document.getElementById("element-"+cityName)
                .getElementsByClassName("header_of_city")[0].style.visibility = "visible"
            document.getElementById("element-"+cityName)
                .getElementsByClassName("conditions")[0].style.visibility = "visible"
            document.getElementById("loader-"+cityName).style.visibility = "collapse"


        })
        .catch(function() {
            // catch any errors
        });
}

function currWeather(lat,lon) {


    document.getElementsByClassName("curr-city")[0].style.visibility = "collapse"
    document.getElementsByClassName("curr-conditions")[0].style.visibility = "collapse"
    document.getElementsByClassName("loader")[0].style.visibility = "visible"


    fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + key)
        .then(function (resp) {
            return resp.json()
        }) // Convert data to json
        .then(function (data) {
            document.getElementsByClassName("curr-name")[0].innerHTML = data.name;
            document.getElementsByClassName("curr-temperature")[0].innerHTML = Math.round(data.main.temp - 273.15)+"°C";

            document.getElementById("curr-condition-element-wind")
                .getElementsByClassName("condition_value")[0].innerHTML
                = "Скорость ветра: " + data.wind.speed + " м/c"

            document.getElementById("curr-condition-element-cloud")
                .getElementsByClassName("condition_value")[0].innerHTML
                = data.clouds.all + "%"

            document.getElementById("curr-condition-element-pressure")
                .getElementsByClassName("condition_value")[0].innerHTML
                = data.main.pressure + " ГПа"

            document.getElementById("curr-condition-element-humidity")
                .getElementsByClassName("condition_value")[0].innerHTML
                = data.main.humidity + "%"

            document.getElementById("curr-condition-element-coordinates")
                .getElementsByClassName("condition_value")[0].innerHTML
                = "["+ data.coord.lon+", " + data.coord.lat + "]"



            document.getElementsByClassName("curr-city")[0].style.visibility = "visible"
            document.getElementsByClassName("curr-conditions")[0].style.visibility = "visible"
            document.getElementsByClassName("loader")[0].style.visibility = "collapse"

        })
        .catch(function () {
            // catch any errors
        })
}





