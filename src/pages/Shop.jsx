import { useState } from "react";
import BookCard from "../components/BookCard.jsx";
import { books } from "../data/books.js";
import { Link } from "react-router";

function WaitlistForm({ bookName, formName }) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(new FormData(form)).toString() }).then(() => setSubmitted(true)).catch(() => setSubmitted(true));
  }

  if (submitted) return (<div className="mt-3 rounded-2xl border border-armenian-blue/30 bg-armenian-blue/10 p-4 text-center text-sm text-armenian-blue font-semibold">You're on the list! 🎉</div>);

  return (
    <form onSubmit={handleSubmit} name={formName} method="POST" data-netlify="true" className="mt-3 flex flex-col gap-2 sm:flex-row">
      <input type="hidden" name="form-name" value={formName} />
      <input type="hidden" name="book" value={bookName} />
      <input type="email" name="email" required placeholder="Your email address" className="w-full rounded-xl border border-armenian-ink/15 bg-white px-4 py-2 text-sm outline-none focus:border-armenian-blue" />
      <button type="submit" className="whitespace-nowrap rounded-xl bg-armenian-red px-4 py-2 text-sm font-bold text-white hover:bg-armenian-red/80">Notify Me</button>
    </form>
  );
}

function SubscribeBar() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(new FormData(form)).toString() }).then(() => setSubmitted(true)).catch(() => setSubmitted(true));
  }

  if (submitted) return (<div className="rounded-2xl bg-armenian-blue/10 border border-armenian-blue/30 p-6 text-center text-armenian-blue font-semibold">You're on the list! Thank you. 🎉</div>);

  return (
    <div className="rounded-3xl bg-armenian-ink text-armenian-cream p-8">
      <div className="max-w-xl mx-auto text-center">
        <p className="font-display text-2xl font-black">Stay in the loop</p>
        <p className="mt-2 text-armenian-cream/70">New books, Armenian language tips, and updates — straight to your inbox.</p>
        <form onSubmit={handleSubmit} name="subscribe" method="POST" data-netlify="true" className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <input type="hidden" name="form-name" value="subscribe" />
          <input type="email" name="email" required placeholder="Your email address" className="w-full sm:w-80 rounded-xl border border-armenian-cream/20 bg-armenian-cream/10 px-4 py-3 text-sm text-armenian-cream placeholder:text-armenian-cream/50 outline-none focus:border-armenian-apricot" />
          <button type="submit" className="whitespace-nowrap rounded-xl bg-armenian-apricot px-6 py-3 text-sm font-bold text-armenian-ink hover:bg-[#ffb724]">Subscribe</button>
        </form>
      </div>
    </div>
  );
}

export default function Shop() {
  return (
    <section className="container-page section">
      <header className="max-w-2xl">
        <span className="pill">Shop</span>
        <h1 className="mt-3 font-display text-5xl font-black text-armenian-ink">Books for little Armenian readers.</h1>
        <p className="mt-4 text-lg text-armenian-ink/80">Each book is designed to be a warm, hands-on first step into Armenian using Armenian, transliterated Armenian, and English.</p>
      </header>

      {/* Mobile: list view */}
      <div className="mt-10 flex flex-col gap-5 sm:hidden">
        {books.map((book) => (
          <div key={book.slug}>
            <Link to={`/shop/${book.slug}`} className="flex gap-4 rounded-3xl border border-armenian-ink/10 bg-white p-4 shadow-soft">
              <img src={book.cover} alt={`Cover of ${book.title}`} className="w-24 shrink-0 rounded-2xl object-contain" />
              <div className="flex flex-col justify-between">
                <div>
                  <span className="pill text-xs">{book.ageRange}</span>
                  <h3 className="mt-1 font-display text-lg font-black text-armenian-ink leading-tight">{book.title}</h3>
                  <p className="mt-1 text-xs text-armenian-ink/70 line-clamp-2">{book.tagline}</p>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-bold text-armenian-red">{book.price}</span>
                  <span className="text-xs font-semibold text-armenian-blue">View details &rarr;</span>
                </div>
              </div>
            </Link>
            {!book.amazonUrl && (
              <div className="mt-2 rounded-2xl bg-armenian-apricot/10 border border-armenian-apricot/30 p-4">
                <p className="text-sm font-bold text-armenian-ink">Join the Wait List</p>
                <p className="mt-1 text-xs text-armenian-ink/70">Be the first to know when this book is available.</p>
                <WaitlistForm bookName={book.title} formName={book.slug === "plants-and-garden" ? "waitlist-plants" : "waitlist-home"} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Desktop: grid view */}
      <div className="mt-10 hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <div key={book.slug}>
            <BookCard book={book} />
            {!book.amazonUrl && (
              <div className="mt-3 rounded-2xl bg-armenian-apricot/10 border border-armenian-apricot/30 p-4">
                <p className="text-sm font-bold text-armenian-ink">Join the Wait List</p>
                <p className="mt-1 text-xs text-armenian-ink/70">Be the first to know when this book is available.</p>
                <WaitlistForm bookName={book.title} formName={book.slug === "plants-and-garden" ? "waitlist-plants" : "waitlist-home"} />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10">
        <SubscribeBar />
      </div>

      <p className="mt-6 text-sm text-armenian-ink/60">Direct checkout is on its way. For now, the book ships from Amazon.</p>
    </section>
  );
}
