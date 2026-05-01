import { Link } from "react-router";
import LionMascot from "./LionMascot.jsx";
import { useState } from "react";

function InstagramIcon() {
  return (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>);
}

function SubscribeForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(new FormData(form)).toString() }).then(() => setSubmitted(true)).catch(() => setSubmitted(true));
  }

  if (submitted) return (<p className="text-sm text-armenian-apricot font-semibold">You're on the list! Thank you. 🎉</p>);

  return (
    <form onSubmit={handleSubmit} name="subscribe" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" className="mt-4 flex flex-col gap-2 sm:flex-row">
      <input type="hidden" name="form-name" value="subscribe" />
      <input name="bot-field" className="hidden" />
      <input type="email" name="email" required placeholder="Your email address" className="w-full rounded-xl border border-armenian-cream/20 bg-armenian-cream/10 px-4 py-2 text-sm text-armenian-cream placeholder:text-armenian-cream/50 outline-none focus:border-armenian-apricot" />
      <button type="submit" className="whitespace-nowrap rounded-xl bg-armenian-apricot px-4 py-2 text-sm font-bold text-armenian-ink hover:bg-[#ffb724]">Subscribe</button>
    </form>
  );
}

export default function Footer() {
  return (
    <footer className="mt-12 bg-armenian-ink text-armenian-cream">
      <div className="h-3 w-full" style={{ backgroundImage: "url('/images/armenian-pattern.svg')", backgroundRepeat: "repeat-x", backgroundSize: "auto 100%" }} aria-hidden="true" />
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex items-start gap-4">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-armenian-cream/10">
            <LionMascot className="h-12 w-12" title="" />
          </span>
          <div>
            <p className="font-display text-2xl font-black">Amaras Book Group</p>
            <p className="mt-1 text-sm text-armenian-cream/70">Armenian children's books to spark a lifelong love of language.</p>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-armenian-apricot">Explore</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/" className="hover:text-armenian-apricot">Home</Link></li>
            <li><Link to="/shop" className="hover:text-armenian-apricot">Shop</Link></li>
            <li><Link to="/learn-alphabet" className="hover:text-armenian-apricot">Learn the Alphabet!</Link></li>
            <li><Link to="/pronunciation" className="hover:text-armenian-apricot">Pronunciation Help</Link></li>
            <li><Link to="/contact" className="hover:text-armenian-apricot">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-armenian-apricot">Get in touch</p>
          <p className="mt-3 text-sm text-armenian-cream/80">Have questions about a book, a school order, or pronunciation? We'd love to hear from you.</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-armenian-apricot px-4 py-2 text-sm font-bold text-armenian-ink hover:bg-[#ffb724]">Contact us</Link>
            <a href="https://www.instagram.com/amarasbookgroup" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram" className="inline-flex items-center gap-2 rounded-full border border-armenian-cream/20 px-4 py-2 text-sm font-bold text-armenian-cream hover:border-armenian-apricot hover:text-armenian-apricot transition-colors"><InstagramIcon />Instagram</a>
          </div>
        </div>
      </div>

      <div className="border-t border-armenian-cream/10">
        <div className="container-page py-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-armenian-apricot mb-2">Stay in the loop</p>
          <p className="text-sm text-armenian-cream/70">New books, Armenian language tips, and updates — straight to your inbox.</p>
          <SubscribeForm />
        </div>
        <div className="container-page flex flex-col items-start gap-2 pb-5 text-xs text-armenian-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Amaras Book Group. All rights reserved.</p>
          <p>Made with care for little Armenian readers.</p>
        </div>
      </div>
    </footer>
  );
}
