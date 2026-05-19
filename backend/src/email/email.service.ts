import { Injectable } from "@nestjs/common";
import { Resend } from "resend";

@Injectable()
export class EmailService {
  private resend = new Resend(
    process.env.RESEND_API_KEY
  );

  async sendVerificationEmail(
    email: string,
    token: string
  ) {
    const verifyUrl = `
https://www.clinicalsitehub.com/verify?token=${token}
    `;

    await this.resend.emails.send({
      from:
        "ClinicalSiteHub <onboarding@yourdomain.com>",

      to: email,

      subject:
        "Verify your ClinicalSiteHub account",

      html: `
        <h1>Verify Your Email</h1>

        <p>
          Click below to verify your account:
        </p>

        <a href="${verifyUrl}">
          Verify Account
        </a>
      `,
    });
  }

  async sendPasswordResetEmail(
    email: string,
    token: string
  ) {
    const resetUrl = `
https://www.clinicalsitehub.com/reset-password?token=${token}
    `;

    await this.resend.emails.send({
      from:
        "ClinicalSiteHub <onboarding@yourdomain.com>",

      to: email,

      subject:
        "Reset your ClinicalSiteHub password",

      html: `
        <h1>Password Reset</h1>

        <p>
          Click below to reset your password:
        </p>

        <a href="${resetUrl}">
          Reset Password
        </a>
      `,
    });
  }
}