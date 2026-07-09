import { useState, useMemo } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────
const RAW_DATA = [
  { staff: "PAM", platform: "Shopee", topic: "Pre 7.7 เก็บโค้ดช้อปก่อนใคร", date: "2026-07-03", startLive: "19:00", endLive: "21:00" },
  { staff: "PAM", platform: "Shopee", topic: "Pre 7.7 เก็บโค้ดช้อปก่อนใคร", date: "2026-07-05", startLive: "19:00", endLive: "21:00" },
  { staff: "PAM", platform: "Shopee", topic: "7.7 โค้ดเด็ด เริ่มแล้ว!!! Cold Brew", date: "2026-07-06", startLive: "11:00", endLive: "13:00" },
  { staff: "PAM", platform: "Shopee", topic: "7.7 โค้ดเด็ด เริ่มแล้ว!!! Cold Brew", date: "2026-07-06", startLive: "19:00", endLive: "22:00" },
  { staff: "AIR", platform: "Shopee", topic: "7.7 โค้ดเด็ด เริ่มแล้ว!!! Cold Brew", date: "2026-07-06", startLive: "22:30", endLive: "00:30" },
  { staff: "PAM", platform: "Shopee", topic: "7.7 โค้ดเด็ด เริ่มแล้ว!!! Cold Brew", date: "2026-07-07", startLive: "11:00", endLive: "13:00" },
  { staff: "PAM", platform: "TikTok", topic: "7.7 โค้ดเด็ด เริ่มแล้ว!!! Cold Brew", date: "2026-07-07", startLive: "19:00", endLive: "20:30" },
  { staff: "AIR", platform: "Shopee", topic: "7.7 โค้ดเด็ด เริ่มแล้ว!!! Cold Brew", date: "2026-07-07", startLive: "19:00", endLive: "20:30" },
  { staff: "PAM", platform: "Shopee", topic: "7.7 โค้ดเด็ด เริ่มแล้ว!!! Cold Brew", date: "2026-07-07", startLive: "21:00", endLive: "22:30" },
  { staff: "AIR", platform: "Shopee", topic: "7.7 โค้ดเด็ด เริ่มแล้ว!!! Cold Brew", date: "2026-07-07", startLive: "22:30", endLive: "00:30" },
  { staff: "PAM", platform: "TikTok", topic: "Macnuts Cold Brew ลดต่อ 7.7!!!", date: "2026-07-08", startLive: "19:00", endLive: "21:00" },
  { staff: "AIR", platform: "Shopee", topic: "Macnuts Cold Brew ลดต่อ 7.7!!!", date: "2026-07-08", startLive: "19:00", endLive: "21:00" },
  { staff: "PAM", platform: "Shopee", topic: "Macnuts Cold Brew ลดต่อ 7.7!!!", date: "2026-07-09", startLive: "20:00", endLive: "22:00" },
  { staff: "PAM", platform: "Shopee", topic: "แจกโค้ด Friday Night", date: "2026-07-10", startLive: "20:00", endLive: "22:00" },
  { staff: "AIR", platform: "TikTok", topic: "Cold Brew ของมันต้องมี", date: "2026-07-13", startLive: "20:00", endLive: "22:00" },
  { staff: "PAM", platform: "Shopee", topic: "Cold Brew ของมันต้องมี", date: "2026-07-13", startLive: "20:00", endLive: "22:00" },
  { staff: "PAM", platform: "Shopee", topic: "15.5 โค้ดลดแรง รีบช้อป!!!", date: "2026-07-14", startLive: "20:00", endLive: "22:00" },
  { staff: "AIR", platform: "Shopee", topic: "15.5 โค้ดลดแรง รีบช้อป!!!", date: "2026-07-14", startLive: "22:30", endLive: "00:30" },
  { staff: "PAM", platform: "Shopee", topic: "15.5 โค้ดลดแรง รีบช้อป!!!", date: "2026-07-15", startLive: "11:00", endLive: "13:00" },
  { staff: "PAM", platform: "Shopee", topic: "15.5 โค้ดลดแรง รีบช้อป!!!", date: "2026-07-15", startLive: "19:00", endLive: "21:00" },
  { staff: "AIR", platform: "Shopee", topic: "15.5 โค้ดลดแรง รีบช้อป!!!", date: "2026-07-15", startLive: "21:00", endLive: "23:00" },
  { staff: "PAM", platform: "Shopee", topic: "15.5 โค้ดลดแรง รีบช้อป!!!", date: "2026-07-15", startLive: "23:00", endLive: "00:30" },
  { staff: "PAM", platform: "Shopee", topic: "ต่อเวลา 15.5 โค้ดลดแรง", date: "2026-07-16", startLive: "20:00", endLive: "22:00" },
  { staff: "AIR", platform: "TikTok", topic: "ต่อเวลา 15.5 โค้ดลดแรง", date: "2026-07-16", startLive: "20:00", endLive: "22:00" },
  { staff: "PAM", platform: "Shopee", topic: "Macnuts: Cold Brew ชงเองได้ที่บ้าน", date: "2026-07-19", startLive: "19:00", endLive: "21:00" },
  { staff: "PAM", platform: "Shopee", topic: "Macnuts: Cold Brew ชงเองได้ที่บ้าน", date: "2026-07-20", startLive: "19:00", endLive: "21:00" },
  { staff: "PAM", platform: "TikTok", topic: "Macnuts: Cold Brew ชงเองได้ที่บ้าน", date: "2026-07-21", startLive: "19:00", endLive: "21:00" },
  { staff: "PAM", platform: "Shopee", topic: "Macnuts: Cold Brew ชงเองได้ที่บ้าน", date: "2026-07-22", startLive: "19:00", endLive: "21:00" },
  { staff: "AIR", platform: "TikTok", topic: "Macnuts: Cold Brew ชงเองได้ที่บ้าน", date: "2026-07-22", startLive: "20:00", endLive: "22:00" },
  { staff: "PAM", platform: "Shopee", topic: "Macnuts: Cold Brew ชงเองได้ที่บ้าน", date: "2026-07-23", startLive: "19:00", endLive: "21:00" },
  { staff: "AIR", platform: "TikTok", topic: "Macnuts: Cold Brew ชงเองได้ที่บ้าน", date: "2026-07-23", startLive: "22:00", endLive: "00:00" },
  { staff: "PAM", platform: "Shopee", topic: "25.5 Pay Day ลดโหด โค้ดเพียบ!", date: "2026-07-24", startLive: "22:00", endLive: "00:00" },
  { staff: "PAM", platform: "Shopee", topic: "25.5 Pay Day ลดโหด โค้ดเพียบ!", date: "2026-07-25", startLive: "11:00", endLive: "13:00" },
  { staff: "PAM", platform: "Shopee", topic: "25.5 Pay Day ลดโหด โค้ดเพียบ!", date: "2026-07-25", startLive: "22:00", endLive: "00:00" },
  { staff: "AIR", platform: "TikTok", topic: "ช้อปเงินเดือนออก ตุน Cold Brew กันเลอะ", date: "2026-07-27", startLive: "20:00", endLive: "22:00" },
  { staff: "PAM", platform: "Shopee", topic: "ช้อปเงินเดือนออก ตุน Cold Brew กันเลอะ", date: "2026-07-27", startLive: "20:00", endLive: "22:00" },
  { staff: "PAM", platform: "TikTok", topic: "ช้อปเงินเดือนออก ตุน Cold Brew กันเลอะ", date: "2026-07-28", startLive: "20:00", endLive: "22:00" },
  { staff: "AIR", platform: "Shopee", topic: "ช้อปเงินเดือนออก ตุน Cold Brew กันเลอะ", date: "2026-07-29", startLive: "20:00", endLive: "22:00" },
  { staff: "PAM", platform: "Shopee", topic: "ช้อปเงินเดือนออก ตุน Cold Brew กันเลอะ", date: "2026-07-30", startLive: "19:00", endLive: "21:00" },
];

const SCRIPT_SECTIONS = [
  {
    id: "opening",
    icon: "🎬",
    title: "Opening Live (10 นาทีแรก)",
    tag: "ทักทาย · แนะนำแบรนด์ · โปรเด่น",
    color: "#DC2626",
    bg: "#FEF2F2",
    border: "#FECACA",
    items: [
      { label: "ทักทาย", text: "ทักทาย แนะนำแบรนด์สั้นๆ บอกโปรเด่นของวันทันที — คนเข้าไลฟ์ช่วงแรกมักตัดสินใจซื้อเร็ว ต้องเห็นดีลชัด" },
      { label: "ปักคอมเมนต์", text: "ปักคอมเมนต์ โปรทุกครั้ง / เน้นสื่อสารให้คอมเมนต์" },
      { label: "ตัวอย่างคำพูด", text: "ใครเข้ามาพิมพ์ Macnuts รับสิทธิ์ลุ้นของรางวัล + สลับข้อมูลสินค้าแต่ละตะกร้า" },
    ],
  },
  {
    id: "story",
    icon: "☕",
    title: "เล่าที่มา / จุดขาย",
    tag: "Brand Story · USP",
    color: "#B45309",
    bg: "#FFFBEB",
    border: "#FDE68A",
    items: [
      { label: "ชงแบบไหน", text: "ชงแบบไหน / เมล็ดแต่ละรสชาติมาจากไหน ต่างกันยังไง" },
      { label: "Positioning", text: "ทำไมไม่ขม ทำไมต้อง Macnuts Coffee — ให้ความรู้สึก \"พรีเมียมแต่เข้าถึงง่าย\"" },
    ],
  },
  {
    id: "demo",
    icon: "🧪",
    title: "ชิมสด (บางไลฟ์)",
    tag: "Demo · สาธิต",
    color: "#065F46",
    bg: "#ECFDF5",
    border: "#A7F3D0",
    items: [
      { label: "พูดรสชาติ", text: "พูดรสชาติเป็นธรรมชาติ ไม่โฆษณาเกินจริง / สอนชงแต่ละเมนู" },
      { label: "อธิบายส่วนผสม", text: "สามารถใช้การอธิบายว่ามีส่วนผสมอะไรบ้าง ให้คนดูเห็นภาพ (ไม่จำเป็นต้องใช้วัตถุดิบจริง)" },
    ],
  },
  {
    id: "code",
    icon: "🏷️",
    title: "แจ้งโค้ด / ดีลเป็นระยะ ทุก 10–15 นาที",
    tag: "Promo · โค้ดส่วนลด",
    color: "#1D4ED8",
    bg: "#EFF6FF",
    border: "#BFDBFE",
    items: [
      { label: "เปรียบราคา", text: "ย้ำโค้ดส่วนลด ราคาปกติ vs ราคาไลฟ์ ให้เห็น \"ความคุ้ม\" ชัดเจน" },
    ],
  },
  {
    id: "cart",
    icon: "🛒",
    title: "สอน \"กดตะกร้า\"",
    tag: "CTA · Step-by-step",
    color: "#7C3AED",
    bg: "#F5F3FF",
    border: "#DDD6FE",
    items: [
      { label: "Script", text: "\"ใครยังไม่เคยกดนะคะ 👉 กดรูปตะกร้า 👉 เลือกสินค้า 👉 การกรอกที่อยู่ 👉 การชำระเงิน\"" },
      { label: "Visual", text: "โชว์ให้ดูเป็นสเตป หรือทำรูปภาพขึ้นมาแสดงไสลด์" },
    ],
  },
  {
    id: "product",
    icon: "📦",
    title: "เข้าไลฟ์สินค้า (แต่ละตัว)",
    tag: "Product Deep-dive",
    color: "#0F766E",
    bg: "#F0FDFA",
    border: "#99F6E4",
    items: [
      { label: "พาลูกค้าดู", text: "พาลูกค้าไปดูแบบเจาะลึกว่าแต่ละตัวเป็นยังไง โชว์ให้เห็นชัด มีการถามคนดูตลอด" },
      { label: "ถามคนดู", text: "ใครทันไม่ทันพิมพ์มา หรือ โชว์สินค้าชัดๆ ว่าตัวที่โชว์อยู่อย่างไรไง + พาไปกด" },
      { label: "บอกคูปอง", text: "กดแล้วจะได้คูปองอะไร ถูกและคุ้มยังไง" },
    ],
  },
  {
    id: "reason",
    icon: "💡",
    title: "ทุกไลฟ์ต้องบอก \"เหตุผลให้คนอยากซื้อ\"",
    tag: "Why Buy",
    color: "#B45309",
    bg: "#FFFBEB",
    border: "#FDE68A",
    items: [
      { label: "เหตุผล", text: "ทุกไลฟ์ต้องสื่อสารให้ชัดว่า ทำไมต้องซื้อตอนนี้ ถูกกว่าปกติ / มีของแถม / สต็อกจำกัด" },
    ],
  },
  {
    id: "event",
    icon: "🎁",
    title: "วันที่มีกิจกรรม",
    tag: "Games · Lucky Draw",
    color: "#DC2626",
    bg: "#FEF2F2",
    border: "#FECACA",
    items: [
      { label: "สั่งแล้ว", text: "เน้นพูด \"ใครสั่งแล้ว พิมพ์ 'สั่งแล้ว' เดี๋ยวทางร้านล็อกของให้หรือสุ่มซื้อเข้าชิงรางวัล\"" },
      { label: "กิจกรรม", text: "ใครทำกิจกรรม พิมพ์ \"ทัน\" มาให้หน่อย" },
    ],
  },
  {
    id: "engage",
    icon: "💬",
    title: "การสร้างสัมพันธ์กับคนดู",
    tag: "Engagement · CRM",
    color: "#0369A1",
    bg: "#F0F9FF",
    border: "#BAE6FD",
    items: [
      { label: "ทักคนใหม่", text: "\"ใครเพิ่งเข้า พิมพ์ 'ใหม่'\"" },
      { label: "ตอบคอมเมนต์", text: "อ่านชื่อคนคอมเมนต์ + ข้อความ เช่น \"คุณ XXX กดแล้ว ขอบคุณมากค่ะ!\" หรือ \"คุณ XXX ถามว่า ......... + คำตอบ\"" },
      { label: "สมุดปากกา", text: "อ่านซื้อไม่ออกหรือกลัวผิด ให้อ่านไปก่อน แล้วบอกว่า \"ไม่แน่ใจว่าอ่านซื้อถูกมั้ย เรียกคุณ xxx ไปก่อนนะคะ อ่านผิดขออภัย\" หรือ คุณ XXX พิมพ์ไทยมาบอกหน่อยว่าอยากซื้ออะไร" },
    ],
  },
  {
    id: "social",
    icon: "📊",
    title: "ปิดดีล",
    tag: "Social Proof · FOMO",
    color: "#065F46",
    bg: "#ECFDF5",
    border: "#A7F3D0",
    items: [
      { label: "Social Proof", text: "อ้างว่าเห็นคนกดใส่ตะกร้าไว้ xx คน คิดตัดสินใจให้ 10 นาที + พิมพ์มาว่า \"จะเอา\" เดี๋ยวหาของแถมให้" },
    ],
  },
  {
    id: "retarget",
    icon: "🔁",
    title: "Retarget คนดู",
    tag: "Re-engage · Reminder",
    color: "#6B21A8",
    bg: "#FAF5FF",
    border: "#E9D5FF",
    items: [
      { label: "Script", text: "\"ใครดูอยู่ พิมพ์ 'ดูอยู่' มาหน่อย หรือลองสนใจตัวไหนพิมพ์หมายเลขตะกร้ามา\"" },
    ],
  },
  {
    id: "closing",
    icon: "🔥",
    title: "ก่อนปิดไลฟ์ 10 นาทีสุดท้าย",
    tag: "Hard Sell · Closing",
    color: "#DC2626",
    bg: "#FEF2F2",
    border: "#FECACA",
    items: [
      { label: "Hard Sell", text: "Hard Sell กระตุ้นการซื้อให้กัน เร่งคนดูและทำให้ดีนั้นเน้นอยากซื้อ" },
    ],
  },
  {
    id: "tips",
    icon: "📌",
    title: "หมายเหตุสำคัญ",
    tag: "Tips · สิ่งที่ต้องจำ",
    color: "#374151",
    bg: "#F9FAFB",
    border: "#E5E7EB",
    items: [
      { label: "คนถามตะกร้า", text: "สมุดมีคนถามตะกร้า X เข้ามา หรือถามเกี่ยวกับสินค้านั้นๆ ให้พาเข้าไปดู + พาไปกดตะกร้า (เหมือนการเข้าไลฟ์สินค้า)" },
      { label: "สำคัญ", text: "ให้คนที่ดูไลฟ์รู้สึกพิเศษ + อย่าให้คนคิดนาน \"โค้ดดีๆ ไม่ได้มีบ่อยๆ ใครได้คูปองลดเยอะ รีบจัด\" + พาเข้าตะกร้าบ่อยๆ + เหตุผลที่ควรกด เช่น โปรแรง คูปองเด็ด ของดี มีแล้ว ชีวิตดีขึ้น บลาๆ" },
    ],
  },
];

// ─── CAMPAIGN MAP ────────────────────────────────────────────────────────────
const CAMPAIGN_MAP = [
  { id: "pre77",  label: "Pre 7.7",       color: "#B45309", bg: "#FEF3C7", match: t => t.includes("Pre 7.7") },
  { id: "77",     label: "7.7",           color: "#DC2626", bg: "#FEE2E2", match: t => t.includes("7.7 โค้ดเด็ด") },
  { id: "post77", label: "ลดต่อ 7.7",    color: "#9B1C1C", bg: "#FECACA", match: t => t.includes("ลดต่อ 7.7") },
  { id: "friday", label: "Friday Night",  color: "#7C3AED", bg: "#EDE9FE", match: t => t.includes("Friday") },
  { id: "must",   label: "ของมันต้องมี", color: "#1D4ED8", bg: "#DBEAFE", match: t => t.includes("ของมันต้องมี") },
  { id: "155",    label: "15.5",          color: "#065F46", bg: "#D1FAE5", match: t => t.includes("15.5") },
  { id: "howto",  label: "How-To",        color: "#0F766E", bg: "#CCFBF1", match: t => t.includes("ชงเองได้ที่บ้าน") },
  { id: "payday", label: "Pay Day",       color: "#6B21A8", bg: "#F3E8FF", match: t => t.includes("Pay Day") },
  { id: "salary", label: "เงินเดือนออก", color: "#1E40AF", bg: "#DBEAFE", match: t => t.includes("เงินเดือนออก") },
];

function getCampaign(topic) {
  return CAMPAIGN_MAP.find(c => c.match(topic)) || { id: "other", label: "-", color: "#6B7280", bg: "#F3F4F6" };
}
function getDayTH(dateStr) {
  return ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."][new Date(dateStr).getDay()];
}
function isWeekend(dateStr) {
  const d = new Date(dateStr).getDay(); return d === 0 || d === 6;
}
function getDuration(start, end) {
  const [sh, sm] = start.split(":").map(Number);
  let [eh, em] = end.split(":").map(Number);
  if (eh < sh || (eh === sh && em < sm)) eh += 24;
  const mins = (eh * 60 + em) - (sh * 60 + sm);
  const h = Math.floor(mins / 60), m = mins % 60;
  return m > 0 ? `${h}h${m}m` : `${h}h`;
}
function formatICS(dateStr, timeStr, cross) {
  let [y, mo, d] = dateStr.split("-").map(Number);
  const [hh, mm] = timeStr.split(":").map(Number);
  if (cross) { const dt = new Date(y, mo-1, d); dt.setDate(dt.getDate()+1); y=dt.getFullYear(); mo=dt.getMonth()+1; d=dt.getDate(); }
  return `${y}${String(mo).padStart(2,"0")}${String(d).padStart(2,"0")}T${String(hh).padStart(2,"0")}${String(mm).padStart(2,"0")}00`;
}
function generateICS(events) {
  const lines = ["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Macnuts//Live Jul 2026//TH","CALSCALE:GREGORIAN","METHOD:PUBLISH","X-WR-CALNAME:Macnuts Live Jul 2026","X-WR-TIMEZONE:Asia/Bangkok"];
  events.forEach((ev, i) => {
    const cross = ev.endLive <= ev.startLive;
    const camp = getCampaign(ev.topic);
    lines.push("BEGIN:VEVENT",`UID:macnuts-${ev.date}-${i}@macnutscoffee.th`,`DTSTART;TZID=Asia/Bangkok:${formatICS(ev.date,ev.startLive,false)}`,`DTEND;TZID=Asia/Bangkok:${formatICS(ev.date,ev.endLive,cross)}`,`SUMMARY:[${ev.staff}][${ev.platform}] ${ev.topic}`,`DESCRIPTION:Staff: ${ev.staff}\\nCampaign: ${camp.label}\\nPlatform: ${ev.platform}`,"END:VEVENT");
  });
  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}
function downloadICS(events) {
  const blob = new Blob([generateICS(events)], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = "macnuts-live-july2026.ics"; a.click();
  URL.revokeObjectURL(url);
}

const PLT = { Shopee: { dot: "#EE4D2D", label: "Shopee" }, TikTok: { dot: "#111", label: "TikTok" } };
const STAFF_COLOR = { PAM: "#B45309", AIR: "#1D4ED8" };
const td = { padding: "9px 12px", textAlign: "center", verticalAlign: "middle" };

function Select({ value, onChange, options }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)} style={{ border: "1px solid #E2E8F0", borderRadius: 7, padding: "5px 10px", fontSize: 12, background: "white", cursor: "pointer", color: "#334155" }}>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

// ─── SCRIPT TAB ──────────────────────────────────────────────────────────────
function ScriptTab() {
  const [open, setOpen] = useState("opening");
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "20px 20px 40px" }}>
      {/* Warning banner */}
      <div style={{ background: "#DC2626", borderRadius: 10, padding: "10px 18px", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 18 }}>🚫</span>
        <span style={{ color: "white", fontWeight: 800, fontSize: 14 }}>Script and Remark / *ห้ามพูดคำว่าละมุน*</span>
      </div>

      {/* Section nav pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
        {SCRIPT_SECTIONS.map(s => (
          <button key={s.id} onClick={() => setOpen(open === s.id ? null : s.id)}
            style={{
              background: open === s.id ? s.color : "white",
              color: open === s.id ? "white" : s.color,
              border: `1.5px solid ${s.color}`,
              borderRadius: 20, padding: "5px 14px", fontSize: 12, fontWeight: 700,
              cursor: "pointer", transition: "all .15s"
            }}>
            {s.icon} {s.title.length > 18 ? s.title.slice(0,18)+"…" : s.title}
          </button>
        ))}
      </div>

      {/* Sections */}
      {SCRIPT_SECTIONS.map(s => (
        <div key={s.id} style={{
          marginBottom: 12, borderRadius: 12, overflow: "hidden",
          border: `1.5px solid ${s.border}`,
          boxShadow: open === s.id ? "0 2px 12px rgba(0,0,0,0.07)" : "none"
        }}>
          {/* Header */}
          <button onClick={() => setOpen(open === s.id ? null : s.id)}
            style={{
              width: "100%", background: open === s.id ? s.color : s.bg,
              border: "none", padding: "13px 18px", cursor: "pointer",
              display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left"
            }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 20 }}>{s.icon}</span>
              <div>
                <div style={{ fontWeight: 800, fontSize: 14, color: open === s.id ? "white" : s.color }}>{s.title}</div>
                <div style={{ fontSize: 11, color: open === s.id ? "rgba(255,255,255,0.75)" : "#94A3B8", marginTop: 1 }}>{s.tag}</div>
              </div>
            </div>
            <span style={{ fontSize: 16, color: open === s.id ? "white" : s.color }}>{open === s.id ? "▲" : "▼"}</span>
          </button>

          {/* Body */}
          {open === s.id && (
            <div style={{ background: "white", padding: "16px 18px 18px" }}>
              {s.items.map((item, j) => (
                <div key={j} style={{
                  marginBottom: j < s.items.length - 1 ? 12 : 0,
                  paddingBottom: j < s.items.length - 1 ? 12 : 0,
                  borderBottom: j < s.items.length - 1 ? "1px solid #F1F5F9" : "none"
                }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: s.color, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: 13.5, color: "#1E293B", lineHeight: 1.7 }}>{item.text}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── SCHEDULE TAB ────────────────────────────────────────────────────────────
function ScheduleTab() {
  const [filterPlatform, setFilterPlatform] = useState("all");
  const [filterStaff, setFilterStaff] = useState("all");
  const [filterCampaign, setFilterCampaign] = useState("all");

  const [showPast, setShowPast] = useState(false);

  const todayStr = useMemo(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-${String(now.getDate()).padStart(2,"0")}`;
  }, []);

  const sorted = useMemo(() => [...RAW_DATA].sort((a,b) => a.date.localeCompare(b.date) || a.startLive.localeCompare(b.startLive)), []);

  const pastCount = useMemo(() => sorted.filter(ev => ev.date < todayStr).length, [sorted, todayStr]);

  const filtered = useMemo(() => sorted.filter(ev =>
    (showPast || ev.date >= todayStr) &&
    (filterPlatform === "all" || ev.platform === filterPlatform) &&
    (filterStaff === "all" || ev.staff === filterStaff) &&
    (filterCampaign === "all" || getCampaign(ev.topic).id === filterCampaign)
  ), [sorted, filterPlatform, filterStaff, filterCampaign, showPast, todayStr]);

  const stats = useMemo(() => ({
    total: filtered.length,
    shopee: filtered.filter(e=>e.platform==="Shopee").length,
    tiktok: filtered.filter(e=>e.platform==="TikTok").length,
    pam: filtered.filter(e=>e.staff==="PAM").length,
    air: filtered.filter(e=>e.staff==="AIR").length,
  }), [filtered]);

  const dateParity = useMemo(() => {
    const map = {}; let idx = 0; let prev = null;
    filtered.forEach(ev => {
      if (ev.date !== prev) { prev = ev.date; idx++; }
      map[`${ev.date}-${ev.startLive}-${ev.staff}-${ev.platform}`] = idx % 2;
    });
    return map;
  }, [filtered]);

  return (
    <div>
      {/* Stats */}
      <div style={{ background: "#0B2447", padding: "12px 20px 14px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 8, flexWrap: "wrap" }}>
          {[
            { label: "Sessions", val: stats.total, color: "#C9B06A" },
            { label: "Shopee",   val: stats.shopee, color: "#FF6B6B" },
            { label: "TikTok",  val: stats.tiktok, color: "#94A3B8" },
            { label: "PAM",     val: stats.pam,    color: "#FCD34D" },
            { label: "AIR",     val: stats.air,    color: "#7DD3FC" },
          ].map(s => (
            <div key={s.label} style={{ background:"rgba(255,255,255,0.07)", borderRadius:7, padding:"5px 12px", display:"flex", alignItems:"center", gap:6 }}>
              <span style={{ fontWeight:800, color:s.color, fontSize:15 }}>{s.val}</span>
              <span style={{ color:"#64748B", fontSize:11 }}>{s.label}</span>
            </div>
          ))}
          <button onClick={() => downloadICS(filtered)} style={{
            marginLeft:"auto", background:"#C9B06A", color:"#0B2447", border:"none",
            borderRadius:8, padding:"7px 14px", fontWeight:800, cursor:"pointer", fontSize:12
          }}>📆 Export .ics</button>
        </div>
      </div>

      {/* Filters */}
      <div style={{ background:"white", borderBottom:"1px solid #E2E8F0", padding:"10px 20px", position:"sticky", top:52, zIndex:9 }}>
        <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", gap:8, flexWrap:"wrap", alignItems:"center" }}>
          <span style={{ fontSize:12, color:"#94A3B8", fontWeight:600 }}>กรอง:</span>
          <Select value={filterPlatform} onChange={setFilterPlatform} options={[{value:"all",label:"ทุก Platform"},{value:"Shopee",label:"🛍 Shopee"},{value:"TikTok",label:"🎵 TikTok"}]} />
          <Select value={filterStaff} onChange={setFilterStaff} options={[{value:"all",label:"ทุก Staff"},{value:"PAM",label:"PAM"},{value:"AIR",label:"AIR"}]} />
          <Select value={filterCampaign} onChange={setFilterCampaign} options={[{value:"all",label:"ทุก Campaign"},...CAMPAIGN_MAP.map(c=>({value:c.id,label:c.label}))]} />
          {(filterPlatform!=="all"||filterStaff!=="all"||filterCampaign!=="all") && (
            <button onClick={()=>{setFilterPlatform("all");setFilterStaff("all");setFilterCampaign("all");}}
              style={{fontSize:12,color:"#DC2626",background:"none",border:"1px solid #FECACA",borderRadius:6,padding:"4px 10px",cursor:"pointer"}}>✕ ล้าง</button>
          )}
          <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:10}}>
            {pastCount > 0 && (
              <button onClick={()=>setShowPast(p=>!p)} style={{
                fontSize:11, fontWeight:700, cursor:"pointer", borderRadius:6, padding:"4px 10px", border:"none",
                background: showPast ? "#64748B" : "#F1F5F9",
                color: showPast ? "white" : "#64748B",
              }}>
                {showPast ? "🙈 ซ่อนที่ผ่านแล้ว" : `👁 ดูที่ผ่านแล้ว (${pastCount})`}
              </button>
            )}
            <span style={{fontSize:12,color:"#94A3B8"}}>{filtered.length} rows</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div style={{ maxWidth:1100, margin:"16px auto", padding:"0 20px 40px" }}>
        <div style={{ background:"white", borderRadius:12, overflow:"hidden", boxShadow:"0 1px 4px rgba(0,0,0,0.08)" }}>
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
              <thead>
                <tr style={{ background:"#0B2447" }}>
                  {["#","วันที่","วัน","เวลา","ระยะ","Campaign","Topic","Platform","Staff"].map(h=>(
                    <th key={h} style={{ padding:"11px 12px", color:"#C9B06A", fontWeight:700, fontSize:11, textTransform:"uppercase", letterSpacing:0.8, textAlign:h==="Topic"?"left":"center", whiteSpace:"nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((ev, i) => {
                  const camp = getCampaign(ev.topic);
                  const plt = PLT[ev.platform];
                  const key = `${ev.date}-${ev.startLive}-${ev.staff}-${ev.platform}`;
                  const isToday = ev.date === todayStr;
                  const isPast = ev.date < todayStr;
                  const rowBg = isToday ? "#FFFBEB" : isPast ? "#F9FAFB" : dateParity[key] === 0 ? "white" : "#F8FAFC";
                  const weekend = isWeekend(ev.date);
                  const d = new Date(ev.date);
                  return (
                    <tr key={i} style={{ background:rowBg, borderBottom:"1px solid #F1F5F9", opacity: isPast ? 0.45 : 1 }}>
                      {isToday && i === filtered.findIndex(e => e.date === todayStr) && false}
                      <td style={{...td,color:"#CBD5E1",fontSize:11,width:32}}>{i+1}</td>
                      <td style={{...td,whiteSpace:"nowrap",fontWeight:700,color:weekend?"#DC2626":"#0F172A",fontSize:14}}>
                        {d.getDate()}/{d.getMonth()+1}
                        {isToday && <span style={{marginLeft:5,background:"#F59E0B",color:"white",borderRadius:4,padding:"1px 5px",fontSize:9,fontWeight:800,verticalAlign:"middle"}}>TODAY</span>}
                      </td>
                      <td style={{...td,color:weekend?"#DC2626":"#64748B",fontWeight:weekend?700:400}}>{getDayTH(ev.date)}</td>
                      <td style={{...td,whiteSpace:"nowrap",fontVariantNumeric:"tabular-nums",fontWeight:600,color:"#334155"}}>{ev.startLive}–{ev.endLive}</td>
                      <td style={{...td,color:"#94A3B8",fontSize:12}}>{getDuration(ev.startLive,ev.endLive)}</td>
                      <td style={td}>
                        <span style={{background:camp.bg,color:camp.color,borderRadius:5,padding:"2px 8px",fontSize:11,fontWeight:700,whiteSpace:"nowrap"}}>{camp.label}</span>
                      </td>
                      <td style={{...td,textAlign:"left",color:"#1E293B",maxWidth:280,lineHeight:1.4}}>{ev.topic}</td>
                      <td style={td}>
                        <span style={{display:"inline-flex",alignItems:"center",gap:5,fontWeight:600,color:plt.dot,fontSize:12}}>
                          <span style={{width:7,height:7,borderRadius:"50%",background:plt.dot,display:"inline-block"}}/>
                          {plt.label}
                        </span>
                      </td>
                      <td style={td}>
                        <span style={{fontWeight:800,color:STAFF_COLOR[ev.staff]||"#555",fontSize:13}}>{ev.staff}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PROMO DATA ──────────────────────────────────────────────────────────────
const PROMOS = [
  {
    id: "77live",
    campaign: "7.7",
    period: "7–9 ก.ค. 69",
    periodSub: "เฉพาะไลฟ์เท่านั้น",
    color: "#0B2447",
    accent: "#C9B06A",
    bg: "linear-gradient(135deg, #EEF2FF 0%, #FFF8E7 100%)",
    badge: "🎯 ไลฟ์เอ็กซ์คลูซีฟ",
    condition: "ซื้อครบ 700 บาท",
    reward: "รับฟรี! แก้วเก็บความเย็น Macnuts",
    rewardDetail: "เลือกได้ทั้ง 2 สี (ดำ / ขาว)",
    remark: "🛍🎵 แถมทั้ง Shopee Live และ TikTok Live",
    icon: "🥤",
    tags: ["ส่งไวทุกออเดอร์", "ของแท้ 100%", "คอกาแฟห้ามพลาด!"],
  },
  {
    id: "monthly",
    campaign: "ตลอดเดือน ก.ค.",
    period: "ตลอดเดือน ก.ค. 69",
    periodSub: "เฉพาะสินค้าร่วมรายการ",
    color: "#065F46",
    accent: "#34D399",
    bg: "linear-gradient(135deg, #ECFDF5 0%, #F0FFF4 100%)",
    badge: "📅 ตลอดเดือน",
    condition: "ซื้อครบ 499 บาท",
    reward: "รับฟรี! แก้วเชคเกอร์ Macnuts",
    rewardDetail: "เฉพาะสินค้าร่วมรายการเท่านั้น",
    remark: "🛍 เฉพาะช่องทาง Shopee เท่านั้น",
    icon: "🧴",
    tags: ["ส่งไวทุกออเดอร์", "ของแท้ 100%", "คอกาแฟห้ามพลาด!"],
  },
];

// ─── PROMO TAB ────────────────────────────────────────────────────────────────
function PromoTab() {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "24px 20px 48px" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ fontSize: 13, color: "#C9B06A", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>Macnuts Coffee · July 2026</div>
        <div style={{ fontSize: 26, fontWeight: 900, color: "#0B2447" }}>โปรโมชั่นประจำเดือน</div>
        <div style={{ fontSize: 13, color: "#94A3B8", marginTop: 4 }}>ลดกระหน่ำ!! พร้อมของแถมตลอดเดือน</div>
      </div>

      {/* Promo cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {PROMOS.map(p => (
          <div key={p.id} style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", border: `1.5px solid ${p.accent}30` }}>

            {/* Card header */}
            <div style={{ background: p.bg, padding: "20px 24px 18px", borderBottom: `2px solid ${p.accent}40` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
                <div>
                  <span style={{ background: p.color, color: "white", borderRadius: 20, padding: "4px 12px", fontSize: 11, fontWeight: 800 }}>{p.badge}</span>
                  <div style={{ fontSize: 22, fontWeight: 900, color: p.color, marginTop: 10 }}>{p.campaign}</div>
                  <div style={{ fontSize: 13, color: "#64748B", marginTop: 2 }}>📆 {p.period}</div>
                  {p.periodSub && <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 1 }}>{p.periodSub}</div>}
                </div>
                <div style={{ fontSize: 48 }}>{p.icon}</div>
              </div>
            </div>

            {/* Condition & reward */}
            <div style={{ background: "white", padding: "20px 24px" }}>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>

                {/* Condition */}
                <div style={{ flex: 1, minWidth: 160, background: "#F8FAFC", borderRadius: 10, padding: "14px 16px", borderLeft: `4px solid ${p.color}` }}>
                  <div style={{ fontSize: 10, fontWeight: 800, color: "#94A3B8", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>เงื่อนไข</div>
                  <div style={{ fontSize: 18, fontWeight: 900, color: p.color }}>{p.condition}</div>
                </div>

                {/* Arrow */}
                <div style={{ display: "flex", alignItems: "center", fontSize: 22, color: p.accent, fontWeight: 900 }}>→</div>

                {/* Reward */}
                <div style={{ flex: 2, minWidth: 200, background: p.color, borderRadius: 10, padding: "14px 16px" }}>
                  <div style={{ fontSize: 10, fontWeight: 800, color: p.accent, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>ของแถม</div>
                  <div style={{ fontSize: 16, fontWeight: 900, color: "white" }}>{p.reward}</div>
                  {p.rewardDetail && <div style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", marginTop: 4 }}>{p.rewardDetail}</div>}
                </div>
              </div>

              {/* Remark */}
              {p.remark && (
                <div style={{ marginTop: 12, background: "#FEF3C7", border: "1px solid #FDE68A", borderRadius: 8, padding: "8px 12px", fontSize: 12, fontWeight: 700, color: "#B45309" }}>
                  ⚠️ {p.remark}
                </div>
              )}

              {/* Tags */}
              <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
                {p.tags.map(tag => (
                  <span key={tag} style={{ background: "#F1F5F9", color: "#475569", borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: 600 }}>✓ {tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary table */}
      <div style={{ marginTop: 28, background: "white", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <div style={{ background: "#0B2447", padding: "12px 20px" }}>
          <div style={{ color: "#C9B06A", fontWeight: 800, fontSize: 13 }}>📊 สรุปโปรโมชั่น</div>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "#F8FAFC" }}>
              {["Campaign", "ช่วงเวลา", "เงื่อนไข", "ของแถม", "หมายเหตุ"].map(h => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: 0.5, borderBottom: "1px solid #E5E7EB" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PROMOS.map((p, i) => (
              <tr key={p.id} style={{ borderBottom: "1px solid #F1F5F9", background: i % 2 === 0 ? "white" : "#FAFBFC" }}>
                <td style={{ padding: "11px 14px" }}>
                  <span style={{ background: p.color, color: "white", borderRadius: 5, padding: "2px 8px", fontSize: 11, fontWeight: 700 }}>{p.campaign}</span>
                </td>
                <td style={{ padding: "11px 14px", color: "#334155", fontWeight: 600 }}>{p.period}</td>
                <td style={{ padding: "11px 14px", color: "#0B2447", fontWeight: 700 }}>{p.condition}</td>
                <td style={{ padding: "11px 14px", color: "#065F46", fontWeight: 600 }}>{p.reward.replace("รับฟรี! ","")}</td>
                <td style={{ padding: "11px 14px", fontSize: 12 }}>
                  <div style={{ color: "#94A3B8" }}>{p.periodSub}</div>
                  {p.remark && <div style={{ color: "#B45309", fontWeight: 700, marginTop: 3 }}>⚠️ {p.remark}</div>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("schedule");
  return (
    <div style={{ fontFamily:"'Sarabun','Noto Sans Thai',sans-serif", background:"#F0EDE8", minHeight:"100vh" }}>

      {/* Top bar */}
      <div style={{ background:"#0B2447", padding:"18px 20px 0" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:8 }}>
            <div>
              <div style={{ fontSize:10, color:"#C9B06A", letterSpacing:3, textTransform:"uppercase" }}>Macnuts Coffee</div>
              <div style={{ fontSize:20, fontWeight:800, color:"white", marginTop:2 }}>Live Operations · กรกฎาคม 2569</div>
            </div>
            {/* Tab switcher */}
            <div style={{ display:"flex", gap:0, borderRadius:"10px 10px 0 0", overflow:"hidden" }}>
              {[
                { id:"schedule", label:"📅 ตารางไลฟ์" },
                { id:"promo",    label:"🎁 โปรโมชั่น" },
                { id:"script",   label:"📋 Script" },
              ].map(t => (
                <button key={t.id} onClick={() => setTab(t.id)} style={{
                  background: tab===t.id ? "#F0EDE8" : "rgba(255,255,255,0.08)",
                  color: tab===t.id ? "#0B2447" : "rgba(255,255,255,0.7)",
                  border:"none", padding:"10px 20px", fontWeight:800, fontSize:13,
                  cursor:"pointer", transition:"all .15s"
                }}>{t.label}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {tab === "schedule" ? <ScheduleTab /> : tab === "promo" ? <PromoTab /> : <ScriptTab />}
    </div>
  );
}
