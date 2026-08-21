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

export const contentSchema = z
  .object({
    contentType: z.string().optional(),
    content_type: z.string().optional(),
    slug: z.string().optional(),
    title: z.string().min(3, "Title is required"),
    content: z.string().min(10, "Content must be at least 10 characters long"),
  })
  .transform((data) => {
    const raw = (data.contentType || data.content_type || data.slug || "").toLowerCase().replace(/-/g, "_");
    let resolved: "privacy_policy" | "terms_conditions" | "about_us" | undefined;

    if (raw.includes("privacy")) {
      resolved = "privacy_policy";
    } else if (raw.includes("term")) {
      resolved = "terms_conditions";
    } else if (raw.includes("about")) {
      resolved = "about_us";
    }

    // Fallback: Infer from document title if raw type was empty
    if (!resolved && data.title) {
      const titleLower = data.title.toLowerCase();
      if (titleLower.includes("privacy")) resolved = "privacy_policy";
      else if (titleLower.includes("term")) resolved = "terms_conditions";
      else if (titleLower.includes("about")) resolved = "about_us";
    }

    if (!resolved) {
      throw new Error(`Valid content_type is required ('privacy_policy', 'terms_conditions', or 'about_us').`);
    }

    return {
      contentType: resolved,
      title: data.title,
      content: data.content,
    };
  });

export type ContentInput = z.input<typeof contentSchema>;
