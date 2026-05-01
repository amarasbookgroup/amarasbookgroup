import { Link, useParams } from "react-router";
import BookGallery from "../components/BookGallery.jsx";
import { findBook } from "../data/books.js";
import { useState } from "react";

function WaitlistForm({ bookName, formName }) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(new FormData(form)).toString() }).then(() => setSubmitted(true)).catch(() => setSubmitted(true));
  }

  if (submitted) return (<div className="mt-3 rounded-2xl border border-armenian-blue/30 bg-armenian-blue/10 p-4 text-sm text-armenian-blue font-semibold">You're on the list! We'll notify you when it's available. 🎉</div>);

  return (
    <div className="mt-6 rounded-2xl bg-armenian-apricot/10 border border-armenian-apricot/30 p-5">
      <p className="font-display text-xl font-bold text-armenian-ink">Join the Wait List</p>
      <p className="mt-1 text-sm text-armenian-ink/70">Be the first to know when this book is available.</p>
      <form onSubmit={handleSubmit} name={formName} method="POST" data-netlify="true" className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input type="hidden" name="form-name" value={formName} />
        <input type="hidden" name="book" value={bookName} />
        <input type="email" name="email" required placeholder="Your email address" className="w-full rounded-xl border border-armenian-ink/15 bg-white px-4 py-2 text-sm outline-none focus:border-armenian-blue" />
        <button type="submit" className="whitespace-nowrap rounded-xl bg-armenian-red px-4 py-2 text-sm font-bold text-white hover:bg-armenian-red/80">Notify Me</button>
      </form>
    </div>
  );
}

export default function BookDetail() {
  const { slug } = useParams();
  const book = findBook(slug);

  if (!book) {
    return (
      <section className="container-page section text-center">
        <h1 className="font-display text-4xl font-black">Book not found</h1>
        <p className="mt-3 text-armenian-ink/70">We couldn't find a book at that URL.</p>
        <Link to="/shop" className="btn-primary mt-6">Back to shop</Link>
      </section>
    );
  }

  const titleItalic = book.title.replace("My Hye Book Series:", "").trim();
  const formName = slug === "plants-and-garden" ? "waitlist-plants" : "waitlist-home";

  return (
    <section className="container-page section">
      <nav className="mb-8 text-sm text-armenian-ink/60">
        <Link to="/shop" className="hover:underline">Shop</Link>{" "}
        / <span className="text-armenian-ink">{book.title}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <BookGallery images={book.images ?? [{ src: book.cover, alt: `Cover of ${book.title}` }]} title={book.title} />
        </div>

        <div>
          <span className="pill">{book.ageRange}</span>
          <h1 className="mt-3 font-display text-5xl font-black text-armenian-ink">{book.title}</h1>
          <p className="mt-3 text-lg text-armenian-ink/80">{book.tagline}</p>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-3xl font-black text-armenian-red">{book.price}</span>
            <span className="text-sm text-armenian-ink/60">USD</span>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {book.amazonUrl && (<a href={book.amazonUrl} target="_blank" rel="noopener noreferrer" className="btn-primary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true"><path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42L17.59 5H14V3ZM5 5h6v2H7v10h10v-4h2v6H5V5Z" /></svg>Buy on Amazon</a>)}
            {book.amazonUrl && (<Link to="/pronunciation" className="btn-outline">Pronunciation Help</Link>)}
          </div>
          {book.amazonUrl && (<p className="mt-3 text-sm text-armenian-ink/60">Direct checkout coming soon.</p>)}

          {!book.amazonUrl && <WaitlistForm bookName={book.title} formName={formName} />}

          <div className="mt-10">
            <h2 className="font-display text-2xl font-black">About this book</h2>
            <p className="mt-3 text-armenian-ink/80"><em>My Hye Book Series: {titleItalic}</em>{book.description.substring(book.description.indexOf(" is "))}</p>
          </div>

          <div className="mt-8">
            <h3 className="font-display text-xl font-bold">What's inside</h3>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {book.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 rounded-2xl bg-white p-3 shadow-soft ring-1 ring-armenian-ink/5">
                  <span className="mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full bg-armenian-red" />
                  <span className="text-sm">{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-3 text-sm">
            {book.details.map((d) => (
              <div key={d.label} className="rounded-2xl bg-armenian-cream p-3">
                <dt className="text-xs font-bold uppercase tracking-wide text-armenian-ink/50">{d.label}</dt>
                <dd className="mt-1 font-semibold">{d.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
