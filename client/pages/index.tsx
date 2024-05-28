import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import CurrentWeather from "../components/CurrentWeather";
import ForecastWeather from "@/components/ForecastWeather";
import { ForecastData, WeatherData } from "../components/types";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | string | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (!city) {
      setWeather("Please enter a city name");
      return;
    }

    axios
      .post(
        "http://localhost:8080/api/current",
        new URLSearchParams({
          cityName: city,
        })
      )
      .then((response) => {
        setWeather(response.data);
        setCity("");
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message;
        setWeather(errorMessage);
      });

    // Fetch forecast
    axios
      .post(
        "http://localhost:8080/api/forecast",
        new URLSearchParams({
          cityName: city,
        })
      )
      .then((response) => {
        setForecast(response.data);
        setCity(""); // Clear the input field
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message;
        setForecast(null);
      });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setWeather(null);
        setCity("");
        setForecast(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <main className="flex flex-col justify-center h-screen bg-blue">
      <div ref={formRef} className="flex flex-col justify-center gap-[20px]">
        <CurrentWeather
          city={city}
          setCity={setCity}
          weather={weather}
          handleSubmit={handleSubmit}
        />
        <ForecastWeather forecast={forecast} />
      </div>
    </main>
  );
}
