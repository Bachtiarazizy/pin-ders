import { z } from "zod";

export const BoardSchema = z.object({
  name: z.string().min(1, "Shop name is required"),
  description: z.string().min(10, { message: "Description must be at least 10 characters long" }),
  isPrivate: z.boolean().default(false),
});

export type BoardFormValues = z.infer<typeof BoardSchema>;

export const pinSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  images: z.array(z.string()).min(1, "At least one image is required"),
  // boardId: z.string().min(1, "Board selection is required"),
  // tags: z.array(z.string()).optional(),
});

export type PinFormValues = z.infer<typeof pinSchema>;

export const tagSchema = z.object({
  name: z.string(),
});

export type TagFormValues = z.infer<typeof tagSchema>;
