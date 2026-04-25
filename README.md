# Tax Clinic — Landing Page

A static, single-page landing site for **Tax Clinic** (www.yourtaxclinic.ca) — a personal tax practice serving newcomers, students, and seniors across the GTA and Ontario.

No build step. Plain HTML, CSS, and JavaScript.

---

## Folder structure

```
tax-clinic-site/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── images/
│   ├── logo.svg
│   ├── favicon.svg
│   └── hero-illustration.svg
└── README.md
```

The `docs/` folder contains the design spec and is **not** part of the deployed site.

---

## How to preview locally

Open `index.html` directly in a browser — that's it.

Or, if you want to test the form (Formspree requires a real HTTP origin), serve the folder:

```bash
# Python 3
python3 -m http.server 8000

# or, with Node
npx serve .
```

Then visit http://localhost:8000.

---

## How to deploy

The site is fully static. Pick any of:

- **Netlify** — drag-and-drop the folder at https://app.netlify.com/drop
- **GitHub Pages** — push to a repo, enable Pages on the `main` branch
- **Existing host** — upload all files to the web root via FTP / cPanel / your host's file manager

Make sure `index.html` is at the root of whatever folder you serve.

---

## Wiring up the contact form (5 minutes, one-time)

The form uses **Formspree** so submissions land in your inbox without any backend code.

1. Go to https://formspree.io and sign up (free tier handles 50 submissions/month).
2. Create a new form. When asked for the destination address, enter **info@yourtaxclinic.ca**.
3. Confirm the email Formspree sends to that address.
4. Copy the form's endpoint URL — it looks like `https://formspree.io/f/abcdwxyz`.
5. Open `index.html`, find this line:

   ```html
   <form class="contact-form" id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST" novalidate>
   ```

   Replace `YOUR_FORM_ID` with your real form ID.
6. Save and re-deploy.

Until step 5 is done, the form will show an error message asking visitors to call or email instead.

---

## Editing content

All copy lives in `index.html`. Common edits:

- **Phone number** — search for `647-618-8264` and replace everywhere (header, hero, contact section, footer, JSON-LD).
- **Email** — search for `info@yourtaxclinic.ca` and replace everywhere.
- **Service descriptions** — see the `<section class="services">` block (4 cards: New to Canada, Students, Seniors, Year-round support).
- **Testimonials** — replace the placeholder quotes in `<section class="testimonials">` with real client testimonials before launch. The avatar URLs use `ui-avatars.com` (initials avatars) — swap to real photos when available.
- **FAQ answers** — see the `<section class="faq">` block. Add or remove `<details>` items as needed.
- **Headlines** — the hero `<h1>` is the biggest one to consider.

Color and typography are defined as CSS variables at the top of `css/styles.css` (search for `:root`).

## Replacing the stock photos

The hero portrait, the about-section photo, and the CTA background pull from Unsplash via hotlinking. They render fine but should be swapped to real photos before launch:

1. **Hero portrait** — `index.html`, find `class="hero-photo"` and replace the `src` URL.
2. **About / video photo** — `index.html`, find `class="about-photo"` and replace the `src` URL.
3. **CTA background** — `css/styles.css`, find `.cta-bg` and replace the URL inside the `background` shorthand.

Recommended sizes: hero ~900×1100, about ~900×700, CTA background ~1600×900. Save the photos under `images/` and reference them with relative paths (e.g. `images/hero.jpg`) instead of the Unsplash URL.

---

## Browser support

Modern evergreen browsers (Chrome, Edge, Firefox, Safari). The site uses standard HTML/CSS/JS — no transpilation needed.

---

## License

Proprietary — built for Tax Clinic.
