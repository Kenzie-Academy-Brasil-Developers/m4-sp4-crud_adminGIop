import { Request, Response } from "express";
import { SesseionReturn, SessionCreate } from "../interfaces";
import { sessionService } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const token: SesseionReturn = await sessionService.create(req.body);
  return res.status(200).json(token);
};

export default { create };
