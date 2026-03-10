/**
 * @typedef {Object} SessionConfig
 * @property {number} totalTime - Total duration in seconds
 * @property {number} numberOfSegments - Number of time box segments
 * @property {'standard' | 'custom' | null} mode - Timer mode
 * @property {number[]} segmentDurations - Duration of each segment in seconds
 */

/**
 * @typedef {Object} SessionState
 * @property {SessionConfig} config - Session configuration
 * @property {number} currentSegment - Current segment index
 * @property {number} remainingTime - Remaining time in current segment (seconds)
 * @property {boolean} isRunning - Whether timer is currently running
 * @property {boolean} isPaused - Whether timer is paused
 * @property {number[]} completedSegments - Array of completed segment indices
 */

/**
 * Initial session state
 * @type {SessionState}
 */
export const initialSessionState = {
  config: {
    totalTime: 0,
    numberOfSegments: 0,
    mode: null,
    segmentDurations: [],
  },
  currentSegment: 0,
  remainingTime: 0,
  isRunning: false,
  isPaused: false,
  completedSegments: [],
};
