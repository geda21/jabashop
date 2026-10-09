/** JABAA Shop profile compatibility module; identical public Supabase project, no server keys. */
const SUPABASE_URL = 'https://wuwfjdxgeoqcbqsbxuho.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_6urNqkD2HYEHZtmVXSS8jQ_ByVqLB5T';
export const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
export function showToast(message, type = 'success') {
  const node = document.createElement('div');
  node.setAttribute('role', 'status');
  node.style.cssText = 'position:fixed;bottom:20px;right:16px;left:16px;max-width:420px;margin-left:auto;z-index:300;background:#14231a;border:1px solid #347a4e;border-radius:12px;padding:14px;color:white;font-size:14px;box-shadow:0 8px 30px #0008';
  node.style.borderColor = type === 'error' ? '#b34444' : '#347a4e';
  node.textContent = String(message);
  document.body.appendChild(node);
  setTimeout(() => node.remove(), 3800);
}
export function setLoadingState(buttonId, busy, label = 'Saving...') {
  const button = document.getElementById(buttonId);
  if (!button) return;
  if (busy) { button.dataset.normalText = button.textContent; button.disabled = true; button.textContent = label; }
  else { button.disabled = false; button.textContent = button.dataset.normalText || button.textContent; }
}
