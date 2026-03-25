const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });
};

// Send email function
const sendEmail = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all required fields'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address'
            });
        }

        // Create email content
        const mailOptions = {
            from: `"School Website" <${process.env.EMAIL_FROM}>`,
            to: process.env.EMAIL_TO,
            replyTo: email,
            subject: `School Contact Form: ${subject}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: #1a5f7a; color: white; padding: 20px; text-align: center; }
                        .content { background: #f9f9f9; padding: 20px; border-radius: 5px; }
                        .field { margin-bottom: 15px; }
                        .label { font-weight: bold; color: #1a5f7a; }
                        .footer { margin-top: 30px; text-align: center; color: #666; font-size: 12px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h2>New Contact Form Submission</h2>
                        </div>
                        <div class="content">
                            <div class="field">
                                <div class="label">From:</div>
                                <div>${name} (${email})</div>
                            </div>
                            <div class="field">
                                <div class="label">Subject:</div>
                                <div>${subject}</div>
                            </div>
                            <div class="field">
                                <div class="label">Message:</div>
                                <div>${message.replace(/\n/g, '<br>')}</div>
                            </div>
                            <div class="field">
                                <div class="label">Received:</div>
                                <div>${new Date().toLocaleString()}</div>
                            </div>
                        </div>
                        <div class="footer">
                            <p>This email was sent from your school website contact form.</p>
                            <p>Please do not reply to this email directly.</p>
                        </div>
                    </div>
                </body>
                </html>
            `,
            text: `
                New Contact Form Submission
                ============================
                
                From: ${name} (${email})
                Subject: ${subject}
                Message: ${message}
                
                Received: ${new Date().toLocaleString()}
                
                This email was sent from your school website contact form.
                Please do not reply to this email directly.
            `
        };

        // Send email
        const transporter = createTransporter();
        await transporter.sendMail(mailOptions);

        // Send confirmation email to user
        const userMailOptions = {
            from: `"${process.env.EMAIL_FROM_NAME || 'School Administration'}" <${process.env.EMAIL_FROM}>`,
            to: email,
            subject: 'Thank you for contacting us',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: #57cc99; color: white; padding: 20px; text-align: center; }
                        .content { padding: 20px; }
                        .footer { margin-top: 30px; text-align: center; color: #666; font-size: 12px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h2>Thank You for Contacting Us</h2>
                        </div>
                        <div class="content">
                            <p>Dear ${name},</p>
                            <p>Thank you for reaching out to us through our school website. We have received your message and will get back to you as soon as possible.</p>
                            <p><strong>Your Message Details:</strong></p>
                            <ul>
                                <li><strong>Subject:</strong> ${subject}</li>
                                <li><strong>Message:</strong> ${message.substring(0, 100)}${message.length > 100 ? '...' : ''}</li>
                            </ul>
                            <p>We typically respond within 24-48 hours during business days.</p>
                            <p>Best regards,<br>The School Administration Team</p>
                        </div>
                        <div class="footer">
                            <p>This is an automated message. Please do not reply to this email.</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        };

        await transporter.sendMail(userMailOptions);

        res.status(200).json({
            success: true,
            message: 'Email sent successfully. A confirmation has been sent to your email.'
        });

    } catch (error) {
        console.error('Email sending error:', error);
        
        let errorMessage = 'Failed to send email. Please try again later.';
        
        if (error.code === 'EAUTH') {
            errorMessage = 'Email configuration error. Please contact administrator.';
        } else if (error.code === 'EENVELOPE') {
            errorMessage = 'Invalid email address. Please check your email and try again.';
        }

        res.status(500).json({
            success: false,
            message: errorMessage
        });
    }
};

module.exports = { sendEmail };