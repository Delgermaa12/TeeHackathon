import { useState, useRef, useEffect, useCallback } from "react";

// ── Design Tokens (Premium Dark Mode) ────────────────────
const THEME = {
  PRIMARY: "#6366f1", // Indigo
  SECONDARY: "#0ea5e9", // Sky Blue
  ACCENT: "#22d3ee", // Cyan
  BG_DARK: "#020617",
  SURFACE: "rgba(15, 23, 42, 0.8)",
  BORDER: "rgba(255, 255, 255, 0.08)",
  TEXT_MAIN: "#f8fafc",
  TEXT_MUTE: "#94a3b8",
  USER_GRADIENT: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
} as const;

// ── Types ─────────────────────────────────────────────────
type MsgType = "bot" | "user";
interface Message { id: number; html: string; type: MsgType; }
interface KBChild { id: string; label: string; keywords: string[]; answer: string; }
interface KBNode  { id: string; keywords: string[]; answer: string; children?: KBChild[]; }

// ── Knowledge Base (Simplified for clarity) ───────────────
const KB: KBNode[] = [
  { id:"programs", keywords:["хөтөлбөр","сургалт","анги","юу заадаг"],
    answer:"✨ <strong>Манай сургалтын хөтөлбөрүүд</strong><br/>Та өөрийн сонирхож буй чиглэлийг сонгоно уу:",
    children:[
      { id:"scratch", label:"🎯 Scratch Pixels (8-11 нас)", keywords:[], answer:"<strong>Scratch Pixels</strong><br/>Бага насны хүүхдэд зориулсан логик сэтгэлгээний анхан шатны хөтөлбөр." },
      { id:"z2h", label:"🐍 Zero 2 Hero (12-16 нас)", keywords:[], answer:"<strong>Zero 2 Hero</strong><br/>Python хэл дээр суурилсан программчлалын суурь сургалт." },
    ]},
  { id:"price", keywords:["үнэ","төлбөр","хэд"], answer:"💎 <strong>Төлбөрийн нөхцөл</strong><br/><br/>Бид эхний хичээлийг үнэ төлбөргүй санал болгодог. Дэлгэрэнгүйг: +976 90806161" },
  { id:"location", keywords:["хаана","байршил"], answer:"📍 <strong>Байршил</strong><br/><br/>Манай төв салбар СУИС-ийн хажууд Gem Castle-ийн 15 давхарт байрлаж байна." },
];

const QUICK_ACTIONS = [
  { id: "programs", label: "Хөтөлбөр", icon: "🚀" },
  { id: "price", label: "Төлбөр", icon: "💎" },
  { id: "location", label: "Байршил", icon: "📍" },
];

// ── Main Component ────────────────────────────────────────
export default function TeePremiumChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, html: "Сайн байна уу. Танд юугаар туслах вэ? ✨", type: "bot" },
  ]);
  const [typing, setTyping] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  const addMsg = useCallback((html: string, type: MsgType) => {
    setMessages(prev => [...prev, { id: Date.now(), html, type }]);
  }, []);

  const handleAction = (id: string, label: string) => {
    const node = KB.find(n => n.id === id);
    if (!node) return;
    addMsg(label, "user");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      addMsg(node.answer, "bot");
    }, 800);
  };

  const sendMsg = () => {
    if (!inputVal.trim()) return;
    const val = inputVal;
    setInputVal("");
    addMsg(val, "user");
    setTyping(true);
    setTimeout(() => {
        setTyping(false);
        addMsg("Одоогоор систем шинэчлэгдэж байна. Та +976 90806161 дугаараас мэдээлэл аваарай.", "bot");
    }, 1000);
  };

  return (
    <>
      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes pulseGlow { 0% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); } 70% { box-shadow: 0 0 0 15px rgba(99, 102, 241, 0); } 100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); } }
        
        .premium-scroll::-webkit-scrollbar { width: 4px; }
        .premium-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        
        .glass-panel {
          backdrop-filter: blur(20px) saturate(180%);
          background: ${THEME.SURFACE};
          border: 1px solid ${THEME.BORDER};
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        .bot-bubble {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 4px 16px 16px 16px;
        }

        .user-bubble {
          background: ${THEME.USER_GRADIENT};
          border-radius: 16px 16px 4px 16px;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
        }

        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
      `}</style>

      {/* ── Floating Action Button ── */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 z-[999]"
        style={{
          background: THEME.USER_GRADIENT,
          animation: open ? "" : "pulseGlow 2s infinite",
          boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.5)",
          cursor: "pointer",
          border: "none"
        }}
      >
        <span className={`text-2xl transition-transform duration-500 ${open ? 'rotate-180' : ''}`}>
          {open ? "✕" : "💬"}
        </span>
      </button>

      {/* ── Main Chat Panel ── */}
      {open && (
        <div className="fixed bottom-28 right-8 w-[420px] h-[600px] flex flex-col rounded-[24px] overflow-hidden glass-panel z-[998]"
             style={{ animation: "fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}>
          
          {/* Header */}
          <div className="p-6 border-b flex items-center gap-4" style={{ borderColor: THEME.BORDER }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" 
                 style={{ background: THEME.USER_GRADIENT }}>
              <span className="text-xl">✨</span>
            </div>
            <div>
              <h3 className="font-semibold text-white tracking-tight">TEE Intelligence</h3>
              <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                System Online
              </p>
            </div>
          </div>

          {/* Messages Area */}
          <div ref={bodyRef} className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 premium-scroll">
            {messages.map(msg => (
              <div key={msg.id} 
                   className={`max-w-[80%] p-4 text-[14px] leading-relaxed transition-all ${msg.type === "user" ? "self-end user-bubble text-white" : "self-start bot-bubble text-slate-200"}`}
                   dangerouslySetInnerHTML={{ __html: msg.html }} />
            ))}
            
            {typing && (
              <div className="self-start bot-bubble p-4 flex gap-1 items-center">
                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="px-6 pb-2 flex gap-2 overflow-x-auto premium-scroll">
            {QUICK_ACTIONS.map(action => (
              <button
                key={action.id}
                onClick={() => handleAction(action.id, action.label)}
                className="flex-shrink-0 px-4 py-2 rounded-full text-[12px] font-medium transition-all hover:bg-white/10"
                style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${THEME.BORDER}`, color: THEME.TEXT_MUTE, cursor: "pointer" }}
              >
                {action.icon} {action.label}
              </button>
            ))}
          </div>

          {/* Footer Input */}
          <div className="p-6">
            <div className="relative flex items-center">
              <input
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMsg()}
                placeholder="Асуултаа энд бичнэ үү..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[14px] text-white outline-none focus:border-indigo-500/50 transition-all placeholder:text-slate-600"
              />
              <button 
                onClick={sendMsg}
                className="absolute right-2 p-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-400 transition-all"
                style={{ border: "none", cursor: "pointer" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </div>
            <p className="text-center text-[10px] text-slate-600 mt-4 tracking-widest uppercase">
              Powered by TEE Intelligence Engine
            </p>
          </div>
        </div>
      )}
    </>
  );
}