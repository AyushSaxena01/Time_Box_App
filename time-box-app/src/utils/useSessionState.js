import { useState, useCallback } from 'react';

const initialConfig = {
  totalTime: 0,
  numberOfSegments: 0,
  mode: null,
  segmentDurations: [],
};

const initialState = {
  config: { ...initialConfig },
  currentSegment: 0,
  remainingTime: 0,
  isRunning: false,
  isPaused: false,
  completedSegments: [],
};

/**
 * Custom hook for managing time box session state
 * @returns {object} Session state and update functions
 */
export function useSessionState() {
  const [state, setState] = useState(initialState);

  // Update configuration
  const updateConfig = useCallback((config) => {
    setState((prev) => ({
      ...prev,
      config: { ...prev.config, ...config },
    }));
  }, []);

  // Set mode and calculate/prepare durations
  const setMode = useCallback((mode, customDurations = []) => {
    setState((prev) => ({
      ...prev,
      config: {
        ...prev.config,
        mode,
        segmentDurations: customDurations || prev.config.segmentDurations,
      },
    }));
  }, []);

  // Start timer execution
  const startTimer = useCallback((initialRemaining) => {
    setState((prev) => ({
      ...prev,
      currentSegment: 1,
      remainingTime: initialRemaining,
      isRunning: true,
      isPaused: false,
      completedSegments: [],
    }));
  }, []);

  // Update remaining time
  const updateRemainingTime = useCallback((timeOrFn) => {
    setState((prev) => ({
      ...prev,
      remainingTime: typeof timeOrFn === 'function' ? timeOrFn(prev.remainingTime) : timeOrFn,
    }));
  }, []);

  // Transition to next segment
  const nextSegment = useCallback((newRemaining) => {
    setState((prev) => ({
      ...prev,
      currentSegment: prev.currentSegment + 1,
      remainingTime: newRemaining,
      completedSegments: [...prev.completedSegments, prev.currentSegment],
    }));
  }, []);

  // Pause timer
  const pauseTimer = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isRunning: false,
      isPaused: true,
    }));
  }, []);

  // Resume timer
  const resumeTimer = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isRunning: true,
      isPaused: false,
    }));
  }, []);

  // Stop/reset timer
const resetSession = useCallback(() => {
  setState({
    config: { ...initialConfig },
    currentSegment: 0,
    remainingTime: 0,
    isRunning: false,
    isPaused: false,
    completedSegments: [],
  });
}, []);

  // Complete session
  const completeSession = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isRunning: false,
      isPaused: false,
    }));
  }, []);

  return {
    state,
    updateConfig,
    setMode,
    startTimer,
    updateRemainingTime,
    nextSegment,
    pauseTimer,
    resumeTimer,
    resetSession,
    completeSession,
  };
}
