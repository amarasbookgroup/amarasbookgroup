import { Link } from "react-router";
import LionMascot from "./LionMascot.jsx";

export default function Footer() {
  return (
    <footer className="mt-12 bg-armenian-ink text-armenian-cream">
      <div
        className="h-3 w-full"
        style={{
          backgroundImage: "url('/images/armenian-pattern.svg')",
          backgroundRepeat: "repeat-x",
          backgroundSize: "auto 100%",
        }}
        aria-hidden="true"
      />
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex items-start gap-4">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-armenian-cream/10">
            <LionMascot className="h-12 w-12" title="" />
          </span>
          <div>
            <p className="font-display text-2xl font-black">Amaras Book Group</p>
            <p className="mt-1 text-sm text-armenian-cream/70">
              Armenian children's books to spark a lifelong love of language.
            </p>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-armenian-apricot">
            Explore
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/" className="hover:text-armenian-apricot">Home</Link></li>
            <li><Link to="/shop" className="hover:text-armenian-apricot">Shop</Link></li>
            <li><Link to="/pronunciation" className="hover:text-armenian-apricot">Pronunciation Help</Link></li>
            <li><Link to="/contact" className="hover:text-armenian-apricot">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-armenian-apricot">
            Get in touch
          </p>
          <p className="mt-3 text-sm text-armenian-cream/80">
            Have questions about a book, a school order, or pronunciation? We'd
            love to hear from you.
          </p>
          <Link
            to="/contact"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-armenian-apricot px-4 py-2 text-sm font-bold text-armenian-ink hover:bg-[#ffb724]"
          >
            Contact us
          </Link>
        </div>
      </div>
      <div className="border-t border-armenian-cream/10">
        <div className="container-page flex flex-col items-start gap-2 py-5 text-xs text-armenian-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Amaras Book Group. All rights reserved.</p>
          <p>Made with care for little Armenian readers.</p>
        </div>
      </div>
    </footer>
  );
}
