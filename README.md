<div align="center">
  <img src="docs/assets/jabaa-repo-cover.svg" alt="JABAA Shop — digital learning marketplace" width="100%" />
  <p><strong>Digital products for learners, creators and ambitious builders.</strong></p>
  <p><a href="https://jabashop.store"><strong>Visit JABAA Shop</strong></a> · <a href="https://jabashop.store/about.html">About</a> · <a href="https://jabashop.store/support.html">Support</a></p>
</div>

---

## The marketplace

**JABAA Shop** is a mobile-first digital learning storefront focused on accessible ebooks, practical video courses and creator resources for Ethiopian and international customers. The project combines local **ETB** checkout and externally hosted **USD** checkout for international digital products.

Built with care for small screens, clear browsing and product discovery — designed and iterated from a smartphone.

### Highlights

| Experience | What it offers |
|:--|:--|
| 📚 **Digital bookshelf** | Browse ebooks with portrait cover artwork, compact product cards and detail views |
| 🎬 **Course content** | Course pages and lessons, with learner progress support |
| 🇪🇹 **Local purchases** | ETB pricing and receipt submission with administrator approval |
| 🌍 **International products** | USD listings that can link to Gumroad checkout |
| 🧾 **Customer library** | Account access, purchased content and learning dashboard |
| 💚 **Admin workspace** | Product and receipt management; newer builds also contain promotion and analytics modules |
| 📱 **Responsive interface** | Mobile-first layouts with desktop support |

> **Live site:** [jabashop.store](https://jabashop.store). The deployed Netlify version may differ from the GitHub default branch. See **Repository status** before making changes.

## Product experience

<div align="center">
  <img src="docs/assets/jabaa-book-mark.svg" alt="JABAA Shop open-book symbol" width="100" />
</div>

- **Discover:** Search and explore ebook and course categories.
- **Evaluate:** Check the cover, product format, description, price and available previews.
- **Purchase:** Use the supported local receipt flow or an external international checkout.
- **Learn:** Return to a customer library and course lessons, where available.

## Technology

- **Frontend:** HTML, CSS and JavaScript; some pages use Tailwind via CDN
- **Database & auth:** Supabase (PostgreSQL, Authentication, Storage)
- **International checkout:** Gumroad links
- **Deployment:** Netlify
- **Version control:** GitHub

This is a static frontend connected to hosted services, not a conventional Node build. Never put database passwords, SMTP credentials, service-role API keys or payment secrets in frontend files.

## Source structure

```text
index.html                  Storefront entry (from Netlify export)
admin.html                  Product, receipt and admin tools
dashboard.html              Customer library
course.html                 Learning / video course page
login.html / signup.html    Authentication
profile.html                Customer profile
services.html               Services section
style.css                   Base site styling
app.js                      Storefront JavaScript (from Netlify export)
favorites.js                Wishlist functionality (from Netlify export)
v2.css                      Additional design styles (from Netlify export)
docs/
  assets/                   README-only branding graphics
  DEPLOYMENT.md             Source-of-truth and release instructions
```

Other pages include account recovery, support, security, FAQ, About and privacy/terms. More recent Netlify exports include extra `shop-v3*.css` / `shop-v3*.js` files and branded image assets. **Not every file shown above is present on the current GitHub default branch.**

## Repository status

**Important:** The GitHub `main` branch was found to contain an **older, incomplete copy** of the storefront. In particular, its root did not include `index.html`, `app.js`, `favorites.js` or `v2.css` at the time this README was prepared. The current storefront was previously deployed to Netlify by uploading a complete ZIP.

**Do not deploy GitHub `main` over the working Netlify site** without first reconciling the complete latest Netlify source, verifying every asset and smoke-testing the result. See [the deployment guide](docs/DEPLOYMENT.md).

## Local preview

Use the **complete source exported from the live Netlify deployment** (not the incomplete GitHub root) and serve it with a static HTTP server. Opening files directly as `file://` may break browser module or authentication behavior.

For example, on a machine with Python installed:

```bash
python -m http.server 8080
```

Then visit `http://localhost:8080`. Most Supabase-backed interactions require real project configuration and allowed authentication redirect URLs; prefer a separate staging project when testing writes.

## Safe deployment

1. Obtain and back up the complete latest source ZIP from the active Netlify site.
2. Reconcile all missing files and assets into a **staging branch**; do not overwrite `main` blindly.
3. Deploy a **separate Netlify preview** and test at mobile and desktop widths.
4. Test authentication, product browsing, local receipts, download permissions, course access and Gumroad redirects.
5. Review Supabase RLS and migration changes separately; do not include private secrets in the repo.
6. Publish only after verifying behavior and keeping a rollback-ready Netlify deploy.

See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for a detailed checklist.

## Security and data

- Customer receipt approval must be enforced with **database RLS**, not a frontend email check.
- Avoid public URLs for paid course files if direct access would bypass purchase checks.
- The optional analytics/promotions module needs its own verified database migration.
- Back up Supabase database **and Storage object files** before migrations; a database-only export does not include the files themselves.
- Never commit `.env` files, database URLs with passwords, encryption passphrases, customer exports or payment screenshots.

## Project

Created and maintained by **Geda Taye**. Built from an Android smartphone with a focus on useful digital products, practical learning and a more accessible online storefront.

**[Explore the store →](https://jabashop.store)**
