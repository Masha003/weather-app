from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from collections import defaultdict, Counter
from datetime import datetime

from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

API_KEY = os.getenv("API_KEY")

@app.route("/api/current", methods=['GET', 'POST'])
def get_weather():
    if request.method == "POST":
        cityName = request.form.get("cityName")
        if not cityName:
            return jsonify({"cod": 400, "message": "City name is required"}), 400
        
        url = f"https://api.openweathermap.org/data/2.5/weather?q={cityName}&appid={API_KEY}&units=metric"
        try:
            response = requests.get(url)
            response.raise_for_status()  # Raises an HTTPError if the HTTP request returned an unsuccessful status code
            data = response.json()

            # Check if the API returned an error message
            if data.get("cod") != 200:
                return jsonify({"cod": data.get("cod"), "message": data.get("message", "Unknown error occurred")}), 400
            
            return jsonify(data)
        except requests.exceptions.RequestException as e:
            return jsonify({"cod": 500, "message": "City not valid. Please check spelling."}), 500
    else:
        return jsonify({
            "message": "Weather API",
            "usage": "Send a POST request with a 'cityName' parameter to get the current weather for that city.",
            "example": {
                "method": "POST",
                "url": "/api/home",
                "body": {
                    "cityName": "London"
                }
            }
        })


@app.route("/api/forecast", methods=['POST'])
def get_forecast():
    cityName = request.form.get("cityName")
    if not cityName:
        return jsonify({"cod": 400, "message": "City name is required"}), 400

    url = f"https://api.openweathermap.org/data/2.5/forecast?q={cityName}&appid={API_KEY}&units=metric"
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()

        if data.get("cod") != "200":
            return jsonify({"cod": data.get("cod"), "message": data.get("message", "Unknown error occurred")}), 400
        
        forecast_list = data.get('list', [])
        daily_forecast = defaultdict(list)

        for forecast in forecast_list:
            date = datetime.strptime(forecast['dt_txt'], '%Y-%m-%d %H:%M:%S').date()
            daily_forecast[date].append(forecast)

        # Aggregate data for next 4 days
        sorted_dates = sorted(daily_forecast.keys())[:4]
        result = {}
        for date in sorted_dates:
            temp_sum = 0
            weather_counter = Counter()
            count = len(daily_forecast[date])
            for entry in daily_forecast[date]:
                temp_sum += entry['main']['temp']
                weather_counter[entry['weather'][0]['description']] += 1
            
            avg_temp = temp_sum / count
            most_common_weather = weather_counter.most_common(1)[0][0]
            
            result[str(date)] = {
                'avg_temp': avg_temp,
                'weather': most_common_weather
            }

        return jsonify(result)
    except requests.exceptions.RequestException as e:
        return jsonify({"cod": 500, "message": "Failed to fetch data from the weather service"}), 500
    
if __name__ == "__main__":
    app.run(debug=True, port=8080)
    