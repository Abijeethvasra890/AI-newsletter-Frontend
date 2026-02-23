export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "Agent Vasra <onboarding@yourdomain.com>",
        to: email,
        subject: "🤖 Agent Vasra has initiated your AI briefing",
        html: `
          <h2>Welcome to The Vasra's AI Digest 🚀</h2>
          <p>You are now inside the signal layer.</p>
          <p>No fluff. No recycled threads. Just powerful AI insights.</p>
          <br/>
          <p><strong>Stay sharp.</strong></p>
          <p>— Agent Vasra</p>
        `
      })
    });

    if (!response.ok) {
      throw new Error("Email API failed");
    }

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Email failed" });
  }
}