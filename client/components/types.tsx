export interface WeatherData {
  weather: { description: string; icon_url: string }[];
  name: string;
  main: { temp: number; humidity: number };
  wind: { speed: number };
}

export interface ForecastItem {
  dt_txt: string;
  main: { temp: number };
  weather: { description: string }[];
}

export interface ForecastData {
  [date: string]: {
    avg_temp: number;
    weather: string;
  };
}
