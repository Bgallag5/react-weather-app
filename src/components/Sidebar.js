import React, { useState, useEffect } from "react";

export default function Sidebar(props) {

  const { fetchWeatherAPI } = props;
  // const pastSearches = localStorage.getItem('past-searches');

  const [textState, setTextState] = useState('')
  const [debouncedTerm, setDebouncedTerm] = useState(textState)

  const handleSearchChange = (e) => {
    setTextState(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    let city = textState

    fetchWeatherAPI(city);
  };

  function getWether(term) {
    fetchWeatherAPI(term);
  }

  useEffect(() => {
    let city = textState
    const searchTimer = setTimeout(() => {
      setDebouncedTerm(textState)
    }, 2000)
    return () => clearTimeout(searchTimer)
  }, [textState]);

  useEffect(() => {
    getWether(debouncedTerm)
  }, [debouncedTerm])

  return (
    <div className='container'>
    <div className="columns mx-2 p-4 section">
      <h4 className='subtitle is-one-fifth column my-5'>Get Today's Weather</h4>
      <div className='box columns column is-half my-5'>
      <input
        className="input column m-1"
        type="text"
        name="searchTerm"
        placeholder='Search By City'
        value={textState}
        onChange={handleSearchChange}
      />
      <button className="button is-primary m-1" onClick={handleSearchSubmit}>
        Search
      </button>
      </div>
    </div>
    </div>
  );
}
