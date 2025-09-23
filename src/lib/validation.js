import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required");

export const profileSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be atleast 2 characters ")
    .max(50, "Name must not exceed 50 characters")
    .optional(),

  bio: z.string().max(500, "Bio must not exceed 500 characters").optional(),
  payfastid: z
    .string()
    .max(100, "Payment ID must be under 100 characters")
    .optional(),
  payfastsecret: z
    .string()
    .max(100, "Payment Secret must be under 100 characters")
    .optional(),
});

export const signUpschema = z.object({
  email: z.email({ message: "Invalid email address" }),
  username: requiredString.regex(/^[a-zA-Z0-9_-]+$/, {
    message: "Only letters, numbers, _ and - allowed",
  }),
  password: requiredString.min(8, { message: "Must be atleast 8 characters" }),
});

export const forgotPasswordSchema = z.object({
  email: z.email({ message: "Invalid email" }),
});

export const resetPasswordSchema = z
  .object({
    password: requiredString.min(8, "must be atleast 8 characters long"),
    confirmPassword: requiredString,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "password and confirm password must match",
    path: ["confirmPassword"],
  });

export const addCreationSchema = z.object({
  title: requiredString.max(50, {
    message: "Title cannot exceed 50 characters",
  }),
  description: requiredString.max(500, {
    message: "Description cannot exceed 50 characters",
  }),
  link: z
    .string()
    .trim()
    .optional()
    .transform((val) => (val === "" ? undefined : val))
    .pipe(z.url().optional()),
  status: z
    .enum(["completed", "active", "upcomming"], {
      required_error: "status is required",
      invalid_type_error: "Invalid status",
    })
    .optional(),
});
