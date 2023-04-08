import { useContext, useEffect } from "react";
import "./App.css";
import { WeatherContext } from "./store/weather-context";

// shortened weekdays array to show which day it is
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function App() {
  // required functions and datas destructured from context
  const {
    weather: weeklyWeather,
    cities,
    choosedCity,
    setChoosedCity,
  } = useContext(WeatherContext);

  // ths function checks the date passed to the function is equals today to highlight the box
  const checkToday = (date) => {
    // passed date and todays date converting to string and sliced from 0 to 16 becuse strings that between those indexes are all we need to check the date
    date = new Date(date).toString().slice(0, 16);
    let today = new Date().toString().slice(0, 16);

    return today === date;
  };

  return (
    <div className="App">
      <h1>{choosedCity}</h1>
      <select
        className="combo-box"
        onChange={(e) => setChoosedCity(e.target.value)}
      >
        {cities.map((c, i) => (
          <option value={c.value}>{c.name}</option>
        ))}
      </select>
      {weeklyWeather.length > 0 ? (
        <div className="weather-container">
          {weeklyWeather.map((w, i) => (
            <div className="single-weather" key={i}>
              <div
                className={
                  "weather-info-container " +
                  (checkToday(w.day) ? "is-today" : "")
                }
              >
                <label>{weekDays[new Date(w.day).getDay()]}</label>
                <img
                  className="weather-icon"
                  src={require(`./assets/${w.weather}.png`)}
                />
                <label>
                  <strong style={{ color: "grey" }}>{w.temperature}</strong> /{" "}
                  {w.temperature_min}
                </label>
              </div>
            </div>
          ))}
        </div>
      ) : (
        "loading..."
      )}
    </div>
  );
}

export default App;
