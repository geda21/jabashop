JABAA SHOP — FINAL GITHUB MERGE PACKAGE (2026-10-09)
====================================================
THE ZIP FILES ARE NOT SELF-DEPLOYING. Extract FIRST; use GitHub's Add file > Upload files
in the existing repository root, replacing same-named files, and commit changes.

RECOMMENDED: FINAL-GITHUB-PATCH.zip (the files actually changed/added).
DO NOT DELETE the existing repository's reset-password.html, ads.txt, favicon assets,
other files, GitHub workflows or deployment configuration.

HOMEPAGE: Only index.html (lowercase) is included in this clean package.
The previous package had a duplicate capital-I Index.html that was byte-for-byte
identical; the duplicate is removed here. Existing GitHub repository currently
contains Index.html: uploading lowercase index.html will NOT automatically delete
Index.html. After backing up the repository, verify a preview deployment and
then delete/rename the old capital-I Index.html in the same branch so only
index.html remains. All internal links point to lowercase index.html.

FEATURES
- Mobile-first JABAA Shop hero and marketplace. Search, local/international tabs,
  product-type filters, browser-only favorites saved in IndexedDB.
- Local books/PDFs have portrait-type covers; videos display at 16:9; unknown
  international types remain other digital products (not guessed).
- Cover art is not stretched; source images that are landscape stay complete.
- Read-more buttons appear only when text is visually truncated.
- Mobile dashboard 2+1 statistics, clear transaction statuses, compact owned/shop
  cards, remove fabricated ratings/review counters.
- Correct stale #courses/#featured menu links to existing #local-store.
- Supabase tables, public project config, international Gumroad checkout URLs,
  local receipts, upload, payment approval and authenticated courses preserved.
- Profile's previously missing app.js added; account deletion intentionally
  requests assistance instead of pretending to permanently delete an Auth user.
- Claims without verified evidence on About and Services pages were softened.

REQUIRED TESTS BEFORE LIVE TRAFFIC
1. Check mobile & desktop layout on actual deployed HTTPS preview.
2. Sign up, log in, log out, password reset, account profile settings.
3. Browse local and international products; check Gumroad destination.
4. Submit a local payment receipt; approve/reject in admin and confirm library access.
5. Test course playback/progress and PDF downloads on real approved purchases.
6. Save/remove a favorite, refresh; test both guest and signed-in contexts.
7. Verify existing domain, favicon, ad configuration, old URLs and rollback.

IMPORTANT LIMITS: Live Supabase and real payment end-to-end flows were NOT run in
this environment, and therefore are NOT represented as confirmed working.
Favorites only persist in the same browser/device (clearing site data removes them).
All application records remain on your existing Supabase project; no SQL or RLS
change is required for these UI features.

SAFE DEPLOY: Create a repository backup/tag and a staging branch first. Upload
this patch on a PR/branch, test on a preview deploy, then merge only after passing.
