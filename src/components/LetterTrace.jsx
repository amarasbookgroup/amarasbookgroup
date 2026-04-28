import { useEffect, useRef, useState } from "react";

const MAX_CANVAS_SIZE = 280;
const STROKE_WIDTH = 10;
const STROKE_COLOR = "#D90012"; // armenian-red

export default function LetterTrace({ letter, onDone }) {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const drawingRef = useRef(false);
  const lastPointRef = useRef(null);
  const [letterCase, setLetterCase] = useState("upper");
  const [size, setSize] = useState(MAX_CANVAS_SIZE);

  const glyph = letterCase === "upper" ? letter.capital : letter.lowercase;
  const caseWord = letterCase === "upper" ? "capital" : "lowercase";
  // Digraph letters like Ու / ու are 2 Unicode chars; shrink the template
  // so both forms fit inside the canvas without clipping.
  const fontSize = glyph.length > 1 ? size * 0.46 : size * 0.78;

  // Configure the canvas backing store at the wrapper's actual rendered size,
  // so the drawing area scales fluidly down on narrow cards (xl 4-col grid).
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    function configure() {
      const rect = wrapper.getBoundingClientRect();
      const next = Math.max(1, Math.round(rect.width));
      const dpr = window.devicePixelRatio || 1;
      canvas.width = next * dpr;
      canvas.height = next * dpr;
      const ctx = canvas.getContext("2d");
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = STROKE_COLOR;
      ctx.lineWidth = STROKE_WIDTH;
      setSize(next);
    }

    configure();

    const observer = new ResizeObserver(configure);
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  function getPoint(e) {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    // Drawing coords are in CSS px because we ctx.scale(dpr, dpr) above,
    // so 1 logical unit == 1 CSS pixel of the rendered canvas.
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }

  function startDraw(e) {
    e.preventDefault();
    const point = getPoint(e);
    if (!point) return;
    drawingRef.current = true;
    lastPointRef.current = point;
    canvasRef.current.setPointerCapture?.(e.pointerId);
  }

  function continueDraw(e) {
    if (!drawingRef.current) return;
    const point = getPoint(e);
    const last = lastPointRef.current;
    if (!point || !last) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(last.x, last.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    lastPointRef.current = point;
  }

  function stopDraw(e) {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    lastPointRef.current = null;
    canvasRef.current.releasePointerCapture?.(e.pointerId);
  }

  function clearCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  }

  function switchCase(next) {
    if (next === letterCase) return;
    clearCanvas();
    setLetterCase(next);
  }

  function caseTabClass(active) {
    return [
      "flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold transition-colors",
      active
        ? "bg-armenian-apricot text-armenian-ink shadow-soft"
        : "text-armenian-ink/50 hover:text-armenian-ink/80",
    ].join(" ");
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        role="tablist"
        aria-label="Letter case"
        className="inline-flex items-center gap-1 rounded-full bg-armenian-ink/5 p-1"
      >
        <button
          type="button"
          role="tab"
          aria-selected={letterCase === "upper"}
          onClick={() => switchCase("upper")}
          className={caseTabClass(letterCase === "upper")}
        >
          <span
            className={[
              "font-display leading-none",
              letterCase === "upper"
                ? "text-2xl font-black text-armenian-red"
                : "text-lg font-bold",
            ].join(" ")}
          >
            {letter.capital}
          </span>
          <span className="uppercase tracking-wide">Capital</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={letterCase === "lower"}
          onClick={() => switchCase("lower")}
          className={caseTabClass(letterCase === "lower")}
        >
          <span
            className={[
              "font-display leading-none",
              letterCase === "lower"
                ? "text-2xl font-black text-armenian-blue"
                : "text-lg font-bold",
            ].join(" ")}
          >
            {letter.lowercase}
          </span>
          <span className="uppercase tracking-wide">Lowercase</span>
        </button>
      </div>

      <div
        ref={wrapperRef}
        className="relative aspect-square w-full max-w-[280px] rounded-2xl bg-armenian-cream"
      >
        {/* Faded letter template (follows active case) */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center font-display font-black text-armenian-ink/15"
          style={{ fontSize, lineHeight: 1 }}
          aria-hidden="true"
        >
          {glyph}
        </div>

        {/* Drawing layer */}
        <canvas
          ref={canvasRef}
          onPointerDown={startDraw}
          onPointerMove={continueDraw}
          onPointerUp={stopDraw}
          onPointerCancel={stopDraw}
          style={{ touchAction: "none" }}
          className="absolute inset-0 h-full w-full cursor-crosshair rounded-2xl"
          aria-label={`Trace the ${caseWord} form of ${letter.name}`}
        />
      </div>

      <div className="flex w-full gap-2">
        <button
          type="button"
          onClick={clearCanvas}
          className="btn flex-1 justify-center bg-armenian-ink/10 text-armenian-ink hover:bg-armenian-ink/20 text-sm"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={onDone}
          className="btn flex-1 justify-center bg-armenian-blue text-white hover:bg-[#002785] text-sm"
        >
          Done
        </button>
      </div>
    </div>
  );
}
