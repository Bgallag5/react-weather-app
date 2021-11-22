import React, { useContext } from "react";
import { kelvinToFahrenheit } from "temperature";

export default function FiveDayCard({ weather }) {
  console.log(weather);

  //destructure props 
  const { dt, day, night, humidity, icon } = weather;

  //set vars 
  const newDate = new Date(dt * 1000);
  //get date as arr of [weekday, date, month] 
  const humanDate = newDate.toGMTString().split(" ").splice(0, 3);
  const iconSource = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  const day_temp = Math.round(kelvinToFahrenheit(day));
  const night_temp = Math.round(kelvinToFahrenheit(night));

  return (
    <div className="card container column is-2">
      <div className="card-content">
        <div className="block contianer is-flex is-flex-direction-row" style={{alignItems: 'center'}}>
          <h2 className="title is-4 m-0">
            {humanDate[0]} {humanDate[1]}
          </h2>
          <img
            className="m-0"
            src={iconSource}
            alt="weather icon"
            style={{ width: "50%", height: "50%", top: '0px' }}
          ></img>
        </div>

        <div className="container">
          <span>
            <h5 className='m-0' >Day: {day_temp} &deg;F</h5>
            <p>Night: {night_temp} &deg;F </p>
          </span>
        </div>
      </div>
    </div>
  );
}
