import React from "react";
import { kelvinToFahrenheit } from "temperature";

export default function Forecast(props) {
  const { currentWeather, setCurrentWeather } = props;
  const { name, humidity, temp_max, temp_min, temp, dt, description, icon, country } =
    currentWeather !== undefined ? currentWeather : {};
  console.log(icon);
  const iconSource = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div className="section forecast">
      <h1 className="title">Current Weather</h1>
      <div className="card">
        <div className="card-content">
          <div className="content">
            {currentWeather !== undefined ? (
              <div className="container">
                <h3 className="subtitle">{name}, {country}</h3>
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

                  {/* <div className='columns'> */}
                  <div className="column is-one-third mx-2">
                    <p className="is-one-fourth p-2">
                      High: {Math.round(kelvinToFahrenheit(temp_max))}&deg;F
                    </p>
                    <p className="is-one-fourth p-2">
                      Low: {Math.round(kelvinToFahrenheit(temp_min))}&deg;F
                    </p>
                  </div>
                  <div className="column is-one-third">
                    <p className="is-one-fourth p-2">Humidity: {humidity}</p>
                  </div>
                  {/* </div> */}
                </div>
              </div>
            ) : (
              <div>Search for a city...</div>
            )}
          </div>
        </div>
        {/* <footer className="card-footer">
        <a href="#" className="card-footer-item">
          Save
        </a>
        <a href="#" className="card-footer-item">
          Edit
        </a>
        <a href="#" className="card-footer-item">
          Delete
        </a>
      </footer> */}
      </div>
    </div>
  );
}

// "http://openweathermap.org/img/wn/${todaysWeather.icon}@2x.png"

// regex to Title Case any str
// str.replace(/\b(\w)/g, k => k.toUpperCase())
