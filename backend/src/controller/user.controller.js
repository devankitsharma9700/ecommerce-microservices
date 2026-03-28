const { registerUser, loginUser,getAllUsers } = require("../services/user.services");

const register = async (req, res, next) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const data = await loginUser(req.body);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const allUser= async (req,res,next) => {
    try {
    const data = await getAllUsers(req);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login,allUser };
