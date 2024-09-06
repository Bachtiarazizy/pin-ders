import { z } from "zod";

export const boardSchema = z.object({
  name: z.string().min(1, "Shop name is required"),
  description: z.string().min(10, { message: "Description must be at least 10 characters long" }),
  isPrivate: z.boolean().default(false),
});

export type BoardFormValues = z.infer<typeof boardSchema>;

export const pinSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  images: z.array(z.string().url()).min(1, "At least one image URL is required"), // Array of valid image URLs
  link: z.string().url().optional(), // Optional external link
  likes: z.number().default(0), // Default likes count
  userId: z.string().uuid(), // Required user ID (cannot be optional, user must be defined)
  boardId: z.string().uuid(), // Board ID must be provided, links pin to a board
  tags: z.string().min(1, "Description is required"),
});

export type PinFormValues = z.infer<typeof pinSchema>;

export const tagSchema = z.object({
  id: z.string().uuid(), // Unique identifier
  name: z.string(),
  pins: z.array(z.string()).optional(),
});

export type TagFormValues = z.infer<typeof tagSchema>;
