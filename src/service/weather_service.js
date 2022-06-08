import API_KEY from './api_keys';
import { getApiTimeoutInMilliseconds, isDataToOld } from '../utils/weather-utils';

export default class WeatherService {
  constructor() {
    this.cache = {};
    this.OPEN_WEATHER_TIMEOUT_IN_MINUTES = 10;
  }

  /**
   * This method will determine whether it should fetch the weather data for a given city
   * using the OpenWeather API or that it should fetch the data from a local cache.
   * @method getWeatherData
   * @param city {String} - name of the city of which the weather data should be looked up.
   * @returns {Promise} - once resolved OpenWeather data for the given city should be returned
   */
  getWeatherData(city) {
    return new Promise((resolve, reject) => {
      // first check if the city occours in the cache
      if (this.cache[city]) {
        // determine if the data in the cache should be used.
        if (isDataToOld(
          this.cache[city].timestamp,
          getApiTimeoutInMilliseconds(this.OPEN_WEATHER_TIMEOUT_IN_MINUTES),
        )) {
          // data in the cache is to old.
          // So we fetch the weatherdata from the WeatherData server again
          this.fetchWeatherData(city)
            .then((response) => { resolve(response); })
            .catch((error) => { reject(error); });
        } else {
          // data in the cache is not to old.
          // So we resolve the request by returning the data from the cache.
          resolve(this.cache[city].weatherdata);
        }
      } else {
        // otherwise return a new promise object and update cache
        this.#fetchWeatherData(city)
          .then((response) => { resolve(response); })
          .catch((error) => { reject(error); });
      }
    });
  }

  /**
   * This method fetches the weather data for a given city from OpenWeather and should only be
   * used by the method getWeatherData. We therefore make this method a private methode.
   * (see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields).
   *
   * @method fetchWeatherData
   * @param city { String } - Name of the city from which you want the data to retrieve
   * @returns { Promise <json> } - Once the promise is fullfilled a json object with
   *              weatherdata will be returned.
   */
  #fetchWeatherData(city) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=nl&units=metric`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then((response) => {
        // add the response to the cache
        this.cache[city] = {
          timestamp: Date.now(),
          weatherdata: response,
        };
        return response;
      })
      .catch((error) => {
        const STATUS_TOO_MANY_REQUESTS = 429;
        const STATUS_NOT_FOUND = 404;
        let message = error;
        if (Number(error.message) === STATUS_TOO_MANY_REQUESTS) {
          message = 'Service tijdelijk geblokeert. Probeer het over een uur nog een keer.';
        }
        if (Number(error.message) === STATUS_NOT_FOUND) {
          message = 'Plaats niet gevonden';
        }
        throw new Error(message);
      });
  }
}
