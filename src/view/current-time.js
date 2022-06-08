import { getTimeString } from '../utils/current-time-utils';

const SECONDE = 1000; // 1 sec = 1000 milliseconden

/**
 * This function should render the '.current-time' element (<span class="current-time"></span>)
 * with the formated current time.
 *
 * @function renderCurrentTime
 *
 */
function renderCurrentTime() {
// ---- CUT ----
  const clockElement = document.querySelector('.current-time');
  clockElement.textContent = getTimeString(new Date());
// ---- ENDCUT -----
}

// call the updateClock function with an one second interval.
// ---- CUT ----
// const timer = // normally you want the timer handler to be able to clear the timer later.
setInterval(renderCurrentTime, SECONDE);
// ---- ENDCUT ----
