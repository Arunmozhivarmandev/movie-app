import { z } from "zod";

export const createMediaSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  type: z.enum(["Movie", "Tvshow"], { message: "Type must be Movie or Tvshow" }),
  director: z.string().min(1, { message: "Director is required" }),
  budget: z.string().min(1, { message: "Budget is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  duration: z.string().min(1, { message: "Duration is required" }),
  yearRange: z.string().min(1, { message: "Year Range is required" }),
  imageUrl: z.string().optional(), 
});
