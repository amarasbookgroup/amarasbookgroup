import { Link } from "react-router";

export default function BookCard({ book }) {
  return (
    <Link
      to={`/shop/${book.slug}`}
      className="card group flex flex-col overflow-hidden transition-transform hover:-translate-y-1"
    >
      <div className="aspect-[4/5] w-full overflow-hidden bg-armenian-blue/10">
        <img
          src={book.cover}
          alt={`Cover of ${book.title}`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="pill">{book.ageRange}</span>
        <h3 className="font-display text-2xl font-black text-armenian-ink">
          {book.title}
        </h3>
        <p className="text-sm text-armenian-ink/70">{book.tagline}</p>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-lg font-bold text-armenian-red">{book.price}</span>
          <span className="text-sm font-semibold text-armenian-blue group-hover:underline">
            View details &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}
