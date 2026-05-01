import { useState } from "react";

function InstagramIcon() {
  return (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>);
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(new FormData(form)).toString() }).then(() => setSubmitted(true)).catch(() => alert("Something went wrong. Please try again."));
  }

  return (
    <section className="container-page section">
      <div className="grid gap-10 lg:grid-cols-[1.2fr,1fr]">
        <div>
          <span className="pill">Contact</span>
          <h1 className="mt-3 font-display text-5xl font-black text-armenian-ink">Say parev.</h1>
          <p className="mt-4 max-w-xl text-lg text-armenian-ink/80">We're a team of one with a great big dream: keeping <strong>Western Armenian</strong> alive and well for the next generation. If you have a question, a kind comment, a constructive suggestion, or want to offer affordable or free help — please don't be shy.</p>
          <p className="mt-3 max-w-xl text-armenian-ink/70">For sales inquiries, to be added to a book wait list, or anything else, send a note below or email us directly.</p>
          {submitted ? (
            <div className="mt-6 rounded-2xl border border-armenian-blue/30 bg-armenian-blue/10 p-4 text-armenian-blue">Thanks! Your message is on its way. We'll be in touch soon.</div>
          ) : (
            <form onSubmit={handleSubmit} name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" className="mt-8 grid gap-4">
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden"><labe
