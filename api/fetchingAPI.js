
const key = 'c1fba4b3fbec3b5f92b79c28980e8024';

function init(){

    document.getElementsByClassName("curr-city")[0].style.visibility = "collapse"
    document.getElementsByClassName("curr-conditions")[0].style.visibility = "collapse"
    document.getElementsByClassName("loader")[0].style.visibility = "visible"
    document.getElementsByClassName("curr-conditions")[0]
        .getElementsByClassName("ul-curr-conditions")[0]
        .style.visibility = "collapse"

    for (let i = 0; i < localStorage.length; i++) {
        let cityName = localStorage.key(i);

        let li = document.createElement("li")
        li.classList.add("element-of-main-list");
        li.classList.add("element-of-main-list-left")
        li.id = "element-" + cityName

        let loader = document.createElement("div")
        loader.classList.add("loader")
        loader.id = "loader-" + cityName

        li.appendChild(loader)

        let ul = document.getElementsByClassName("main-list")[0]
        ul.appendChild(li)
    }
}

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
                .getElementsByClassName("icon-header-main-list")[0].src = "weather-icons/" + clouds(data.weather[0].description)



            document.getElementById("element-"+cityName)
                .getElementsByClassName("header_of_city")[0].style.visibility = "visible"
            document.getElementById("element-"+cityName)
                .getElementsByClassName("conditions")[0].style.visibility = "visible"
            document.getElementById("loader-"+cityName).style.visibility = "collapse"


        })
        .catch(error => {
            alert("Такого города не существует! Попробуйте еще раз.")

            localStorage.removeItem(cityName)
            let element = document.getElementById("element-"+cityName)
            element.remove()

        });
}

function currWeather(lat,lon) {


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

            document.getElementsByClassName("curr-icon")[0].src = "weather-icons/" + clouds(data.weather[0].description)


            document.getElementsByClassName("curr-city")[0].style.visibility = "visible"
            document.getElementsByClassName("curr-conditions")[0].style.visibility = "visible"
            document.getElementsByClassName("loader")[0].style.visibility = "collapse"
            document.getElementsByClassName("curr-conditions")[0]
                .getElementsByClassName("ul-curr-conditions")[0]
                .style.visibility = "visible"


        })
        .catch(function () {
            // catch any errors
        })
}



function clouds(state) {
    let res

    switch (state){

        case "few clouds":
            res = "002-cloud.png"
            break;
        case "clear sky":
        case "sunny":
            res = "001-sun.png"
            break;

        case "rain":
            res = "004-rain.png"
            break;

        case "light snow":
        case "snow":
        case "heavy snow":
            res = "009-snowy.png"
            break;

        default:
            res = "003-cloudy.png"
    }
    return res
}

