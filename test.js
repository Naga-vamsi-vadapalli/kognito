const jwt = require('jsonwebtoken');
const token = "906a6403bbeee719c142d7515c5d7f9cb35d935d15110551f8d7404b09b60a192f843754ef3431668593e20ea00365f93c7c56fcbaa25d8867e80d7a7ced0fe5";
try {
  const decoded = jwt.decode(token);
  console.log(decoded);
  const expirationTime = decoded.exp;
  console.log("Token expires at:", new Date(expirationTime * 1000));
} catch (error) {
  console.error("Invalid token:", error);
}
