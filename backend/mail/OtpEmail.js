exports.OtpEmail = ({ otp }) => {
    return (
        `
        <div style="background-color: #f5f5f5; padding: 20px; font-family: Arial, sans-serif; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #111b21; font-size: 24px; text-align: center;">Email Verification</h2>
            <p style="font-size: 16px; color: #333333; line-height: 1.5; text-align: center;">
              Thank you for signing up for <strong>Chat Application</strong>! To complete your registration, please use the OTP below to verify your email.
            </p>
            <div style="text-align: center; margin: 20px 0;">
              <p style="font-size: 22px; font-weight: bold; background-color: #3b4a54; color: #ffffff; padding: 10px 20px; display: inline-block; border-radius: 8px;">
                ${otp}
              </p>
            </div>
            <p style="font-size: 14px; color: #666666; text-align: center;">
              This OTP is valid for a limited time. Please do not share it with anyone.
            </p>
            <footer style="text-align: center; font-size: 12px; color: #999999; margin-top: 30px;">
              <p>Need help? Contact our support team.</p>
              <p><strong>Chat Application Team</strong></p>
            </footer>
          </div>
        </div>
        `
    );
}
