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

    // const mailOptions = {
    //     from: email,
    //     to: process.env.GMAIL_USER,
    //     subject: `New Contact from ${name}`,
    //     html: `
    //         <p><strong>Name:</strong> ${name}</p>
    //         <p><strong>Email:</strong> ${email}</p>
    //         <p><strong>Message:</strong><br>${message}</p>
    //     `
    // };
    // const Thanksmessage = {
    //     from: process.env.GMAIL_USER,
    //     to: email,
    //     subject: "Thank You for Getting in Touch!",
    //     html: `
    //         <p>Dear ${name},</p>
    //         <p>Thank you very much for reaching out to us. We truly appreciate you taking the time to contact us. Rest assured, we have received your message and will get back to you as soon as possible.</p>
    //         <p>Warm regards,<br>K Sai Charan</p>
    //     `
    // };
    const mailOptions = {
            from: process.env.GMAIL_USER,
            to: 'saicharanreddy141458@gmail.com',
            subject: `Portfolio Contact: ${name} `,
            html: `
                <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                        <h1 style="color: white; margin: 0; font-size: 28px;">New Portfolio Contact</h1>
                    </div>
                    
                    <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
                        <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                            <h2 style="color: #667eea; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Contact Details</h2>
                            
                            <div style="margin-bottom: 20px;">
                                <strong style="color: #555;">Name:</strong>
                                <span style="margin-left: 10px; color: #333;">${name}</span>
                            </div>
                            
                            <div style="margin-bottom: 20px;">
                                <strong style="color: #555;">Email:</strong>
                                <span style="margin-left: 10px; color: #333;">
                                    <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a>
                                </span>
                            </div>
                            
                            
                            <div style="border-top: 1px solid #e9ecef; padding-top: 20px;">
                                <strong style="color: #555; display: block; margin-bottom: 10px;">Message:</strong>
                                <div style="background: #f8f9fa; padding: 15px; border-radius: 6px; border-left: 4px solid #667eea;">
                                    ${message.replace(/\n/g, '<br>')}
                                </div>
                            </div>
                        </div>
                        
                        <div style="text-align: center; margin-top: 20px; color: #666;">
                            <p style="margin: 0; font-size: 14px;">
                                This message was sent from your Portfolio contact form.
                            </p>
                            <p style="margin: 5px 0 0 0; font-size: 12px;">
                                Time: ${new Date().toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>
            `,
            replyTo: email
        };

        // Auto-reply to sender
        const Thanksmessage = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: 'Thank you for contacting me!',
            html: `
                <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                        <h1 style="color: white; margin: 0; font-size: 28px;">Thank You!</h1>
                    </div>
                    
                    <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
                        <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                            <p style="font-size: 18px; color: #333; margin-top: 0;">Hi ${name},</p>
                            
                            <p style="color: #666; line-height: 1.8;">
                                Thank you very much for reaching out to us. We truly appreciate you taking the time to contact us.
                            </p>
                            
                            <p style="color: #666; line-height: 1.8;">
                                Rest assured, we have received your message and will get back to you as soon as possible.
                            </p>
                            
                            <div style="background: #f0f4ff; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea; margin: 25px 0;">
                                <p style="margin: 0; color: #555; font-style: italic;">
                                    "Innovation distinguishes between a leader and a follower." - Steve Jobs
                                </p>
                            </div>
                            
                            <p style="color: #666; margin-bottom: 0;">
                                Best regards,<br>
                                <strong style="color: #667eea;">Sai Charan K</strong><br>
                                <span style="color: #999; font-size: 14px;">Tech Enthusiast</span>
                            </p>
                        </div>
                        
                        <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
                            <p style="margin: 0;">This is an automated response from my portfolio contact system.</p>
                        </div>
                    </div>
                </div>
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
