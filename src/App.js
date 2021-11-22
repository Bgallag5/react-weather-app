import React, { useState, useEffect } from "react";
import Searchbar from "./components/Searchbar";
import { getWeather, getFiveDayForecast } from "./api/weatherAPI";
import Forecast from "./components/Forecast";
import FiveDayForecast from "./components/FiveDayForecast";
import "../src/css/style.css";

//create context
export const AppContext = React.createContext();

function App() {
  //declare weather and fiveDay state
  const [currentWeather, setCurrentWeather] = useState();
  const [fiveDayForecast, setFiveDayForecast] = useState([]);
  const placeholders = ['New York', 'London', 'Los Angeles', 'Tokyo', 'Paris']
  const [pastSearches, setPastSearches] = useState([])


  // fetch weather API and set states
  const fetchWeatherAPI = async (searchTerm) => {
    //await weather json
    const weather = await getWeather(searchTerm);
    //destructure latitude and long for OneCall API fetch
    const { lat, lon } = weather;
    //5 day API fetch
    const fiveDay = await getFiveDayForecast(searchTerm, lat, lon);

    //setStates
    setCurrentWeather(weather);
    //first 5 of results
    setFiveDayForecast(fiveDay.slice(1, 6));
    // pastSearches.unshift(weather.name)
    // localStorage.setItem('past-searches', pastSearches)
  };

  //on app load
//1 get history from local storage
//2 if history, split string then push that history to state
  useEffect(() => {
   let history = localStorage.getItem('past-searches');
   console.log(history);
   if (history){
    //  history.split(',')
     const pastCities =  history.split(',')
    setPastSearches(pastCities)
   }
  }, []);

  //on currentWeather change
  //1. push current city name to pastSearches
  //2. setLocalStorage to pasSearches
  useEffect(() => {
    if (currentWeather){
      console.log(currentWeather.name);
      let name = currentWeather.name;
      name.toString()
      setPastSearches([...pastSearches, name])
      //past searches was not being set in time to also be set in local storage...
      //solution: set local storage directly as same value being set above 
      localStorage.setItem('past-searches', [...pastSearches, name])
    }

  }, [currentWeather])

  console.log(pastSearches);

  // useEffect(() => {
  //   if (currentWeather === undefined || currentWeather === '') return;
  //   let city = currentWeather.name
  //   setPastSearches({...pastSearches, city})
  //   console.log(currentWeather);
  //   console.log(pastSearches);
  // //  let searchHistory = localStorage.getItem('past-searches');
  // //  console.log(searchHistory);

  // //   setPastSearches()
  // }, [currentWeather]); 

  //global context variables
  const globalVars = {
    currentWeather,
    setCurrentWeather,
    fetchWeatherAPI,
    fiveDayForecast,
    pastSearches
  };

  return (
    //provide app context
    <AppContext.Provider value={globalVars}>
      <div className="container">
        <Searchbar />
        <Forecast />
        <FiveDayForecast />
      </div>
    </AppContext.Provider>
  );
}

export default App;
