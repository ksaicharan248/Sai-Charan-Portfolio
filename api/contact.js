import nodemailer from "nodemailer";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Only POST requests allowed" });
    }

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required." });
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        }
    });

    const mailOptions = {
        from: email,
        to: process.env.GMAIL_USER,
        subject: `New Contact from ${name}`,
        html: `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong><br>${message}</p>
        `
    };
    const Thanksmessage = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: "Thank You for Getting in Touch!",
        html: `
            <p>Dear ${name},</p>
            <p>Thank you very much for reaching out to us. We truly appreciate you taking the time to contact us. Rest assured, we have received your message and will get back to you as soon as possible.</p>
            <p>Warm regards,<br>K Sai Charan</p>
        `
    };


    try {
        await transporter.sendMail(mailOptions);
        await transporter.sendMail(Thanksmessage);
        res.status(200).json({ success: true });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to send email." });
    }
}
