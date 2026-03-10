import { useState } from 'react';
import { useSession } from '../utils/sessionContext';
import { timeStringToSeconds, isValidTimeFormat, secondsToTimeString } from '../utils/timeUtils';
import { validateCustomModeConfig } from '../utils/validation';
import '../styles/CustomModeSetup.css';

export default function CustomModeSetup({ onStartTimer }) {
  const { state, setMode } = useSession();
  const { totalTime, numberOfSegments } = state.config;
  
  const [segmentInputs, setSegmentInputs] = useState(
    Array(numberOfSegments).fill('')
  );
  const [errors, setErrors] = useState([]);

  const handleSegmentChange = (index, value) => {
    const newInputs = [...segmentInputs];
    newInputs[index] = value;
    setSegmentInputs(newInputs);

    // Parse and validate
    const newErrors = [...errors];
    newErrors[index] = null;

    if (value !== '') {
      if (!isValidTimeFormat(value)) {
        newErrors[index] = 'Invalid format (use HH:MM:SS)';
      } else {
        const seconds = timeStringToSeconds(value);
        if (seconds < 5) {
          newErrors[index] = 'Minimum 5 seconds required';
        }
      }
    }

    setErrors(newErrors);
  };

  const getDurations = () => {
    return segmentInputs
      .map((input) => (input ? timeStringToSeconds(input) : 0))
      .filter((val) => val > 0);
  };

  const validateAndStart = () => {
    const durations = getDurations();

    // Check all segments are entered
    if (durations.length !== numberOfSegments) {
      setErrors(Array(numberOfSegments).fill('All segments must be configured'));
      return;
    }

    // Validate configuration
    const validation = validateCustomModeConfig(durations, totalTime);
    if (!validation.isValid) {
      alert(validation.errors.join('\n'));
      return;
    }

    setMode('custom', durations);
    onStartTimer(durations, 'custom');
  };

  const durations = getDurations();
  const totalDuration = durations.reduce((a, b) => a + b, 0);
  const allFilled = segmentInputs.every((input) => input !== '');
  const noErrors = errors.every((err) => !err);

  return (
    <div className="custom-mode-setup">
      <h2>Custom Mode - Set Durations</h2>

      <div className="info-box">
        <p>Total Time Available: <span className="highlight">{secondsToTimeString(totalTime)}</span></p>
        <p>Enter duration for each segment (minimum 5 seconds each)</p>
      </div>

      <div className="segment-inputs">
        {segmentInputs.map((value, index) => (
          <div key={index} className="segment-input-group">
            <label htmlFor={`segment-${index}`}>
              Segment {index + 1}
            </label>
            <input
              id={`segment-${index}`}
              type="text"
              placeholder="HH:MM:SS"
              value={value}
              onChange={(e) => handleSegmentChange(index, e.target.value)}
              className={errors[index] ? 'error' : ''}
            />
            {errors[index] && (
              <div className="error-message">{errors[index]}</div>
            )}
            {value && !errors[index] && (
              <div className="success-message">
                ✓ {timeStringToSeconds(value)}s
              </div>
            )}
          </div>
        ))}
      </div>

      {allFilled && noErrors && (
        <div className="validation-summary">
          <h3>Configuration Summary</h3>
          <div className="duration-check">
            <div className="check-row">
              <span>Total Entered:</span>
              <span className={totalDuration <= totalTime ? 'ok' : 'error-text'}>
                {secondsToTimeString(totalDuration)}
              </span>
            </div>
            <div className="check-row">
              <span>Total Allowed:</span>
              <span>{secondsToTimeString(totalTime)}</span>
            </div>
            <div className="check-row">
              <span>Remaining:</span>
              <span className={totalDuration <= totalTime ? 'ok' : 'error-text'}>
                {secondsToTimeString(Math.max(0, totalTime - totalDuration))}
              </span>
            </div>
          </div>
          {totalDuration > totalTime && (
            <div className="error-alert">
              ⚠ Total duration exceeds available time!
            </div>
          )}
        </div>
      )}

      <div className="button-group">
        <button
          onClick={validateAndStart}
          disabled={!allFilled || !noErrors}
          className="btn-primary"
        >
          Start Timer
        </button>
      </div>
    </div>
  );
}
