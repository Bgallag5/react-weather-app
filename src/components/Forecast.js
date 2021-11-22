import React from "react";
import { useContext } from "react/cjs/react.development";
import { kelvinToFahrenheit } from "temperature";
import { AppContext } from "../App";

export default function Forecast() {
  //destructure currentWeather from context
  const { currentWeather } = useContext(AppContext);
  const {
    name,
    humidity,
    temp_max,
    temp_min,
    temp,
    dt,
    description,
    icon,
    country,
    wind
  } = currentWeather !== undefined ? currentWeather : {};
  const iconSource = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  const date = new Date(dt * 1000);
  console.log(date);
  const humanDate = date.toGMTString().split(" ").splice(0, 3);
  console.log(humanDate);

  return (
    <div className="section forecast m-2 p-4">
      <h1 className="title">Current Weather</h1>
      <div className="card">
        <div className="card-content">
          <div className="content">
            {currentWeather !== undefined ? (
              <div className="container">
                <div style={{borderBottom: '2px black solid'}} className=" is-flex is-align-items-baseline is-justify-content-space-between" >
                  <h3 className="subtitle mr-3 mb-2">
                    {name}, {country}
                  </h3>
                  <h5 className='subtitle mb-1'>{humanDate[0]} {humanDate[2]} {humanDate[1]}</h5>
                </div>
                <div className="columns container block">
                  <div className="column is-one-third block m-2">
                    <h4 className="subtitle m-1">
                      Temperature: {Math.round(kelvinToFahrenheit(temp))} &deg;F
                    </h4>
                    <div className="columns is-gapless is-vcentered">
                      <img
                        className="column is-4"
                        src={iconSource}
                        alt="weather icon"
                        style={{ width: "80px", height: "80px" }}
                      ></img>
                      <p className="cloumn is-8">
                        {description.replace(/\b(\w)/g, (k) => k.toUpperCase())}
                      </p>
                    </div>
                  </div>

                  <div className="column is-2 mx-2 mt-4">
                    <p className=" m-2">
                      High: {Math.round(kelvinToFahrenheit(temp_max))}&deg;F
                    </p>
                    <p className=" m-2">
                      Low: {Math.round(kelvinToFahrenheit(temp_min))}&deg;F
                    </p>
                  </div>
                  <div className="column is-3 mx-2 mt-4">
                    <p className="is-one-fourth m-2">Humidity: {humidity}%</p>
                    <p className="is-one-fourth m-2">Wind Gusts: {wind}mph</p>
                  </div>
                </div>
              </div>
            ) : (
              <div>Search for a city...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// "http://openweathermap.org/img/wn/${todaysWeather.icon}@2x.png"
// regex to Title Case any str:
// str.replace(/\b(\w)/g, k => k.toUpperCase())
