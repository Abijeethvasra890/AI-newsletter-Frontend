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
        from: "onboarding@resend.dev", // TEMP test email
        to: email,
        subject: "Welcome to The Vasra's AI Digest 🚀",
        html: "<h2>Agent Vasra welcomes you.</h2>"
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