import { ResponseError } from '../error/response-error.js';
import { registerUserValidation } from '../validation/user-validation.js';
import { validate } from '../validation/validation.js';
import sequelize from '../application/database.js';
import bcrypt from 'bcrypt';

const register = async (request) => {
  const user = validate(registerUserValidation, request);

  const countUser = await sequelize.user.count({
    where: {
      username: user.username,
    },
  });

  if (countUser === 1) {
    throw new ResponseError(400, 'username already exists');
  }

  user.password = await bcrypt.hash(user.password, 10);

  return sequelize.user.create({
    data: user,
    select: {
      username: true,
      email: true,
    },
  });
};

export default { register };
