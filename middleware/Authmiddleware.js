import JWT from "jsonwebtoken";

const AuthRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(401).send({
        success: false,
        message: "Authorization header missing"
      });
    }

    // Bearer token
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Token not provided"
      });
    }

    JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Invalid or expired token"
        });
      } else {
        req.user = decoded; // ✅ safer than req.body.id
        next();
      }
    });

  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res.status(400).send({
      success: false,
      message: "Please provide a valid token",
      error
    });
  }
};

export default AuthRoute;
