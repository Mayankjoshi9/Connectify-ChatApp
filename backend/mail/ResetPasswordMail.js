exports.ResetEmail=({url})=>{
    return (
        `
          <div style="background-color: #f5f5f5; padding: 20px; font-family: Arial, sans-serif; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
              <h2 style="color: #111b21; font-size: 24px; text-align: center;">Password Reset Request</h2>
              <p style="font-size: 16px; color: #333333; line-height: 1.5; text-align: center;">
                We received a request to reset your password for your Chat Application account. If you did not make this request, you can safely ignore this email.
              </p>
              <p style="font-size: 16px; color: #333333; line-height: 1.5; text-align: center;">
                To reset your password, simply click the button below:
              </p>
              <div style="text-align: center; margin: 20px 0;">
                <a href="${url}" style="background-color: #3b4a54; color: #ffffff; padding: 12px 24px; text-decoration: none; font-size: 16px; border-radius: 8px; display: inline-block;">Reset Password</a>
              </div>
              <p style="font-size: 14px; color: #666666; text-align: center;">
                If you did not request a password reset, please ignore this email or let us know if you have questions.
              </p>
              <footer style="text-align: center; font-size: 12px; color: #999999; margin-top: 30px;">
                <p>Thanks,</p>
                <p><strong>Chat Application Team</strong></p>
              </footer>
            </div>
          </div>
        `
    );
      
}