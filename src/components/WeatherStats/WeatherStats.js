import React from 'react';
import LiveTime from '../LiveTime/LiveTime';
import weatherIcons from '../../utilities/config/imgLinks';
import sampleWeatherData from '../../utilities/config/sampleWeatherResponse';

export default function WeatherStats({ weatherStats, weatherLoading }) {
  function getIcon(iconIdx) {
    return weatherIcons[iconIdx - 1];
  }

  if (!weatherStats.length) {
    weatherStats = sampleWeatherData;
  }

  const todaysWeather = weatherStats[0];

  return (
    <div className="mb-4">
        {
            weatherLoading
            ?
            "Loading Weather Stats"
            :
            <>
            <h1 className="text-2xl mb-4">Current Weather</h1>
            <div className="flex items-center mb-4">
                <p className="text-lg mr-4">Day: {todaysWeather.Day.IconPhrase}</p>
                <img
                src={getIcon(todaysWeather.Day.Icon)}
                alt="weather icon"
                className="aspect-auto"
                />
            </div>
            <div className="flex items-center mb-4">
                <p className="text-lg mr-4">Night: {todaysWeather.Night.IconPhrase}</p>
                <img
                src={getIcon(todaysWeather.Night.Icon)}
                alt="weather icon"
                className="aspect-auto"
                />
            </div>
            <div className="mb-4">
                <p className="text-lg">
                Temperature: {todaysWeather.Temperature.Minimum.Value}&deg; to{' '}
                {todaysWeather.Temperature.Maximum.Value}&deg;{' '}
                {todaysWeather.Temperature.Minimum.Unit}
                </p>
            </div>
            <hr className="my-4 border-t" />
            <div className="text-sm text-gray-600">
                <p>The time is currently: <LiveTime /></p>
                <p>Weather data provided by [Your Data Source]</p>
            </div>
            </>
        }
    </div>
  );
}
