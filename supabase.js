// ============================================================
//  supabase.js — cliente partilhado (importa em cada página)
//  Substitui os valores abaixo pelos teus no dashboard Supabase:
//  Settings → API → Project URL  +  anon/public key
// ============================================================

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// 🔑 SUBSTITUI AQUI
const SUPABASE_URL  = 'https://dsxsvnzcrouazkkdbpym.supabase.co';
const SUPABASE_ANON = 'sb_publishable_QjkIhpoe1K9AZO_nTUXO0A_LaE2gTqP';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

// ── Helpers de moeda (mantidos do script original) ──────────
export const MOEDAS = {
  EUR: { simbolo: '€',  nome: 'Euro',           locale: 'pt-PT' },
  BRL: { simbolo: 'R$', nome: 'Real Brasileiro', locale: 'pt-BR' },
  USD: { simbolo: '$',  nome: 'Dólar Americano', locale: 'en-US' },
  GBP: { simbolo: '£',  nome: 'Libra Esterlina', locale: 'en-GB' },
  CHF: { simbolo: 'Fr', nome: 'Franco Suíço',    locale: 'de-CH' },
  CAD: { simbolo: 'C$', nome: 'Dólar Canadiano', locale: 'en-CA' },
};

export function formatBudget(val, cod) {
  const m = MOEDAS[cod] || MOEDAS['EUR'];
  return `${m.simbolo} ${Number(val).toLocaleString(m.locale)}`;
}

export function badgeMoeda(cod) {
  return `<span class="moeda-badge moeda-${cod}" title="${(MOEDAS[cod]||{}).nome||cod}">${cod}</span>`;
}

export function catClass(cat) {
  const map = { Design:'design', Dev:'dev', Marketing:'mkt', 'Redação':'mkt', 'Vídeo':'design', Dados:'dev' };
  return map[cat] || 'design';
}

// ── Auth helpers ────────────────────────────────────────────
export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export async function getProfile(userId) {
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return data;
}

/** Redireciona para login se não estiver autenticado */
export async function requireAuth(redirectTo = 'login.html') {
  const session = await getSession();
  if (!session) { window.location.href = redirectTo; return null; }
  return session;
}
