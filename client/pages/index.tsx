import axios from "axios";
import React, { useEffect, useState } from "react";

interface WeatherData {
  weather: { description: string }[];
  main: { temp: number; humidity: number };
  wind: { speed: number };
}

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | string | null>(null);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    axios
      .post(
        "http://localhost:8080/api/home",
        new URLSearchParams({
          cityName: city,
        })
      )
      .then((response) => {
        setWeather(response.data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        setWeather("Failed to load data");
      });
    console.log(weather);
  };

  return (
    <main className="flex flex-col justify-center h-screen bg-blue">
      <div className="m-auto w-[600px] p-[30px] rounded-md shadow-md bg-white space-y-[20px]">
        <h1 className="font-bold text-lg text-center">Weather Forecast</h1>
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            placeholder="Enter city"
            name="cityName"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="basis-1/2"
          />
          <button
            type="submit"
            className="basis-1/4 bg-light-blue rounded-md text-sm font-medium"
          >
            Get Weather
          </button>
        </form>
        <div>
          {weather && typeof weather !== "string" ? (
            <>
              <h2>City: {city}</h2>
              <p>Description: {weather.weather[0].description}</p>
              <p>Temperature: {weather.main.temp} K</p>
              <p>Humidity: {weather.main.humidity}%</p>
              <p>Wind Speed: {weather.wind.speed} m/s</p>
            </>
          ) : (
            <p>{weather}</p> // Display any error message or "Failed to load data"
          )}
        </div>
      </div>
    </main>
  );
}
