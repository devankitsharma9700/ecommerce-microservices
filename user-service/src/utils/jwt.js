const jwt = require("jsonwebtoken");

function generateToken(user) {

  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d"
    }
  );

}

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

function generateAccessToken(user){
    return jwt.sign(
        {
      id: user._id,
      email: user.email,
      role: user.role  
    },

    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );
}

function generateRefreshToken(user){
   return jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
  );
}

module.exports = {
  generateToken,
  verifyToken,
  generateAccessToken,generateRefreshToken
};