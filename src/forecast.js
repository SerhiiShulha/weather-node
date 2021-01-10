const request = require("postman-request");

const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/ec3499d7138fbe8825d241bd9ca6c6bb/${lat},${long}?units=si`;

    request({url, json: true}, (error, response) => {
        if (error) {
            callback("Unable to connect to weather service");
        } else if (response.body.error) {
            callback("Unable to find location");
        } else {
            const {currently} = response.body;

            callback(undefined, {temperature: currently.temperature, precipProbability: currently.precipProbability});
            // console.log(`It is currently ${currently.temperature} degrees celsius. There is a ${currently.precipProbability}% chance of rain.`);
        }
    });
};

module.exports = forecast;
