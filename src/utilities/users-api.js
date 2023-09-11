import sendRequest from './send-request';
const BASE_URL = '/api/users';

// Refactored code below
export function signUp(userData) {
  return sendRequest(BASE_URL, 'POST', userData);
}

export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

export function checkToken() {
    return sendRequest(`${BASE_URL}/check-token`);
}

export function changeSetting(settings) {
  return sendRequest(`${BASE_URL}/settings`, 'PUT', settings);
}

export function saveArticle(articleData) {
  return sendRequest(`${BASE_URL}/create`, 'POST', articleData)
}

export function deleteArticle(description) {
  return sendRequest(`${BASE_URL}/delete`, 'DELETE', description)
}