import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
  console.log(token)
  res.cookie("jwt", token, {
    secure: true,
    sameSite: "none",
    httpOnly: false,
    domain: ".railway.app",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

}

export default generateToken;