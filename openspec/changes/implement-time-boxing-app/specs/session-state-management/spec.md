## ADDED Requirements

### Requirement: Maintain session configuration in memory
The system SHALL store all session configuration data in memory during runtime.

#### Scenario: Configuration persists through timer execution
- **WHEN** user configures total time, segment count, and mode
- **THEN** this data remains available and unchanged through session execution

### Requirement: Track current segment state
The system SHALL maintain the current segment index and remaining time for the active segment during execution.

#### Scenario: Current segment tracked as timer runs
- **WHEN** timer is executing segment 3 of 5
- **THEN** the system tracks that segment 3 is active and knows which segment comes next

#### Scenario: Remaining time updates as timer counts down
- **WHEN** a segment is executing
- **THEN** the remaining time state updates each second to reflect countdown progress

### Requirement: Track completed segments
The system SHALL maintain a record of which segments have been completed during a session.

#### Scenario: Completed segments marked during execution
- **WHEN** segment 1 completes and segment 2 begins
- **THEN** the system records segment 1 as completed

### Requirement: Session reset capability
The system SHALL allow users to reset the session and return to the configuration phase.

#### Scenario: Reset clears execution state
- **WHEN** user clicks Reset or similar control during or after session execution
- **THEN** the system clears all execution state and returns to configuration phase

#### Scenario: Reset does not affect configuration for restart
- **WHEN** user resets after a session
- **THEN** the configuration (total time, segment count, mode, durations) remains available for immediate restart
