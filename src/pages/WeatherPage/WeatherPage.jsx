import { checkToken } from '../../utilities/users-service'

export default function WeatherPage() {

  async function handleCheckToken() {
    const expDate = await checkToken()
  }

    return (
      <>
        <h1>WeatherPage</h1>
        <button onClick={handleCheckToken}>Check When My Login Expires</button>
      </>
    );
  }