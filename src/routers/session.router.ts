import { Router } from "express";
import { sessionControllers } from "../controllers";
import middlewares from "../middlewares";
import { sessionCreate } from "../schemas";

const sessionRouter: Router = Router();

sessionRouter.post(
  "",
  middlewares.validateBody(sessionCreate),
  sessionControllers.create
);

export default sessionRouter;
