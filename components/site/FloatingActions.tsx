import { getSettings, getTx, getWa } from "@/lib/data";
import type { Locale } from "@/lib/i18n";

export async function FloatingActions({ l }: { l: Locale }) {
  const [s, tx, wa] = await Promise.all([getSettings(l), getTx(l), getWa(l)]);
  return (
    <div className="fl">
      <a href={`tel:${s.phone}`} style={{ background: "#2563EB" }} aria-label={tx("ct.call")}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" /></svg>
      </a>
      <a href={wa(tx("wa.gen"))} style={{ background: "#25D366" }} aria-label="WhatsApp" rel="noopener noreferrer">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.1l-.9 1.1c-.2.2-.3.2-.6.1a7.8 7.8 0 0 1-3.9-3.4c-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5l-.9-2.1c-.2-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.8 3.8 0 0 0-1.2 2.8c0 1.7 1.2 3.3 1.4 3.5.2.2 2.4 3.7 5.8 5.1 2.1.9 2.9.9 3.4.8.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.600 15L2 22l5.200-1.400A10 10 0 1 0 12 2z" /></svg>
      </a>
    </div>
  );
}
