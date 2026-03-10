import { useEffect, useRef } from 'react';
import { useSession } from '../utils/sessionContext';
import { secondsToTimeString } from '../utils/timeUtils';
import '../styles/ExecutionScreen.css';

export default function ExecutionScreen({ onComplete, onReset }) {
  const sessionState = useSession();
  const timerIntervalRef = useRef(null);

  const { state } = sessionState;
  const { config, currentSegment, remainingTime, isRunning } = state;

  const totalSegments = config.numberOfSegments;
  const isLastSegment = currentSegment === totalSegments;

  // Get segment durations based on mode
  const getSegmentDurations = () => {
    if (config.mode === 'custom') {
      return config.segmentDurations;
    } else {
      // Standard mode: calculate equal division
      const segmentDuration = Math.floor(config.totalTime / config.numberOfSegments);
      const remainder = config.totalTime % config.numberOfSegments;
      const durations = Array(config.numberOfSegments).fill(segmentDuration);
      if (remainder > 0) {
        durations[config.numberOfSegments - 1] = segmentDuration + remainder;
      }
      return durations;
    }
  };

  // Timer logic using setInterval for precision
  useEffect(() => {
    if (!isRunning || remainingTime === 0) {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
      return;
    }

    timerIntervalRef.current = setInterval(() => {
      // Update remaining time every second
      sessionState.updateRemainingTime(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [isRunning, sessionState]);

  // Handle segment transitions when remaining time reaches 0
  useEffect(() => {
    if (remainingTime <= 0 && isRunning) {
      if (isLastSegment) {
        // Session complete
        sessionState.completeSession();
        setTimeout(onComplete, 500);
      } else {
        // Move to next segment  
        const durations = getSegmentDurations();
        const nextDuration = durations[currentSegment]; // currentSegment is 1-indexed
        sessionState.nextSegment(nextDuration);
      }
    }
  }, [remainingTime, isRunning, isLastSegment, currentSegment, sessionState, onComplete]);

  const handlePause = () => {
    sessionState.pauseTimer();
  };

  const handleResume = () => {
    sessionState.resumeTimer();
  };

  const handleStop = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    onReset();
  };

  const progressPercentage = ((totalSegments - currentSegment + 1) / totalSegments) * 100;

  return (
    <div className="screen execution-screen">
      <h1>Time Box Session</h1>

      <div className="session-info">
        <div className="info-item">
          <span className="label">Total Time</span>
          <span className="value">{secondsToTimeString(config.totalTime)}</span>
        </div>
        <div className="info-item">
          <span className="label">Total Segments</span>
          <span className="value">{config.numberOfSegments}</span>
        </div>
        <div className="info-item">
          <span className="label">Mode</span>
          <span className="value capitalize">{config.mode}</span>
        </div>
      </div>

      <div className="current-segment-display">
        <div className="segment-header">
          <h2>Segment {currentSegment} of {totalSegments}</h2>
          {isLastSegment && remainingTime <= 0 && <span className="badge badge-complete">Complete</span>}
        </div>

        <div className="countdown-display">
          <div className="countdown">{secondsToTimeString(remainingTime)}</div>
          <div className="timer-status">
            {!isRunning && currentSegment > 0 && 'Paused'}
            {isRunning && 'Running'}
          </div>
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="progress-text">
          {currentSegment} / {totalSegments} segments completed
        </div>
      </div>

      <div className="segments-overview">
        <h3>Segments</h3>
        <div className="segment-list-execution">
          {Array.from({ length: totalSegments }).map((_, index) => {
            const isActive = index + 1 === currentSegment;
            const isCompleted = index + 1 < currentSegment;
            const durations = getSegmentDurations();
            const duration = durations[index];

            return (
              <div
                key={index}
                className={`segment-badge ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
              >
                <span className="badge-number">{index + 1}</span>
                <span className="badge-duration">{secondsToTimeString(duration)}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="button-group control-buttons">
        {!isRunning && currentSegment > 0 ? (
          <button onClick={handleResume} className="btn-primary">
            Resume
          </button>
        ) : (
          <button onClick={handlePause} disabled={!isRunning} className="btn-secondary">
            Pause
          </button>
        )}
        <button onClick={handleStop} className="btn-danger">
          Stop Session
        </button>
      </div>
    </div>
  );
}
