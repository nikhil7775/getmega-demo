import { analytics } from '../firebase';

const logLoginEvent = (uid) => {
  analytics.setUserId(uid);
  analytics.logEvent('login');
};

export const logLogoutEvent = () => {
  analytics.logEvent('logout');
};

export default logLoginEvent;
