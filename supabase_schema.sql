-- ============================================================
--  WORK ON PAN — Supabase Schema
--  Corre este SQL no Supabase SQL Editor (Dashboard → SQL)
-- ============================================================

-- ── EXTENSÕES ───────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ── PERFIS DE UTILIZADOR ────────────────────────────────────
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  nome        text not null,
  sobrenome   text,
  tipo        text not null check (tipo in ('freelancer', 'cliente')),
  avatar_url  text,
  bio         text,
  skills      text[],
  localizacao text,
  website     text,
  created_at  timestamptz default now()
);

-- RLS: cada utilizador só pode ver/editar o seu próprio perfil
alter table public.profiles enable row level security;

create policy "Perfis visíveis a todos" on public.profiles
  for select using (true);

create policy "Utilizador edita o seu perfil" on public.profiles
  for all using (auth.uid() = id);

-- ── PROJETOS ────────────────────────────────────────────────
create table if not exists public.projetos (
  id          uuid primary key default uuid_generate_v4(),
  cliente_id  uuid references public.profiles(id) on delete cascade,
  titulo      text not null,
  descricao   text not null,
  categoria   text not null check (categoria in ('Design','Dev','Marketing','Redação','Vídeo','Dados')),
  budget      numeric(12,2) not null,
  moeda       text not null default 'EUR' check (moeda in ('EUR','BRL','USD','GBP','CHF','CAD')),
  prazo_dias  int not null,
  tags        text[],
  estado      text default 'aberto' check (estado in ('aberto','em_curso','fechado')),
  created_at  timestamptz default now()
);

alter table public.projetos enable row level security;

create policy "Projetos visíveis a todos" on public.projetos
  for select using (true);

create policy "Clientes gerem os seus projetos" on public.projetos
  for all using (auth.uid() = cliente_id);

-- ── PROPOSTAS ───────────────────────────────────────────────
create table if not exists public.propostas (
  id              uuid primary key default uuid_generate_v4(),
  projeto_id      uuid references public.projetos(id) on delete cascade,
  freelancer_id   uuid references public.profiles(id) on delete cascade,
  valor           numeric(12,2) not null,
  moeda           text not null default 'EUR',
  prazo_entrega   text not null,
  mensagem        text not null,
  estado          text default 'pendente' check (estado in ('pendente','aceite','rejeitada')),
  created_at      timestamptz default now(),
  unique (projeto_id, freelancer_id)
);

alter table public.propostas enable row level security;

create policy "Freelancer vê as suas propostas" on public.propostas
  for select using (auth.uid() = freelancer_id);

create policy "Cliente vê propostas dos seus projetos" on public.propostas
  for select using (
    auth.uid() = (select cliente_id from public.projetos where id = projeto_id)
  );

create policy "Freelancer envia proposta" on public.propostas
  for insert with check (auth.uid() = freelancer_id);

create policy "Freelancer/Cliente actualizam proposta" on public.propostas
  for update using (
    auth.uid() = freelancer_id or
    auth.uid() = (select cliente_id from public.projetos where id = projeto_id)
  );

-- ── TRIGGER: criar perfil após registo ──────────────────────
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, nome, tipo)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'nome', split_part(new.email,'@',1)),
    coalesce(new.raw_user_meta_data->>'tipo', 'freelancer')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── DADOS DE DEMONSTRAÇÃO ───────────────────────────────────
-- (Opcional — só corre se quiseres projetos de exemplo sem login de cliente)
-- Descomenta se quiseres popular a tabela com dados estáticos de demonstração.
/*
insert into public.projetos (cliente_id, titulo, descricao, categoria, budget, moeda, prazo_dias, tags)
values
  (null,'Redesign de identidade visual para startup','Precisamos renovar logo, paleta e guia de marca.','Design',1200,'EUR',15,'{Branding,Figma,Illustrator}'),
  (null,'App mobile para delivery','App iOS e Android com pagamento e rastreamento.','Dev',4500,'BRL',45,'{React Native,Node.js,API REST}');
*/
