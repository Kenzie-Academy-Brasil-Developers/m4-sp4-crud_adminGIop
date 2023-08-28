import handleErrors from "./handleErrors";
import validateAdmin from "./validateAdmin.middlewares";
import validateBody from "./validateBody.middlewares";
import courseExists from "./CourseExists.middlewares";
import courseIdExists from "./CourseIdExists.middlewares";
import validateEmailExists from "./EmailExists.middlewares";
import userIdExists from "./userIdExists.middlewares";
import validateToken from "./validateToken.middlewares";
import verifyUser from "./verifyUser.middlewares";

export default {
  handleErrors,
  validateEmailExists,
  validateBody,
  userIdExists,
  validateToken,
  verifyUser,
  courseExists,
  validateAdmin,
  courseIdExists,
};
