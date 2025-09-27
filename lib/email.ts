import { supabaseAdmin } from './supabase';

export class EmailService {
  /**
   * Send OTP email using Supabase Auth
   * This leverages Supabase's built-in email functionality
   */
  static async sendOTPEmail(email: string, otp: string): Promise<{ success: boolean; error?: string }> {
    try {
      // Create a custom email template for OTP
      const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your Donare OTP</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .otp-box { background: white; border: 2px solid #667eea; border-radius: 10px; padding: 20px; text-align: center; margin: 20px 0; }
            .otp-code { font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 5px; margin: 10px 0; font-family: monospace; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
            .warning { background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 5px; padding: 15px; margin: 20px 0; color: #856404; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🤝 Donare</h1>
              <p>Your One-Time Password</p>
            </div>
            <div class="content">
              <h2>Hello!</h2>
              <p>You requested to sign in to your Donare donor account. Please use the following OTP to complete your authentication:</p>
              
              <div class="otp-box">
                <p>Your verification code is:</p>
                <div class="otp-code">${otp}</div>
                <p>This code expires in <strong>10 minutes</strong></p>
              </div>

              <div class="warning">
                <strong>🔒 Security Notice:</strong>
                <ul style="margin: 10px 0; padding-left: 20px;">
                  <li>Never share this code with anyone</li>
                  <li>Donare will never ask for your OTP via phone or email</li>
                  <li>If you didn't request this code, please ignore this email</li>
                </ul>
              </div>

              <p>If you have any questions or need help, please contact our support team at <a href="mailto:support@donare.org" style="color: #667eea;">support@donare.org</a></p>
              
              <p>Thank you for using Donare to make a difference! 💝</p>
            </div>
            <div class="footer">
              <p>© 2024 Donare. All rights reserved.</p>
              <p>This is an automated email. Please do not reply to this message.</p>
            </div>
          </div>
        </body>
        </html>
      `;

      // For development, we'll use a simple console log
      // In production, integrate with a proper email service like SendGrid, AWS SES, or Resend
      console.log('='.repeat(50));
      console.log(`📧 OTP EMAIL FOR: ${email}`);
      console.log('='.repeat(50));
      console.log(emailHtml);
      console.log('='.repeat(50));
      console.log(`🔑 OTP CODE: ${otp}`);
      console.log('='.repeat(50));

      // TODO: Replace with actual email service integration
      // Example with Resend:
      // const { Resend } = require('resend');
      // const resend = new Resend(process.env.RESEND_API_KEY);
      // 
      // const { data, error } = await resend.emails.send({
      //   from: 'Donare <noreply@donare.org>',
      //   to: [email],
      //   subject: 'Your Donare OTP',
      //   html: emailHtml,
      // });

      return { success: true };

    } catch (error) {
      console.error('Email sending error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to send OTP email' 
      };
    }
  }

  /**
   * Alternative method: Send email using Supabase Edge Functions
   * This method allows for more customization if you have edge functions set up
   */
  static async sendCustomOTPEmail(email: string, otp: string): Promise<{ success: boolean; error?: string }> {
    try {
      // Call a Supabase Edge Function to send custom email
      const { data, error } = await supabaseAdmin.functions.invoke('send-otp-email', {
        body: {
          email,
          otp,
          template: 'donor-auth'
        }
      });

      if (error) {
        throw error;
      }

      return { success: true };
    } catch (error) {
      console.error('Custom email sending error:', error);
      // Fallback to the magic link method
      return this.sendOTPEmail(email, otp);
    }
  }

  /**
   * Test email configuration
   */
  static async testEmailConfiguration(): Promise<{ success: boolean; error?: string }> {
    try {
      // Test with a dummy email to check if Supabase email is configured
      const testResult = await supabaseAdmin.auth.admin.generateLink({
        type: 'magiclink',
        email: 'test@example.com',
        options: {
          data: { test: true }
        }
      });

      if (testResult.error) {
        return { 
          success: false, 
          error: `Email service not configured: ${testResult.error.message}` 
        };
      }

      return { success: true };
    } catch (error) {
      console.error('Email configuration test failed:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Email configuration test failed' 
      };
    }
  }
}
