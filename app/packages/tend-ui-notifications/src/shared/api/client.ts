import axios from 'axios';
import { setAxiosAuthInterceptor } from 'samolet-oauth2';

export const axiosClient = axios.create();
setAxiosAuthInterceptor(axiosClient, {
  clientId: localStorage.getItem('SAMOLET_OAUTH2_PKCE_CLIENT_ID'),
});
