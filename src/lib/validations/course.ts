import * as z from "zod";

const createCourseSchema = z.object({
  title: z.string().min(3).max(100),
});

export default createCourseSchema;
