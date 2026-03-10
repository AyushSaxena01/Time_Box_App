## ADDED Requirements

### Requirement: Display total time during execution
The system SHALL continuously display the total configured time for the session during timer execution.

#### Scenario: Total time shows on execution view
- **WHEN** the timer is running
- **THEN** the display shows the total session time (e.g., "Total: 01:00:00")

### Requirement: Display current segment number
The system SHALL show which segment is currently active during timer execution.

#### Scenario: Current segment indicator shown
- **WHEN** the timer is running on segment 2 of 5
- **THEN** the display shows "Segment 2 of 5" or similar indicator

#### Scenario: Segment counter updates on transition
- **WHEN** the timer automatically transitions to a new segment
- **THEN** the segment counter updates to reflect the new current segment

### Requirement: Display remaining time in active segment
The system SHALL show a real-time countdown of the remaining time in the currently active segment.

#### Scenario: Countdown displays in HH:MM:SS format
- **WHEN** a segment has 5 minutes 30 seconds remaining
- **THEN** the display shows the remaining time as "00:05:30" and counts down

#### Scenario: Countdown updates every second
- **WHEN** the segment timer is running
- **THEN** the remaining time display decreases by 1 second per second

### Requirement: Clear visibility of session progress
The system SHALL provide a clear visual representation of overall session progress.

#### Scenario: Progress information grouped logically
- **WHEN** the timer is executing
- **THEN** the display clearly shows total time, current segment, segment count, and remaining time in easy-to-read format
