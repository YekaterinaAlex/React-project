import { z } from 'zod';

const validateEmail = (email: string) => {
  const parts = email.split('@');

  if (parts.length !== 2) {
    return false;
  }

  const [localPart, domain] = parts;

  return localPart.length > 0 && domain.includes('.');
};

export const createFormSchema = (countries: string[]) =>
  z
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
        .min(1, 'Age cannot be negative'),

      email: z
        .string()
        .min(1, 'Email is required')
        .refine(
          validateEmail,
          'Email must contain one @ and a domain with a dot'
        ),

      gender: z.enum(['male', 'female'], {
        error: 'Please select a gender',
      }),

      termsAccepted: z
        .boolean()
        .refine((value) => value, 'You must accept Terms and Conditions'),

      password: z.string().min(1, 'Password is required'),

      confirmPassword: z.string().min(1, 'Confirm password is required'),

      country: z
        .string()
        .min(1, 'Country is required')
        .refine(
          (value) => countries.includes(value),
          'Country must be selected from the list'
        ),
      image: z.instanceof(File).superRefine((file, ctx) => {
        if (file.size === 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Image is required',
          });

          return;
        }

        if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Image must be PNG or JPEG',
          });
        }

        if (file.size > 1024 * 1024) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Image must be less than 1MB',
          });
        }
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords must match',
      path: ['confirmPassword'],
    });

export type FormValues = z.infer<ReturnType<typeof createFormSchema>>;
