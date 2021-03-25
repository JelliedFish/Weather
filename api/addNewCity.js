
let dict = {
    'Ветер': "1",
    'Облачность': "2",
    'Давление': "3",
    'Влажность': "4",
    'Координаты': "5"
}

function refresh() {

    console.log(localStorage.length)
    let cities = []
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        cities.push(key);
    }

    localStorage.clear();
    for (let i = 0; i < cities.length; i++) {
        localStorage.setItem(cities[i], 'true');
        addCity(cities[i], dict);
    }

}

function enterCity() {
    let cityName = document.getElementById('favorite-input-value').value;



    if (localStorage.getItem(cityName) != null) {
        alert("Этот город уже в избранном!")
        return
    }

    localStorage.setItem(cityName, 'true');


    addCity(cityName, dict);
}

function addCity(cityName, dict) {

    console.log(cityName)
    let loader = document.createElement("div")
    loader.classList.add("loader")
    loader.id = "loader-" + cityName

    let h3 = document.createElement("h3")
    h3.textContent = cityName
    h3.classList.add("name")

    let span = document.createElement("span")
    span.classList.add("temperature")
    span.textContent = "10"+"°C"

    let img = document.createElement('img')
    img.src = "weather-icons/003-cloudy.png"
    img.classList.add("icon-header-main-list")

    let input = document.createElement("button")
    input.type = "submit"
    input.onclick = function (){
        removeCity(cityName)
    }
    input.style.padding = "0"


    let imgb = document.createElement("img")
    imgb.src = "icons/exit.png"
    imgb.style.width = "40px"
    imgb.style.height = "40px"
    imgb.style.padding = "0"

    input.appendChild(imgb)


    let div = document.createElement("div")
    div.classList.add("header_of_city")

    div.appendChild(h3)
    div.appendChild(span)
    div.appendChild(img)
    div.appendChild(input)


    let ulChild = document.createElement("ul");
    ulChild.classList.add("conditions");

    let weatherConditions = dict


    for (let key in weatherConditions) {
        let value = weatherConditions[key];

        let leftP = document.createElement("p");
        leftP.textContent = key;
        leftP.classList.add("condition_type")

        let rightP = document.createElement("p");
        rightP.textContent = value;
        rightP.classList.add("condition_value")

        let item = document.createElement("li");
        item.classList.add("condition-element")
        item.classList.add("condition-element-"+getClass(key))
        item.appendChild(leftP);
        item.appendChild(rightP);

        ulChild.appendChild(item);
    }

    let li = document.createElement("li")
    li.classList.add("element-of-main-list");
    li.classList.add("element-of-main-list-left")
    li.id = "element-" + cityName
    li.appendChild(loader);
    li.appendChild(div);
    li.appendChild(ulChild);

    let ul = document.getElementsByClassName("main-list")[0];
    ul.appendChild(li);

    console.log(localStorage.length)
    weatherBalloon(cityName)
}

function removeCity(key) {
    localStorage.removeItem(key)
    let ul = document.getElementsByClassName("main-list")[0]
    ul.innerHTML = ''
    refresh()
}




function getClass(p) {
    let res;

    switch (p){
        case "Ветер":
            res = "wind"
            break;

        case "Облачность":
            res = "cloud"
            break;

        case "Давление":
            res = "pressure"
            break;

        case "Влажность":
            res = "humidity"
            break;

        case "Координаты":
            res = "coordinates"
            break;
    }

    return res
}