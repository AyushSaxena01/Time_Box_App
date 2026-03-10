/**
 * Parse time string in HH:MM:SS format to seconds
 * @param {string} timeStr - Time string in HH:MM:SS format
 * @returns {number} Time in seconds, or null if invalid
 */
export function timeStringToSeconds(timeStr) {
  const parts = timeStr.split(':');
  
  if (parts.length !== 3) {
    return null;
  }

  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  const seconds = parseInt(parts[2], 10);

  if (
    isNaN(hours) ||
    isNaN(minutes) ||
    isNaN(seconds) ||
    hours < 0 ||
    minutes < 0 ||
    minutes >= 60 ||
    seconds < 0 ||
    seconds >= 60
  ) {
    return null;
  }

  return hours * 3600 + minutes * 60 + seconds;
}

/**
 * Convert seconds to HH:MM:SS format
 * @param {number} totalSeconds - Time in seconds
 * @returns {string} Time string in HH:MM:SS format
 */
export function secondsToTimeString(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map((val) => String(val).padStart(2, '0'))
    .join(':');
}

/**
 * Validate time format (HH:MM:SS)
 * @param {string} timeStr - Time string to validate
 * @returns {boolean} True if valid format
 */
export function isValidTimeFormat(timeStr) {
  return timeStringToSeconds(timeStr) !== null;
}
