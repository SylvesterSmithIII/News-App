const baseUrl = "https://dataservice.accuweather.com/locations/v1/search"
const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY
const fiveDayUrl = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/"

export function handleClick(evt, formData, setFormData) {
    const name = evt.target.name;
    const value = evt.target.value;
  
    const updatedFormData = {
      ...formData,
      [name]: formData[name].filter(param => param !== value)
    };
  
    setFormData(updatedFormData);
}

export async function getZipcodeKey(zipcode) {
    const response = await fetch(`${baseUrl}?q=${zipcode}&apikey=${weatherApiKey}`)

    if (!response.ok) throw new Error(`API request failed with status: ${response.status}`)

    const data = await response.json()

    if (!data.length) return ""

    return data[0].Key
}

export async function getForecast(zipcodeKey) {
  const fullUrl = `${fiveDayUrl}${zipcodeKey}?apikey=${weatherApiKey}`

  try {
    const response = await fetch(fullUrl);

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`)
    }

    const data = await response.json()

    return data.DailyForecasts;
  } catch (error) {
    console.error("An error occurred while fetching weather data", error);
    return []
  }
}

