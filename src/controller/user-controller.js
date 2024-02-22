import userService from '../service/user-service.js';

const register = async (req, res, next) => {
  try {
    const result = await userService.register(req.bod);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  register,
};
