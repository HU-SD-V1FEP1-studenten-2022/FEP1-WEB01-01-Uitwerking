/* eslint-disable import/prefer-default-export */
/**
 * Build a time string for a given date
 * @function getTimeString
 * @param time <Date> - The date to be converted to a nice string
 * @returns <String> - the current time in the form "{2 letter weekday indicator} HH:MM:SS"
 */
function getTimeString(time) {
  // ---- CUT ----
  // const timeString = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;

  const options = {
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  const timeString = new Intl.DateTimeFormat('nl-NL', options).format(time);

  return timeString;
  // ---- ENDCUT ----
}

export {
  getTimeString,
};
