import { z } from 'zod';

const validateEmail = (email: string) => {
  const parts = email.split('@');

  if (parts.length !== 2) {
    return false;
  }

  const [localPart, domain] = parts;

  return localPart.length > 0 && domain.includes('.');
};

export const formSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .refine(
        (value) => value[0] === value[0]?.toUpperCase(),
        'Name must start with an uppercase letter'
      ),

    age: z
      .number({
        error: 'Age must be a number',
      })
      .min(0, 'Age cannot be negative'),

    email: z
      .string()
      .min(1, 'Email is required')
      .refine(
        validateEmail,
        'Email must contain one @ and a domain with a dot'
      ),

    gender: z.string().min(1, 'Please select a gender'),

    termsAccepted: z.literal(true, {
      error: 'You must accept Terms and Conditions',
    }),

    password: z.string().min(1, 'Password is required'),

    confirmPassword: z.string().min(1, 'Confirm password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });
