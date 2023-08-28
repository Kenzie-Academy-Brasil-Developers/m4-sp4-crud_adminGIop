import { Request, Response } from "express";
import { User, UserRead, UserReturn } from "../interfaces";
import { userReturnSchema } from "../schemas";
import { userServices } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const user: UserReturn = await userServices.create(req.body);
  return res.status(201).json(user);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const users: UserRead = await userServices.read();
  return res.status(200).json(users);
};

const retrieve = async (req: Request, res: Response): Promise<Response> => {
  const user: UserReturn = userReturnSchema.parse(res.locals.foundUser);
  return res.status(200).json(user);
};

const partialUpdate = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { userId } = req.params;
  const user: UserReturn = await userServices.partialUpdate(userId, req.body);

  return res.status(200).json(user);
};

const destroy = async (req: Request, res: Response): Promise<Response> => {
  await userServices.destroy(req.params.userId);
  return res.status(204).json();
};

const listUser = async (req: Request, res: Response): Promise<Response> => {
  const userList = await userServices.getUserService(req.params.userId);

  return res.status(200).json(userList);
};

export default { create, read, retrieve, partialUpdate, destroy, listUser };
