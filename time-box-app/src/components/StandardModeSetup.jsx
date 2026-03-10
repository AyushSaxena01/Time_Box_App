import { useSession } from '../utils/sessionContext';
import { secondsToTimeString } from '../utils/timeUtils';
import '../styles/StandardModeSetup.css';

export default function StandardModeSetup({ onStartTimer }) {
  const { state, setMode } = useSession();
  const { totalTime, numberOfSegments } = state.config;

  // Calculate equal duration per segment
  const segmentDuration = Math.floor(totalTime / numberOfSegments);
  const remainder = totalTime % numberOfSegments;

  // Create durations array - first segments get base duration, last gets remainder
  const durations = Array(numberOfSegments).fill(segmentDuration);
  if (remainder > 0) {
    durations[numberOfSegments - 1] = segmentDuration + remainder;
  }

  const handleStart = () => {
    setMode('standard', durations);
    onStartTimer(durations, 'standard');
  };

  return (
    <div className="standard-mode-setup">
      <h2>Standard Mode - Summary</h2>

      <div className="calculation-summary">
        <p className="calculation-detail">
          Total Time: <span className="value">{secondsToTimeString(totalTime)}</span>
        </p>
        <p className="calculation-detail">
          Number of Segments: <span className="value">{numberOfSegments}</span>
        </p>
        <p className="calculation-detail">
          Time per Segment: <span className="value">{secondsToTimeString(segmentDuration)}</span>
        </p>
      </div>

      <h3>Segment Breakdown</h3>
      <div className="segment-list">
        {durations.map((duration, index) => (
          <div key={index} className="segment-item">
            <span className="segment-number">Segment {index + 1}</span>
            <span className="segment-duration">{secondsToTimeString(duration)}</span>
          </div>
        ))}
      </div>

      <div className="total-check">
        <p>
          Total: <span className="total-value">{secondsToTimeString(durations.reduce((a, b) => a + b, 0))}</span>
        </p>
      </div>

      <div className="button-group">
        <button onClick={handleStart} className="btn-primary">
          Start Timer
        </button>
      </div>
    </div>
  );
}
