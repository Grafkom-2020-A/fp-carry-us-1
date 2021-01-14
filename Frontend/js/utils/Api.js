let API = {};

API.fetchAPI = function (planetName, callback) {
    fetch("http://kerupuksambel.com:6900/object/" + planetName)
    .then((resp) => resp.json())
    .then(function(data) {
        callback(data)
    })
    .catch(function(error) {
        console.log(error);
    });
}