const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(403).json({ message: "Access denied" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      console.log("1111111",req.user);
      
      return res.status(403).json({
        message: "You are not authorized to access this resource",
      });
    }

    next();
  };
};

module.exports = roleMiddleware;
