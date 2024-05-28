# Weather App

This project is a weather application built with Flask and React. The application allows users to get the current weather and a 4-day weather forecast for any city by entering the city name.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Front-end Components](#front-end-components)
- [Technologies Used](#technologies-used)

## Features

- Get current weather information for any city.
- Get a 4-day weather forecast for any city.
- User-friendly interface built with React.
- Data fetched from the OpenWeatherMap API.

## Installation

### Prerequisites

- Python 3.7+
- Node.js 12+
- npm 6+

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Masha003/weather-app.git
   cd weather-app/server
   ```

2. Create a `.env` file in the root directory

3. Add your OpenWeatherMap API key to the `.env` file.
   ```plaintext
   API_KEY=your_api_key_here
   ```
4. Install the required Python packages:

   ```bash
   pip install -r requirement.txt
   ```

5. Run the Flask server:
   ```bash
   python server.py
   ```

### Frontend Setup

1. Navigate to the `client` directory:

   ```bash
   cd ../client
   ```

2. Install the required npm packages:

   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm run dev
   ```

## Usage

1. Start the Flask server as described in the backend setup section.
2. Start the React development server as described in the frontend setup section.
3. Open your browser and navigate to `http://localhost:3000` to use the application.

## API Endpoints

### Get Current Weather

- **URL:** `/api/current`
- **Method:** `POST`
- **Parameters:** `cityName` (required)
- **Response:**
  ```json
  {
    "coord": {
      "lon": -0.13,
      "lat": 51.51
    },
    "weather": [
      {
        "id": 300,
        "main": "Drizzle",
        "description": "light intensity drizzle",
        "icon": "09d"
      }
    ],
    ...
  }
  ```

### Get Weather Forecast

- **URL:** `/api/forecast`
- **Method:** `POST`
- **Parameters:** `cityName` (required)
- **Response:**
  ```json
  {
    "2024-05-28": {
      "avg_temp": 15.5,
      "weather": "clear sky"
    },
    "2024-05-29": {
      "avg_temp": 16.3,
      "weather": "few clouds"
    },
    ...
  }
  ```

## Front-end Components

- `CurrentWeather`: A component to display current weather information.
- `ForecastWeather`: A component to display weather forecast information.
- `Home`: The main component that handles state management and API calls.

## Technologies Used

- **Backend:**

  - Flask
  - requests
  - collections
  - datetime

- **Frontend:**
  - React
  - axios
  - TypeScript
  - Tailwind CSS
