import { Link } from "react-router";
import LionMascot from "../components/LionMascot.jsx";

export default function NotFound() {
  return (
    <section className="container-page section text-center">
      <div className="mx-auto max-w-md">
        <LionMascot className="mx-auto h-40 w-40" />
        <p className="mt-4 font-display text-7xl font-black text-armenian-red">
          404
        </p>
        <h1 className="mt-2 font-display text-3xl font-black text-armenian-ink">
          Looks like our lion wandered off.
        </h1>
        <p className="mt-3 text-armenian-ink/70">
          The page you're looking for doesn't exist or has moved.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/" className="btn-primary">
            Back to home
          </Link>
          <Link to="/shop" className="btn-outline">
            Visit the shop
          </Link>
        </div>
      </div>
    </section>
  );
}
