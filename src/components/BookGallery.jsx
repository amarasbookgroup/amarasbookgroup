import { useEffect, useRef, useState } from "react";

export default function BookGallery({ images, title }) {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const trackRef = useRef(null);
  const programmaticScrollRef = useRef(false);
  const programmaticScrollTimerRef = useRef(null);

  const current = images[active];

  useEffect(() => {
    if (!lightboxOpen) return;
    function onKey(e) {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") setActive((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setActive((i) => (i - 1 + images.length) % images.length);
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, images.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const child = track.children[active];
    if (!child) return;
    const w = track.clientWidth;
    const targetLeft = child.offsetLeft - (w - child.clientWidth) / 2;
    if (Math.abs(track.scrollLeft - targetLeft) < 4) return;

    programmaticScrollRef.current = true;
    if (programmaticScrollTimerRef.current) {
      clearTimeout(programmaticScrollTimerRef.current);
    }
    child.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    programmaticScrollTimerRef.current = setTimeout(() => {
      programmaticScrollRef.current = false;
    }, 600);
  }, [active]);

  useEffect(() => {
    return () => {
      if (programmaticScrollTimerRef.current) {
        clearTimeout(programmaticScrollTimerRef.current);
      }
    };
  }, []);

  function onScroll() {
    if (programmaticScrollRef.current) return;
    const track = trackRef.current;
    if (!track) return;
    const w = track.clientWidth;
    const nearest = Math.round(track.scrollLeft / w);
    if (nearest !== active && nearest >= 0 && nearest < images.length) {
      setActive(nearest);
    }
  }

  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10 translate-x-5 translate-y-5 rounded-3xl bg-armenian-apricot/30" />

      <button type="button" onClick={() => setLightboxOpen(true)} className="group hidden w-full overflow-hidden rounded-3xl border border-armenian-ink/10 bg-white shadow-pop sm:block" aria-label={`Enlarge image: ${current.alt}`}>
        <img src={current.src} alt={current.alt} decoding="async" className="aspect-[4/5] w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]" />
        <span className="pointer-events-none absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-armenian-ink shadow-soft opacity-0 transition-opacity group-hover:opacity-100">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="11" y1="8" x2="11" y2="14" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
          Click to enlarge
        </span>
      </button>

      <div ref={trackRef} onScroll={onScroll} className="flex w-full snap-x snap-mandatory overflow-x-auto rounded-3xl border border-armenian-ink/10 bg-white shadow-pop sm:hidden" style={{ scrollbarWidth: "none" }}>
        {images.map((img, i) => (
          <button key={img.src} type="button" onClick={() => { setActive(i); setLightboxOpen(true); }} className="relative w-full shrink-0 snap-center" aria-label={`Image ${i + 1} of ${images.length}: ${img.alt}`}>
            <img src={img.src} alt={img.alt} loading="lazy" decoding="async" className="aspect-[4/5] w-full object-contain" />
          </button>
        ))}
      </div>

      <div className="mt-3 flex justify-center gap-2 sm:hidden" role="tablist">
        {images.map((img, i) => (
          <button key={img.src} type="button" role="tab" aria-selected={active === i} aria-label={`Show image ${i + 1}`} onClick={() => setActive(i)} className={["h-2 rounded-full transition-all", active === i ? "w-6 bg-armenian-red" : "w-2 bg-armenian-ink/30"].join(" ")} />
        ))}
      </div>

      <div className="mt-4 hidden grid-cols-4 gap-3 sm:grid">
        {images.map((img, i) => (
          <button key={img.src} type="button" onClick={() => setActive(i)} aria-label={`Show ${img.alt}`} aria-current={active === i} className={["overflow-hidden rounded-2xl border-2 bg-white transition-all", active === i ? "border-armenian-red shadow-soft" : "border-transparent opacity-70 hover:opacity-100"].join(" ")}>
            <img src={img.src} alt={img.alt} loading="lazy" decoding="async" className="aspect-video w-full object-contain" />
          </button>
        ))}
      </div>

      {lightboxOpen && (
        <Lightbox images={images} activeIndex={active} title={title} onClose={() => setLightboxOpen(false)} onPrev={() => setActive((i) => (i - 1 + images.length) % images.length)} onNext={() => setActive((i) => (i + 1) % images.length)} onSelect={(i) => setActive(i)} />
      )}
    </div>
  );
}

function Lightbox({ images, activeIndex, title, onClose, onPrev, onNext, onSelect }) {
  const current = images[activeIndex];
  return (
    <div role="dialog" aria-modal="true" aria-label={`Image viewer for ${title}`} className="fixed inset-0 z-[100] flex flex-col bg-armenian-ink/95 backdrop-blur" onClick={onClose}>
      <div className="flex items-center justify-between p-4 text-armenian-cream">
        <p className="text-sm font-semibold">
          {activeIndex + 1} / {images.length}{" "}
          <span className="ml-3 hidden text-armenian-cream/60 sm:inline">{current.alt}</span>
        </p>
        <button type="button" onClick={onClose} aria-label="Close image viewer" className="rounded-full p-2 hover:bg-white/10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="h-6 w-6">
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="6" y1="18" x2="18" y2="6" />
          </svg>
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-4 pb-4" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={onPrev} aria-label="Previous image" className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-armenian-cream backdrop-blur hover:bg-white/20">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="h-6 w-6">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <img src={current.src} alt={current.alt} className="max-h-[80vh] max-w-full rounded-2xl object-contain shadow-pop" />

        <button type="button" onClick={onNext} aria-label="Next image" className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-armenian-cream backdrop-blur hover:bg-white/20">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="h-6 w-6">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div className="flex justify-center gap-2 px-4 pb-6" onClick={(e) => e.stopPropagation()}>
        {images.map((img, i) => (
          <button key={img.src} type="button" onClick={() => onSelect(i)} aria-label={`Show ${img.alt}`} aria-current={activeIndex === i} className={["h-14 w-14 overflow-hidden rounded-lg border-2 transition-all", activeIndex === i ? "border-armenian-apricot" : "border-transparent opacity-60 hover:opacity-100"].join(" ")}>
            <img src={img.src} alt="" className="h-full w-full object-contain" />
          </button>
        ))}
      </div>
    </div>
  );
}
