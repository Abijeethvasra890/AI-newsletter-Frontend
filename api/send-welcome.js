export default async function handler(req, res) {

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { email } = req.body || {};

  if (!email) {
    res.status(400).json({ error: "Email required" });
    return;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Welcome to The Vasra's AI Digest 🚀",
        html: `
        <div style="font-family: Arial, sans-serif; background:#0f172a; color:#ffffff; padding:40px 20px;">
            <div style="max-width:600px; margin:auto; background:#111827; padding:30px; border-radius:16px;">

            <h1 style="color:#60a5fa; margin-bottom:10px;">
                🤖 Agent Vasra Reporting In
            </h1>

            <h2 style="margin-top:0;">
                Welcome to The Vasra's AI Digest 🚀
            </h2>

            <p style="color:#d1d5db; line-height:1.6;">
                Congratulations. You’ve successfully entered the signal layer.
            </p>

            <p style="color:#d1d5db; line-height:1.6;">
                Every day, Agent Vasra scans the chaotic AI universe —
                product launches, funding rounds, hidden tools, dev hacks,
                and “AI will replace us all” drama —
                and filters out the nonsense.
            </p>

            <p style="color:#d1d5db; line-height:1.6;">
                What lands in your inbox?
            </p>

            <ul style="color:#d1d5db; line-height:1.8;">
                <li>⚡ Breakthrough AI tools before they go mainstream</li>
                <li>💡 Practical workflows you can actually use</li>
                <li>📈 Startup & funding moves that matter</li>
                <li>🧠 Insights that make you sound smarter at work</li>
            </ul>

            <p style="color:#d1d5db; line-height:1.6;">
                No fluff. No recycled Twitter threads.
                No “Top 10 AI tools” written by someone who tested zero.
            </p>

            <p style="color:#d1d5db; line-height:1.6;">
                Just clean, distilled intelligence.
            </p>

            <hr style="border:none; border-top:1px solid #1f2937; margin:30px 0;">

            <p style="color:#9ca3af; font-size:14px;">
                If AI is moving fast, relax.
                Agent Vasra already read it.
                You’ll get the refined version.
            </p>

            <p style="margin-top:30px;">
                Stay sharp,<br>
                <strong>Agent Vasra</strong>
            </p>

            </div>
        </div>
        `
      })
    });

    if (!response.ok) {
      const text = await response.text();
      console.error(text);
      throw new Error("Email API failed");
    }

    res.status(200).json({ success: true });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}