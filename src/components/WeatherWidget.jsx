import { useEffect, useState } from "react";

function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const response = await fetch(
            `/.netlify/functions/weather?lat=${latitude}&lon=${longitude}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch weather data.");
          }

          const data = await response.json();

          setWeather({
            city: data.name,
            temp: data.main.temp,
            humidity: data.main.humidity,
          });
        } catch (err) {
          setError(err.message || "Something went wrong while fetching weather.");
        } finally {
          setLoading(false);
        }
      },
      (geoError) => {
        if (geoError.code === 1) {
          setError("Location permission was denied.");
        } else {
          setError("Unable to get your current location.");
        }
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  return (
    <div className="weather-widget">
      <div className="card-body">
        <h3 className="card-title mb-3">Live Weather</h3>

        {loading && <p className="mb-0">Loading weather...</p>}
        {error && <p className="text-danger mb-0">{error}</p>}

        {weather && !loading && !error && (
          <>
            <p className="mb-2">
              <strong>City:</strong> {weather.city}
            </p>
            <p className="mb-2">
              <strong>Temperature:</strong> {weather.temp}°C
            </p>
            <p className="mb-0">
              <strong>Humidity:</strong> {weather.humidity}%
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default WeatherWidget;