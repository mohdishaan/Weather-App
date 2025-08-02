const apikey = "3d35ef3424949b21471e036c41580e97";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weathericon = document.querySelector(".weather-icon");

async function checkweather(city) {
    const response = await fetch(apiurl + city + `&appid=${apikey}`);

    if (response.status === 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        switch (data.weather[0].main) {
            case "Clouds":
                weathericon.src = "images/clouds.png";
                break;
            case "Clear":
                weathericon.src = "images/clear.png";
                break;
            case "Rain":
                weathericon.src = "images/rain.png";
                break;
            case "Drizzle":
                weathericon.src = "images/drizzle.png";
                break;
            case "Mist":
                weathericon.src = "images/mist.png";
                break;
            default:
                weathericon.src = "images/clear.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

// Button click
searchbtn.addEventListener("click", () => {
    checkweather(searchbox.value);
});

// Also allow "Enter" key
searchbox.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        checkweather(searchbox.value);
    }
});
