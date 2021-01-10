console.log("hello");

// puzzle.mead.io/puzzle

fetch("http://puzzle.mead.io/puzzle")
    .then((response) => {
        response.json()
            .then((data) => {
                console.log(data);
            });
    });

const getWeather = (address) => fetch(`http://localhost:3000/weather?address=${address}`)
    .then(response => {
        response.json()
            .then(data => {
                if (data.error) {
                    return console.log(data.error);
                }

                console.log(data);
            })
    });

const form = document.querySelector("form");
const input = document.querySelector("input");
const successMessage = document.querySelector("#success-message");
const errorMessage = document.querySelector("#error-message");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    fetch(`/weather?address=${input.value}`)
        .then(response => {
            response.json()
                .then(data => {
                    if (data.error) {
                        successMessage.textContent = "";
                        return errorMessage.textContent = data.error
                    }
                    errorMessage.textContent = "";
                    return successMessage.textContent = data.forecast;
                })
        });


})
