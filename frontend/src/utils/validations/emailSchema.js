import { z } from "zod";

const emailSchema = z.string().email({ message: "Invalid email address" });
export default emailSchema;
