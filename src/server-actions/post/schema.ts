import { z } from "zod";

const savePostSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required").max(128, "Title is too long"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(8196, "Content is too long"),
  // anonymous: z.boolean().default(true),
  // category: z
  //   .enum(["green_flag", "red_flag", "advice", "date_review"])
  //   .optional(),
  // tags: z.array(z.string()).optional(),
  // images: z.array(z.string().url()).optional(),
  // relationshipType: z
  //   .enum(["first_date", "talking_stage", "ex", "crush", "friend", "stranger"])
  //   .optional(),

  subject: z.object({
    name: z.string().min(1, "Name is required").max(128, "Name is too long"),
    age: z
      .number("Age must be a number")
      .int("Age must be an integer")
      .min(1, "Age must be greater than 0")
      .optional(),
    height: z
      .number("Height must be a number")
      .min(0, "Height must be greater than or equal to 0")
      .optional(),
    location: z.string().optional(),
    ethnicity: z.string().optional(),
    occupation: z.string().optional(),
    college: z.string().optional(),
  }),
});

export { savePostSchema };
