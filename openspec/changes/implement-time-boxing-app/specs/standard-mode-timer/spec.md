## ADDED Requirements

### Requirement: System calculates equal time per segment in Standard Mode
The system SHALL automatically divide the total time equally among all specified segments when Standard Mode is selected.

#### Scenario: Automatic equal division
- **WHEN** user selects Standard Mode with total time of 01:00:00 and 4 segments
- **THEN** the system calculates 15 minutes (00:15:00) per segment

#### Scenario: Rounding with uneven division
- **WHEN** user selects Standard Mode with total time of 01:00:00 and 3 segments
- **THEN** the system calculates duration per segment (00:20:00 base, handling remainder seconds)

### Requirement: Sequential timer execution in Standard Mode
The system SHALL execute each segment sequentially in Standard Mode, automatically transitioning from one segment to the next.

#### Scenario: First segment starts after user clicks start
- **WHEN** user clicks the Start button in Standard Mode
- **THEN** the system begins countdown for segment 1 with the calculated duration

#### Scenario: Timer progresses to next segment automatically
- **WHEN** a segment completes its countdown timer
- **THEN** the system automatically stops the current segment timer and begins the next segment

#### Scenario: All segments complete session
- **WHEN** the final segment completes its countdown
- **THEN** the system marks the session as complete and stops timer execution
