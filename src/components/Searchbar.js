import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../App";

export default function Searchbar() {
  const { fetchWeatherAPI, pastSearches } = useContext(AppContext);
  // const pastSearches = localStorage.getItem('past-searches');

  //state for searchTerm and debouncedTerm
  const [textState, setTextState] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState(textState);

  const handleSearchChange = (e) => {
    setTextState(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    let city = textState.trim();
    // clearTimeout();
    fetchWeatherAPI(city);
  };

  function getWeather(term) {
    fetchWeatherAPI(term);
  }

  useEffect(() => {
    //if text state changes after 2 seconds, return clearTimeout and re-run useEffect,
    //if text state doesn't change after 2, setDebouncedTerm as the textState
    const searchTimer = setTimeout(() => {
      setDebouncedTerm(textState);
    }, 2000);
    return () => clearTimeout(searchTimer);
  }, [textState]);

  //on debounce change, if debounce isn't blank, getWeather(debounceTerm)
  useEffect(() => {
    if (debouncedTerm !== "") {
      getWeather(debouncedTerm);
    }
  }, [debouncedTerm]);

  //set last 5 searches to display under searchbar
  let recentSearches = [...pastSearches];
  //[...new Set(arr)] makes new array of ONLY UNIQUE values, removes duplicates
  let unique = [...new Set(recentSearches)];
  const lastFiveSearches = unique.slice(-5);
  console.log("Last Five:", lastFiveSearches);

  return (
    <div className="container">
      <div className="columns is-flex is-flex-wrap-wrap mx-2 p-4 mb-0 pb-0 section">
        <h4 className="subtitle is-one-fifth column my-5">
          Get Today's Weather
        </h4>
        <div className="box columns column is-half my-5">
          <input
            className="input column m-1"
            type="text"
            name="searchTerm"
            placeholder="Search By City"
            value={textState}
            onChange={handleSearchChange}
          />
          <button
            className="button is-primary m-1"
            onClick={handleSearchSubmit}
          >
            Search
          </button>
        </div>
        <div className="container column is-12 mt-0 pt-0" style={{}}>
          <nav>
            <div className="container is-flex is-justify-content-center is-flex-direction-wrap recent-searches-container">
              <h5 className="mx-3 recent-label">Recent Searches: </h5>
              {lastFiveSearches.length <= 0 ? (
                <h5 className="recent-label-empty">will appear here...</h5>
              ) : (
                lastFiveSearches.map((city) => {
                  return (
                    <h5
                      className="recent-searches mx-3"
                      onClick={() => getWeather(city)}
                    >
                      {city}
                    </h5>
                  );
                })
              )}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
