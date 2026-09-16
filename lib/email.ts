import nodemailer from 'nodemailer';
import { FormSubmission } from './submissions';

const ADMIN_EMAIL = 'jrshrivastava03@gmail.com';

function createTransporter() {
  const host = process.env.EMAIL_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.EMAIL_PORT || '587', 10);
  const secure = process.env.EMAIL_SECURE === 'true';
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASSWORD;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
}

export async function sendContactEmail({
  to,
  submission,
  type,
}: {
  to: string;
  submission: FormSubmission;
  type: 'admin' | 'user';
}): Promise<{ success: boolean; messageId?: string }> {
  const transporter = createTransporter();

  const fromEmail = process.env.EMAIL_FROM || 'noreply@aravinnovations.com';

  if (type === 'admin') {
    const adminHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f6f0; color: #3a2e27;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; padding: 24px; border: 1px solid #f7d7b0;">
          <h2 style="color: #f15e1c; margin-top: 0;">🔥 New Inquiry / Lead Received</h2>
          <p><strong>Lead Reference ID:</strong> ${submission.id}</p>
          <hr style="border: 0; border-top: 1px solid #f7d7b0; margin: 16px 0;" />
          <p><strong>Full Name:</strong> ${submission.name}</p>
          <p><strong>Work Email:</strong> <a href="mailto:${submission.email}">${submission.email}</a></p>
          <p><strong>Company:</strong> ${submission.company}</p>
          <p><strong>Phone / WhatsApp:</strong> ${submission.phone}</p>
          <p><strong>Service Requested:</strong> <span style="color: #2e936f; font-weight: bold;">${submission.service}</span></p>
          <p><strong>Estimated Timeline:</strong> ${submission.timeline}</p>
          ${submission.budget ? `<p><strong>Budget:</strong> ${submission.budget}</p>` : ''}
          <p><strong>Requirement Details:</strong></p>
          <blockquote style="background: #fefaf5; padding: 12px; border-left: 4px solid #f15e1c; margin: 0;">
            ${submission.requirement.replace(/\n/g, '<br>')}
          </blockquote>
          <p style="font-size: 12px; color: #7a6a5f; margin-top: 20px;">
            Submitted At: ${new Date(submission.submittedAt).toLocaleString()}
          </p>
          <div style="margin-top: 24px;">
            <a href="https://aravinnovation-temp.vercel.app/en/admin" style="background-color: #f15e1c; color: #ffffff; padding: 10px 18px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
              Open Admin Control Center
            </a>
          </div>
        </div>
      </div>
    `;

    console.log(`[Email Service Notification -> Admin (${ADMIN_EMAIL})]:`, {
      id: submission.id,
      name: submission.name,
      email: submission.email,
      service: submission.service,
    });

    if (!transporter) {
      console.warn('[Email Service]: SMTP credentials (EMAIL_USER / EMAIL_PASSWORD) not configured. Logged notification payload above.');
      return { success: true };
    }

    try {
      const info = await transporter.sendMail({
        from: `Arav Innovations <${fromEmail}>`,
        to: ADMIN_EMAIL,
        subject: `🚨 [New Lead] ${submission.name} - ${submission.service}`,
        html: adminHtml,
      });
      return { success: true, messageId: info.messageId };
    } catch (err) {
      console.error('[Email Service Admin Error]:', err);
      return { success: false };
    }
  } else {
    const userHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f6f0; color: #3a2e27;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; padding: 24px; border: 1px solid #f7d7b0;">
          <h2 style="color: #f15e1c; margin-top: 0;">Thank You for Contacting Arav Innovations</h2>
          <p>Dear ${submission.name},</p>
          <p>We have successfully received your inquiry regarding <strong>${submission.service}</strong>.</p>
          <p>Our senior strategy and engineering leadership will review your requirements and get back to you within 1 business day.</p>
          
          <div style="background: #fefaf5; padding: 16px; border-radius: 8px; border: 1px solid #f7d7b0; margin: 20px 0;">
            <p style="margin: 0 0 8px 0; font-weight: bold; color: #2e936f;">Submission Summary:</p>
            <p style="margin: 4px 0;"><strong>Reference ID:</strong> ${submission.id}</p>
            <p style="margin: 4px 0;"><strong>Company:</strong> ${submission.company}</p>
            <p style="margin: 4px 0;"><strong>Timeline:</strong> ${submission.timeline}</p>
          </div>

          <p>If you have urgent questions, please feel free to connect with our regional hubs:</p>
          <ul>
            <li><strong>India HQ:</strong> +91 9650625777</li>
            <li><strong>UAE Office:</strong> +971 52 155 5792</li>
          </ul>

          <p style="margin-top: 24px; font-size: 14px; color: #7a6a5f;">
            Best regards,<br>
            <strong>Arav Innovations Team</strong><br>
            <a href="https://aravinnovations.com" style="color: #f15e1c;">www.aravinnovations.com</a>
          </p>
        </div>
      </div>
    `;

    console.log(`[Email Service Confirmation -> User (${to})]:`, {
      id: submission.id,
      name: submission.name,
    });

    if (!transporter) {
      return { success: true };
    }

    try {
      const info = await transporter.sendMail({
        from: `Arav Innovations <${fromEmail}>`,
        to,
        subject: `We Received Your Query [Ref: ${submission.id}] — Arav Innovations`,
        html: userHtml,
      });
      return { success: true, messageId: info.messageId };
    } catch (err) {
      console.error('[Email Service User Error]:', err);
      return { success: false };
    }
  }
}
