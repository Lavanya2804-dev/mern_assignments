import jwt from "jsonwebtoken";
export const verifyToken = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      // 1. CHECK COOKIES
      console.log("🍪 Cookies received:", req.cookies);

      // Read token from cookie
      const token = req.cookies.token;

      if (!token) {
        console.log("❌ No token found in cookies");
        return res.status(401).json({ message: "Unauthorized. Please login" });
      }

      // 2. VERIFY TOKEN
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      // 3. CHECK DECODED TOKEN
      console.log("🔓 Decoded Token:", decodedToken);

      // Check role
      if (!allowedRoles.includes(decodedToken.role)) {
        console.log("❌ Role not allowed:", decodedToken.role);
        return res.status(403).json({ message: "Forbidden. You don't have permission" });
      }

      // Attach user
      req.user = decodedToken;

      next();

    } catch (err) {
      console.log("❌ JWT ERROR:", err.message);

      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Session expired. Please login again" });
      }

      if (err.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token. Please login again" });
      }

      return res.status(401).json({ message: "Authentication failed" });
    }
  };
};