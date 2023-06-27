import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
  console.log(token)
  res.cookie("jwt", token, {
    secure: true,
    sameSite: "strict",
    httpOnly: false,
    domain: "up.railway.app",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

    // domain: "http://127.0.0.1:3000",
    // domain: "http://localhost:8080",
  
    // res.cookie("jwt", token, {
    //   httpOnly: true,
    //   secure: true, // Use secure cookies in production
    //   sameSite: "none", // Prevent CSRF attacks
    //   // domain: ".railway.app",
    //   maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    // });
  // res.cookie("token", token, {
  //   httpOnly: true,
  //   credentials: true,
  //   origin: "http://localhost:3000",
  //   maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
  // });
  // res.cookie("token-jwt", token, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
  //   sameSite: "strict", // Prevent CSRF attacks
  //   maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  // });
  
  // const setCookieHeader = res.getHeader("Set-Cookie");
  // if (Array.isArray(setCookieHeader)) {
  //   const jwtCookie = setCookieHeader.find((cookie) =>
  //     cookie.startsWith("jwt=")
  //   );
  //   if (jwtCookie) {
  //     const cookieValue = jwtCookie.split(";")[0].split("=")[1];
  //     console.log(cookieValue);
  //   }
  // } else {
  //   console.log("there is no cookie");
  // }
}

export default generateToken;