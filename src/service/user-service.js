import { validate } from '../validation/validation.js';
import { registerUserValidation } from '../validation/user-validation.js';
import { ResponseError } from '../error/response-error.js';
import { User } from '../model/user-model.js';
import sequelize from 'sequelize';
import bcrypt from 'bcrypt';

const register = async (request) => {
  const user = validate(registerUserValidation, request);

  const countUser = await User.count({
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
      name: true,
    },
  });
};

export default { register };
