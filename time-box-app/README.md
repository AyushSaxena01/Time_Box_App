# Time Box App

A simple, focused web application for dividing your available time into focused work segments and tracking progress through each segment.

## Features

- **Two Operating Modes**:
  - **Standard Mode**: Automatically divides your total time equally among segments
  - **Custom Mode**: Manually specify duration for each individual segment

- **Real-time Countdown Display**: Shows current segment, remaining time, total time, and progress

- **Automatic Segment Transitions**: Seamlessly moves to the next segment when current completes

- **Pause/Resume/Stop Controls**: Full control over timer execution

- **Input Validation**: 
  - Time format validation (HH:MM:SS)
  - Minimum 5-second per segment requirement
  - Total time constraint checking
  - Real-time feedback

- **Responsive Design**: Works smoothly on desktop, tablet, and mobile devices

## Quick Start

### Installation

```bash
cd time-box-app
npm install
```

### Development

```bash
npm run dev
```

The application will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Testing

```bash
npm test              # Run unit tests
npm run test:ui       # Run tests with UI
npm run test:coverage # Generate coverage report
```

### Linting and Formatting

```bash
npm run lint          # Check code quality
npm run format        # Auto-format code
```

## How to Use

### 1. Configuration
- Enter your total available time in HH:MM:SS format (e.g., 01:30:00 for 1 hour 30 minutes)
- Specify the number of segments you want to divide time into
- Click "Next: Select Mode"

### 2. Select Mode
- **Standard Mode**: System calculates equal time per segment (automatic)
- **Custom Mode**: You specify duration for each segment

### 3. Review Configuration
- Standard Mode: Review calculated segment durations
- Custom Mode: Enter duration for each segment (minimum 5 seconds each)
- Click "Start Timer"

### 4. Timer Execution
- Watch your countdown display
- Current segment updates automatically
- Use Pause to stop, Resume to continue, or Stop to return to configuration
- Progress bar and segment indicators show your progress
- Next segment starts automatically when current completes
- Session complete screen displays when finished

## Architecture

### Project Structure

```
src/
├── components/              # React components
│   ├── ConfigurationScreen.jsx
│   ├── ModeSetupScreen.jsx
│   ├── StandardModeSetup.jsx
│   ├── CustomModeSetup.jsx
│   └── ExecutionScreen.jsx
├── utils/                   # Utility functions and hooks
│   ├── timeUtils.js        # Time parsing and formatting
│   ├── validation.js       # Validation functions
│   ├── useSessionState.js  # Session state management hook
│   ├── sessionContext.jsx  # React context for state sharing
│   └── types.js            # JSDoc type definitions
├── styles/                  # Component styles
│   ├── index.css           # Global styles
│   ├── App.css
│   ├── ConfigurationScreen.css
│   ├── ModeSetupScreen.css
│   ├── StandardModeSetup.css
│   ├── CustomModeSetup.css
│   └── ExecutionScreen.css
├── App.jsx                 # Root component
└── main.jsx                # Entry point
```

### State Management

The application uses React hooks and Context API for state management:

- **useSessionState**: Custom hook managing session configuration and execution state
- **SessionContext**: Provides session state to all components
- **useSession**: Context hook for accessing session state

### Key Components

- **ConfigurationScreen**: Input validation for total time and segment count
- **ModeSetupScreen**: Mode selection and routing to setup components
- **StandardModeSetup**: Shows calculated segment durations in edit mode
- **CustomModeSetup**: Dynamic form for manual segment duration entry
- **ExecutionScreen**: Timer display and execution controls
- **App**: Routes between screens and manages overall flow

### Utilities

- **timeUtils.js**: Time format conversion and validation
- **validation.js**: Business logic validation for segments and constraints
- **useSessionState.js**: React hook for session state management
- **sessionContext.jsx**: React context setup and hooks

## Design Decisions

1. **Frontend-Only Architecture**: No server required. Session state stored in memory.
2. **Component-Level State**: Simple and sufficient for single-view application.
3. **Precise Timer**: Uses `setInterval` for countdown and `requestAnimationFrame` for display updates.
4. **Time in Seconds**: All calculations use seconds internally to avoid floating-point errors.
5. **Immediate Validation**: Real-time feedback as users enter data improves UX.

## Constraints and Limitations

- **Session State**: All session data is stored in memory. Refreshing the page will lose the current session.
- **Timer Accuracy**: Browser timers are subject to throttling in background tabs.
- **Minimum Segment**: 5 seconds minimum per segment (as per requirements).
- **No Persistence**: Currently no local storage or backend. Can be added as future enhancement.

## Testing

See [TESTING.md](TESTING.md) for comprehensive testing guide including:
- Unit test specifications
- Manual testing checklist
- Edge cases to verify
- Browser compatibility matrix
- Accessibility requirements

## Technologies

- **React 18**: UI framework with hooks
- **Vite**: Build tool and dev server
- **Vitest**: Unit testing framework
- **ESLint**: Code quality
- **Prettier**: Code formatting
- **CSS3**: Styling and responsive layout

## Future Enhancements

1. Session history with localStorage persistence
2. Timer completion notifications/sound
3. Dark mode theme toggle
4. Export session data
5. Pre-configured templates
6. Settings page for customization
7. Progressive Web App (PWA) capabilities
8. Backend API integration for multi-device sync
9. Advanced analytics and reporting
10. Kolmogorov animations and themes

## License

MIT

## Development Notes

The application follows spec-driven development practices with clear separation between:
- **Specification**: What the system should do (specs/\*.md)
- **Design**: How to implement it (design.md)
- **Implementation**: Code following the design (src/)

For more details on requirements and design decisions, see the openspec documentation.
