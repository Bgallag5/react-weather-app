const axios = require('axios');



const apiKey = "e09ebb7db49ee70223da23fbbc92a143";


export default async function getWeather(place){
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${place}&APPID=${apiKey}`)
    console.log(response.data);
    const {humidity, temp_max, temp_min, temp } = response.data.main
    const {dt, name} = response.data;
    const {icon, description, main} = response.data.weather[0];
    const country = response.data.sys.country;
    console.log(icon);
    const weatherObj = {
        name,
        humidity,
        temp_max,
        temp_min,
        temp,
        dt,
        description,
        icon,
        country
    };

    return weatherObj;
}




//cityName: console.log(response.data.name);
// weather description: console.log(response.data.weather.forEach(el => return el.icon));
// console.log(response.data.dt);
// console.log(response.data.main);
// console.log(response.data.main.humidity);
// console.log(response.data.main.temp_max temp_min);
// console.log(response.data.weather);
//
//
//

// current weather
// https://api.openweathermap.org/data/2.5/weather?q=${place}&APPID=${apiKey}
// 5 day forecast
// api.openweathermap.org/data/2.5/forecast?q={place}&appid={apiKey}