# Time Box App - Testing and Manual Verification Guide

## Unit Tests

The application includes unit tests for:

### Time Utilities (`src/utils/timeUtils.js`)
- Time string to seconds conversion (HH:MM:SS format)
- Seconds to time string formatting
- Time format validation
- Edge cases: leading zeros, invalid formats, boundary values

### Validation Utilities (`src/utils/validation.js`)
- Segment duration validation (5-second minimum)
- Total time constraint validation
- Configuration validation for custom mode
- Error reporting for multiple violations

Run tests with: `npm test`

## Manual Testing Checklist

### Configuration Phase
- [ ] Time input accepts HH:MM:SS format
- [ ] Time input rejects invalid formats with error message
- [ ] Segment count only accepts positive integers
- [ ] Configuration summary displays correctly
- [ ] "Next" button disabled until both fields valid

### Standard Mode
- [ ] Time division calculation correct (total / segments)
- [ ] Segment breakdown displays all segments with durations
- [ ] Total equals input total time
- [ ] Visual display is clear and readable

### Custom Mode
- [ ] Segment input fields display dynamically matching segment count
- [ ] Each field accepts HH:MM:SS format
- [ ] Real-time validation shows errors immediately
- [ ] Success indicator shows when field valid
- [ ] Cannot start with invalid or incomplete inputs
- [ ] Running total displayed correctly
- [ ] Alert when total exceeds available time
- [ ] "Start" button only enabled when all segments valid

### Timer Execution
- [ ] Initial segment displays with correct duration
- [ ] Countdown updates every second
- [ ] "Segment X of Y" updates correctly
- [ ] Progress bar advances as segments complete
- [ ] Pause button stops timer and preserves time
- [ ] Resume button continues from paused state
- [ ] Next segment starts automatically when current completes
- [ ] Segment indicators update visually on transition
- [ ] All segments complete without gaps
- [ ] Session complete screen displays at end
- [ ] Stop button returns to configuration
- [ ] Configuration preserved after stop (can restart)

### Responsive Design
- [ ] Desktop layout displays correctly
- [ ] Tablet layout adjusts appropriately
- [ ] Mobile layout is readable and usable
- [ ] Touch targets large enough on mobile
- [ ] Countdown display legible on small screens

### Edge Cases
- [ ] Very short segments (5 seconds) work correctly
- [ ] Very long sessions (hours) remain accurate
- [ ] Rapid pause/resume transitions don't crash
- [ ] Page title updates appropriately
- [ ] Browser back button behavior (expected: shows new session)

## Performance Verification

- [ ] Timer remains accurate after 10+ minutes
- [ ] No memory leaks during extended sessions
- [ ] UI remains responsive during countdown
- [ ] CSS animations are smooth (60fps)
- [ ] No console errors during normal operation

## Accessibility Verification

- [ ] Tab navigation works through all inputs
- [ ] Focus visible on all interactive elements
- [ ] Form can be submitted with Enter key
- [ ] Screen reader can identify form labels
- [ ] Color contrast meets WCAG standards
- [ ] Font sizes readable without zoom

## Browser Compatibility

Test on:
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Chrome
- [ ] Mobile Safari
