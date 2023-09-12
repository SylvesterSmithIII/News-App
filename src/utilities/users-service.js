import * as usersAPI from './users-api';
import KJUR from 'jsrsasign';


export async function getToken() {
    const token = localStorage.getItem('token')
  
    if (!token) return null;
  
    try {
      const decodedToken = KJUR.jws.JWS.parse(token)
      const currentTimeInSeconds = Math.floor(Date.now() / 1000)
  
      if (decodedToken.payloadObj.exp < currentTimeInSeconds) {
        // Token has expired - remove it from localStorage
        localStorage.removeItem('token')
        return null
      }
  
      return token
    } catch (error) {
      // Handle token verification error (e.g., invalid token)
      console.error('Token verification error:', error)
      return null
    }
}

export async function getUser() {
    const token = await getToken()
  
    if (!token) return null

    const decodedToken = KJUR.jws.JWS.parse(token)
  
    return decodedToken.payloadObj.user || null

}

export async function signUp(userData) {
  try {
    const token = await usersAPI.signUp(userData);
    localStorage.setItem('token', token);
    return getUser();
  } catch (error) {
    // Handle sign-up error
    console.error('Sign-up error:', error);
    throw error; // Propagate the error
  }
}

export function logOut() {
  localStorage.removeItem('token');
}

export async function login(credentials) {
  try {
    const token = await usersAPI.login(credentials);

    if (token) localStorage.setItem('token', token);

    return getUser();
  } catch (error) {
    // Handle login error
    console.error('Login error:', error);
    throw error; // Propagate the error
  }
}