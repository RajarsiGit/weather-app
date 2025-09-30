import { useState, useEffect } from "react";
import { Cloud, CloudRain, Sun, Wind, Droplets, Gauge } from "lucide-react";

export default function WeatherDisplay() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getWeather();
  }, []);

  const getWeather = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure&timezone=auto`
          );

          if (!response.ok) throw new Error("Failed to fetch weather data");

          const data = await response.json();
          setWeather(data);
          setLoading(false);
        } catch (error) {
          console.error("Weather fetch error:", error);
          setError(`Failed to fetch weather data: ${error.message}`);
          setLoading(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setError(`Unable to retrieve your location: ${error.message}`);
        setLoading(false);
      }
    );
  };

  const getWeatherIcon = (code) => {
    if (code === 0) return <Sun className="w-16 h-16 text-yellow-400" />;
    if (code <= 3) return <Cloud className="w-16 h-16 text-gray-400" />;
    if (code <= 67 || code >= 80)
      return <CloudRain className="w-16 h-16 text-blue-400" />;
    return <Cloud className="w-16 h-16 text-gray-400" />;
  };

  const getWeatherDescription = (code) => {
    if (code === 0) return "Clear sky";
    if (code <= 3) return "Partly cloudy";
    if (code <= 48) return "Foggy";
    if (code <= 67) return "Rainy";
    if (code <= 77) return "Snowy";
    if (code >= 80) return "Rain showers";
    return "Unknown";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-center">
            Getting your location...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md">
          <p className="text-red-600 text-center text-lg mb-4">{error}</p>
          <button
            onClick={getWeather}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const current = weather.current;
  const temp = Math.round(current.temperature_2m);
  const feelsLike = Math.round(current.apparent_temperature);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-md w-full text-white">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Current Weather</h1>
          <p className="text-sm opacity-90">
            {weather.timezone.replace(/_/g, " ")}
          </p>
        </div>

        <div className="flex flex-col items-center mb-8">
          {getWeatherIcon(current.weather_code)}
          <div className="text-6xl font-bold mt-4">{temp}°C</div>
          <div className="text-xl mt-2 opacity-90">
            {getWeatherDescription(current.weather_code)}
          </div>
          <div className="text-sm mt-1 opacity-75">
            Feels like {feelsLike}°C
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white bg-opacity-20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Wind className="w-5 h-5" />
              <span className="text-sm opacity-75">Wind Speed</span>
            </div>
            <div className="text-2xl font-semibold">
              {Math.round(current.wind_speed_10m)} km/h
            </div>
          </div>

          <div className="bg-white bg-opacity-20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="w-5 h-5" />
              <span className="text-sm opacity-75">Humidity</span>
            </div>
            <div className="text-2xl font-semibold">
              {current.relative_humidity_2m}%
            </div>
          </div>

          <div className="bg-white bg-opacity-20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Gauge className="w-5 h-5" />
              <span className="text-sm opacity-75">Pressure</span>
            </div>
            <div className="text-2xl font-semibold">
              {Math.round(current.surface_pressure)} hPa
            </div>
          </div>

          <div className="bg-white bg-opacity-20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <CloudRain className="w-5 h-5" />
              <span className="text-sm opacity-75">Precipitation</span>
            </div>
            <div className="text-2xl font-semibold">
              {current.precipitation} mm
            </div>
          </div>
        </div>

        <button
          onClick={getWeather}
          className="w-full bg-white bg-opacity-30 hover:bg-opacity-40 text-white font-semibold py-3 px-6 rounded-xl transition-all backdrop-blur-sm"
        >
          Refresh Weather
        </button>
      </div>
    </div>
  );
}
