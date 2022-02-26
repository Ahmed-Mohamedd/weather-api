const apiKey = "1c9d4e4509094307b55163947221001" ; 
let searchInput = document.getElementById("search");
let showWeather = document.querySelector(".row");
const weekDay = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


async function getWeatherApi(cityName)            // get api using city name
{
    let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=3`);
    let weather = await response.json();
    //console.log(weather.forecast.forecastday);
    displayCurrent(weather);
    displayAnother(weather.forecast.forecastday)

}


searchInput.addEventListener("keyup" , function() // A fuction to get a city name which will be used to find weather .
{
    if(searchInput.value.length< 3)
    {
        getWeatherApi("cairo");
    }
    else
    {
        getWeatherApi(searchInput.value);
    }
})




function displayCurrent(weather) // display weather for today
{
    let d = new Date(`${weather.current.last_updated}`);
    let container = 
    `
    <div class="col-md-4">
    <div class="current-day ">
        <div class="date">
            <h5>${weekDay[d.getDay()]}</h5>
            <h4><span>${d.getDate()}</span>${month[d.getMonth()]}</h4>
        </div>
        <div class="info">
            <h3>${weather.location.name}</h3>

            <div class="temperature">
                <h2>${weather.current.temp_c} ْc</h2>
                <img src="https:${weather.current.condition.icon}" alt="">
            </div>

            <div class="condition">
                <h5>${weather.current.condition.text}</h5>
            </div>

            <div class="more-info">
                <div class="rain d-flex justify-content-between">
                    <img src="./img/icon-umberella.png" alt="" class="w-100 h-75">
                    <h6 class="px-2 text-secondary">${weather.current.cloud}%</h6>
                </div>
                <div class="wind rain d-flex justify-content-between">
                    <img src="./img/icon-wind.png" alt="" class="w-100 h-75">
                    <h6 class="px-2 text-secondary">${weather.current.wind_mph}Km/h</h6>
                </div>
                <div class="wind-dir rain d-flex justify-content-between">
                    <img src="./img/icon-compass.png" alt="" class="w-100 h-75">
                    <h6 class="px-2 text-secondary">${weather.current.wind_dir}</h6>
                </div>
            </div>
        </div>
    </div>
</div>
    `
    showWeather.innerHTML = container;
}

function displayAnother(forecast)  // display the weather for the next 2 days
{
    let container = "" ;
    for(let i = 1 ; i<forecast.length ; i++)
    {
        let d = new Date(`${forecast[i].date}`);

            container +=
        `
                    <div class="col-md-4">
                        <div class="another-day ">
                            <div class="date">
                                <h5>${weekDay[d.getDay()]}</h5>
                            </div>
                            <div class="info">
                                <div class="temperature">
                                    <img src="https:${forecast[i].day.condition.icon}" alt="">
                                    <h2>${forecast[i].day.maxtemp_c} ْc</h2>
                                    <h6 class="text-secondary">${forecast[i].day.mintemp_c} ْc</h6>
                                </div>
                                <div class="condition">
                                    <h5>${forecast[i].day.condition.text}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
        `
    }

    showWeather.innerHTML += container;
}

getWeatherApi("cairo");




// async function getWeatherData(searchParam) {
//     let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=861fe1ff0e6747b488973556221201&q=${searchParam}&days=3`)
//     let weather = await response.json()

//     // var weatherPerDay = weather.forecast.forecastday
//     displayCurrentWeather(weather.current, weather.location)
//     displayNextDays(weather.forecast.forecastday)
// }

// getWeatherData("Beirut");

// document.getElementById("search").addEventListener("keyup", function (e) {
//     console.log(typeof(e.target.value))
//     if (e.target.value.length < 3) {
//         getWeatherData("Beirut")

//     }
//     else {
//         var searchParameter = e.target.value
//         console.log(searchParameter)
//         getWeatherData(searchParameter)
//     }
// })

// function displayCurrentWeather(current, location) {
//     let date = new Date(current.last_updated)
//     console.log(date.getDay())
//     let colCurrent = `  <div class="col-md-4">
// <div class="current-weather">
//     <div class="header text-white-50 d-flex justify-content-between p-2">
//         <p class="m-0">${weekDay[date.getDay()]}</p>
//         <p class="m-0">${date.getDate()} ${month[date.getMonth()]}</p>
//         </div>
//     <div class="body p-3">
//         <h3 class="text-white-50">${location.name}</h3>
//         <div class="current-temp d-flex justify-content-center align-items-center">
//             <p class="text-white fw-bold"><span>${current.temp_c}</span><sup>O</sup>C</p>
//             <img src=https:${current.condition.icon} class="ms-5" alt="">
//         </div>
//         <p class="weather-status">${current.condition.text}</p>
//     </div>
//     <div class="footer p-3 mb-3 text-white-50 d-flex">
//         <div class="humidity"><img src="./img/icon-umberella.png" class="img-fluid" alt="">
//             <span>${current.humidity}%</span>
//         </div>
//         <div class="ms-4"><img src="./img/icon-wind.png" class="img-fluid" alt="">
//             <span>${current.wind_kph}km/h</span>
//         </div>
//         <div class="ms-4"><img src="./img/icon-compass.png" class="img-fluid"
//                 alt="">
//             <span id="wind-direction">${current.wind_dir}</span>
//         </div>
//     </div>
// </div>
// </div>`
// showWeather.innerHTML  = colCurrent;
// }

// function displayNextDays(nextDays) {
//     let colNextDays = ""
//     for (var i = 1; i < nextDays.length; i++) {
//         let d = new Date(nextDays[i].date)
//         console.log(d.getDay())
//         colNextDays += `  <div class="col-md-4">
// <div class="forecast-weather text-center">
//     <div class="header text-white-50 p-2">
//         <p class="m-0">${weekDay[d.getDay()]}</p>
//     </div>
//     <div class="body p-3 mt-4 d-flex justify-content-center align-items-center flex-column">
//         <img src=https:${nextDays[i].day.condition.icon} alt="">
//         <div class="max-temp">
//             <p class="fs-3 text-white fw-bold m-0"><span>${nextDays[i].day.maxtemp_c}</span><sup>O</sup>C</p>
//         </div>
//         <div class="min-temp">
//             <p class="fs-5 text-white"><span>${nextDays[i].day.mintemp_c}</span><sup>O</sup>C</p>
//         </div>
//         <p class="weather-status">${nextDays[i].day.condition.text}</p>
//     </div>
// </div>
// </div>`
//     }
//     showWeather.innerHTML += colNextDays;
// }

// // getWeatherData("Beirut");