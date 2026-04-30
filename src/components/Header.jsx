import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router";

const NAV = [
  { to: "/", label: "Home", end: true },
  { to: "/shop", label: "Shop" },
  { to: "/pronunciation", label: "Pronunciation Help" },
  { to: "/contact", label: "Contact" },
];

function navClass({ isActive }) {
  return [
    "rounded-full px-4 py-2 font-semibold transition-colors",
    isActive
      ? "bg-armenian-ink text-armenian-cream"
      : "text-armenian-ink hover:bg-armenian-ink/10",
  ].join(" ");
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-armenian-ink/10 bg-armenian-cream/90 backdrop-blur">
      <div className="container-page flex items-center justify-between py-4">
        <Link
          to="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <img
            src="/images/amaras_logo_png.png"
            alt="Amaras Book Group logo"
            className="h-36 w-36 object-contain"
          />
          <span className="flex flex-col leading-tight">
            <span className="font-display text-lg font-black text-armenian-ink">
              Amaras Book Group
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-armenian-red">
              Armenian stories
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={navClass}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          className="md:hidden rounded-full p-2 text-armenian-ink hover:bg-armenian-ink/10"
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            {open ? (
              <>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="6" y1="18" x2="18" y2="6" />
              </>
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-armenian-ink/10 bg-armenian-cream md:hidden">
          <nav className="container-page flex flex-col py-3">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  [
                    "rounded-xl px-3 py-3 font-semibold",
                    isActive
                      ? "bg-armenian-ink text-armenian-cream"
                      : "text-armenian-ink hover:bg-armenian-ink/10",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}

      <span className="sr-only" data-current-path={location.pathname} />
    </header>
  );
}
