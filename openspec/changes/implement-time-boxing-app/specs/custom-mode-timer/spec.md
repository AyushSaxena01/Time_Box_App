## ADDED Requirements

### Requirement: User can manually enter time for each segment in Custom Mode
The system SHALL provide an input interface where users specify the duration for each segment individually when Custom Mode is selected.

#### Scenario: Input fields for each segment
- **WHEN** user selects Custom Mode with 3 segments
- **THEN** the system displays 3 input fields, one for each segment duration

#### Scenario: Accept HH:MM:SS format for each segment
- **WHEN** user enters segment durations in HH:MM:SS format (e.g., segment 1: "00:15:00", segment 2: "00:10:00", segment 3: "00:20:00")
- **THEN** the system accepts and stores each segment duration

### Requirement: Sequential timer execution in Custom Mode
The system SHALL execute each user-specified segment sequentially in Custom Mode, automatically transitioning based on the manually configured durations.

#### Scenario: First segment uses user-specified duration
- **WHEN** user clicks Start button in Custom Mode after specifying segment durations
- **THEN** the system begins countdown for segment 1 using the user-specified duration

#### Scenario: Each segment uses specified duration
- **WHEN** a segment completes its countdown timer
- **THEN** the system automatically starts the next segment using its specified duration

#### Scenario: Session completes after all custom segments
- **WHEN** the final segment (with its custom duration) completes
- **THEN** the system marks the session as complete and stops timer execution
