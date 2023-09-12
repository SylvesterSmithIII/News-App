import React from 'react';
import LiveTime from '../LiveTime/LiveTime';
import weatherIcons from '../../utilities/config/imgLinks';
import sampleWeatherData from '../../utilities/config/sampleWeatherResponse';
import { returnWord } from '../../utilities/general-function'

export default function WeatherStats({ weatherStats, weatherLoading, city, state }) {
  function getIcon(iconIdx) {
    return weatherIcons[iconIdx - 1];
  }

  if (!weatherStats.length) {
    weatherStats = sampleWeatherData;
  }

  const todaysWeather = weatherStats[0];

  const time = new Date()
  let icon
  if (time.getHours() < 17) {
    icon = todaysWeather?.Day?.Icon
  } else {
    icon = todaysWeather?.Night?.Icon
  }

  console.log(icon)
  console.log(returnWord(icon))

  return (
    <div className="mb-4">
        {
            weatherLoading
            ?
            "Loading Weather Stats"
            :
            <>
            <h1 className="text-2xl mb-4">The Weather today in {returnWord(icon)} {city}, {state}</h1>
            <div className='flex max-xs:flex-col sm:flex-row md:flex-row justify-evenly'>
            <div className="flex flex-col items-center mb-4">
                <p className="text-lg mr-4">Day: {todaysWeather.Day.IconPhrase}</p>
                <img
                src={getIcon(todaysWeather.Day.Icon)}
                alt="weather icon"
                className="aspect-auto"
                />
            </div>
            <div className="flex flex-col items-center mb-4">
                <p className="text-lg mr-4">Night: {todaysWeather.Night.IconPhrase}</p>
                <img
                src={getIcon(todaysWeather.Night.Icon)}
                alt="weather icon"
                className="aspect-auto"
                />
            </div>
            </div>
            <div className="mb-4">
                <p className="text-lg">
                Temperature: {todaysWeather.Temperature.Minimum.Value}&deg; to{' '}
                {todaysWeather.Temperature.Maximum.Value}&deg;{' '}
                {todaysWeather.Temperature.Minimum.Unit}
                </p>
            </div>
            <hr className="my-4 border-t" />
            <p className='text-center text-lg pt-2'>And heres the news!</p>
            </>
        }
    </div>
  );
}
