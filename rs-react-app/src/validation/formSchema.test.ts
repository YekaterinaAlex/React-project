import { describe, expect, it } from 'vitest';

import { createFormSchema } from './formSchema';

describe('formSchema', () => {
  const schema = createFormSchema(['Canada', 'Germany', 'United States']);

  it('accepts valid data', () => {
    const result = schema.safeParse({
      name: 'Anna',
      age: 25,
      email: 'anna@test.com',
      gender: 'female',
      termsAccepted: true,
      password: 'Password1!',
      confirmPassword: 'Password1!',
      country: 'Canada',
      image: new File(['test'], 'test.png', {
        type: 'image/png',
      }),
    });

    expect(result.success).toBe(true);
  });

  it('rejects password mismatch', () => {
    const result = schema.safeParse({
      name: 'Anna',
      age: 25,
      email: 'anna@test.com',
      gender: 'female',
      termsAccepted: true,
      password: 'Password1!',
      confirmPassword: 'Password2!',
      country: 'Canada',
      image: new File(['test'], 'test.png', {
        type: 'image/png',
      }),
    });

    expect(result.success).toBe(false);
  });

  it('rejects unknown country', () => {
    const result = schema.safeParse({
      name: 'Anna',
      age: 25,
      email: 'anna@test.com',
      gender: 'female',
      termsAccepted: true,
      password: 'Password1!',
      confirmPassword: 'Password1!',
      country: 'Mars',
      image: new File(['test'], 'test.png', {
        type: 'image/png',
      }),
    });

    expect(result.success).toBe(false);
  });
  it('rejects invalid email', () => {
    const result = schema.safeParse({
      name: 'Anna',
      age: 25,
      email: 'invalid-email',
      gender: 'female',
      termsAccepted: true,
      password: 'Password1!',
      confirmPassword: 'Password1!',
      country: 'Canada',
      image: new File(['test'], 'test.png', {
        type: 'image/png',
      }),
    });

    expect(result.success).toBe(false);
  });
  it('rejects name without uppercase first letter', () => {
    const result = schema.safeParse({
      name: 'anna',
      age: 25,
      email: 'anna@test.com',
      gender: 'female',
      termsAccepted: true,
      password: 'Password1!',
      confirmPassword: 'Password1!',
      country: 'Canada',
      image: new File(['test'], 'test.png', {
        type: 'image/png',
      }),
    });

    expect(result.success).toBe(false);
  });
  it('rejects non-image file type', () => {
    const result = schema.safeParse({
      name: 'Anna',
      age: 25,
      email: 'anna@test.com',
      gender: 'female',
      termsAccepted: true,
      password: 'Password1!',
      confirmPassword: 'Password1!',
      country: 'Canada',
      image: new File(['test'], 'test.pdf', {
        type: 'application/pdf',
      }),
    });

    expect(result.success).toBe(false);
  });
});
