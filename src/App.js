import React, {useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import getWeather from './api/weatherAPI';
import Forecast from './components/Forecast';
import '../src/css/style.css';



function App() {
  // const [textState, setTextState] = useState({searchTerm: ''})
  const [currentWeather, setCurrentWeather] = useState()

  const fetchWeatherAPI = async (searchTerm) => {
   const weather = await getWeather(searchTerm)
   console.log('MYWEATHER:');
    console.log(weather);
    setCurrentWeather(weather)
  }
  console.log(currentWeather);


  
  const pastSearches = 7;
  
  // const globalVars = {
  //   textState,
  //   setTextState,
  //   pastSearches
  // }
  
//  const AppContext = React.createContext()

  return (
    // <AppContext.Provider value={globalVars}>
      <div className='container'>

      {/* <Sidebar textState={textState} setTextState={setTextState} fetchWeatherAPI={fetchWeatherAPI}/> */}
      <Sidebar fetchWeatherAPI={fetchWeatherAPI}/>
      <Forecast currentWeather={currentWeather} setCurrentWeather={setCurrentWeather} />

      </div>
    // </AppContext.Provider>

  );
}

export default App;
