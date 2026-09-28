import { useState } from "react";

// ⚠️ วางค่า LOGO_B64 เดิมจากโค้ดของคุณทับบรรทัดนี้ (const LOGO_B64 = "data:image/png;base64,...";)
const LOGO_B64 = "";

const YEAR = 2026;
const MONTH = 8; // 0-indexed = September

const PLATFORMS = [
  { id: "shopee", label: "Shopee", color: "#EE4D2D", bg: "#FFF0EE",
    Logo: () => (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="#EE4D2D">
        <path d="M12 2C9.24 2 7 4.24 7 7H5.5C4.67 7 4 7.67 4 8.5L3 19.5C3 20.33 3.67 21 4.5 21H19.5C20.33 21 21 20.33 21 19.5L20 8.5C20 7.67 19.33 7 18.5 7H17C17 4.24 14.76 2 12 2ZM12 4C13.66 4 15 5.34 15 7H9C9 5.34 10.34 4 12 4ZM12 14C10.34 14 9 12.66 9 11H11C11 11.55 11.45 12 12 12C12.55 12 13 11.55 13 11H15C15 12.66 13.66 14 12 14Z"/>
      </svg>
    ) },
  { id: "tiktok", label: "TikTok", color: "#111", bg: "#F4F4F4",
    Logo: () => (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="#111">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.73a8.16 8.16 0 004.77 1.52V6.79a4.85 4.85 0 01-1-.1z"/>
      </svg>
    ) },
];

// แท็กโปรโมชั่น (ใช้ร่วมกับ Shopee / TikTok ในการเปิด popup)
const PROMO_TAG = { id: "promo", label: "โปรโมชั่น", color: "#92400E", bg: "#FEF3C7" };
const tagInfo = (id) => (id === "promo" ? PROMO_TAG : PLATFORMS.find(p => p.id === id));

const TIME_SLOTS = [
  { id: "t1", label: "19:00–21:00" },
  { id: "t2", label: "20:00–22:00" },
  { id: "t3", label: "21:00–23:00" },
  { id: "t4", label: "22:00–00:00" },
  { id: "t5", label: "23:00–01:00" },
];

const DAY_NAMES = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];
const MONTH_NAMES = ["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."];

// ---------- ข้อมูลเดือนกันยายน (ครบเหมือนเดิม) ----------
const s = (platform, time) => ({ platform, time });
const d = (sessions, note = "", promo = "") => ({ sessions, note, promo });
const CF = "คอมเม้นต์ คอนเฟิร์มออเดอร์ในไลฟ์";
const P8 = "599 ฟรีกระเป๋า 4 ใบ (สีละ 2) / 99 ฟรีแก้วเชรคเกอร์";
const BID = "ประมูลสินค้าในไลฟ์";

const STATIC_DATA = {
  3: d([]),
  7: d([s("shopee", "t2")]),
  8: d([s("shopee", "t2"), s("shopee", "t4")], CF, P8),
  9: d([s("shopee", "t2")], CF, P8),
  10: d([s("shopee", "t2")]),
  11: d([s("tiktok", "t3")], CF, "\"ฟรีแก้วเชรคเกอร์ 199.-"),
  12: d([s("tiktok", "t3")], CF, "ฟรีแก้วเชรคเกอร์ 299.-"),
  13: d([s("tiktok", "t3")], CF, "ฟรีแก้วเชรคเกอร์ 299.-"),
  14: d([s("shopee", "t2")], CF, CF),
  15: d([s("tiktok", "t2")], "บางสินค้า\n", BID),
  18: d([s("tiktok", "t3")]),
  19: d([s("tiktok", "t2")]),
  20: d([s("tiktok", "t3")]),
  21: d([s("shopee", "t2")]),
  22: d([s("tiktok", "t2")], "บางสินค้า\n", BID),
  23: d([s("shopee", "t2")]),
  24: d([s("shopee", "t1")]),
  25: d([s("shopee", "t2")]),
  26: d([s("tiktok", "t2"), s("tiktok", "t4")]),
  27: d([s("shopee", "t1"), s("tiktok", "t4")]),
  28: d([s("shopee", "t2")]),
  29: d([s("tiktok", "t1"), s("shopee", "t4")]),
  30: d([s("shopee", "t2")]),
};

const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
const getFirstDayOfWeek = (y, m) => new Date(y, m, 1).getDay();

const NAVY = "#0B2447";
const GOLD = "#C9B06A";

function Logo({ size }) {
  if (!LOGO_B64) return null;
  return <img src={LOGO_B64} alt="logo" style={{ height: size, width: size, objectFit: "contain", filter: "brightness(0) invert(1)", flexShrink: 0 }} />;
}

// ---------- Chip ที่คลิกได้ (Shopee / TikTok / โปรโมชั่น) ----------
function TagChip({ kind, label, onTag, size = 9, block, full }) {
  const t = tagInfo(kind);
  const plt = PLATFORMS.find(p => p.id === kind);
  return (
    <button
      onClick={e => { e.stopPropagation(); onTag(kind); }}
      style={{
        display: block ? "flex" : "inline-flex", alignItems: "center", gap: 4,
        width: full ? "100%" : "auto", boxSizing: "border-box",
        background: t.bg, color: t.color, border: "none", borderRadius: 5,
        padding: size > 10 ? "4px 10px" : "2px 5px", marginBottom: 2,
        fontSize: size, fontWeight: 700, cursor: "pointer", textAlign: "left",
        fontFamily: "inherit", maxWidth: "100%",
      }}>
      {plt ? <plt.Logo /> : <span>🎁</span>}
      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{label}</span>
    </button>
  );
}

// ---------- Modal header ใช้ร่วมกัน ----------
function ModalHeader({ eyebrow, title, sub, onClose }) {
  return (
    <div style={{ background: NAVY, padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Logo size={36} />
        <div>
          <div style={{ fontSize: 9, color: GOLD, fontWeight: 700, letterSpacing: 2, opacity: 0.85 }}>{eyebrow}</div>
          <div style={{ fontSize: 19, fontWeight: 800, color: "#fff", marginTop: 1 }}>{title}{sub}</div>
        </div>
      </div>
      <button onClick={onClose} style={{ background: "rgba(255,255,255,0.12)", border: "none", borderRadius: 8, width: 32, height: 32, cursor: "pointer", color: "#fff", fontSize: 16 }}>✕</button>
    </div>
  );
}

const overlay = { position: "fixed", inset: 0, zIndex: 100, background: "rgba(11,36,71,0.55)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 };
const card = (w) => ({ background: "#fff", borderRadius: 16, width: "100%", maxWidth: w, boxShadow: "0 24px 64px rgba(11,36,71,0.22)", overflow: "hidden" });

function daySub(date) {
  const dt = new Date(YEAR, MONTH, date);
  const wk = dt.getDay() === 0 || dt.getDay() === 6;
  return (
    <>
      <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.5)", marginLeft: 8 }}>{DAY_NAMES[dt.getDay()]}</span>
      {wk && <span style={{ marginLeft: 6, fontSize: 11, color: GOLD, fontWeight: 700 }}>วันหยุด</span>}
    </>
  );
}

// ---------- Popup: รายการตาม Shopee / TikTok / โปรโมชั่น เรียงตามวันที่ ----------
function ListModal({ kind, dayData, onClose, onPick }) {
  const t = tagInfo(kind);
  const rows = Object.entries(dayData)
    .map(([k, v]) => [Number(k), v])
    .filter(([, v]) => kind === "promo" ? !!v.promo : (v.sessions || []).some(x => x.platform === kind))
    .sort((a, b) => a[0] - b[0]);

  return (
    <div style={overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={card(400)}>
        <ModalHeader eyebrow={`ก.ย. 2569 · ${rows.length} วัน`} title={t.label} sub={null} onClose={onClose} />
        <div style={{ maxHeight: "68vh", overflowY: "auto" }}>
          {rows.length === 0 && <div style={{ textAlign: "center", color: "#bbb", fontSize: 13, padding: 28 }}>ยังไม่มีข้อมูล</div>}
          {rows.map(([date, v]) => {
            const dt = new Date(YEAR, MONTH, date);
            const wk = dt.getDay() === 0 || dt.getDay() === 6;
            const mine = (v.sessions || []).filter(x => x.platform === kind);
            return (
              <div key={date} onClick={() => onPick(date)}
                style={{ display: "flex", gap: 12, padding: "12px 16px", borderBottom: "1px solid #F3F3F3", cursor: "pointer" }}>
                <div style={{ width: 36, textAlign: "center", flexShrink: 0 }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: wk ? "#EF4444" : NAVY, lineHeight: 1 }}>{date}</div>
                  <div style={{ fontSize: 10, color: "#999", marginTop: 1 }}>{DAY_NAMES[dt.getDay()]}</div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  {kind !== "promo" && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: v.promo || v.note ? 6 : 0 }}>
                      {mine.map((x, i) => (
                        <span key={i} style={{ fontSize: 12, fontWeight: 700, color: t.color, background: t.bg, borderRadius: 6, padding: "3px 9px" }}>
                          {TIME_SLOTS.find(s => s.id === x.time)?.label}
                        </span>
                      ))}
                    </div>
                  )}
                  {v.promo && <div style={{ fontSize: 12.5, color: "#78350F", background: kind === "promo" ? "#FEF3C7" : "transparent", borderRadius: 6, padding: kind === "promo" ? "5px 9px" : 0, marginBottom: 3, fontWeight: 600 }}>🎁 {v.promo}</div>}
                  {kind === "promo" && (v.sessions || []).length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 4 }}>
                      {v.sessions.map((x, i) => {
                        const p = PLATFORMS.find(pp => pp.id === x.platform);
                        return <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 700, color: p.color, background: p.bg, borderRadius: 6, padding: "2px 8px" }}><p.Logo /> {TIME_SLOTS.find(s => s.id === x.time)?.label}</span>;
                      })}
                    </div>
                  )}
                  {v.note && <div style={{ fontSize: 12, color: "#666", marginTop: 3 }}>📝 {v.note}</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ---------- Modal แก้ไข (admin) ----------
function DayModal({ date, data, onClose, onSave, saving }) {
  const [sessions, setSessions] = useState(data.sessions || []);
  const [note, setNote] = useState(data.note || "");
  const [promo, setPromo] = useState(data.promo || "");
  const upd = (i, k, v) => setSessions(sessions.map((x, idx) => idx === i ? { ...x, [k]: v } : x));
  const lbl = { fontSize: 11, fontWeight: 700, color: "#666", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 };

  return (
    <div style={overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={card(420)}>
        <ModalHeader eyebrow="ก.ย. 2569 · Gaam 🐻" title={`${date} ${MONTH_NAMES[MONTH]}`} sub={daySub(date)} onClose={onClose} />
        <div style={{ padding: "16px 20px 20px", maxHeight: "70vh", overflowY: "auto" }}>
          <div style={{ marginBottom: 16 }}>
            <div style={lbl}>ไลฟ์</div>
            {sessions.map((x, i) => {
              const plt = PLATFORMS.find(p => p.id === x.platform);
              return (
                <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                  <select value={x.platform} onChange={e => upd(i, "platform", e.target.value)}
                    style={{ flex: 1, border: "1px solid #E8E8E5", borderRadius: 8, padding: "8px 10px", fontSize: 13, color: plt?.color, fontWeight: 700, background: plt?.bg }}>
                    {PLATFORMS.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
                  </select>
                  <select value={x.time} onChange={e => upd(i, "time", e.target.value)}
                    style={{ flex: 1, border: "1px solid #E8E8E5", borderRadius: 8, padding: "8px 10px", fontSize: 13, background: "#FAFAFA" }}>
                    {TIME_SLOTS.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                  </select>
                  <button onClick={() => setSessions(sessions.filter((_, idx) => idx !== i))}
                    style={{ background: "#FEF2F2", border: "none", borderRadius: 8, width: 34, height: 34, cursor: "pointer", color: "#EF4444", fontSize: 16, flexShrink: 0 }}>×</button>
                </div>
              );
            })}
            <button onClick={() => setSessions([...sessions, { platform: "shopee", time: "t1" }])}
              style={{ width: "100%", background: "#F7F7F5", border: "1.5px dashed #D0CEC9", borderRadius: 8, padding: 9, fontSize: 13, color: "#888", cursor: "pointer", fontWeight: 600 }}>+ เพิ่มไลฟ์</button>
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={lbl}>โปรโมชั่น</div>
            <input value={promo} onChange={e => setPromo(e.target.value)} placeholder="เช่น ซื้อครบ 500 รับฟรี..."
              style={{ width: "100%", border: "1px solid #E8E8E5", borderRadius: 8, padding: "9px 12px", fontSize: 13, background: "#FFFBEB", outline: "none", boxSizing: "border-box" }} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={lbl}>หมายเหตุ</div>
            <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="หมายเหตุเพิ่มเติม..." rows={2}
              style={{ width: "100%", border: "1px solid #E8E8E5", borderRadius: 8, padding: "9px 12px", fontSize: 13, background: "#FAFAFA", outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit" }} />
          </div>
          <button onClick={() => onSave({ sessions, note, promo })}
            style={{ width: "100%", background: NAVY, color: "#fff", border: "none", borderRadius: 10, padding: 12, fontSize: 14, fontWeight: 800, cursor: "pointer" }}>
            {saving ? "⏳ กำลังบันทึก..." : "🐻 บันทึก"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------- Modal ดูรายละเอียดวัน (view only) ----------
function ViewModal({ date, data, onClose, onTag }) {
  const empty = (!data.sessions || data.sessions.length === 0) && !data.promo && !data.note;
  return (
    <div style={overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={card(380)}>
        <ModalHeader eyebrow="ก.ย. 2569 · Gaam 🐻" title={`${date} ${MONTH_NAMES[MONTH]}`} sub={daySub(date)} onClose={onClose} />
        <div style={{ padding: "16px 20px 20px" }}>
          {empty ? (
            <div style={{ textAlign: "center", color: "#bbb", fontSize: 13, padding: "20px 0" }}>ยังไม่มีข้อมูลไลฟ์วันนี้</div>
          ) : (
            <>
              {data.sessions?.length > 0 && (
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#888", letterSpacing: 1, marginBottom: 8 }}>ไลฟ์</div>
                  {data.sessions.map((x, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <TagChip kind={x.platform} label={PLATFORMS.find(p => p.id === x.platform).label} onTag={onTag} size={13} />
                      <span style={{ fontSize: 13, color: "#333", fontWeight: 600 }}>{TIME_SLOTS.find(t => t.id === x.time)?.label}</span>
                    </div>
                  ))}
                </div>
              )}
              {data.promo && (
                <div style={{ marginBottom: 10, background: "#FEF3C7", borderRadius: 8, padding: "10px 12px" }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#92400E", letterSpacing: 1, marginBottom: 4 }}>🎁 โปรโมชั่น</div>
                  <div style={{ fontSize: 13, color: "#78350F", fontWeight: 600 }}>{data.promo}</div>
                </div>
              )}
              {data.note && (
                <div style={{ background: "#F5F5F5", borderRadius: 8, padding: "10px 12px" }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#666", letterSpacing: 1, marginBottom: 4 }}>📝 หมายเหตุ</div>
                  <div style={{ fontSize: 13, color: "#444", whiteSpace: "pre-line" }}>{data.note}</div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------- Week view (เต็มจอมือถือ) ----------
function WeekView({ week, idx, total, setIdx, dayData, onDay, onTag }) {
  const dates = week.filter(Boolean);
  const first = dates[0], last = dates[dates.length - 1];
  const navBtn = (dis) => ({
    background: dis ? "#F0F0EE" : NAVY, color: dis ? "#bbb" : "#fff", border: "none",
    borderRadius: 10, width: 40, height: 40, fontSize: 20, cursor: dis ? "default" : "pointer", fontWeight: 800,
  });
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <button disabled={idx === 0} onClick={() => setIdx(idx - 1)} style={navBtn(idx === 0)}>‹</button>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: NAVY }}>{first}–{last} {MONTH_NAMES[MONTH]} 2569</div>
          <div style={{ fontSize: 11, color: "#999" }}>สัปดาห์ที่ {idx + 1} / {total}</div>
        </div>
        <button disabled={idx === total - 1} onClick={() => setIdx(idx + 1)} style={navBtn(idx === total - 1)}>›</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {dates.map(date => {
          const dt = new Date(YEAR, MONTH, date);
          const wk = dt.getDay() === 0 || dt.getDay() === 6;
          const now = new Date();
          const isToday = now.getFullYear() === YEAR && now.getMonth() === MONTH && now.getDate() === date;
          const v = dayData[date] || {};
          const has = v.sessions?.length > 0 || v.promo || v.note;
          return (
            <div key={date} onClick={() => onDay(date)} style={{
              display: "flex", gap: 12, padding: "12px 14px", borderRadius: 14, cursor: "pointer",
              background: isToday ? "#FFFBEB" : wk ? "#FFF8F8" : "#fff",
              border: isToday ? `2px solid ${GOLD}` : wk ? "1px solid #FDDCB5" : "1px solid #EBEBEB",
              boxShadow: "0 2px 10px rgba(11,36,71,0.05)",
            }}>
              <div style={{ width: 44, textAlign: "center", flexShrink: 0 }}>
                <div style={{ fontSize: 24, fontWeight: 800, lineHeight: 1, color: isToday ? GOLD : wk ? "#EF4444" : NAVY }}>{date}</div>
                <div style={{ fontSize: 11, color: "#999", marginTop: 3 }}>{DAY_NAMES[dt.getDay()]}</div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                {!has && <div style={{ fontSize: 12, color: "#ccc", paddingTop: 6 }}>ไม่มีไลฟ์</div>}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {(v.sessions || []).map((x, i) => (
                    <TagChip key={i} kind={x.platform} size={12} onTag={onTag}
                      label={`${PLATFORMS.find(p => p.id === x.platform).label} · ${TIME_SLOTS.find(t => t.id === x.time)?.label}`} />
                  ))}
                </div>
                {v.promo && <div style={{ marginTop: 4 }}><TagChip kind="promo" size={12} block full onTag={onTag} label={v.promo} /></div>}
                {v.note && <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>📝 {v.note.trim()}</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------- ช่องวันใน Month grid ----------
function DayCell({ date, data, onClick, onTag }) {
  const dt = new Date(YEAR, MONTH, date);
  const wk = dt.getDay() === 0 || dt.getDay() === 6;
  const now = new Date();
  const isToday = now.getFullYear() === YEAR && now.getMonth() === MONTH && now.getDate() === date;
  return (
    <div onClick={onClick} style={{
      minHeight: 90, borderRadius: 12, padding: "6px 7px", cursor: "pointer", overflow: "hidden",
      background: isToday ? "#FFFBEB" : wk ? "#FFF8F8" : "#fff",
      border: isToday ? `2px solid ${GOLD}` : wk ? "1px solid #FDDCB5" : "1px solid #EBEBEB",
    }}>
      <div style={{ fontSize: 13, fontWeight: 800, color: isToday ? GOLD : wk ? "#EF4444" : "#111", marginBottom: 4 }}>{date}</div>
      {(data.sessions || []).map((x, i) => (
        <TagChip key={i} kind={x.platform} block onTag={onTag} label={TIME_SLOTS.find(t => t.id === x.time)?.label.split("–")[0]} />
      ))}
      {data.promo && <TagChip kind="promo" block onTag={onTag} label={data.promo} />}
      {data.note && (
        <div style={{ marginTop: 2, fontSize: 9, color: "#555", background: "#F5F5F5", borderRadius: 4, padding: "2px 5px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          📝 {data.note.trim()}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const daysInMonth = getDaysInMonth(YEAR, MONTH);
  const firstDay = getFirstDayOfWeek(YEAR, MONTH);
  const STORAGE_KEY = "gaam-calendar-sep2026";

  // ?admin=true → โหมดแก้ไข | URL ปกติ → ดูอย่างเดียว
  const isAdmin = typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("admin") === "true";

  const [dayData, setDayData] = useState(() => {
    // ผู้ชมทั่วไปใช้ STATIC_DATA เสมอ / เฉพาะ admin เท่านั้นที่อ่านค่าที่เคยแก้ไว้ใน localStorage
    if (!isAdmin) return STATIC_DATA;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...STATIC_DATA, ...JSON.parse(saved) } : STATIC_DATA;
    } catch { return STATIC_DATA; }
  });
  const [viewDay, setViewDay] = useState(null);
  const [editDay, setEditDay] = useState(null);
  const [listKind, setListKind] = useState(null); // "shopee" | "tiktok" | "promo"
  const [saving, setSaving] = useState(false);
  const [exported, setExported] = useState(false);

  // grid + weeks
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let x = 1; x <= daysInMonth; x++) cells.push(x);
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  const [weekIdx, setWeekIdx] = useState(() => {
    const n = new Date();
    if (n.getFullYear() !== YEAR || n.getMonth() !== MONTH) return 0;
    const i = weeks.findIndex(w => w.includes(n.getDate()));
    return i < 0 ? 0 : i;
  });

  const openDay = (date) => (isAdmin ? setEditDay(date) : setViewDay(date));

  function saveDay(date, data) {
    setSaving(true);
    const next = { ...dayData, [date]: data };
    setDayData(next);
    setEditDay(null);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
    setTimeout(() => setSaving(false), 600);
  }

  function exportJSON() {
    const blob = new Blob([JSON.stringify(dayData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "gaam-sep2026.json"; a.click();
    URL.revokeObjectURL(url);
    setExported(true);
    setTimeout(() => setExported(false), 2000);
  }

  // Stats
  const all = Object.values(dayData);
  const allSessions = all.flatMap(x => x.sessions || []);
  const stats = [
    { kind: null, label: "Sessions", val: allSessions.length, color: GOLD },
    { kind: "shopee", label: "Shopee", val: allSessions.filter(x => x.platform === "shopee").length, color: "#FF7B6B" },
    { kind: "tiktok", label: "TikTok", val: allSessions.filter(x => x.platform === "tiktok").length, color: "#eee" },
    { kind: "promo", label: "โปรฯ", val: all.filter(x => x.promo).length, color: "#FCD34D" },
  ];

  return (
    <div style={{ fontFamily: "'Sarabun','Noto Sans Thai',sans-serif", background: "linear-gradient(180deg,#EEF2FF 0%,#F5F4F0 120px)", minHeight: "100vh" }}>
      {/* Top bar */}
      <div style={{ background: NAVY, position: "sticky", top: 0, zIndex: 50, boxShadow: "0 4px 20px rgba(11,36,71,0.22)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 16px", display: "flex", justifyContent: "space-between", alignItems: "center", minHeight: 62, gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
            <Logo size={44} />
            <div>
              <div style={{ fontSize: 9, color: GOLD, fontWeight: 700, letterSpacing: 2, opacity: 0.85 }}>
                Macnuts Coffee · Gaam 🐻 {isAdmin && <span style={{ background: GOLD, color: NAVY, borderRadius: 4, padding: "1px 5px", marginLeft: 4, fontSize: 8 }}>ADMIN</span>}
              </div>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", marginTop: 1 }}>ตารางไลฟ์ · ก.ย. 2569</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {stats.map(st => (
              <div key={st.label} onClick={() => st.kind && setListKind(st.kind)}
                style={{ textAlign: "center", minWidth: 34, cursor: st.kind ? "pointer" : "default" }}>
                <div style={{ fontWeight: 800, fontSize: 17, color: st.color, lineHeight: 1 }}>{st.val}</div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.45)", marginTop: 2 }}>{st.label}</div>
              </div>
            ))}
            {isAdmin && (
              <button onClick={exportJSON} style={{ background: exported ? "#16A34A" : GOLD, color: NAVY, border: "none", borderRadius: 7, padding: "6px 10px", fontWeight: 800, cursor: "pointer", fontSize: 11 }}>
                {exported ? "✓ โหลดแล้ว" : "⬇ Export"}
              </button>
            )}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "16px 12px 48px" }}>
        {/* Legend (กดได้) */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 14, flexWrap: "wrap" }}>
          {["shopee", "tiktok", "promo"].map(k => (
            <TagChip key={k} kind={k} size={11} onTag={setListKind} label={tagInfo(k).label} />
          ))}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
            {saving && <span style={{ fontSize: 10, color: GOLD, fontWeight: 700 }}>⏳ บันทึกแล้ว</span>}
            <span style={{ fontSize: 10, fontWeight: 700, borderRadius: 6, padding: "3px 8px", background: isAdmin ? "#FEF3C7" : "#EEF2FF", color: isAdmin ? "#92400E" : "#3730A3" }}>
              {isAdmin ? "✏️ แก้ไขได้" : "👁"}
            </span>
          </div>
        </div>

        {/* Week view — อยู่ด้านบน */}
        <WeekView week={weeks[weekIdx]} idx={weekIdx} total={weeks.length} setIdx={setWeekIdx}
          dayData={dayData} onDay={openDay} onTag={setListKind} />

        {/* Month calendar — อยู่ด้านล่าง */}
        <div style={{ fontSize: 11, fontWeight: 700, color: "#666", letterSpacing: 1, margin: "28px 0 10px" }}>ปฏิทินทั้งเดือน</div>
        <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 24px rgba(11,36,71,0.08)", border: "1px solid #E8E8E8" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", background: NAVY }}>
            {DAY_NAMES.map((n, i) => (
              <div key={n} style={{ padding: "10px 0", textAlign: "center", fontSize: 12, fontWeight: 800, color: (i === 0 || i === 6) ? "#FFB3AD" : GOLD }}>{n}</div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4, padding: 4, background: "#F0EFED" }}>
            {cells.map((date, i) => date ? (
              <DayCell key={i} date={date} data={dayData[date] || {}} onClick={() => {
                setWeekIdx(weeks.findIndex(w => w.includes(date)));
                openDay(date);
              }} onTag={setListKind} />
            ) : <div key={i} style={{ minHeight: 80 }} />)}
          </div>
        </div>

        {!isAdmin && (
          <div style={{ marginTop: 24, textAlign: "center", fontSize: 11, color: "#bbb" }}>ตารางนี้จัดทำโดยทีม Macnuts Coffee 🐻</div>
        )}
      </div>

      {/* Popups */}
      {listKind && (
        <ListModal kind={listKind} dayData={dayData} onClose={() => setListKind(null)}
          onPick={(date) => { setListKind(null); openDay(date); }} />
      )}
      {!isAdmin && viewDay !== null && !listKind && (
        <ViewModal date={viewDay} data={dayData[viewDay] || {}} onClose={() => setViewDay(null)}
          onTag={(k) => { setViewDay(null); setListKind(k); }} />
      )}
      {isAdmin && editDay !== null && !listKind && (
        <DayModal date={editDay} data={dayData[editDay] || {}} onClose={() => setEditDay(null)}
          onSave={data => saveDay(editDay, data)} saving={saving} />
      )}
    </div>
  );
}
