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

  const dayTemp = todaysWeather.Temperature.Maximum.Value
  const nightTemp = todaysWeather.Temperature.Minimum.Value
  const unit = todaysWeather.Temperature.Minimum.Unit

  return (
    <div className="mb-4">
        {
            weatherLoading
            ?
            "Loading Weather Stats"
            :
            <>
            <h1 className="text-2xl md:text-4xl mb-6 text-center">The Weather today in {returnWord(icon)} {city}, {state}</h1>
            <div className='flex max-xs:flex-col sm:flex-row md:flex-row justify-evenly '>
            <div className="flex flex-col items-center min-xs:mb-4">
                <p className="text-lg md:text-2xl min-xs:mr-4">Day {dayTemp}&deg;{unit}</p>
                <p className='text-md md:text-lg'>{todaysWeather.Day.IconPhrase}</p>
                <img
                src={getIcon(todaysWeather.Day.Icon)}
                alt="weather icon"
                className="aspect-auto"
                />
            </div>
            <div className="flex flex-col items-center min-xs:mb-4">
                <p className="text-lg md:text-2xl min-xs:mr-4">Night {nightTemp}&deg;{unit}</p>
                <p className='text-md md:text-lg'>{todaysWeather.Night.IconPhrase}</p>
                <img
                src={getIcon(todaysWeather.Night.Icon)}
                alt="weather icon"
                className="aspect-auto"
                />
            </div>
            </div>
            <hr className="my-4 border-t" />
            <p className='text-center text-lg pt-2'>And heres the news!</p>
            </>
        }
    </div>
  );
}
