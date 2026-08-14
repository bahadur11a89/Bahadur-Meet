import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendEmail = async ({ to, subject, html, text }) => {
    return await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
        html,
    });
};

export const sendMeetingInviteEmail = async ({ to, inviterName, meetingCode, inviteLink }) => {
    const html = `
        <h2>You've been invited to a meeting</h2>
        <p><strong>${inviterName}</strong> has invited you to join a meeting.</p>
        <p><strong>Meeting Code:</strong> ${meetingCode}</p>
        <p><a href="${inviteLink}">Click here to join</a></p>
        <p>This link expires in 24 hours.</p>
    `;

    return await sendEmail({
        to,
        subject: `Meeting Invite from ${inviterName}`,
        html,
    });
};
