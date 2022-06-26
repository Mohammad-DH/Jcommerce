import jsonwebtoken from "jsonwebtoken";

export default async function ValidateToken(token) {
  return jsonwebtoken.verify(
    token,
    process.env.JWTsecret,
    function (err, decoded) {
      if (err) {
        return "err";
      } else if (Date.now() >= decoded.exp * 1000) {
        return "err";
        //check refresh
      } else {
        return decoded;
      }
    }
  );
}
