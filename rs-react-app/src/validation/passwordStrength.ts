export type PasswordStrength = {
  hasNumber: boolean;
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasSpecialCharacter: boolean;
};

export const getPasswordStrength = (password: string): PasswordStrength => ({
  hasNumber: [...password].some((char) => '0123456789'.includes(char)),
  hasUpperCase: [...password].some((char) => char >= 'A' && char <= 'Z'),
  hasLowerCase: [...password].some((char) => char >= 'a' && char <= 'z'),
  hasSpecialCharacter: [...password].some((char) => !/[a-zA-Z0-9]/.test(char)),
});
