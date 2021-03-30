

function showLoader(){
    let loader = document.getElementById("curr-loader")
    loader.style.visibility = "visible"
}
function hideLoader(){
    let loader = document.getElementById("curr-loader")
    loader.style.visibility = "collapse"
}

function hideLoaderOfList(cityName){
    let li = document.getElementById("element-of-main-list-loader-"+cityName)

    li.style.display = "none"
}

function showElementsOfList(cityName){
    let curCity = document.getElementById("element-of-main-list-"+cityName)
    let header = curCity.firstElementChild
    let conditions = curCity.lastElementChild

    header.style.visibility = "visible"
    conditions.style.visibility = "visible"
}


function showElements(){
    let curCity = document.getElementsByClassName("curr-city")[0]
    let curConditions = document.getElementsByClassName("curr-conditions")[0]
    let curCondition = document.getElementsByClassName("conditions")[0]

    curCity.style.visibility = "visible"
    curConditions.style.visibility = "visible"
    curCondition.style.visibility = "visible"
}

function hideElements(){
    let curCity = document.getElementsByClassName("curr-city")[0]
    let curConditions = document.getElementsByClassName("curr-conditions")[0]
    let curCondition = document.getElementsByClassName("conditions")[0]

    curCity.style.visibility = "collapse"
    curConditions.style.visibility = "collapse"
    curCondition.style.visibility = "collapse"
}

function fillConditions(ul, data) {
    let keys = ['Wind speed', 'Overcast', 'Pressure', 'Humidity', 'Coordinates']
    let currentElement = ul.firstElementChild
    for (let i = 0; i < keys.length; i++) {
        currentElement.firstElementChild.textContent = keys[i]
        currentElement.lastElementChild.textContent = data[keys[i]]
        currentElement = currentElement.nextElementSibling
    }
}
