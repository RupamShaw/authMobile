import { Platform } from 'react-native';

export default {
  BASE_URL: Platform.select({
    ios: 'http://localhost:8080',
    // android: 'http://dapi.matrak.com.au',
    //    android: 'http://192.168.1.10:8080/api/v1',
    android: 'https://authent-api.herokuapp.com/',

  }),
  ToastMessageDuration: 500,
};
