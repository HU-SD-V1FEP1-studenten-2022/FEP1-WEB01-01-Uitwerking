/* eslint-disable import/prefer-default-export */
/**
 * This is a helper function.
 * @function round
 * @param {*} number
 * @param {*} decimals
 * @returns number
 * @example round(7.342, 1) returns 7.3 (1 decimal number behind the dot).
 */
function round(number, decimals) {
  const BASE = 10;
  return Math.round(number * BASE) / (decimals * BASE);
}

/**
 * @function getApiTimeoutInMilliseconds
 * Utility function to convert the number minutes to be waited before
 * calling the REST API again into the number of milliseconds.
 *
 * NOTE1: Since this function will only used by getWeatherData the function should be
 * a inner function of getWeatherData, but then we would not be able to test this function.
 * Therefore when you write test code yourself you could start this way and once everything
 * works you could start refactoring you code and skip testing this function.
 *
 * NOTE2: Because this function doesn't use 'this' the function is made static. The consequence is
 * that you should use this function by
 * a static call: WeatherService.getApiTimeoutInMilliseconds().
 *
 * @param minuten {Number} -Number of minutes to wait
 * @returns {Number} - Number of milliseconds to wait
 */
function getApiTimeoutInMilliseconds(minuten) {
  const MILLISECOND = 1;
  const SECONDE = 1000 * MILLISECOND;
  const MINUTE = 60 * SECONDE;
  return minuten * MINUTE;
}

/**
 * @function isDataToOld
 * Utility function to determine if a given timestamp is to old to be used.
 *
 * NOTE1: Like getApiTimeoutInMilliseconds this function will only be used by
 * getWeatherData and should therefore be an inner function. But for testing reasons we
 * have choosen not to do so for now.
 *
 * NOTE2: Because this function doesn't use 'this' the function is made static. The consequence is
 * that you should use this function by
 * a static call: WeatherService.isDataToOld().
 *
 * @param timestamp {Number} - The timestamp to be compared to the API Timeout
 * @param timeout {Number} - Number of milliseconds that the timestamp may be
 *    older than the current time.
 * @returns {Boolean} - true if the timestamp indicates that the data is to old,
 *    otherwise false will be returned.
 */
function isDataToOld(timestamp, timeout) {
  return ((Date.now() - timestamp) > timeout);
}

export {
  round,
  getApiTimeoutInMilliseconds,
  isDataToOld,
};
