const jwt = require("jsonwebtoken");
const secretValue = "5";

const jwtSign = (data) => {
  const {id,name} = data;
//   data.toString()
  return jwt.sign({id,name},secretValue)
};

const jwtVerify = (data) => {
    return jwt.verify(data,secretValue)
};

module.exports = {
  jwtSign,
  jwtVerify,
};


