# JABAA Shop — Supabase backup setup

This is an **on-demand encrypted database export** for the GitHub repository. It does not change your live site or database.

## Before starting
1. Create a **strong unique encryption passphrase** (at least 20 characters). Store it somewhere safe **outside GitHub**. Losing it makes the backup unrecoverable.
2. In **GitHub → jabashop → Settings → Secrets and variables → Actions**, create two repository secrets:
   - `SUPABASE_DB_URL`: Supabase **direct PostgreSQL connection URI**, or a session-pooler PostgreSQL connection URI if your network cannot use IPv6; use the database password from your Supabase dashboard. Set SSL requirements according to Supabase's connection details. Do NOT use the Supabase project URL, anon key, or service-role API key.
   - `BACKUP_PASSPHRASE`: The strong encryption passphrase saved above.
3. Merge the PR **only after reviewing the workflow**. The Actions tab normally recognizes manual `workflow_dispatch` runs when the workflow is present in your **default branch**.
4. In **Actions → Encrypted Supabase database backup → Run workflow**, launch it manually.
5. When it succeeds, **download** the encrypted artifact from the workflow run, save it securely off GitHub, and verify that it can be decrypted and inspected on a separate device/environment. GitHub artifacts here expire after **7 days**.

## Decrypting (on a trusted machine with OpenSSL)
```bash
openssl enc -d -aes-256-cbc -pbkdf2 -iter 200000 -in jabashop-db-TIMESTAMP.dump.enc -out jabashop.dump
pg_restore --list jabashop.dump
```
Supply the passphrase when asked; never post it or the database URI in chat.

## Scope / limitations
- The script uses PostgreSQL `pg_dump` for schemas `public`, `auth`, `storage`. It includes database **metadata and records**, potentially private user and customer information.
- **Supabase Storage object bytes (actual PDFs, covers, receipt uploads, images and videos) are NOT backed up by pg_dump.** Back up storage buckets separately.
- Supabase-managed roles, cluster settings and some managed extensions may need separate configuration to fully restore. This is **not** a validated point-in-time full-project backup.
- The connection must allow schema reads; if a managed schema or role prevents the dump, the workflow fails and needs troubleshooting. Avoid broadening permissions blindly.
- The dump is streamed to OpenSSL, rather than saved as a plaintext file on the runner.
- The workflow is intentionally manual and uses a short 7-day artifact retention period.
- After the backup is downloaded and verified, separately review and test the analytics migration in staging.

## Security
- Never place passwords in the YAML, code, issues, PR comments, screenshots or chat.
- GitHub Actions workflows run on GitHub infrastructure. Protect this private repository, account, Actions secrets and artifact permissions.
