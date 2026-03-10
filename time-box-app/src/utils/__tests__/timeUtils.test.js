import { describe, it, expect } from 'vitest';
import {
  timeStringToSeconds,
  secondsToTimeString,
  isValidTimeFormat,
} from '../timeUtils';

describe('timeUtils', () => {
  describe('timeStringToSeconds', () => {
    it('should convert valid HH:MM:SS format to seconds', () => {
      expect(timeStringToSeconds('00:00:05')).toBe(5);
      expect(timeStringToSeconds('00:01:00')).toBe(60);
      expect(timeStringToSeconds('01:00:00')).toBe(3600);
      expect(timeStringToSeconds('01:30:45')).toBe(5445);
    });

    it('should return null for invalid formats', () => {
      expect(timeStringToSeconds('1:30')).toBeNull();
      expect(timeStringToSeconds('25:00:00')).toBeNull();
      expect(timeStringToSeconds('00:60:00')).toBeNull();
      expect(timeStringToSeconds('00:00:60')).toBeNull();
      expect(timeStringToSeconds('invalid')).toBeNull();
    });

    it('should return null for negative values', () => {
      expect(timeStringToSeconds('-01:00:00')).toBeNull();
    });
  });

  describe('secondsToTimeString', () => {
    it('should convert seconds to HH:MM:SS format', () => {
      expect(secondsToTimeString(5)).toBe('00:00:05');
      expect(secondsToTimeString(60)).toBe('00:01:00');
      expect(secondsToTimeString(3600)).toBe('01:00:00');
      expect(secondsToTimeString(5445)).toBe('01:30:45');
    });

    it('should pad with zeros', () => {
      expect(secondsToTimeString(0)).toBe('00:00:00');
      expect(secondsToTimeString(1)).toBe('00:00:01');
      expect(secondsToTimeString(61)).toBe('00:01:01');
    });
  });

  describe('isValidTimeFormat', () => {
    it('should return true for valid formats', () => {
      expect(isValidTimeFormat('00:00:05')).toBe(true);
      expect(isValidTimeFormat('01:30:45')).toBe(true);
      expect(isValidTimeFormat('23:59:59')).toBe(true);
    });

    it('should return false for invalid formats', () => {
      expect(isValidTimeFormat('1:30')).toBe(false);
      expect(isValidTimeFormat('25:00:00')).toBe(false);
      expect(isValidTimeFormat('invalid')).toBe(false);
    });
  });
});
