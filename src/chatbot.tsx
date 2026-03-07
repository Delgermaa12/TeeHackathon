import { useState, useRef, useEffect, useCallback } from "react";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const SYSTEM_PROMPT = `Та TEE (The Essential Engineering Education) сургуулийн AI туслах юм.
TEE бол Монголын хүүхдүүдэд (8-18 нас) технологийн боловсрол олгодог тэргүүлэх цахим сургууль.

Мэдэгдэх мэдээлэл:
- Хөтөлбөрүүд:
  • Scratch Pixels (8-11 нас) — анимаци, тоглоом, логик сэтгэлгээ
  • Zero 2 Hero Python (12-16 нас) — Python, Pygame, тоглоом хөгжүүлэлт
  • Electrikid Arduino (9-13 нас) — робот, электроник, Arduino
  • Web Design 101 (12-16 нас) — HTML, CSS, JavaScript
  • Python Pro (14-18 нас) — Data Science, алгоритм, их сургуулийн бэлтгэл
- Эхний хичээл ҮНЭГҮЙ
- JS, HTML, CSS онлайнаар үнэгүй
- 7 хоногт 2 удаа, 1.5-2 цаг тус бүр
- 5 салбар: Gem Castle, Натур плаза, Яармаг, Gem Mall, Тусгал
- Утас: +976 90806161
- И-мэйл: info@tee.education
- Цаг: 10:00–17:30, Да–Ба
- Facebook: facebook.com/tee.education.mn
- Instagram: instagram.com/tee.education.mn

Зөвхөн TEE-тэй холбоотой асуултад хариулна уу.
Монгол хэлээр хариулна уу.
Богино, тодорхой, найрсаг байдлаар өгнө үү. Emoji ашиглаж болно.
Хэрэв TEE-тэй холбоогүй асуулт байвал:
"Би зөвхөн TEE-ийн мэдээллээр туслах боломжтой 😊" гэж хариулна уу.`;

interface Msg {
  id: number;
  role: "user" | "model";
  text: string;
  loading?: boolean;
}

async function callGemini(
  history: { role: "user" | "model"; parts: { text: string }[] }[],
  userText: string
): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error(".env файл дотор VITE_GEMINI_API_KEY тохируулаагүй байна.");
  }
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: [...history, { role: "user", parts: [{ text: userText }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 800 },
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || "Gemini API error");
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "Уучлаарай, хариулт авч чадсангүй.";
}

const CHIPS = [
  { label: "🚀 Хөтөлбөрүүд", q: "Ямар хөтөлбөрүүд байдаг вэ?" },
  { label: "💎 Төлбөр",       q: "Сургалтын төлбөр хэд вэ?" },
  { label: "📍 Байршил",      q: "Салбарууд хаана байдаг вэ?" },
  { label: "📝 Бүртгэл",      q: "Яаж бүртгүүлэх вэ?" },
  { label: "👶 Нас",           q: "Хэдэн настай хүүхдэд тохирох вэ?" },
];

const TIPS = [
  "Танд юугаар туслах вэ?",
  "Хөтөлбөр сонирхож байна уу?",
  "TEEE гийн талаар асууж болно шүү!",
];

function SpinRing() {
  return (
    <div style={{
      position: "absolute", inset: -3, borderRadius: "50%",
      background: "conic-gradient(from 0deg,var(--brand-primary),var(--brand-secondary),var(--brand-accent),var(--brand-primary))",
      animation: "teeSpin 5s linear infinite", opacity: 0.75, pointerEvents: "none",
    }} />
  );
}

function TypingDots() {
  return (
    <div style={{
      display: "flex", gap: 5, alignItems: "center",
      padding: "12px 16px", borderRadius: "6px 16px 16px 16px",
      background: "rgba(255,255,255,.72)", border: "1px solid rgba(34,197,94,.15)",
      alignSelf: "flex-start", width: "fit-content", backdropFilter: "blur(10px)",
    }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          width: 6, height: 6, borderRadius: "50%",
          background: "var(--brand-primary)", display: "block",
          animation: `teeDot 1.2s ease infinite ${i * 0.2}s`,
        }} />
      ))}
    </div>
  );
}

function Bubble({ msg }: { msg: Msg }) {
  const isUser = msg.role === "user";
  if (msg.loading) return <TypingDots />;
  return (
    <div style={{
      maxWidth: "86%", alignSelf: isUser ? "flex-end" : "flex-start",
      padding: "12px 16px", fontSize: 13.5, lineHeight: 1.72,
      borderRadius: isUser ? "16px 16px 4px 16px" : "4px 16px 16px 16px",
      animation: "teeMsg .3s cubic-bezier(.34,1.2,.64,1)", whiteSpace: "pre-wrap",
      ...(isUser
        ? { background: "linear-gradient(135deg,var(--brand-primary),var(--brand-secondary))", color: "#fff", boxShadow: "0 8px 24px rgba(34,197,94,.22)" }
        : { background: "rgba(255,255,255,.74)", border: "1px solid rgba(34,197,94,.12)", color: "var(--brand-dark)", backdropFilter: "blur(10px)" }
      ),
    }}>
      {msg.text}
    </div>
  );
}

export default function TeeChatbot() {
  const [open, setOpen]       = useState(false);
  // mounted: panel DOM-д байгаа эсэх, visible: CSS transition-ийн төлөв
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  const [msgs, setMsgs]       = useState<Msg[]>([
    { id: 0, role: "model", text: "Сайн байна уу ✦\nTEE сургуулийн туслах байна. Танд юугаар туслах вэ?" },
  ]);
  const [input, setInput]     = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr]         = useState("");
  const [tipIdx, setTipIdx]   = useState(0);
  const [tipOn, setTipOn]     = useState(false);
  const [tipFade, setTipFade] = useState(false);

  const bodyRef  = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const idRef    = useRef(1);

  // ── Panel open/close with transition ───────────────────
  const openPanel = () => {
    setMounted(true);
    // Нэг frame хүлээнэ — DOM mount болсны дараа visible болгоно
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
    setOpen(true);
  };

  const closePanel = () => {
    setVisible(false); // transition эхлэнэ
    // transition дуусаад (400ms) DOM-с устгана
    setTimeout(() => {
      setMounted(false);
      setOpen(false);
    }, 100);
  };

  const toggle = () => (open ? closePanel() : openPanel());

  // ── Scroll to bottom ────────────────────────────────────
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [msgs]);

  // ── Focus input ─────────────────────────────────────────
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 420);
  }, [open]);

  // ── Tooltip cycle ────────────────────────────────────────
  useEffect(() => {
    if (open) { setTipOn(false); return; }
    const show = () => {
      setTipIdx(i => (i + 1) % TIPS.length);
      setTipFade(false); setTipOn(true);
      setTimeout(() => setTipFade(true), 2400);
      setTimeout(() => setTipOn(false), 2950);
    };
    const t = setTimeout(show, 2000);
    const iv = setInterval(show, 5300);
    return () => { clearTimeout(t); clearInterval(iv); };
  }, [open]);

  // ── Gemini ───────────────────────────────────────────────
  const buildHistory = () =>
    msgs.filter(m => !m.loading && m.id !== 0).map(m => ({ role: m.role, parts: [{ text: m.text }] }));

  const send = useCallback(async (text: string) => {
    if (!text.trim() || loading) return;
    setInput(""); setErr("");
    const userMsg: Msg = { id: idRef.current++, role: "user",  text };
    const loadMsg: Msg = { id: idRef.current++, role: "model", text: "", loading: true };
    setMsgs(p => [...p, userMsg, loadMsg]);
    setLoading(true);
    try {
      const reply = await callGemini(buildHistory(), text);
      setMsgs(p => p.map(m => m.loading ? { ...m, text: reply, loading: false } : m));
    } catch (e: any) {
      setMsgs(p => p.filter(m => !m.loading));
      setErr(e.message || "Холболтын алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  }, [loading, msgs]);

  return (
    <>
      <style>{`
        @keyframes teeSpin  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes teeDot   { 0%,60%,100%{transform:translateY(0);opacity:.4} 30%{transform:translateY(-5px);opacity:1} }
        @keyframes teeGlow  { 0%,100%{box-shadow:0 10px 30px rgba(34,197,94,.28)} 50%{box-shadow:0 10px 42px rgba(249,115,22,.28)} }
        @keyframes teeMsg   { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
        @keyframes opacityIn  { from{opacity:0;transform:translateY(8px)}  to{opacity:1;transform:translateY(0)} }
        @keyframes opacityOut { from{opacity:1;transform:translateY(0)}    to{opacity:0;transform:translateY(-4px)} }

        /* ── Panel transition ── */
        .tee-panel {
          transform-origin: bottom right;
          transition:
            opacity     0.38s cubic-bezier(0.16, 1, 0.3, 1),
            transform   0.38s cubic-bezier(0.16, 1, 0.3, 1),
            filter      0.38s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .tee-panel-hidden {
          opacity: 0;
          transform: translateY(24px) scale(0.90);
          filter: blur(8px);
          pointer-events: none;
        }
        .tee-panel-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0px);
          pointer-events: auto;
        }

        /* ── FAB icon spin ── */
        .tee-fab-icon {
          display: block;
          transition: transform 0.42s cubic-bezier(0.34, 1.3, 0.64, 1);
        }
        .tee-fab-icon.open { transform: rotate(135deg) scale(1.1); }

        /* ── FAB pulse ring ── */
        @keyframes fabPulse {
          0%   { transform: scale(1);   opacity: 0.55; }
          70%  { transform: scale(1.55); opacity: 0; }
          100% { transform: scale(1.55); opacity: 0; }
        }
        .tee-fab-pulse {
          position: absolute; inset: 0; border-radius: 50%;
          background: linear-gradient(135deg, var(--brand-primary), var(--brand-secondary));
          animation: fabPulse 2.2s ease-out infinite;
          pointer-events: none;
        }

        .tee-scroll::-webkit-scrollbar { width: 4px; height: 4px; }
        .tee-scroll::-webkit-scrollbar-thumb { background: rgba(34,197,94,.18); border-radius: 10px; }

        .tee-input:focus {
          border-color: var(--brand-primary) !important;
          outline: none;
          background: rgba(255,255,255,.96) !important;
          box-shadow: 0 0 0 3px rgba(34,197,94,.12);
        }
        .tee-chip:hover {
          background: rgba(34,197,94,.08) !important;
          border-color: rgba(34,197,94,.24) !important;
          color: var(--brand-dark) !important;
          transform: translateY(-1px);
        }
        .tee-send:hover:not(:disabled) {
          transform: scale(1.08);
          box-shadow: 0 8px 22px rgba(34,197,94,.32) !important;
        }
      `}</style>

      {/* ── Tooltip ── */}
      {tipOn && !open && (
        <div style={{
          position: "fixed", bottom: 110, right: 96, zIndex: 9997,
          padding: "10px 18px", borderRadius: 100,
          background: "rgba(255,255,255,.95)", border: "1px solid rgba(34,197,94,.14)",
          color: "var(--brand-dark)", fontSize: 13,
          boxShadow: "0 8px 28px rgba(16,16,16,.12)",
          pointerEvents: "none", backdropFilter: "blur(10px)",
          animation: tipFade ? "opacityOut .5s forwards" : "opacityIn .3s forwards",
        }}>
          {TIPS[tipIdx]}
        </div>
      )}

      {/* ── FAB ── */}
      <div style={{ position: "fixed", bottom: 32, right: 32, zIndex: 9999 }}>
        <div style={{ position: "relative" }}>
          {/* Pulse ring — зөвхөн хаалттай үед */}
          {!open && <div className="tee-fab-pulse" />}
          <button
            onClick={toggle}
            style={{
              position: "relative", zIndex: 1,
              width: 62, height: 62, borderRadius: "50%", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
              background: open
                ? "var(--brand-dark)"
                : "linear-gradient(135deg,var(--brand-primary),var(--brand-secondary))",
              boxShadow: "0 12px 30px rgba(34,197,94,.26)", color: "#fff",
              animation: open ? "none" : "teeGlow 3s ease infinite",
              transition: "background .35s ease, box-shadow .35s ease",
            }}
          >
            <span className={`tee-fab-icon${open ? " open" : ""}`}>
              {open ? "✕" : "✦"}
            </span>
          </button>
        </div>
      </div>

      {/* ── Chat Panel (mounted = DOM байна, visible = CSS transition) ── */}
      {mounted && (
        <div
          className={`tee-panel ${visible ? "tee-panel-visible" : "tee-panel-hidden"}`}
          style={{
            position: "fixed", bottom: 110, right: 32, zIndex: 9998,
            width: 400, height: 550, borderRadius: 24, overflow: "hidden",
            display: "flex", flexDirection: "column",
            background: "linear-gradient(180deg, rgba(252,252,253,.96), rgba(248,250,252,.92))",
            border: "1px solid rgba(34,197,94,.10)",
            boxShadow: "0 20px 50px rgba(16,16,16,.14)",
            backdropFilter: "blur(18px)",
            fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
          }}
        >
          {/* Header */}
          <div style={{
            padding: "18px 20px", display: "flex", alignItems: "center", gap: 12,
            borderBottom: "1px solid rgba(34,197,94,.08)",
            background: "linear-gradient(135deg, rgba(34,197,94,.08), rgba(249,115,22,.06), rgba(234,179,8,.06))",
          }}>
            <div style={{ position: "relative", width: 42, height: 42 }}>
              <SpinRing />
              <div style={{
                width: "100%", height: "100%", borderRadius: "50%", background: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                overflow: "hidden", boxShadow: "0 4px 12px rgba(16,16,16,.08)",
              }}>
                <img src="src/types/teee.jpg" style={{ width: "80%" }} alt="TEE"
                  onError={e => (e.currentTarget.style.display = "none")} />
              </div>
            </div>
            <div>
              <div style={{ color: "var(--brand-dark)", fontWeight: 700, fontSize: 16 }}>TEE Assistant</div>
              <div style={{ color: "var(--brand-primary)", fontSize: 10, textTransform: "uppercase", letterSpacing: 1.2, fontWeight: 700 }}>Online · Gemini AI</div>
            </div>
            {/* Close button дотор */}
            <button
              onClick={closePanel}
              style={{
                marginLeft: "auto", width: 30, height: 30, borderRadius: 8,
                border: "1px solid rgba(34,197,94,.15)", background: "rgba(255,255,255,.7)",
                color: "var(--brand-dark)", cursor: "pointer", fontSize: 14,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all .2s",
              }}
            >✕</button>
          </div>

          {/* Messages */}
          <div
            ref={bodyRef}
            className="tee-scroll"
            style={{
              flex: 1, overflowY: "auto", padding: "20px",
              display: "flex", flexDirection: "column", gap: 12,
              background: "radial-gradient(circle at top left, rgba(34,197,94,.05), transparent 30%), radial-gradient(circle at bottom right, rgba(249,115,22,.05), transparent 28%)",
            }}
          >
            {msgs.map(m => <Bubble key={m.id} msg={m} />)}
            {err && (
              <div style={{ color: "#dc2626", fontSize: 12, textAlign: "center", padding: 10 }}>
                {err}
              </div>
            )}
          </div>

          {/* Quick chips */}
          <div className="tee-scroll" style={{
            display: "flex", gap: 8, overflowX: "auto", padding: "0 20px 12px",
            background: "rgba(255,255,255,.35)",
          }}>
            {CHIPS.map(c => (
              <button
                key={c.label}
                className="tee-chip"
                onClick={() => send(c.q)}
                disabled={loading}
                style={{
                  flexShrink: 0, padding: "7px 12px", borderRadius: 999,
                  border: "1px solid rgba(34,197,94,.12)", background: "rgba(255,255,255,.78)",
                  color: "#4b5563", fontSize: 12, fontWeight: 500,
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: ".2s ease", opacity: loading ? .5 : 1,
                }}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Footer / Input */}
          <div style={{
            padding: "16px 20px 20px", borderTop: "1px solid rgba(34,197,94,.08)",
            background: "rgba(255,255,255,.55)",
          }}>
            <div style={{ position: "relative" }}>
              <input
                ref={inputRef}
                className="tee-input"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && send(input)}
                placeholder="Асуултаа бичнэ үү..."
                disabled={loading}
                style={{
                  width: "100%", padding: "13px 46px 13px 15px", borderRadius: 14,
                  background: "rgba(255,255,255,.9)", border: "1px solid rgba(34,197,94,.12)",
                  color: "var(--brand-dark)", fontSize: 14, transition: ".2s ease",
                  opacity: loading ? .7 : 1,
                }}
              />
              <button
                className="tee-send"
                onClick={() => send(input)}
                disabled={!input.trim() || loading}
                style={{
                  position: "absolute", right: 8, top: 7, width: 34, height: 34, borderRadius: 10,
                  background: "linear-gradient(135deg,var(--brand-primary),var(--brand-secondary))",
                  border: "none", color: "#fff", cursor: "pointer",
                  opacity: input.trim() && !loading ? 1 : 0.45,
                  boxShadow: "0 6px 16px rgba(34,197,94,.18)",
                  transition: "all .22s ease",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                {loading
                  ? <span style={{ width: 14, height: 14, borderRadius: "50%", border: "2px solid rgba(255,255,255,.4)", borderTopColor: "#fff", animation: "teeSpin .7s linear infinite", display: "block" }} />
                  : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                }
              </button>
            </div>
            <div style={{ textAlign: "center", fontSize: 9, color: "rgba(16,16,16,.3)", marginTop: 10, letterSpacing: 1 }}>
              POWERED BY TEE AI
            </div>
          </div>
        </div>
      )}
    </>
  );
}