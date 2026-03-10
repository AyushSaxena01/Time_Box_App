/**
 * Validate minimum segment duration (5 seconds)
 * @param {number} duration - Duration in seconds
 * @returns {boolean} True if valid
 */
export function isValidSegmentDuration(duration) {
  return duration >= 5;
}

/**
 * Validate that custom segment durations don't exceed total time
 * @param {number[]} segmentDurations - Array of durations in seconds
 * @param {number} totalTime - Total time in seconds
 * @returns {boolean} True if valid
 */
export function isValidTotalTime(segmentDurations, totalTime) {
  const sum = segmentDurations.reduce((acc, val) => acc + val, 0);
  return sum <= totalTime;
}

/**
 * Validate all custom segment durations
 * @param {number[]} segmentDurations - Array of durations in seconds
 * @returns {object} Validation result with isValid flag and errors array
 */
export function validateSegmentDurations(segmentDurations) {
  const errors = [];

  segmentDurations.forEach((duration, index) => {
    if (!isValidSegmentDuration(duration)) {
      errors.push(
        `Segment ${index + 1} must be at least 5 seconds (got ${duration}s)`
      );
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate complete custom mode configuration
 * @param {number[]} segmentDurations - Array of durations in seconds
 * @param {number} totalTime - Total time in seconds
 * @returns {object} Validation result with isValid flag and errors array
 */
export function validateCustomModeConfig(segmentDurations, totalTime) {
  const durationErrors = validateSegmentDurations(segmentDurations);
  const errors = [...durationErrors.errors];

  if (!isValidTotalTime(segmentDurations, totalTime)) {
    const sum = segmentDurations.reduce((acc, val) => acc + val, 0);
    errors.push(
      `Total segment duration (${sum}s) exceeds total time (${totalTime}s)`
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
