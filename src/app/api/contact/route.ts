import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json() as {
      name?: string; email?: string; message?: string;
    };

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Email not configured." }, { status: 500 });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Threads by Cloud Weaver <onboarding@resend.dev>",
        to: ["mdstout@outlook.com"],
        subject: `New contact form message from ${name}`,
        html: `
          <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px;background:#f8fafc;border-radius:12px;border:1px solid #e2e8f0">
            <div style="font-size:20px;font-weight:700;color:#6366f1;margin-bottom:16px">Threads by Cloud Weaver</div>
            <h2 style="font-size:16px;margin:0 0 20px">New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin-top:16px"><strong>Message:</strong></p>
            <p style="background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:12px;margin-top:8px">${message.replace(/\n/g, "<br>")}</p>
          </div>`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Resend error: ${body}`);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
