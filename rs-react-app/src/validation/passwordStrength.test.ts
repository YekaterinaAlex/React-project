import { describe, expect, it } from 'vitest';
import { getPasswordStrength } from './passwordStrength';

describe('getPasswordStrength', () => {
  it('returns true for all rules when password is strong', () => {
    expect(getPasswordStrength('Password1!')).toEqual({
      hasNumber: true,
      hasUpperCase: true,
      hasLowerCase: true,
      hasSpecialCharacter: true,
    });
  });
  it('detects missing uppercase, number and special character', () => {
    expect(getPasswordStrength('password')).toEqual({
      hasNumber: false,
      hasUpperCase: false,
      hasLowerCase: true,
      hasSpecialCharacter: false,
    });
  });

  it('detects missing lowercase', () => {
    expect(getPasswordStrength('PASSWORD1!')).toEqual({
      hasNumber: true,
      hasUpperCase: true,
      hasLowerCase: false,
      hasSpecialCharacter: true,
    });
  });
});
