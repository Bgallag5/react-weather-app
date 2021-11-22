import React, { useContext } from "react";
import { AppContext } from "../App";
import FiveDayCard from "./FiveDayCard";

export default function FiveDayForecast() {
  const { fiveDayForecast } = useContext(AppContext);
  console.log(fiveDayForecast);

  // make the div not appear unless there are results to display 
  if (fiveDayForecast.length <= 0) return '';

  return (
    <div className="section forecast m-2 p-4">
      <h1 className="title">5 Day Forecast</h1>
      <div className="card">
        <div className="card-content">
          <div className="content columns">
            {fiveDayForecast.map((weather) => {
              return <FiveDayCard weather={weather} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
