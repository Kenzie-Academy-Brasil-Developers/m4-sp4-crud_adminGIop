import { Router } from "express";
import { userControllers } from "../controllers";
import middlewares from "../middlewares";
import { userCreateSchema, userUpdateSchema } from "../schemas";

const userRouter: Router = Router();

userRouter.post(
  "",
  middlewares.validateBody(userCreateSchema),
  middlewares.validateEmailExists,
  userControllers.create
);
userRouter.get(
  "",
  middlewares.validateToken,
  middlewares.validateAdmin,
  userControllers.read
);

userRouter.use(
  "/:userId",
  middlewares.validateToken,
  middlewares.verifyUser,
  middlewares.userIdExists
);

userRouter.get("/:userId", middlewares.validateAdmin, userControllers.retrieve);
userRouter.patch(
  "/:userId",
  middlewares.validateBody(userUpdateSchema),
  middlewares.validateEmailExists,
  userControllers.partialUpdate
);
userRouter.delete("/:userId", userControllers.destroy);

userRouter.get(
  "/:userId/courses",
  middlewares.validateToken,
  middlewares.validateAdmin,
  middlewares.courseExists,
  userControllers.listUser
);

export default userRouter;
