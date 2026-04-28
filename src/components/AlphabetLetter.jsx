import { useState } from "react";
import LetterTrace from "./LetterTrace.jsx";
import MasteryStar from "./MasteryStar.jsx";

export default function AlphabetLetter({
  letter,
  index,
  isMastered,
  onToggleMastered,
}) {
  const [mode, setMode] = useState("answers"); // 'answers' | 'quiz' | 'trace'
  const hasAudio = Boolean(letter.audio);

  function play(e) {
    e.stopPropagation();
    if (!hasAudio) return;
    const audio = new Audio(letter.audio);
    audio.play().catch(() => {});
  }

  function startTrace(e) {
    e.stopPropagation();
    setMode("trace");
  }

  function flipToQuiz() {
    setMode("quiz");
  }

  function flipToAnswers() {
    setMode("answers");
  }

  // Tracing replaces the card body entirely.
  if (mode === "trace") {
    return (
      <article className="card flex flex-col gap-3 p-5">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-armenian-ink/40">
            #{index + 1}
          </span>
          <span className="text-xs font-black uppercase tracking-widest text-armenian-apricot">
            Trace it
          </span>
          <span className="pill">{letter.name}</span>
        </div>
        <LetterTrace letter={letter} onDone={() => setMode("answers")} />
      </article>
    );
  }

  return (
    <article className="card p-0 overflow-hidden">
      <div className="flip-container" style={{ minHeight: 420 }}>
        <div className={["flip-card h-full", mode === "quiz" ? "is-flipped" : ""].join(" ")}>
          {/* Front: answers */}
          <div className="flip-face flex h-full flex-col gap-3 p-5">
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-armenian-ink/40">
                #{index + 1}
              </span>
              <div className="flex items-center gap-2">
                <span className="pill">{letter.romanization}</span>
                <MasteryStar
                  active={isMastered}
                  onToggle={onToggleMastered}
                  label={letter.name}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={flipToQuiz}
              aria-label={`Quiz me on ${letter.name}`}
              className="group -mx-5 -my-1 flex items-end gap-3 rounded-2xl px-5 py-2 text-left transition-transform hover:scale-[1.02]"
            >
              <span className="font-display text-6xl font-black leading-none text-armenian-red">
                {letter.capital}
              </span>
              <span className="font-display text-4xl font-bold leading-none text-armenian-blue">
                {letter.lowercase}
              </span>
              <span
                className="ml-auto self-start text-armenian-ink/30 transition-colors group-hover:text-armenian-ink/60"
                title="Tap letter to quiz yourself"
                aria-hidden="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <polyline points="23 4 23 10 17 10" />
                  <polyline points="1 20 1 14 7 14" />
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                </svg>
              </span>
            </button>

            <p className="text-sm font-semibold text-armenian-ink/80">
              {letter.name}
            </p>

            <div className="rounded-2xl bg-armenian-cream p-3">
              <p className="text-xs font-bold uppercase tracking-wide text-armenian-ink/50">
                Example
              </p>
              <p className="mt-1 font-display text-xl font-bold text-armenian-ink">
                {letter.example.armenian}
              </p>
              <p className="text-xs italic text-armenian-ink/70">
                {letter.example.translit} &middot; {letter.example.english}
              </p>
            </div>

            <div className="mt-auto flex gap-2 pt-1 lg:flex-col">
              <button
                type="button"
                onClick={startTrace}
                className="btn flex-1 justify-center bg-armenian-apricot/30 text-armenian-ink hover:bg-armenian-apricot/50 text-sm"
                title="Trace this letter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M12 19l7-7 3 3-7 7-3-3z" />
                  <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                  <path d="M2 2l7.586 7.586" />
                  <circle cx="11" cy="11" r="2" />
                </svg>
                Trace it
              </button>
              <button
                type="button"
                onClick={play}
                disabled={!hasAudio}
                title={hasAudio ? "Listen" : "Audio coming soon"}
                className={[
                  "btn flex-1 justify-center text-sm",
                  hasAudio
                    ? "bg-armenian-blue text-white hover:bg-[#002785]"
                    : "cursor-not-allowed bg-armenian-ink/10 text-armenian-ink/50",
                ].join(" ")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M3 10v4a1 1 0 0 0 1 1h3l4 4a1 1 0 0 0 1.7-.7V5.7A1 1 0 0 0 11 5L7 9H4a1 1 0 0 0-1 1Zm14.5 2a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4Zm-2.5-7v2a7 7 0 0 1 0 10v2a9 9 0 0 0 0-14Z" />
                </svg>
                {hasAudio ? "Listen" : "Audio soon"}
              </button>
            </div>
          </div>

          {/* Back: quiz me (just the letter) */}
          <button
            type="button"
            onClick={flipToAnswers}
            aria-label={`Show answer for letter ${letter.name}`}
            className="flip-face flip-back flex h-full w-full flex-col items-center justify-center gap-3 p-5 bg-armenian-blue text-armenian-cream rounded-3xl"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-armenian-cream/60">
              What sound?
            </span>
            <div className="flex items-end gap-3">
              <span className="font-display text-8xl font-black leading-none text-armenian-cream">
                {letter.capital}
              </span>
              <span className="font-display text-5xl font-bold leading-none text-armenian-apricot">
                {letter.lowercase}
              </span>
            </div>
            <span className="mt-3 text-sm font-semibold text-armenian-cream/70">
              Tap card to flip back
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}
