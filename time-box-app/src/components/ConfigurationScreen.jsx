import { useState } from 'react';
import { useSession } from '../utils/sessionContext';
import { timeStringToSeconds, isValidTimeFormat } from '../utils/timeUtils';
import '../styles/ConfigurationScreen.css';

export default function ConfigurationScreen({ onComplete }) {
  const { state, updateConfig } = useSession();
  const [errors, setErrors] = useState({});

  const handleTimeChange = (e) => {
    const value = e.target.value;
    const newErrors = { ...errors };

    if (value === '') {
      delete newErrors.totalTime;
      updateConfig({ totalTime: 0 });
    } else if (isValidTimeFormat(value)) {
      const seconds = timeStringToSeconds(value);
      delete newErrors.totalTime;
      updateConfig({ totalTime: seconds });
    } else if (value.length <= 8) {
      // Still typing
      newErrors.totalTime = 'Invalid format';
    }

    setErrors(newErrors);
  };

  const handleSegmentCountChange = (e) => {
    const value = e.target.value;
    const newErrors = { ...errors };

    if (value === '') {
      delete newErrors.numberOfSegments;
      updateConfig({ numberOfSegments: 0 });
    } else {
      const count = parseInt(value, 10);
      if (!isNaN(count) && count > 0) {
        delete newErrors.numberOfSegments;
        updateConfig({ numberOfSegments: count });
      } else {
        newErrors.numberOfSegments = 'Must be a positive number';
      }
    }

    setErrors(newErrors);
  };

  const isValid =
    state.config.totalTime > 0 && state.config.numberOfSegments > 0;

  const displayTime = state.config.totalTime
    ? String(Math.floor(state.config.totalTime / 3600))
        .padStart(2, '0')
        .concat(':')
        .concat(
          String(Math.floor((state.config.totalTime % 3600) / 60)).padStart(
            2,
            '0'
          )
        )
        .concat(':')
        .concat(String(state.config.totalTime % 60).padStart(2, '0'))
    : '';

  return (
    <div className="screen configuration-screen">
      <h1>Time Box Configuration</h1>

      <div className="form-group">
        <label htmlFor="totalTime">Total Time (HH:MM:SS)</label>
        <input
          id="totalTime"
          type="text"
          placeholder="00:00:00"
          onChange={handleTimeChange}
          className={errors.totalTime ? 'error' : ''}
        />
        {errors.totalTime && (
          <div className="error-message">{errors.totalTime}</div>
        )}
        {displayTime && (
          <div className="info-message">Total: {displayTime}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="segmentCount">Number of Segments</label>
        <input
          id="segmentCount"
          type="number"
          min="1"
          placeholder="Enter number of segments"
          onChange={handleSegmentCountChange}
          className={errors.numberOfSegments ? 'error' : ''}
        />
        {errors.numberOfSegments && (
          <div className="error-message">{errors.numberOfSegments}</div>
        )}
      </div>

      {isValid && (
        <div className="summary">
          <h3>Configuration Summary</h3>
          <p>Total Time: {displayTime}</p>
          <p>Number of Segments: {state.config.numberOfSegments}</p>
        </div>
      )}

      <div className="button-group">
        <button
          onClick={onComplete}
          disabled={!isValid}
          className="btn-primary"
        >
          Next: Select Mode
        </button>
      </div>
    </div>
  );
}
