
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

 const hashPassword = async (password) => {
  const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12
  return await bcrypt.hash(password, saltRounds)
}

 const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword)
}

 const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  )
  
  const refreshToken = jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
  )
  
  return { accessToken, refreshToken }
}

 const verifyToken = (token, secret = process.env.JWT_SECRET) => {
  try {
    return jwt.verify(token, secret)
  } catch (error) {
    throw new Error('Invalid token')
  }
}

module.exports = {
  hashPassword,
  comparePassword,
  generateTokens,
  verifyToken
}