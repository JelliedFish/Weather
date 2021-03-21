
function getLocation() {
    navigator.geolocation.getCurrentPosition(getPosition, showError);
}

function showError(error) {
    let err;
    switch (error.code) {
        case error.PERMISSION_DENIED:
             err = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            err = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            err = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            err = "An unknown error occurred."
            break;
    }
}


function getPosition(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
}


 getLocation()