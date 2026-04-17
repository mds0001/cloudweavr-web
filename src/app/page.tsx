"use client";

import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("sent");
      setName(""); setEmail(""); setMessage("");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  return (
    <main style={{ minHeight: "100vh", background: "#0a0f1e", color: "#f1f5f9" }}>

      {/* Nav */}
      <nav style={{ borderBottom: "1px solid #1f2937", padding: "0 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#00c8ff,#6366f1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
            </div>
            <span style={{ fontWeight: 700, fontSize: 16 }}>Threads <span style={{ color: "#94a3b8", fontWeight: 400 }}>by Cloud Weaver</span></span>
          </div>
          <a href="#contact" style={{ background: "linear-gradient(135deg,#00c8ff,#6366f1)", color: "#fff", padding: "8px 20px", borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Get in Touch</a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ textAlign: "center", padding: "100px 24px 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 800, height: 400, background: "radial-gradient(ellipse,rgba(99,102,241,0.15) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <div style={{ display: "inline-block", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: 20, padding: "6px 16px", fontSize: 13, color: "#a5b4fc", marginBottom: 24 }}>
            Now in early access
          </div>
          <h1 style={{ fontSize: "clamp(40px,6vw,72px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 24, letterSpacing: "-1px" }}>
            Weaves your<br />
            <span style={{ background: "linear-gradient(135deg,#00c8ff,#6366f1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>cloud data</span>
          </h1>
          <p style={{ fontSize: 20, color: "#94a3b8", maxWidth: 560, margin: "0 auto 40px", lineHeight: 1.6 }}>
            Threads connects, transforms, and delivers data between any cloud source and destination — intelligently, automatically, and at scale.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#contact" style={{ background: "linear-gradient(135deg,#00c8ff,#6366f1)", color: "#fff", padding: "14px 32px", borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: "none", boxShadow: "0 0 32px rgba(99,102,241,0.3)" }}>
              Request Early Access
            </a>
            <a href="#how-it-works" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#f1f5f9", padding: "14px 32px", borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>
              See How It Works
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: "80px 24px", background: "rgba(255,255,255,0.02)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: 36, fontWeight: 800, marginBottom: 12 }}>Everything connected</h2>
          <p style={{ textAlign: "center", color: "#94a3b8", marginBottom: 60, fontSize: 17 }}>One platform. Any source. Any destination.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
            {[
              {
                icon: "⚡",
                title: "Intelligent Transforms",
                desc: "AI-powered field mapping that understands your data and automatically classifies, cleans, and enriches it before delivery.",
              },
              {
                icon: "🔗",
                title: "Universal Connectors",
                desc: "Connect to cloud storage, SMTP, ODBC, portals, and enterprise systems out of the box — no custom integration required.",
              },
              {
                icon: "🕐",
                title: "Scheduled Automation",
                desc: "Set it and forget it. Define rules and schedules; Threads handles the rest — reliably, on time, every time.",
              },
            ].map((f) => (
              <div key={f.title} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 32 }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>{f.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{f.title}</h3>
                <p style={{ color: "#94a3b8", lineHeight: 1.6, fontSize: 15 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 12 }}>How it works</h2>
          <p style={{ color: "#94a3b8", marginBottom: 60, fontSize: 17 }}>Three steps from raw data to delivered results.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { n: "1", title: "Connect your sources", desc: "Point Threads at your data sources — cloud files, databases, APIs, or portals. No code required." },
              { n: "2", title: "Define your mappings", desc: "Use our visual mapper to describe how fields transform from source to target. AI fills in the gaps." },
              { n: "3", title: "Schedule & deliver", desc: "Set a schedule or trigger on demand. Threads processes, filters, and delivers your data automatically." },
            ].map((step, i) => (
              <div key={step.n} style={{ display: "flex", gap: 24, textAlign: "left", position: "relative", paddingBottom: i < 2 ? 48 : 0 }}>
                {i < 2 && <div style={{ position: "absolute", left: 20, top: 44, bottom: 0, width: 2, background: "rgba(99,102,241,0.2)" }} />}
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#00c8ff,#6366f1)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 16, flexShrink: 0 }}>{step.n}</div>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{step.title}</h3>
                  <p style={{ color: "#94a3b8", lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ padding: "80px 24px", background: "rgba(255,255,255,0.02)" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 12, textAlign: "center" }}>Get early access</h2>
          <p style={{ color: "#94a3b8", marginBottom: 40, textAlign: "center", fontSize: 17 }}>Tell us about your data challenge and we&apos;ll be in touch.</p>

          {status === "sent" ? (
            <div style={{ textAlign: "center", padding: "48px 24px", background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 16 }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
              <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Message received!</h3>
              <p style={{ color: "#94a3b8" }}>We&apos;ll get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {status === "error" && (
                <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10, padding: "12px 16px", color: "#fca5a5", fontSize: 14 }}>
                  {errorMsg}
                </div>
              )}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#94a3b8", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Name</label>
                  <input
                    type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Jane Smith"
                    style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "12px 14px", color: "#f1f5f9", fontSize: 15, outline: "none" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#94a3b8", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Email</label>
                  <input
                    type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="jane@company.com"
                    style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "12px 14px", color: "#f1f5f9", fontSize: 15, outline: "none" }}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#94a3b8", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Message</label>
                <textarea
                  value={message} onChange={(e) => setMessage(e.target.value)} required rows={5}
                  placeholder="Tell us about your data challenge..."
                  style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "12px 14px", color: "#f1f5f9", fontSize: 15, outline: "none", resize: "vertical", fontFamily: "inherit" }}
                />
              </div>
              <button
                type="submit" disabled={status === "sending"}
                style={{ background: status === "sending" ? "#374151" : "linear-gradient(135deg,#00c8ff,#6366f1)", color: "#fff", padding: "14px 32px", borderRadius: 10, fontSize: 15, fontWeight: 700, border: "none", cursor: status === "sending" ? "not-allowed" : "pointer", boxShadow: "0 0 24px rgba(99,102,241,0.25)" }}
              >
                {status === "sending" ? "Sending…" : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #1f2937", padding: "32px 24px", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: "linear-gradient(135deg,#00c8ff,#6366f1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
          </div>
          <span style={{ fontWeight: 700, fontSize: 14 }}>Threads by Cloud Weaver</span>
        </div>
        <p style={{ color: "#475569", fontSize: 13 }}>&copy; {new Date().getFullYear()} Cloud Weaver. All rights reserved.</p>
      </footer>

    </main>
  );
}
