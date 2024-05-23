import * as z from "zod";

const createCourseSchema = z.object({
  topic: z.string().min(3).max(100),
  userId: z.string(),
});

export default createCourseSchema;
