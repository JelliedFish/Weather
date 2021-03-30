

function parseCity() {

    let cityName = document.getElementById('favorite-input-value').value;

    if (!cityName.trim().length){
        alert("Неправильный формат данных !")
        return
    }

    if (localStorage.getItem(cityName) != null) {
        alert("Такой город уже в избранном!")
        return
    }

    initLoader(cityName)
    localStorage.setItem(cityName, 'true');

    weatherBalloon(cityName, function (data){
        createHTMLForCity(cityName, data)
        showElementsOfList(cityName)
        hideLoaderOfList(cityName)
    })
}

function createHTMLForCity(cityName, data) {

    let template = document.querySelector('#element-of-main-list-template')
    let clone = template.content.cloneNode(true)

    let h3 = clone.querySelector(".name")
    h3.textContent = cityName

    let span = clone.querySelector(".temperature")
    span.textContent = data.temperature

    let img = clone.querySelector(".icon-header-main-list")
    img.src = data.iconUrl


    let input = clone.querySelector("#exit-btn")
    input.type = "submit"
    input.addEventListener("click",function (){
        removeCity(cityName)
    })
    input.style.padding = "0"


    let imgb = clone.querySelector("#img-btn-exit")
    imgb.src = "icons/exit.png"
    imgb.style.width = "40px"
    imgb.style.height = "40px"
    imgb.style.padding = "0"

    let card = clone.querySelector(".conditions")
    let li  = clone.querySelector(".element-of-main-list")
    li.id = "element-of-main-list-"+cityName

    let ul = document.getElementsByClassName("main-list")[0]

    fillConditions(card,formatData(data))

    ul.appendChild(clone)


}

function removeCity(key) {

    let templateElement = document.querySelector('#element-of-main-list-template')
    let templateLoader = document.querySelector('#loader-of-main-list-template')


    localStorage.removeItem(key)
    let ul = document.getElementsByClassName("main-list")[0]
    ul.innerHTML = ''


    ul.appendChild(templateElement)
    ul.appendChild(templateLoader)
    initLoadersAfterRemove()
    updateList()
}

function updateList() {

    let cities = []
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        cities.push(key);
    }

    localStorage.clear();

    for (let i = 0; i < cities.length; i++) {
        localStorage.setItem(cities[i], 'true');
        weatherBalloon(cities[i], function (data){
            createHTMLForCity(cities[i], data)
            showElementsOfList(cities[i])
            hideLoaderOfList(cities[i])
        })
    }

}

function setDataForCity(data) {

    const { temp, pressure, humidity } = data.main
    const { description, icon } = data.weather[0]
    const wind = data.wind

    const cityName =  data.name
    const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`
    const temperature = `${temp.toFixed(0) - 273}°C`

    const windSpeed = wind.speed + " m/s"
    const desc = description
    const press = pressure + " GPa"
    const humid = humidity + " %"
    const coord = "[" + data.coord.lon + ", " + data.coord.lat + "]"


    return { cityName, iconUrl, temperature, windSpeed, desc, press, humid, coord }

}


function weatherForCurCity(data) {



    const cityTitle = document.getElementsByClassName("curr-name")[0]
    const cityIcon = document.getElementsByClassName("curr-icon")[0]
    const cityWeather = document.getElementsByClassName("curr-temperature")[0]

    cityTitle.textContent = data.cityName
    cityIcon.src = data.iconUrl
    cityWeather.textContent = data.temperature

    const currCard = document.getElementsByClassName("ul-curr-conditions")[0]

    fillConditions(currCard, formatData(data))

    showElements()
    hideLoader()
}


function initLoaders(){

    let cur_loader = document.getElementById("curr-loader")
    cur_loader.style.visibility = "visible"

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);

        let template = document.querySelector('#loader-of-main-list-template')
        let clone = template.content.cloneNode(true)
        let li = clone.querySelector(".element-of-main-list")
        li.id = "element-of-main-list-loader-"+key

        let loader = clone.querySelector(".loader")
        loader.id = "loader-"+key

        let ul = document.getElementsByClassName("main-list")[0]
        ul.appendChild(clone)
    }
}

function initLoader(cityName){

    let template = document.querySelector('#loader-of-main-list-template')
    let clone = template.content.cloneNode(true)
    let li = clone.querySelector(".element-of-main-list")
    li.id = "element-of-main-list-loader-"+cityName

    let loader = clone.querySelector(".loader")
    loader.id = "loader-"+cityName

    let ul = document.getElementsByClassName("main-list")[0]
    ul.appendChild(clone)
}

function initLoadersAfterRemove(){
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);

        let template = document.querySelector('#loader-of-main-list-template')
        let clone = template.content.cloneNode(true)
        let li = clone.querySelector(".element-of-main-list")
        li.id = "element-of-main-list-loader-"+key

        let loader = clone.querySelector(".loader")
        loader.id = "loader-"+key

        let ul = document.getElementsByClassName("main-list")[0]
        ul.appendChild(clone)
    }
}

function formatData(data){
    return dict = {
        'Wind speed': data.windSpeed,
        'Overcast': data.desc,
        'Pressure': data.press,
        'Humidity': data.humid,
        'Coordinates': data.coord
    }

}
