import React from "react";
import { ForecastData } from "./types";

interface Props {
  forecast: ForecastData | null;
}

const ForecastWeather: React.FC<Props> = ({ forecast }) => {
  return (
    <div className="w-[600px] m-auto">
      <h2 className="font-bold text-lg text-center">4-Day Forecast</h2>
      {forecast ? (
        Object.keys(forecast).map((date, index) => {
          const dayForecast = forecast[date];
          return (
            <div key={index} className="flex flex-col items-center">
              <h3 className="font-bold text-base">{date}</h3>
              <p className="font-medium">
                {dayForecast?.avg_temp?.toFixed(2)} °C
              </p>
              <p className="font-normal">{dayForecast?.weather}</p>
            </div>
          );
        })
      ) : (
        <p>No forecast data available</p>
      )}
    </div>
  );
};

export default ForecastWeather;
