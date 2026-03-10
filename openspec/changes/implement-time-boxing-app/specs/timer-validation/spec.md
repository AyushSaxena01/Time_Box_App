## ADDED Requirements

### Requirement: Minimum segment duration validation
The system SHALL ensure that each segment has a minimum duration of 5 seconds.

#### Scenario: Segment below minimum rejected in Custom Mode
- **WHEN** user enters a segment duration of 00:00:03 (3 seconds) in Custom Mode
- **THEN** the system displays an error indicating the 5-second minimum requirement

#### Scenario: Segment at minimum accepted
- **WHEN** user enters a segment duration of 00:00:05 (5 seconds) in Custom Mode
- **THEN** the system accepts the input

### Requirement: Total time constraint validation
The system SHALL validate that the total of all custom segment durations does not exceed the configured total time.

#### Scenario: Custom segments exceed total time rejected
- **WHEN** user configures total time as 00:30:00 and custom segments sum to 00:35:00
- **THEN** the system displays an error preventing session start

#### Scenario: Custom segments within total time accepted
- **WHEN** user configures total time as 00:30:00 and custom segments sum to 00:28:00
- **THEN** the system accepts the configuration and allows session start

### Requirement: Real-time validation feedback in Custom Mode
The system SHALL provide immediate validation feedback as users enter segment durations.

#### Scenario: Validation error shown immediately on invalid input
- **WHEN** user enters an invalid segment duration (below 5 seconds or format error)
- **THEN** the system immediately displays a validation error without requiring form submission

#### Scenario: Validation clears when input becomes valid
- **WHEN** user corrects an invalid segment duration to meet requirements
- **THEN** the system clears the validation error
