// Describes what the admin can edit. Adding a field here (plus a column in Supabase) adds it to the admin form.
export type FieldType = "text" | "textarea" | "lines" | "image" | "bool" | "date" | "number" | "slug";
export type Field = { key: string; label: string; type: FieldType; bi?: boolean; hint?: string; required?: boolean };
export type Resource = { table: string; title: string; single?: boolean; order: string; listKey: string; slugFrom?: string; fields: Field[] };

export const resources: Record<string, Resource> = {
  slides: {
    table: "hero_slides", title: "Home hero slides", order: "sort", listKey: "title_en",
    fields: [
      { key: "image_url", label: "Slide photo", type: "image", hint: "Portrait photo, about 1200 x 1350 px (4:4.5). Without a photo an illustration is shown." },
      { key: "badge", label: "Badge (top-left of photo)", type: "text", bi: true },
      { key: "kicker", label: "Small label (bottom card)", type: "text", bi: true },
      { key: "title", label: "Bottom card title", type: "text", bi: true, required: true },
      { key: "sort", label: "Order (1 = first)", type: "number" },
      { key: "published", label: "Published", type: "bool" },
    ],
  },
  blog: {
    table: "blog_posts", title: "Blog posts", order: "published_at", listKey: "title_en", slugFrom: "title_en",
    fields: [
      { key: "slug", label: "URL slug", type: "slug", hint: "Leave empty to create it from the English title." },
      { key: "title", label: "Title", type: "text", bi: true, required: true },
      { key: "category", label: "Category", type: "text", bi: true },
      { key: "tagline", label: "Cover tagline", type: "text", bi: true, hint: "Short line shown on the illustrated cover." },
      { key: "excerpt", label: "Short summary", type: "textarea", bi: true, hint: "Used on cards and in Google results (about 150 characters)." },
      { key: "body", label: "Article text", type: "textarea", bi: true, hint: "Separate paragraphs with a blank line." },
      { key: "cover_url", label: "Cover photo", type: "image" },
      { key: "minutes", label: "Minutes to read", type: "number" },
      { key: "published_at", label: "Publish date", type: "date" },
      { key: "published", label: "Published", type: "bool" },
    ],
  },
  treatments: {
    table: "treatments", title: "Treatments", order: "sort", listKey: "name_en", slugFrom: "name_en",
    fields: [
      { key: "slug", label: "URL slug", type: "slug" },
      { key: "name", label: "Name", type: "text", bi: true, required: true },
      { key: "subtitle", label: "Subtitle", type: "text", bi: true },
      { key: "summary", label: "Description", type: "textarea", bi: true },
      { key: "benefits", label: "Benefits", type: "lines", bi: true, hint: "One per line." },
      { key: "image_url", label: "Photo", type: "image" },
      { key: "sort", label: "Order (1 = first)", type: "number" },
      { key: "published", label: "Published", type: "bool" },
    ],
  },
  packages: {
    table: "packages", title: "Packages", order: "sort", listKey: "name_en",
    fields: [
      { key: "image_url", label: "Package photo", type: "image", hint: "Landscape photo, about 1200 x 800. An illustration is shown if empty." },
      { key: "name", label: "Name", type: "text", bi: true, required: true },
      { key: "tag", label: "Small label", type: "text", bi: true },
      { key: "text", label: "Description", type: "textarea", bi: true },
      { key: "duration", label: "Duration", type: "text", bi: true, hint: "For example: 14 sessions, about 2 weeks." },
      { key: "price", label: "Price in AED", type: "number", hint: "Leave empty to show “Price on request”." },
      { key: "suitable", label: "Good for", type: "text", bi: true, hint: "Short line, for example: weight management and a healthy lifestyle." },
      { key: "features", label: "What is included", type: "lines", bi: true, hint: "One item per line." },
      { key: "popular", label: "Highlight as most popular", type: "bool" },
      { key: "sort", label: "Order (1 = first)", type: "number" },
      { key: "published", label: "Published", type: "bool" },
    ],
  },
  journey: {
    table: "journey_steps", title: "Wellness journey steps", order: "sort", listKey: "title_en",
    fields: [
      { key: "title", label: "Step title", type: "text", bi: true, required: true },
      { key: "text", label: "Description", type: "textarea", bi: true },
      { key: "sort", label: "Order (1 = first)", type: "number" },
      { key: "published", label: "Published", type: "bool" },
    ],
  },
  faqs: {
    table: "faqs", title: "FAQs", order: "sort", listKey: "q_en",
    fields: [
      { key: "q", label: "Question", type: "text", bi: true, required: true },
      { key: "a", label: "Answer", type: "textarea", bi: true, hint: "You can use {phone} and {address}." },
      { key: "sort", label: "Order (1 = first)", type: "number" },
      { key: "published", label: "Published", type: "bool" },
    ],
  },
  testimonials: {
    table: "testimonials", title: "Testimonials", order: "sort", listKey: "name",
    fields: [
      { key: "name", label: "Patient name", type: "text", required: true, hint: "Use first name or initials, and only with the patient’s permission." },
      { key: "role", label: "Treatment or note", type: "text", bi: true, hint: "For example: Shirodhara programme." },
      { key: "quote", label: "Their words", type: "textarea", bi: true, required: true },
      { key: "rating", label: "Rating (1 to 5)", type: "number" },
      { key: "image_url", label: "Photo (optional)", type: "image" },
      { key: "sort", label: "Order (1 = first)", type: "number" },
      { key: "published", label: "Published", type: "bool" },
    ],
  },
  settings: {
    table: "site_settings", title: "Contact settings", single: true, order: "id", listKey: "phone",
    fields: [
      { key: "phone", label: "Landline (with +971)", type: "text" },
      { key: "mobile", label: "Mobile (with +971)", type: "text" },
      { key: "whatsapp", label: "WhatsApp number (digits only, e.g. 971509678737)", type: "text" },
      { key: "email", label: "Email", type: "text" },
      { key: "facebook", label: "Facebook URL", type: "text" },
      { key: "instagram", label: "Instagram URL", type: "text" },
      { key: "po_box", label: "P.O. Box", type: "text" },
      { key: "address", label: "Address", type: "text", bi: true },
      { key: "landmark", label: "Landmark", type: "text", bi: true },
      { key: "header_image_url", label: "Header photo for inner pages", type: "image", hint: "Wide landscape photo (about 1600 x 600). Shown behind the title of every inner page." },
      { key: "about_image_url", label: "Welcome / About photo", type: "image", hint: "If empty, the Welcome section shows four highlights instead." },
      { key: "conditions_bg_url", label: "Background image for “Focused treatments”", type: "image", hint: "Shown faintly behind the section. If empty, a soft botanical pattern is used." },
    ],
  },
};

export const columns = (f: Field) => (f.bi ? [`${f.key}_en`, `${f.key}_ar`] : [f.key]);
export const slugify = (s: string) => s.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
