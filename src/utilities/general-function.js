const baseUrl = "https://dataservice.accuweather.com/locations/v1/search"
const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY

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