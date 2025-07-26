const success = require("zod");
const AuthService  = require("../services/authService");

class AuthController {
  static async register(req, res) {
    try{
        const user = await AuthService.register(req.body)
        res.status(201).json({
            success:true,
            message:'User registered successfully',
            data: {user}
        })
    }catch (error){
        res.status(400).json({
            success:false,
            error:error.message
        })
    }
  }
  static async login(req, res) {
    try{
        const {email, password} = req.body
        const userAgent = req.headers['user-agent']
        const ipAddress = req.ip

        const result = await AuthService.login(email, password, userAgent, ipAddress)
        res.json({
            success:true,
            message: 'Login Successful',
            data:result
        })
    }catch(error){
        res.status(401).json({
            success:false,
            error:error.message
        })
    }
  }

  static async refreshToken(req, res){
    try{
        const {refreshToken} = req.body;

        if(!refreshToken){
            return res.status(400).json({
                success:false,
                error: 'Refresh token is required'
            })
        }

        const tokens = await AuthService.refreshToken(refreshToken)
        res.json({
            success:true,
            message:'Token refresh successfully',
            data:tokens
        })
    }catch(error){
        res.status(401).json({
            success:false,
            error:error.message
        })
    }
  }

  static async logout(req, res){
    try{
        const {refreshToken} = req.body

        await AuthService.logout(refreshToken)

        res.json({
            success:true,
            message: 'Logout successful'
        })
    }catch(error){
        res.status(400).json({
            success:false,
            error:error.message
        })
    }
  }

  // Forgot Password
  static async forgotPassword(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          success: false,
          error: 'Email is required'
        });
      }

      const result = await AuthService.forgotPassword(email);
      res.json({
        success: true,
        message: 'Password reset link sent to your email',
        data: result
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  // Reset Password dengan token
  static async resetPassword(req, res) {
    try {
      const { token, newPassword, confirmPassword } = req.body;

      if (!token || !newPassword || !confirmPassword) {
        return res.status(400).json({
          success: false,
          error: 'Token, new password, and confirm password are required'
        });
      }

      if (newPassword !== confirmPassword) {
        return res.status(400).json({
          success: false,
          error: 'Passwords do not match'
        });
      }

      const result = await AuthService.resetPassword(token, newPassword);
      res.json({
        success: true,
        message: 'Password reset successfully',
        data: result
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  // Fitur Forgot Account - mencari akun berdasarkan informasi yang diberikan
  static async forgotAccount(req, res) {
    try {
      const { phoneNumber, fullName, dateOfBirth } = req.body;

      if (!phoneNumber && !fullName && !dateOfBirth) {
        return res.status(400).json({
          success: false,
          error: 'At least one identifier (phone number, full name, or date of birth) is required'
        });
      }

      const result = await AuthService.forgotAccount({
        phoneNumber,
        fullName,
        dateOfBirth
      });

      res.json({
        success: true,
        message: 'Account information sent to your registered email',
        data: result
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        error: error.message
      });
    }
  }
  // Verifikasi reset token (opsional - untuk mengecek validitas token)
  
  static async verifyResetToken(req, res) {
    try {
      const { token } = req.params;

      if (!token) {
        return res.status(400).json({
          success: false,
          error: 'Reset token is required'
        });
      }

      const isValid = await AuthService.verifyResetToken(token);
      res.json({
        success: true,
        message: 'Reset token is valid',
        data: { valid: isValid }
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }
}
module.exports = AuthController;
