import { sessionCreate } from "../schemas";
import { z } from "zod";

type SessionCreate = z.infer<typeof sessionCreate>;
type SesseionReturn = { token: string };

export { SessionCreate, SesseionReturn };
