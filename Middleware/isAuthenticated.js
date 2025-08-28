import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }
    req.id = decoded.userId;
    next();
  } catch (error) {
    console.error("Error in authentication middleware:", error);
    return res.status(500).json({
      message: "Internal server error during authentication",
      success: false,
    });
  }
};

export default isAuthenticated;