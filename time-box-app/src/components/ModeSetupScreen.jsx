import { useState } from 'react';
import { useSession } from '../utils/sessionContext';
import StandardModeSetup from './StandardModeSetup';
import CustomModeSetup from './CustomModeSetup';
import '../styles/ModeSetupScreen.css';

export default function ModeSetupScreen({ onModeSelected }) {
  const { state } = useSession();
  const [selectedMode, setSelectedMode] = useState(null);

  const handleModeSelect = (mode) => {
    setSelectedMode(mode);
  };

  const handleStartTimer = (durations, mode) => {
    onModeSelected(durations, mode);
  };

  return (
    <div className="screen mode-setup-screen">
      {!selectedMode ? (
        <>
          <h1>Select Timer Mode</h1>
          <p>Choose how you want to allocate your {state.config.numberOfSegments} segments:</p>

          <div className="mode-selector">
            <div
              className={`mode-option ${selectedMode === 'standard' ? 'selected' : ''}`}
              onClick={() => handleModeSelect('standard')}
            >
              <h3>Standard Mode</h3>
              <p>Automatically divide time equally</p>
              <p className="mode-detail">
                {Math.floor(state.config.totalTime / state.config.numberOfSegments)}s per segment
              </p>
            </div>

            <div
              className={`mode-option ${selectedMode === 'custom' ? 'selected' : ''}`}
              onClick={() => handleModeSelect('custom')}
            >
              <h3>Custom Mode</h3>
              <p>Manually specify each segment</p>
              <p className="mode-detail">Full control over timing</p>
            </div>
          </div>

          <div className="button-group">
            <button
              onClick={() => handleModeSelect('standard')}
              className="btn-primary"
            >
              Use Standard Mode
            </button>
            <button
              onClick={() => handleModeSelect('custom')}
              className="btn-secondary"
            >
              Use Custom Mode
            </button>
          </div>
        </>
      ) : selectedMode === 'standard' ? (
        <StandardModeSetup onStartTimer={handleStartTimer} />
      ) : (
        <CustomModeSetup onStartTimer={handleStartTimer} />
      )}
    </div>
  );
}
