import { useState } from 'react';
import { SessionProvider } from './utils/sessionContext';
import { useSessionState } from './utils/useSessionState';
import ConfigurationScreen from './components/ConfigurationScreen';
import ModeSetupScreen from './components/ModeSetupScreen';
import ExecutionScreen from './components/ExecutionScreen';
import './styles/App.css';

export default function App() {
  const sessionState = useSessionState();
  const [currentScreen, setCurrentScreen] = useState('configuration'); // 'configuration', 'mode-setup', 'execution', 'complete'

  const handleConfigurationComplete = () => {
    setCurrentScreen('mode-setup');
  };

  const handleModeSelected = (durations, mode) => {
    // Start timer execution with the first segment duration
    if (durations && durations.length > 0) {
      sessionState.startTimer(durations[0]);
      setCurrentScreen('execution');
    }
  };

  const handleExecutionComplete = () => {
    setCurrentScreen('complete');
  };

  const handleReset = () => {
    sessionState.resetSession();
    setCurrentScreen('configuration');
  };

  return (
    <SessionProvider sessionState={sessionState}>
      <div className="app">
        {currentScreen === 'configuration' && (
          <ConfigurationScreen onComplete={handleConfigurationComplete} />
        )}
        {currentScreen === 'mode-setup' && (
          <ModeSetupScreen onModeSelected={handleModeSelected} />
        )}
        {currentScreen === 'execution' && (
          <ExecutionScreen
            onComplete={handleExecutionComplete}
            onReset={handleReset}
          />
        )}
        {currentScreen === 'complete' && (
          <div className="completion-screen">
            <h1>Session Complete!</h1>
            <p>You have completed all segments.</p>
            <button onClick={handleReset} className="btn-primary">
              Start New Session
            </button>
          </div>
        )}
      </div>
    </SessionProvider>
  );
}
