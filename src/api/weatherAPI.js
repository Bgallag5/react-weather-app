const axios = require("axios");
const apiKey = "e09ebb7db49ee70223da23fbbc92a143";

export async function getWeather(place) {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${place}&APPID=${apiKey}`
  );
  console.log(response.data);
  const { lat, lon } = response.data.coord;
  const { humidity, temp_max, temp_min, temp } = response.data.main;
  const wind = response.data.wind.gust;
  const { dt, name } = response.data;
  const { icon, description, main } = response.data.weather[0];
  const country = response.data.sys.country;
  const weatherObj = {
    name,
    humidity,
    temp_max,
    temp_min,
    temp,
    dt,
    description,
    icon,
    country,
    lat,
    lon,
    wind,
  };

  return weatherObj;
}

//fetch data async
export async function getFiveDayForecast(place, lat, lon) {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`
  );
  console.log(response.data);
  const data = response.data.daily.map((singleDay) => {
    const dt = singleDay.dt;
    const { day, night } = singleDay.temp;
    const { icon } = singleDay.weather[0];
    const humidity = singleDay.humidity;
    return { dt, icon, day, night, humidity };
  });
  
  return data;
}
