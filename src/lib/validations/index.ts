import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const userRoleSchema = z.object({
  userId: z.string().uuid(),
  role: z.enum(["SUPER_ADMIN", "ADMIN", "MODERATOR", "USER"]),
});

export const userStatusSchema = z.object({
  userId: z.string().uuid(),
  status: z.enum(["active", "suspended", "pending"]),
});

export const planSchema = z.object({
  name: z.string().min(2, "Plan name is required"),
  price: z.coerce.number().min(0, "Price must be greater than or equal to 0"),
  billing_cycle: z.enum(["monthly", "yearly"]),
  status: z.string().default("active"),
  description: z.string().optional(),
  features: z.array(z.string()).default([]),
});

export type PlanInput = z.infer<typeof planSchema>;

export const notificationSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  message: z.string().min(5, "Message must be at least 5 characters"),
  target_audience: z.enum(["all", "active_users", "super_admins"]),
});

export type NotificationInput = z.infer<typeof notificationSchema>;

export const contentSchema = z.object({
  slug: z.enum(["privacy-policy", "terms-conditions", "about-us"]),
  title: z.string().min(3, "Title is required"),
  content: z.string().min(10, "Content must be at least 10 characters long"),
});

export type ContentInput = z.infer<typeof contentSchema>;
