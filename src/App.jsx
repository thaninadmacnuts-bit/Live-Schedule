import { useState } from "react";

const YEAR = 2026;
const MONTH = 8; // 0-indexed = September

const PLATFORMS = [
  { id: "shopee", label: "Shopee", color: "#EE4D2D", bg: "#FFF0EE",
    Logo: () => (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="#EE4D2D">
        <path d="M12 2C9.24 2 7 4.24 7 7H5.5C4.67 7 4 7.67 4 8.5L3 19.5C3 20.33 3.67 21 4.5 21H19.5C20.33 21 21 20.33 21 19.5L20 8.5C20 7.67 19.33 7 18.5 7H17C17 4.24 14.76 2 12 2ZM12 4C13.66 4 15 5.34 15 7H9C9 5.34 10.34 4 12 4ZM12 14C10.34 14 9 12.66 9 11H11C11 11.55 11.45 12 12 12C12.55 12 13 11.55 13 11H15C15 12.66 13.66 14 12 14Z"/>
      </svg>
    )
  },
  { id: "tiktok", label: "TikTok", color: "#111", bg: "#F4F4F4",
    Logo: () => (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="#111">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.73a8.16 8.16 0 004.77 1.52V6.79a4.85 4.85 0 01-1-.1z"/>
      </svg>
    )
  },
];

const TIME_SLOTS = [
  { id: "t1", label: "19:00–21:00" },
  { id: "t2", label: "20:00–22:00" },
  { id: "t3", label: "22:00–00:00" },
  { id: "t4", label: "23:00–01:00" },
];

const DAY_NAMES = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];
const MONTH_NAMES = ["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."];

function getDaysInMonth(y, m) {
  return new Date(y, m + 1, 0).getDate();
}
function getFirstDayOfWeek(y, m) {
  return new Date(y, m, 1).getDay();
}

const NAVY = "#034ea2";
const GOLD = "#e3b53d";

// Modal for editing a day's sessions
function DayModal({ date, data, onClose, onSave }) {
  const [sessions, setSessions] = useState(data.sessions || []);
  const [note, setNote] = useState(data.note || "");
  const [promo, setPromo] = useState(data.promo || "");

  const d = new Date(YEAR, MONTH, date);
  const dayName = DAY_NAMES[d.getDay()];
  const isWeekend = d.getDay() === 0 || d.getDay() === 6;

  function addSession() {
    setSessions([...sessions, { platform: "shopee", time: "t1" }]);
  }
  function removeSession(i) {
    setSessions(sessions.filter((_, idx) => idx !== i));
  }
  function updateSession(i, key, val) {
    setSessions(sessions.map((s, idx) => idx === i ? { ...s, [key]: val } : s));
  }

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 100,
      background: "rgba(11,36,71,0.55)", display: "flex", alignItems: "center", justifyContent: "center",
      padding: 16,
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{
        background: "#fff", borderRadius: 16, width: "100%", maxWidth: 420,
        boxShadow: "0 24px 64px rgba(11,36,71,0.22)", overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{ background: NAVY, padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 10, color: GOLD, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>กันยายน 2569</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginTop: 2 }}>
              {date} {MONTH_NAMES[MONTH]}
              <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.5)", marginLeft: 8 }}>{dayName}</span>
              {isWeekend && <span style={{ marginLeft: 6, fontSize: 11, color: GOLD, fontWeight: 700 }}>วันหยุด</span>}
            </div>
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.12)", border: "none", borderRadius: 8, width: 32, height: 32, cursor: "pointer", color: "#fff", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        </div>

        <div style={{ padding: "16px 20px 20px", maxHeight: "70vh", overflowY: "auto" }}>
          {/* Sessions */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#666", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>ไลฟ์</div>
            {sessions.map((s, i) => {
              const plt = PLATFORMS.find(p => p.id === s.platform);
              return (
                <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                  {/* Platform */}
                  <select value={s.platform} onChange={e => updateSession(i, "platform", e.target.value)}
                    style={{ flex: 1, border: "1px solid #E8E8E5", borderRadius: 8, padding: "8px 10px", fontSize: 13, color: plt?.color, fontWeight: 700, background: plt?.bg, cursor: "pointer", appearance: "none" }}>
                    {PLATFORMS.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
                  </select>
                  {/* Time */}
                  <select value={s.time} onChange={e => updateSession(i, "time", e.target.value)}
                    style={{ flex: 1, border: "1px solid #E8E8E5", borderRadius: 8, padding: "8px 10px", fontSize: 13, color: "#111", background: "#FAFAFA", cursor: "pointer", appearance: "none" }}>
                    {TIME_SLOTS.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                  </select>
                  <button onClick={() => removeSession(i)} style={{ background: "#FEF2F2", border: "none", borderRadius: 8, width: 34, height: 34, cursor: "pointer", color: "#EF4444", fontSize: 16, flexShrink: 0 }}>×</button>
                </div>
              );
            })}
            <button onClick={addSession} style={{
              width: "100%", background: "#F7F7F5", border: "1.5px dashed #D0CEC9",
              borderRadius: 8, padding: "9px", fontSize: 13, color: "#888",
              cursor: "pointer", fontWeight: 600,
            }}>+ เพิ่มไลฟ์</button>
          </div>

          {/* Promo */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#666", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>โปรโมชั่น</div>
            <input
              value={promo}
              onChange={e => setPromo(e.target.value)}
              placeholder="เช่น ซื้อครบ 500 รับฟรี..."
              style={{ width: "100%", border: "1px solid #E8E8E5", borderRadius: 8, padding: "9px 12px", fontSize: 13, color: "#111", background: "#FFFBEB", outline: "none", boxSizing: "border-box" }}
            />
          </div>

          {/* Note */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#666", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>หมายเหตุ</div>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="หมายเหตุเพิ่มเติม..."
              rows={2}
              style={{ width: "100%", border: "1px solid #E8E8E5", borderRadius: 8, padding: "9px 12px", fontSize: 13, color: "#111", background: "#FAFAFA", outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit" }}
            />
          </div>

          {/* Save */}
          <button onClick={() => onSave({ sessions, note, promo })} style={{
            width: "100%", background: NAVY, color: "#fff", border: "none",
            borderRadius: 10, padding: "12px", fontSize: 14, fontWeight: 800,
            cursor: "pointer",
          }}>บันทึก</button>
        </div>
      </div>
    </div>
  );
}

// Single calendar cell
function DayCell({ date, data, onClick }) {
  const d = new Date(YEAR, MONTH, date);
  const isWeekend = d.getDay() === 0 || d.getDay() === 6;
  const today = new Date();
  const isToday = today.getFullYear() === YEAR && today.getMonth() === MONTH && today.getDate() === date;
  const hasSessions = data.sessions && data.sessions.length > 0;

  return (
    <div onClick={onClick} style={{
      minHeight: 90,
      background: isToday ? "#FFFBEB" : "#fff",
      borderRadius: 10,
      border: isToday ? `2px solid ${GOLD}` : "1px solid #EBEBEB",
      padding: "6px 7px",
      cursor: "pointer",
      transition: "box-shadow .15s",
      position: "relative",
      overflow: "hidden",
    }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(11,36,71,0.10)"}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
    >
      {/* Date number */}
      <div style={{
        fontSize: 13, fontWeight: 800,
        color: isToday ? GOLD : isWeekend ? "#EF4444" : "#111",
        marginBottom: 4,
      }}>{date}</div>

      {/* Sessions */}
      {hasSessions && data.sessions.map((s, i) => {
        const plt = PLATFORMS.find(p => p.id === s.platform);
        const time = TIME_SLOTS.find(t => t.id === s.time);
        return (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 3,
            background: plt?.bg, borderRadius: 4, padding: "2px 5px",
            marginBottom: 2,
          }}>
            <plt.Logo />
            <span style={{ fontSize: 9, fontWeight: 700, color: plt?.color, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {time?.label.split("–")[0]}
            </span>
          </div>
        );
      })}

      {/* Promo */}
      {data.promo && (
        <div style={{
          marginTop: 3, fontSize: 9, fontWeight: 700, color: "#92400E",
          background: "#FEF3C7", borderRadius: 4, padding: "2px 5px",
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          display: "flex", alignItems: "center", gap: 3,
        }}>
          <span>🎁</span>
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{data.promo}</span>
        </div>
      )}

      {/* Note */}
      {data.note && (
        <div style={{
          marginTop: 2, fontSize: 9, color: "#555",
          background: "#F5F5F5", borderRadius: 4, padding: "2px 5px",
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          display: "flex", alignItems: "center", gap: 3,
        }}>
          <span>📝</span>
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{data.note}</span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const daysInMonth = getDaysInMonth(YEAR, MONTH);
  const firstDay    = getFirstDayOfWeek(YEAR, MONTH);

  // dayData[date] = { sessions: [{platform, time}], note, promo }
  const [dayData, setDayData] = useState(() => {
    try {
      const saved = localStorage.getItem("gaam-calendar-sep2026");
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });
  const [editing, setEditing] = useState(null);

  function saveDay(date, data) {
    setDayData(prev => {
      const next = { ...prev, [date]: data };
      try { localStorage.setItem("gaam-calendar-sep2026", JSON.stringify(next)); } catch {}
      return next;
    });
    setEditing(null);
  }

  // Build calendar grid (pad with nulls)
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  // Stats
  const allSessions = Object.values(dayData).flatMap(d => d.sessions || []);
  const totalSessions = allSessions.length;
  const shopeeCount  = allSessions.filter(s => s.platform === "shopee").length;
  const tiktokCount  = allSessions.filter(s => s.platform === "tiktok").length;
  const promoCount   = Object.values(dayData).filter(d => d.promo).length;

  return (
    <div style={{ fontFamily: "'Sarabun','Noto Sans Thai',sans-serif", background: "#F5F4F0", minHeight: "100vh" }}>
      {/* Top bar */}
      <div style={{ background: NAVY, padding: "0 16px", position: "sticky", top: 0, zIndex: 50, boxShadow: "0 2px 12px rgba(11,36,71,0.18)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ padding: "12px 0 10px" }}>
            <div style={{ fontSize: 9, color: GOLD, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase" }}>Macnuts Coffee · Gaam</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginTop: 1 }}>ตารางไลฟ์ · ก.ย. 2569</div>
          </div>
          {/* Stats */}
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            {[
              { label: "Sessions", val: totalSessions, color: GOLD },
              { label: "Shopee",   val: shopeeCount,   color: "#EE4D2D" },
              { label: "TikTok",   val: tiktokCount,   color: "#eee" },
            ].map(s => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontWeight: 800, fontSize: 16, color: s.color }}>{s.val}</div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", marginTop: 0 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "16px 12px 48px" }}>
        {/* Legend */}
        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12, flexWrap: "wrap" }}>
          {PLATFORMS.map(p => (
            <span key={p.id} style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, color: p.color, fontWeight: 700, background: p.bg, borderRadius: 6, padding: "3px 8px" }}>
              <p.Logo /> {p.label}
            </span>
          ))}
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, color: "#92400E", background: "#FEF3C7", borderRadius: 6, padding: "3px 8px" }}>
            ● โปรโมชั่น
          </span>
          <span style={{ fontSize: 11, color: "#999", marginLeft: "auto" }}>กดวันเพื่อเพิ่มข้อมูล</span>
        </div>

        {/* Calendar */}
        <div style={{ background: "#fff", borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #EBEBEB" }}>
          {/* Day headers */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", background: NAVY }}>
            {DAY_NAMES.map((d, i) => (
              <div key={d} style={{
                padding: "8px 0", textAlign: "center",
                fontSize: 11, fontWeight: 700,
                color: (i === 0 || i === 6) ? "#FF8A80" : GOLD,
              }}>{d}</div>
            ))}
          </div>

          {/* Cells grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4, padding: 4, background: "#F0EFED" }}>
            {cells.map((date, i) => (
              date ? (
                <DayCell
                  key={i}
                  date={date}
                  data={dayData[date] || {}}
                  onClick={() => setEditing(date)}
                />
              ) : (
                <div key={i} style={{ minHeight: 80 }} />
              )
            ))}
          </div>
        </div>

        {/* Summary list */}
        {totalSessions > 0 && (
          <div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#666", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>สรุปไลฟ์ทั้งหมด</div>
            <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #EBEBEB", overflow: "hidden" }}>
              {Object.entries(dayData)
                .filter(([, d]) => d.sessions && d.sessions.length > 0)
                .sort(([a], [b]) => Number(a) - Number(b))
                .map(([date, d]) => {
                  const day = new Date(YEAR, MONTH, Number(date));
                  const isWeekend = day.getDay() === 0 || day.getDay() === 6;
                  return (
                    <div key={date} onClick={() => setEditing(Number(date))} style={{
                      display: "flex", alignItems: "flex-start", gap: 12,
                      padding: "12px 16px", borderBottom: "1px solid #F5F5F5",
                      cursor: "pointer",
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = "#FAFAFA"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                      {/* Date */}
                      <div style={{ textAlign: "center", flexShrink: 0, width: 36 }}>
                        <div style={{ fontSize: 18, fontWeight: 800, color: isWeekend ? "#EF4444" : NAVY, lineHeight: 1 }}>{date}</div>
                        <div style={{ fontSize: 10, color: "#999", marginTop: 1 }}>{DAY_NAMES[day.getDay()]}</div>
                      </div>
                      {/* Sessions */}
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: d.promo || d.note ? 6 : 0 }}>
                          {d.sessions.map((s, i) => {
                            const plt = PLATFORMS.find(p => p.id === s.platform);
                            const time = TIME_SLOTS.find(t => t.id === s.time);
                            return (
                              <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, color: plt?.color, fontWeight: 700, background: plt?.bg, borderRadius: 6, padding: "3px 9px" }}>
                                <plt.Logo /> {plt?.label} · {time?.label}
                              </span>
                            );
                          })}
                        </div>
                        {d.promo && <div style={{ fontSize: 12, color: "#92400E", background: "#FEF3C7", borderRadius: 6, padding: "3px 8px", display: "inline-block", marginBottom: 3 }}>🎁 {d.promo}</div>}
                        {d.note  && <div style={{ fontSize: 12, color: "#666" }}>📝 {d.note}</div>}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {editing !== null && (
        <DayModal
          date={editing}
          data={dayData[editing] || {}}
          onClose={() => setEditing(null)}
          onSave={data => saveDay(editing, data)}
        />
      )}
    </div>
  );
}
