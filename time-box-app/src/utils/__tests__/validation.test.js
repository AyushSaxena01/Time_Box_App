import { describe, it, expect } from 'vitest';
import {
  isValidSegmentDuration,
  isValidTotalTime,
  validateSegmentDurations,
  validateCustomModeConfig,
} from '../validation';

describe('validation', () => {
  describe('isValidSegmentDuration', () => {
    it('should accept durations >= 5 seconds', () => {
      expect(isValidSegmentDuration(5)).toBe(true);
      expect(isValidSegmentDuration(10)).toBe(true);
      expect(isValidSegmentDuration(60)).toBe(true);
    });

    it('should reject durations < 5 seconds', () => {
      expect(isValidSegmentDuration(0)).toBe(false);
      expect(isValidSegmentDuration(4)).toBe(false);
      expect(isValidSegmentDuration(1)).toBe(false);
    });
  });

  describe('isValidTotalTime', () => {
    it('should accept segments that fit within total time', () => {
      expect(isValidTotalTime([60, 60, 60], 300)).toBe(true);
      expect(isValidTotalTime([100, 100], 200)).toBe(true);
    });

    it('should reject segments exceeding total time', () => {
      expect(isValidTotalTime([100, 100, 100], 200)).toBe(false);
      expect(isValidTotalTime([300], 200)).toBe(false);
    });
  });

  describe('validateSegmentDurations', () => {
    it('should validate all segments meet minimum requirement', () => {
      const result = validateSegmentDurations([10, 20, 30]);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should report segments below minimum', () => {
      const result = validateSegmentDurations([10, 3, 20]);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Segment 2 must be at least 5 seconds (got 3s)');
    });

    it('should report multiple errors', () => {
      const result = validateSegmentDurations([2, 3, 4]);
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(3);
    });
  });

  describe('validateCustomModeConfig', () => {
    it('should validate complete valid configuration', () => {
      const result = validateCustomModeConfig([60, 60, 60], 300);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should report duration errors', () => {
      const result = validateCustomModeConfig([10, 3, 20], 100);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should report total time constraint violation', () => {
      const result = validateCustomModeConfig([100, 100, 100], 200);
      expect(result.isValid).toBe(false);
      expect(result.errors.some((e) => e.includes('exceeds total time'))).toBe(true);
    });
  });
});
