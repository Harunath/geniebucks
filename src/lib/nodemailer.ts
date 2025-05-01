import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL,
		pass: process.env.EMAIL_PASS, // Google App Password
	},
});

export const sendVerificationEmail = async (email: string, otp: string) => {
	try {
		await transporter.sendMail({
			from: `"GenieBucks" <geniebucks.services@gmail.com>`,
			to: email,
			subject: "Verify Your Email",
			html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
          <h2 style="color: #333; margin-bottom: 15px;">Your OTP Code</h2>
          <p style="color: #555; margin-bottom: 10px;">Use the following OTP code to verify your email:</p>
          <h3 style="background-color: #e0f7fa; color: #00897b; padding: 10px; border-radius: 5px; font-size: 1.5em; text-align: center; margin-bottom: 15px;">${otp}</h3>
          <p style="color: #777; font-size: 0.9em; margin-bottom: 10px;">This code is valid for 10 minutes.</p>
          <p style="color: #777; font-size: 0.9em;">Thank you,</p>
          <p style="color: #777; font-size: 0.9em;">The GenieBucks Team</p>
        </div>
      `,
		});
	} catch (error) {
		console.error("Error sending email:", error);
	}
};
