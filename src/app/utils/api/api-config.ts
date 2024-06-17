import { environment } from '../../../environments/environment';

export class ApiConfig {
  public static TOKEN = 'http://localhost:8086/oauth/token';
  public static URL = 'https://c4e3-2400-1a00-b030-e90-bc2a-151c-f7f-48c8.ngrok-free.app/api/v1';
  public static baseApiUrl = environment.baseApiUrl;
  public static auth = environment.baseApiUrl + '/v1/auth';
  public static login = ApiConfig.auth + '/authenticate';
  public static VERIFY_OTP = ApiConfig.auth + '/verify-otp';
  public static refreshToken = ApiConfig.auth + '/refresh';
  public static baseApiEndPoint = environment.baseApiUrl + '/v1';
  public static externalApiEndPoint = environment.baseApiUrl + '/v2/api';
  public static imageUrl = environment.baseApiUrl;
}
