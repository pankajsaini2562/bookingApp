import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "no token, authorization denied " });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.id;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Invalid token." });
  }
};
export default authMiddleware;
