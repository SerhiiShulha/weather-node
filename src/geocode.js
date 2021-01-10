const request = require("postman-request");

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic3RlcmVvc2VyZ2UiLCJhIjoiY2tqbzd5MjBkMGt5MDJ5bzgwd3R5emFidyJ9.t6E_UbBYwemKmBXoXEcOTA&limit=1`;

    request({url, json: true}, (error, response) => {
        if (error) {
            callback("Unable to connect to locations service");
        } else if (!response.body.features.length) {
            callback("Unable to find location")
        } else {
            const latitude = response.body.features[0].center[1];
            const longitude = response.body.features[0].center[0];
            const location = response.body.features[0].place_name;

            callback(undefined, {latitude, longitude, location});
        }
    });
}

module.exports = geocode;
