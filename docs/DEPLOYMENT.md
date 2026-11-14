# JABAA Shop — release and deployment guide

## Current source of truth

The production `jabashop.store` deployment was updated directly from a Netlify ZIP. The GitHub `main` branch is missing frontend files that exist in the exported Netlify package. Treat the latest **working Netlify deployment** as the source of truth until reconciled. The README/graphics updates on this documentation branch are **not** a replacement for the production website.

## Safest procedure

1. Download or retain a copy of the currently working Netlify deployment and note its deploy ID.
2. Compare the ZIP file list with GitHub. In particular verify `index.html`, `app.js`, `favorites.js`, `v2.css`, the `assets/` images and all `shop-v3*.css/js` components.
3. Import the verified Netlify files into a **separate staging branch**. Maintain existing folder structure and root-level `index.html`.
4. Check no private Supabase database passwords, service-role keys, mail credentials or customer exports are included.
5. Preview on a new Netlify test site. Do not attach `jabashop.store` to the staging project.
6. Test browsing, mobile tap behavior, full product details, local receipts, admin approval, course downloads and Gumroad URLs. Confirm real data still appears.
7. Test database migrations in a staging Supabase project first. Back up PostgreSQL records **and** Storage files. Verify RLS separately.
8. Only then update the production Netlify deployment. Keep the prior successful deploy for rollback.

## Release smoke tests

- [ ] Homepage renders and book covers load at 320px, 390px, tablet and desktop widths
- [ ] Local ETB products show correct price, open details and submit receipts
- [ ] International USD product links reach the intended Gumroad listings
- [ ] Anonymous customer cannot read another customer's receipts or protected course files
- [ ] Customer can sign up/sign in and retrieve their own library
- [ ] Admin can approve a receipt; ordinary customer cannot approve one
- [ ] Free content does not accidentally require a receipt
- [ ] Promotions and metrics display accurately **only after** their required SQL migration and authorization are verified
- [ ] Password reset and approved redirect URLs still work
- [ ] Old Netlify release can be restored if anything regresses

## GitHub workflow

- Keep `main` unchanged until the source reconciliation is complete.
- Make updates on a feature branch and open a pull request.
- A **draft pull request** is not a production deployment.
- If Netlify is configured to build from GitHub, even a documentation-only merge may trigger a deployment; check your site's production branch/build settings first.
- GitHub Actions backup workflows require encrypted secrets configured through repository settings; do not expose secrets in PRs.

## Contact and licenses

JABAA Shop remains its creator's project. No open-source license is implied by this repository. For questions or support use [jabashop.store](https://jabashop.store).
