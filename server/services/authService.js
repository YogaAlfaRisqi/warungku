
const prisma = require('../lib/prisma.js')
const { hashPassword, comparePassword, generateTokens, verifyToken } = require('../utils/auth.js')


class AuthService {
  static async register(userData) {
    const { email, username, password, firstName, lastName } = userData
    
    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    })
    
    if (existingUser) {
      throw new Error('User already exists with this email or username')
    }
    
    // Hash password
    const hashedPassword = await hashPassword(password)
    
    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        firstName,
        lastName,
      },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        isVerified: true,
        createdAt: true,
      }
    })
    
    return user
  }
  
  static async login(email, password, userAgent, ipAddress) {
    const user = await prisma.user.findUnique({
      where: { email }
    })
    
    if (!user || !user.isActive) {
      throw new Error('Invalid credentials')
    }
    
    const isValidPassword = await comparePassword(password, user.password)
    
    if (!isValidPassword) {
      throw new Error('Invalid credentials')
    }
    
    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user.id)
    
    // Store refresh token
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      }
    })
    
    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      accessToken,
      refreshToken
    }
  }
  
  static async refreshToken(refreshToken) {
    try {
      const decoded = verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET)
      
      const storedToken = await prisma.refreshToken.findUnique({
        where: { token: refreshToken },
        include: { user: true }
      })
      
      if (!storedToken || storedToken.expiresAt < new Date()) {
        throw new Error('Invalid refresh token')
      }
      
      // Generate new tokens
      const { accessToken, refreshToken: newRefreshToken } = generateTokens(storedToken.userId)
      
      // Delete old refresh token and create new one
      await prisma.refreshToken.delete({
        where: { token: refreshToken }
      })
      
      await prisma.refreshToken.create({
        data: {
          token: newRefreshToken,
          userId: storedToken.userId,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        }
      })
      
      return {
        accessToken,
        refreshToken: newRefreshToken
      }
    } catch (error) {
      throw new Error('Invalid refresh token')
    }
  }
  
  static async logout(refreshToken) {
    if (refreshToken) {
      await prisma.refreshToken.deleteMany({
        where: { token: refreshToken }
      })
    }
  }
}

module.exports =AuthService