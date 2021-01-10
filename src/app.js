const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./geocode");
const forecast = require("./forecast");

const app = express();
const port = process.env.PORT || 3000;

const publicDirPath = path.join(__dirname, "../public");
const viewsDirPath = path.join(__dirname, "../templates/views");
const partialsDirPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsDirPath);
hbs.registerPartials(partialsDirPath);

app.use(express.static(publicDirPath));

app.get("static", (req, res) => {
    res.render("static");
});

app.get("", (req, res) => {
    res.render("index", {
        foo: "bar",
        footerMessage: "Running on Express and Node",
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide address",
        });
    }

    geocode(req.query.address, (error, data) => {
        if (error) {
            res.send({error});
        } else {
            forecast(data.latitude, data.longitude, (error, forecastData) => {
                if (error) {
                    res.send({error});
                } else {
                    return res.send({
                        forecast: `It is currently ${forecastData.temperature} degrees celsius in ${data.location}. There is a ${forecastData.precipProbability}% chance of rain.`,
                        location: data.location,
                        footerMessage: "Running on Express and Node",
                    });
                }
            });
        }
    });
});

app.get("/weather/dnipro", (req, res) => {
    const data = getWeather("dnipro");
    res.render("city", {
        forecast: data,
        footerMessage: "Running on Express and Node",
    });
});

app.get("/weather/kyiv", (req, res) => {
    res.render("city", {
        forecast: getWeather("kyiv"),
        footerMessage: "Running on Express and Node",
    });
});

app.get("/products", (req, res) => {
    console.log(req.query);
    res.send({
        products: [],
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        error: "Page not found",
        footerMessage: "Running on Express and Node",
    });
});

app.listen(port, () => {
    console.log(`RUNNING ON PORT ${port}`);
});
