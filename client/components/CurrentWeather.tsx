import React from "react";
import { TfiLocationPin } from "react-icons/tfi";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";

interface WeatherData {
  weather: { description: string; icon_url: string }[];
  name: string;
  main: { temp: number; humidity: number };
  wind: { speed: number };
}

interface CurrentWeatherProps {
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  weather: WeatherData | string | null;
  handleSubmit: (event: React.FormEvent) => void;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  city,
  setCity,
  weather,
  handleSubmit,
}) => {
  return (
    <div className="m-auto w-[600px] p-[30px] rounded-md shadow-md bg-white space-y-[20px]">
      <h1 className="font-bold text-lg text-center">Weather App</h1>
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-[40px] h-[40px]"
      >
        <input
          type="text"
          placeholder="Enter city"
          name="cityName"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="basis-1/2 border border-gray-300 rounded h-full px-[10px]"
        />
        <button
          type="submit"
          className="basis-1/4 bg-light-blue rounded-md text-sm font-medium p-[7px] h-full"
        >
          Get Weather
        </button>
      </form>
      <div>
        {weather && typeof weather !== "string" ? (
          <>
            <div className="flex items-center gap-[6px]">
              <TfiLocationPin className="w-[20px] h-[20px]" />
              <h2 className="font-bold text-lg">{weather.name}</h2>
            </div>
            <p className="font-medium text-xl">{weather.main.temp} °C</p>
            <p className="font-normal text-base">
              {weather.weather[0].description}
            </p>
            <div className="font-bold text-sm flex items-center">
              <WiHumidity className="w-[30px] h-[30px]" />
              Humidity:{" "}
              <span className="font-normal text-base">
                {weather.main.humidity} %
              </span>
            </div>
            <div className="font-bold text-sm flex items-center gap-[6px]">
              <FaWind className="w-[20px] h-[20px]" />
              Wind Speed:{" "}
              <span className="font-normal text-base">
                {weather.wind.speed} m/s
              </span>
            </div>
          </>
        ) : (
          <p className="text-red-500">{weather}</p>
        )}
      </div>
    </div>
  );
};

export default CurrentWeather;
