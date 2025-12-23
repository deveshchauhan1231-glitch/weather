//this function is to get the latitude and longitude of a place 
function getCod(name) {
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=1`)
        .then(response => response.json())
        .then(data => {
            let temp = document.querySelector(".placeName");
            if (!data.results || data.results.length === 0) {
                temp.innerHTML = "Place Not Found"
                return;
            }
            const lat = data.results[0].latitude;
            const lon = data.results[0].longitude;
            getWeather(lat, lon);
            temp.innerHTML = `${name}`;
        });


    //displaying name of the place

}
//this function is to fetch the weather info from the lat and long
function getWeather(lat, lon) {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,wind_speed_10m`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("temp").innerHTML = `Temperature: ${data.current.temperature_2m} °C`;
            document.getElementById("wspeed").innerHTML = `Wind Speed: ${data.current.wind_speed_10m} km/h`;
            document.getElementById("flike").innerHTML = `Feels Like: ${data.current.apparent_temperature} °C`;
        })

    //for AQI
    fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("aqi").innerHTML = `AQI: ${data.current.us_aqi} `;
        });

}


//main function to start program
function main() {
    let clk = document.querySelector(".popup");
    clk.addEventListener("click", () => {
        clk.classList.add("hide");
        document.getElementById("toggle").style.filter="none";
        document.querySelector(".container").style.filter="none";
    })

    let mode = document.getElementById("toggle");
    mode.addEventListener("click", () => {
        let container = document.querySelector(".container");

        if (mode.innerHTML === "Light Mode") {
            container.style.filter = "invert(1)";
            mode.innerHTML = "Dark Mode";
        } else {
            container.style.filter = "invert(0)";
            mode.innerHTML = "Light Mode";
        }
    });


    let btn = document.getElementById("btn");
    btn.addEventListener("click", () => {
        const cityName = document.getElementById("search").value.toUpperCase();
        getCod(cityName);
    });
}
main()