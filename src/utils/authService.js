import { logLogoutEvent } from './logEvents';

const storage = window.localStorage;

export const ACCESS_TOKEN_KEY = 'access-token-mega';
export const USER_DISPLAY_NAME = 'user-display-name';
export const USER_EMAIL = 'user-email';

export const getAccountName = () => storage.getItem(USER_DISPLAY_NAME);

// Removing user data from storage
const removeLocalData = () => {
  const items = [
    ACCESS_TOKEN_KEY,
    USER_DISPLAY_NAME,
    USER_EMAIL,
  ];
  items.map((item) => (storage.removeItem(item)));
};

const isLoggedIn = () => {
  // check if token is present
  if (storage.getItem(ACCESS_TOKEN_KEY)) {
    return true;
  }
  // removing user data
  removeLocalData();
  return false;
};

export default isLoggedIn;

export const logout = () => {
  if (!isLoggedIn()) return;
  logLogoutEvent();
  removeLocalData();
};

// Storing user data
export const storeUserData = (userInfo) => {
  storage.setItem(USER_EMAIL, userInfo.email);
  storage.setItem(USER_DISPLAY_NAME, userInfo.displayName);
};

// Storing token from firebase-auth
export const storeToken = (authResult) => {
  storage.setItem(ACCESS_TOKEN_KEY, authResult.accessToken);
};
