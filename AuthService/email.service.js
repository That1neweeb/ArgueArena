import createTransporter from '../config/mailer.js';



export async function sendVerificationEmail(email, username, token) {

   
    console.log("SENDING EMAIL WITH:", {
        user: process.env.MAIL_USER,
        passExists: !!process.env.MAIL_PASS,
        passLength: process.env.MAIL_PASS?.length
    });
    const transporter = createTransporter();
    const verifyURL = `${process.env.CLIENT_URL}/api/auth/verify/${token}`;

    try {
        await transporter.sendMail({
            from: `"ArgueArena ⚔️" <${process.env.MAIL_USER}>`,
            to: email,
            subject: '⚔️ Verify your ArgueArena account',
            html: `
            <div style="font-family:'Courier New',monospace;max-width:520px;margin:auto;
                        background:#04040e;color:#fff;padding:40px;border:1px solid #00f0ff33;
                        border-radius:4px;">

                <div style="text-align:center;margin-bottom:32px;">
                    <div style="font-size:2rem;margin-bottom:8px;">⚔️</div>
                    <h1 style="font-size:1.4rem;letter-spacing:0.25em;color:#00f0ff;margin:0;">
                        ARGUEARENA
                    </h1>
                    <p style="font-size:0.7rem;letter-spacing:0.3em;color:rgba(255,255,255,0.3);margin-top:4px;">
                        WHERE ARGUMENTS BECOME BATTLES
                    </p>
                </div>

                <p style="color:rgba(255,255,255,0.5);font-size:0.75rem;
                          letter-spacing:0.15em;text-transform:uppercase;margin-bottom:8px;">
                    INCOMING TRANSMISSION
                </p>

                <p style="font-size:1rem;line-height:1.7;color:rgba(255,255,255,0.8);margin-bottom:8px;">
                    Hey <span style="color:#00f0ff;font-weight:bold;">${username}</span>,
                </p>

                <p style="font-size:0.9rem;line-height:1.7;color:rgba(255,255,255,0.55);margin-bottom:28px;">
                    Your challenger account has been created. One last step — verify your email
                    to unlock the arena and begin your rise through the ranks.
                </p>

                <div style="text-align:center;margin-bottom:28px;">
                    <a href="${verifyURL}"
                       style="display:inline-block;padding:14px 36px;
                              background:linear-gradient(135deg,rgba(0,240,255,0.15),rgba(180,0,255,0.15));
                              border:1px solid #00f0ff55;color:#00f0ff;
                              text-decoration:none;font-family:'Courier New',monospace;
                              font-size:0.8rem;font-weight:bold;letter-spacing:0.2em;
                              text-transform:uppercase;">
                        ▶ &nbsp; VERIFY &amp; ENTER ARENA
                    </a>
                </div>

                <div style="border-top:1px solid rgba(0,240,255,0.1);padding-top:20px;
                            font-size:0.72rem;color:rgba(255,255,255,0.2);line-height:1.6;">
                    <p>Link expires in <strong style="color:rgba(255,255,255,0.4);">24 hours</strong>.</p>
                    <p>If you did not create this account, ignore this message.</p>
                </div>
            </div>
            `
        });

        console.log("EMAIL SENT SUCCESSFULLY ✔");

    } catch (error) {
        console.error("EMAIL SEND FAILED ❌", error);
        throw error;
    }
}