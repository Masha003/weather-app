from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route("/api/home", methods=['GET', 'POST'])
def return_home():
    if request.method == "POST":
        cityName = request.form.get("cityName")
        apiKey = "efe7dec52fa211e3cc14aed9b4130829"
        url = f"https://api.openweathermap.org/data/2.5/weather?q={cityName}&appid={apiKey}"
        data = requests.get(url).json()  # Parse the response to JSON
        return jsonify(data)
    else:
        return jsonify({"message": "Hello world"})  # Default GET response

if __name__ == "__main__":
    app.run(debug=True, port=8080)


# api key: efe7dec52fa211e3cc14aed9b4130829
# api link: https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}