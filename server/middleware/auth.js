import { verifyToken } from '../utils/auth.js'
import { prisma } from '../lib/prisma.js'

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Access token required' })
    }
    
    const token = authHeader.substring(7)
    const decoded = verifyToken(token)
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        isVerified: true,
      }
    })
    
    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'User not found or inactive' })
    }
    
    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' })
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' })
    }
    
    next()
  }
}