import { z } from 'zod';

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  'images/jpeg',
  'images/jpg',
  'images/png',
  'images/webp'
];

export const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please input a valid email address' })
    .max(50, { message: 'Must contain at most 50 characters' }),
  password: z
    .string()
    .min(4, { message: 'Must contain at least 4 characters' })
    .max(20, { message: 'Must contain at most 20 characters' })
});

export const RegisterSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: 'Must contain at least 2 characters' })
      .max(15, { message: 'Must contain at most 15 characters' })
      .regex(/[a-zA-z]/, { message: 'Must contain alphabets only' }),
    lastName: z
      .string()
      .min(2, { message: 'Must contain at least 2 characters' })
      .max(15, { message: 'Must contain at most 15 characters' })
      .regex(/[a-zA-z]/, { message: 'Must contain alphabets only' }),
    email: z
      .string()
      .email({ message: 'Please input a valid email address' })
      .max(40, { message: 'Must contain at most 40 characters' }),
    phone: z.coerce.number(),
    // .min(11, { message: 'must be a valid phone number' })
    // .max(11, { message: 'must be a valid phone number' }),
    password: z
      .string()
      .min(4, { message: 'Must contain at least 4 characters' })
      .max(20, { message: 'Must contain at most 20 characters' }),
    confirmPassword: z
      .string()
      .min(4, { message: 'Must contain at least 4 characters' })
      .max(20, { message: 'Must contain at most 20 characters' }),
    agree: z.boolean()
  })
  .superRefine(({ confirmPassword, password, agree }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords do not match',
        path: ['confirmPassword']
      });
    }
    if (agree !== true) {
      ctx.addIssue({
        code: 'custom',
        message: 'Agree to the Terms and condition',
        path: ['agree']
      });
    }
  });

export const AddPetSchema = z.object({
  //   category: z.enum(['cats', 'dogs']),
  petName: z
    .string()
    .min(2, { message: 'Too short!' })
    .max(30, { message: 'Too long' }),
  category: z.coerce
    .number()
    .min(0, { message: 'Select the category' })
    .max(20),
  country: z
    .string()
    .min(3, { message: 'Select the country' })
    .max(20, { message: 'Invalid input' }),
  state: z.coerce
    .number()
    .min(0, { message: 'Select the state' })
    .max(36, { message: 'Invalid input' }),
  breed: z
    .string()
    .min(2, { message: 'Select the breed' })
    .max(30, { message: 'Too long' }),
  purebred: z
    .string()
    .min(2, { message: 'Select Yes or No' })
    .max(4, { message: 'Too long!' }),
  age: z
    .string()
    .min(2, { message: 'Select the age' })
    .max(30, { message: 'Too long!' }),
  gender: z
    .string()
    .min(2, { message: 'Select the gender' })
    .max(30, { message: 'Too long!' }),
  //   state: z
  //     .string()
  //     .min(2, { message: 'Select the state' })
  //     .max(15, { message: 'Too long' }),
  city: z
    .string()
    .min(2, { message: 'Select the city' })
    .max(20, { message: 'Too long' }),
  imgs: z
    .any()
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      'Max image size is 5MB.'
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported'
    )
    .array(),
  description: z
    .string()
    .min(10, { message: 'Too short' })
    .max(200, { message: 'Too long' })
});
export const FilterPetSchema = z.object({
  //   category: z.enum(['cats', 'dogs']),
  category: z.coerce
    .number()
    .min(0, { message: 'Select the category' })
    .max(2)
    .optional(),
  //   country: z
  //     .string()
  //     .min(3, { message: 'Select the country' })
  //     .max(20, { message: 'Invalid input' }),
  state: z.coerce
    .number()
    .min(0, { message: 'Select the state' })
    .max(36, { message: 'Invalid input' })
    .optional(),
  breed: z
    .string()
    .min(2, { message: 'Select the breed' })
    .max(30, { message: 'Too long' })
    .optional(),
  //   purebred: z
  //     .string()
  //     .min(2, { message: 'Select Yes or No' })
  //     .max(4, { message: 'Too long!' }),
  //   age: z
  //     .string()
  //     .min(2, { message: 'Select the age' })
  //     .max(30, { message: 'Too long!' }),
  gender: z
    .string()
    .min(2, { message: 'Select the gender' })
    .max(30, { message: 'Too long!' })
    .optional(),
  //   state: z
  //     .string()
  //     .min(2, { message: 'Select the state' })
  //     .max(15, { message: 'Too long' }),
  city: z
    .string()
    .min(2, { message: 'Select the city' })
    .max(20, { message: 'Too long' })
    .optional()
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
export type AddPetSchemaType = z.infer<typeof AddPetSchema>;
export type FilterPetSchemaType = z.infer<typeof FilterPetSchema>;
