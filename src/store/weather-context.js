import { createContext, useState, useEffect } from "react";

const cityOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "",
    "X-RapidAPI-Host": "",
  },
};

const weatherOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "",
    "X-RapidAPI-Host": "",
  },
};

export const WeatherContext = createContext();

const WeatherContextProvider = ({ children }) => {
  const [weather, setWeather] = useState([]);
  const [choosedCity, setChoosedCity] = useState();

  // this array will be used in the combo box from the main page to list cities
  const [cities, setCities] = useState([
    { value: "istanbul", name: "İstanbul" },
    { value: "izmir", name: "İzmir" },
    { value: "london", name: "London" },
    { value: "california", name: "Kaliforniya" },
    { value: "paris", name: "Paris" },
  ]);

  // this useEffect function used to the set choosedCity for the first time render
  useEffect(() => {
    setChoosedCity(cities[0].value);
  }, []);

  // every time choosedCity change this useEffect function will be run again and fetch the weather from API
  useEffect(() => {
    const fetchWeather = async () => {
      // first wee need to fetch city informations because weather api needs longitude and latitude informations
      const cityRes = await fetch(
        `https://ai-weather-by-meteosource.p.rapidapi.com/find_places?text=${choosedCity}&language=en`,
        cityOptions
      );
      const cityJson = await cityRes.json();

      // we destructured the lat and lon infos
      const { lat, lon } = cityJson[0];

      // and using in the weather API to fetch the city weather
      const weatherRes = await fetch(
        `https://ai-weather-by-meteosource.p.rapidapi.com/daily?lat=${lat}&lon=${lon}&language=en&units=auto`,
        weatherOptions
      );
      const weatherJson = await weatherRes.json();

      // we sliced the fetched data from 0 to 7 becuse we only need weekly weather
      setWeather(weatherJson.daily.data.slice(0, 7));
    };

    fetchWeather();
  }, [choosedCity]);

  return (
    <WeatherContext.Provider
      value={{ weather: weather, cities: cities, choosedCity, setChoosedCity }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherContextProvider;
