import sampleWeatherData from '../../utilities/config/sampleWeatherResponse'
import WeatherCard from '../../components/WeatherCard/WeatherCard'

export default function WeatherPage({ weatherStats }) {
  if (!weatherStats.length) {
    weatherStats = sampleWeatherData;
  }

  return (
    <div className="w-full p-8">
      <h1 className="text-2xl font-bold mb-4 text-center">5-Day Weather Forecast</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
        {weatherStats.map((day, index) => (
          <WeatherCard key={index} day={day} />
        ))}
      </div>
    </div>
  );
}
