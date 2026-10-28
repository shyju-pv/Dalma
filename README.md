# Dalma Ayurvedic: Next.js + Supabase, English and Arabic

Next.js 15 (App Router) · React 19 · TypeScript · Supabase (Postgres, Auth, Storage) · server components and ISR · RTL Arabic.

## 1. Set up Supabase (10 minutes)
1. Create a project at supabase.com.
2. **SQL Editor**: run `supabase/schema.sql`, then `supabase/seed.sql` (starter content in English and Arabic).
3. **Authentication → Users → Add user**: create your admin account (email and password).
4. In the SQL Editor run, with your email:
   `insert into admins (user_id) select id from auth.users where email = 'YOU@EXAMPLE.COM';`
5. **Project Settings → API**: copy the Project URL and the `anon` public key.

## 2. Run the site
```bash
npm install
cp .env.example .env.local     # paste the Supabase URL + anon key, set NEXT_PUBLIC_SITE_URL
npm run dev                    # http://localhost:3000  (redirects to /en or /ar)
```
Deploy on Vercel: import the repo and add the same environment variables. Never put the `service_role` key in this project; it is not needed.

## 3. Admin: `/admin`
Sign in with the admin account. You can:
- **Blog**: add, edit, delete, save as draft, schedule by date, upload a cover photo. English and Arabic side by side.
- **Treatments / Packages**: edit text in both languages, add photos, reorder, hide.
- **Page text**: change any headline, paragraph, button or search-engine title on the site (both languages), with the built-in text shown as placeholder.
- **Contact settings**: phones, WhatsApp number, email, social links, address.
Saving refreshes the public pages immediately (and in any case within 60 seconds).

Security: only users listed in the `admins` table can write. This is enforced by Supabase Row Level Security, not just by the screens. Admin pages are `noindex`, blocked in `robots.txt`, and protected by middleware.

## Arabic
- Routes `/en/...` and `/ar/...`; first visit is redirected by browser language; the choice is remembered; a language switch is in the header.
- `dir="rtl"`, Arabic fonts (Amiri, Cairo), mirrored layout and arrows.
- SEO: `hreflang` (`en-AE`, `ar-AE`, `x-default`) on every page and in the sitemap, per-language titles, descriptions, canonical URLs and structured data.
- **Have a native Arabic speaker review the text before launch**, including the brand name (دالما أيورفيدك) and the medical wording. Anyone can fix wording in `/admin/text`.

## SEO built in (UAE)
Unique titles and descriptions; `MedicalBusiness` JSON-LD (address, phones); `Service`, `Article`, `BreadcrumbList` and visible-FAQ `FAQPage` data; `sitemap.xml` and `robots.txt` generated from the database; Open Graph image; `next/image` (AVIF/WebP); `next/font`; security headers; geo meta for Sharjah. Optional GA4 and Search Console via env vars.

After launch: submit `/sitemap.xml` to Google Search Console and Bing, claim the Google Business Profile (same name, address, phone), add confirmed opening hours and map coordinates in `lib/seo.ts` (`clinicJsonLd`).

## Notes
- Content lives in Supabase. `lib/dict.ts` holds default wording; to add a new editable sentence, add a row there.
- To add a field to an admin form: add the column in Supabase and a line in `lib/admin-config.ts`.
- Not yet included: Arabic Yoga/About body text beyond the defaults, online booking beyond WhatsApp, image alt-text fields, a media library, admin roles other than "admin", Next.js 16 upgrade (`npx @next/codemod@canary upgrade latest`; `middleware.ts` is renamed `proxy.ts` there).
