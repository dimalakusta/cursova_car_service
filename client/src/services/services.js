import { ENV } from 'common/enums/enums';
import { Auth } from './auth/auth.service';
import { Http } from './http/http.service';
import { Notification } from './notification/notification.service';
import { Storage } from './storage/storage.service';

const storage = new Storage({
  storage: localStorage
});

const http = new Http({
  storage
});

const auth = new Auth({
  apiPath: ENV.API_PATH,
  http
});

const notification = new Notification();

export { http, storage, notification, auth };
