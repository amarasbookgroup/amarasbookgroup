import { Link } from "react-router";
import LionMascot from "../components/LionMascot.jsx";
import BookCard from "../components/BookCard.jsx";
import { books } from "../data/books.js";
import { alphabet } from "../data/alphabet.js";

const TEASER_INDICES = [0, 14, 19];

export default function Home() {
  const featured = books[0];
  const teaser = TEASER_INDICES.map((i) => alphabet[i]);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="container-page section grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="mb-6">
              <p className="font-display text-2xl font-black text-armenian-red leading-tight sm:text-3xl">
                Teach Your Child Armenian.
                <br />No Fluency Required.
              </p>
              <div className="mt-2 h-px bg-armenian-red" />
            </div>
            <h1 className="mt-4 font-display text-5xl font-black leading-[1.05] text-armenian-ink sm:text-6xl">
              Armenian stories for{" "}
              <span className="text-armenian-red">little hearts.</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-armenian-ink/80">
              At Amaras Book Group, we publish bright, joyful books that help kids fall in love with the Armenian language, one word at a time.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/shop" className="btn-primary">Shop the Books</Link>
              <Link to="/pronunciation" className="btn-outline">Help with Pronunciation</Link>
            </div>
            <div className="mt-8 flex items-center gap-3 text-sm text-armenian-ink/70">
              <span className="inline-flex h-2 w-2 rounded-full bg-armenian-red" />
              <span className="inline-flex h-2 w-2 rounded-full bg-armenian-blue" />
              <span className="inline-flex h-2 w-2 rounded-full bg-armenian-apricot" />
              <span>Inspired by the colors of the Armenian flag</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 -z-10 translate-x-6 translate-y-6 rounded-[2.5rem] bg-armenian-blue/10" />
            <div className="rounded-[2.5rem] border border-armenian-ink/10 bg-white p-8 shadow-pop">
              <LionMascot className="mx-auto h-72 w-72 sm:h-80 sm:w-80" />
              <p className="mt-4 text-center font-display text-xl font-bold text-armenian-ink">Meet our friendly lion.</p>
              <p className="mt-1 text-center text-sm text-armenian-ink/70">Brave, curious, and always ready to share a story.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-armenian-blue text-armenian-cream">
        <div className="container-page section grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-4xl font-black sm:text-5xl">The lion is at the heart of every page.</h2>
            <p className="mt-5 max-w-2xl text-lg text-armenian-cream/80">
              In Armenian storytelling the lion stands for courage, family, and joy — a perfect companion for early readers. Throughout our books he hops, roars, and reads alongside your child, turning each letter into a tiny adventure.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {[
              { title: "Brave", body: "Encourages curiosity and confident reading." },
              { title: "Warm", body: "Soft, friendly art that kids want to hug." },
              { title: "Proudly Hye", body: "Celebrates Armenian heritage on every page." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl bg-armenian-cream/10 p-5 backdrop-blur">
                <p className="font-display text-xl font-bold text-armenian-apricot">{item.title}</p>
                <p className="mt-1 text-sm text-armenian-cream/80">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page section">
        <div>
          <span className="pill">Featured</span>
          <h2 className="mt-3 font-display text-4xl font-black text-armenian-ink sm:text-5xl">Our Flagship Book.</h2>
          <p className="mt-2 text-lg text-armenian-ink/60">The book that started it all...</p>
        </div>

        {/* Mobile layout - stacked */}
        <div className="mt-10 flex flex-col gap-6 lg:hidden">
          <div className="mx-auto w-full max-w-xs">
            <BookCard book={featured} />
          </div>
          <div>
            <h3 className="font-display text-3xl font-black text-armenian-ink">{featured.title}</h3>
            <p className="mt-3 text-lg text-armenian-ink/80">{featured.description}</p>
            <ul className="mt-5 space-y-2 text-armenian-ink/80">
              {featured.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <span className="mt-2 inline-block h-2 w-2 shrink-0 rounded-full bg-armenian-red" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={featured.amazonUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">Buy on Amazon</a>
              <Link to="/shop" className="btn-outline">See All Books &rarr;</Link>
            </div>
          </div>
        </div>

        {/* Desktop layout - side by side */}
        <div className="mt-10 hidden items-start gap-10 lg:grid lg:grid-cols-[300px,1fr]">
          <div>
            <BookCard book={featured} />
          </div>
          <div>
            <h3 className="font-display text-3xl font-black text-armenian-ink">{featured.title}</h3>
            <p className="mt-3 text-lg text-armenian-ink/80">{featured.description}</p>
            <ul className="mt-5 space-y-2 text-armenian-ink/80">
              {featured.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <span className="mt-2 inline-block h-2 w-2 shrink-0 rounded-full bg-armenian-red" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={featured.amazonUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">Buy on Amazon</a>
              <Link to="/shop" className="btn-outline">See All Books &rarr;</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-armenian-apricot/15">
        <div className="container-page section">
          <div className="flex items-end justify-between gap-4">
            <div>
              <span className="pill">Learn the Alphabet</span>
              <h2 className="mt-3 font-display text-4xl font-black text-armenian-ink sm:text-5xl">Learn three letters in three seconds.</h2>
            </div>
            <Link to="/learn-alphabet" className="hidden text-sm font-bold text-armenian-blue hover:underline sm:inline">Explore the alphabet &rarr;</Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {teaser.map((l) => (
              <div key={l.name} className="card flex items-center gap-5 p-5">
                <div className="flex flex-col items-center">
                  <span className="font-display text-5xl font-black text-armenian-red">{l.capital}</span>
                  <span className="font-display text-2xl font-bold text-armenian-blue">{l.lowercase}</span>
                </div>
                <div>
                  <p className="font-display text-lg font-bold">{l.name}</p>
                  <p className="text-sm text-armenian-ink/70">Sounds like <strong>{l.romanization}</strong></p>
                  <p className="mt-1 text-xs italic text-armenian-ink/60">{l.example.armenian} &middot; {l.example.english}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 sm:hidden">
            <Link to="/learn-alphabet" className="btn-secondary">Learn the Alphabet</Link>
          </div>
        </div>
      </section>

      <section className="container-page section">
        <div className="overflow-hidden rounded-3xl bg-armenian-red text-armenian-cream">
          <div className="grid gap-6 p-10 sm:grid-cols-[1fr,auto] sm:items-center sm:p-14">
            <div>
              <h2 className="font-display text-3xl font-black sm:text-4xl">Questions about the book or a school order?</h2>
              <p className="mt-3 max-w-xl text-armenian-cream/85">We'd love to chat. Send us a note and we'll get back to you within a few days.</p>
            </div>
            <Link to="/contact" className="btn justify-self-start bg-armenian-cream text-armenian-ink hover:bg-white sm:justify-self-end">Contact us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
