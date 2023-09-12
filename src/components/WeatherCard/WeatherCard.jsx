import weatherIcons from '../../utilities/config/imgLinks';

export default function WeatherCard({ day }) {
  function getIcon(iconIdx) {
    return weatherIcons[iconIdx - 1];
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg p-4">
      <h2 className="text-xl font-semibold mb-2">
        Date: {day.Date.substr(0, 10)}
      </h2>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img
            src={getIcon(day.Day.Icon)}
            alt={`Day Weather Icon for ${day.Day.IconPhrase}`}
            className="aspect-auto mr-2"
          />
          <p>
            <strong>Day:</strong> {day.Day.IconPhrase}
          </p>
        </div>
        <div className="flex items-center">
          <img
            src={getIcon(day.Night.Icon)}
            alt={`Night Weather Icon for ${day.Night.IconPhrase}`}
            className="aspect-auto mr-2"
          />
          <p>
            <strong>Night:</strong> {day.Night.IconPhrase}
          </p>
        </div>
      </div>
      <p>
        <strong>Day Temperature:</strong> {day.Temperature.Maximum.Value}°F
      </p>
      <p>
        <strong>Night Temperature:</strong> {day.Temperature.Minimum.Value}°F
      </p>
      <div className="mt-4">
        <a
          href={day.MobileLink}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 hover:underline"
        >
          More Details
        </a>
      </div>
    </div>
  );
}
