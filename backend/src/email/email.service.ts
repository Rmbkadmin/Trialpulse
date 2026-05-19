import { Injectable } from "@nestjs/common";
import { Resend } from "resend";

@Injectable()
export class EmailService {
  private resend = new Resend(
    process.env.RESEND_API_KEY
  );

  async sendWelcomeEmail(email: string) {
    await this.resend.emails.send({
      from: "ClinicalSiteHub <onboarding@yourdomain.com>",
      to: email,
      subject: "Welcome to ClinicalSiteHub",
      html: `
        <h1>Welcome!</h1>

        <p>
          Your account has been created.
        </p>
      `,
    });
  }
}