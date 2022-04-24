const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generateAccessToken = (userdata) => {
    return jwt.sign(userdata, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 });
}

const authenticateToken = (req, res, next) => {
const authHeader = req.headers['authorization']
const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, userdata) => {
       /*  console.log("ERROR:" ,err) */
        if (err) return res.sendStatus(403)
        req.user = userdata
        next()
  })
}

module.exports = {generateAccessToken, authenticateToken}