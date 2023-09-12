import { getToken } from './users-service';

export default async function sendRequest(apiUrl, siteUrl) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const token = await getToken();
  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${apiUrl}?url=${siteUrl}`, options);

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    return res.json();
  } catch (error) {
    // Handle network errors or other issues here
    throw new Error(`Failed to fetch data: ${error.message}`);
  }
}
