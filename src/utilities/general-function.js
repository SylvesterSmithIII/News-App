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

    let data = await response.json()

    if (!data.length) return ""

    data = data[0]

    const locationInfo = {
      zipcodeKey: data.Key,
      cityName: data.EnglishName,
      stateName: data.AdministrativeArea.EnglishName
    }

    return locationInfo
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

export function returnWord(icon) {
  if (icon <= 5) {
    return "Sunny"
  } else if (icon <= 8) {
    return "Cloudy"
  } else if (icon === 11) {
    return "Foggy"
  } else if (icon <= 14 || icon === 18) {
    return "Rainy"
  } else if (icon <= 17) {
    return "Stormy"
  } else if (icon <= 29) {
    return "Snowy"
  } else if (icon === 30) {
    return "Hot"
  } else if (icon === 31) {
    return "Cold"
  } else if (icon === 31) {
    return "Windy"
  } else if (icon <= 38) {
    return "Cloudy"
  } else if (icon <= 40) {
    return "Rainy"
  } else if (icon <= 42) {
    return "Stormy"
  } else if (icon <= 44) {
    return "Snowy"
  }
}