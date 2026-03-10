## ADDED Requirements

### Requirement: User can input total time duration
The system SHALL allow users to input the total time duration in HH:MM:SS format before starting a session.

#### Scenario: Valid time format entry
- **WHEN** user enters a time in HH:MM:SS format (e.g., "01:30:45")
- **THEN** the system accepts the input and displays it as configured total time

#### Scenario: Invalid time format rejected
- **WHEN** user enters an invalid time format (e.g., "1:30" or "25:00:00")
- **THEN** the system displays an error message and does not accept the input

### Requirement: User can specify number of segments
The system SHALL allow users to input the number of time box segments to divide the session into.

#### Scenario: Valid segment count entry
- **WHEN** user enters a positive integer (e.g., 3, 5, 10)
- **THEN** the system accepts the input and stores the segment count

#### Scenario: Invalid segment count rejected
- **WHEN** user enters zero, negative, or non-integer values
- **THEN** the system displays an error message and does not accept the input

### Requirement: Mode selection interface
The system SHALL present a clear choice between Standard Mode and Custom Mode after total time and segment count are configured.

#### Scenario: Mode selection available after configuration
- **WHEN** user has entered valid total time and segment count
- **THEN** the system displays mode selection options (Standard or Custom)

#### Scenario: Mode selection prevents invalid state transitions
- **WHEN** user attempts to select a mode without configured time or segments
- **THEN** the system displays a prompt to complete configuration first
