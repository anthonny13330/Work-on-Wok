# Work on Pan — Guia de Integração Supabase

## Visão geral das alterações

| Ficheiro | O que mudou |
|---|---|
| `supabase_schema.sql` | **NOVO** — Schema completo da base de dados |
| `supabase.js` | **NOVO** — Cliente Supabase partilhado (import ES Module) |
| `login.html` | Auth real com `signInWithPassword` / `signUp` + reset de senha |
| `projetos.html` | Projetos carregados da tabela `projetos` via Supabase + propostas gravadas na BD |

---

## Passo 1 — Criar projeto no Supabase

1. Vai a [supabase.com](https://supabase.com) → **New Project**
2. Dá um nome (ex: `work-on-pan`) e define uma senha para a BD
3. Escolhe a região mais próxima (ex: **West Europe**)
4. Aguarda ~2 minutos até o projeto ficar pronto

---

## Passo 2 — Correr o Schema SQL

1. No dashboard, vai a **SQL Editor** → **New Query**
2. Cola todo o conteúdo de `supabase_schema.sql`
3. Clica **Run**
4. Verifica em **Table Editor** que as tabelas `profiles`, `projetos` e `propostas` foram criadas

---

## Passo 3 — Obter as credenciais

1. No dashboard, vai a **Settings → API**
2. Copia:
   - **Project URL** → ex: `https://abcxyz.supabase.co`
   - **anon / public key** → chave longa começada por `eyJ...`

---

## Passo 4 — Substituir as credenciais nos ficheiros

Em cada ficheiro HTML (e em `supabase.js` se usares módulos), substitui:

```js
const SUPABASE_URL  = 'https://XXXXXXXXXXXXXXXX.supabase.co';
const SUPABASE_ANON = 'eyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
```

pelos valores reais copiados no Passo 3.

---

## Passo 5 — Configurar autenticação

1. No dashboard, vai a **Authentication → Providers**
2. Confirma que o **Email** está ativo
3. Em **Authentication → Email Templates** podes personalizar os e-mails
4. **Recomendado para desenvolvimento:** em **Authentication → Settings** desativa **"Confirm email"** para testes mais rápidos (volta a ativar em produção)

---

## Passo 6 — Testar

1. Abre `login.html` no browser
2. Seleciona **Freelancer** e cria uma conta
3. Verifica em **Authentication → Users** que o utilizador aparece
4. Verifica em **Table Editor → profiles** que o perfil foi criado automaticamente pelo trigger
5. Abre `projetos.html` — se a tabela `projetos` estiver vazia, verás os dados de demonstração; se tiveres projetos na BD, carregam automaticamente

---

## Estrutura das tabelas

### `profiles`
| Coluna | Tipo | Descrição |
|---|---|---|
| `id` | uuid | FK para `auth.users` |
| `nome` | text | Primeiro nome |
| `tipo` | text | `freelancer` ou `cliente` |
| `avatar_url` | text | URL da foto de perfil |
| `skills` | text[] | Array de competências |

### `projetos`
| Coluna | Tipo | Descrição |
|---|---|---|
| `id` | uuid | PK auto-gerado |
| `cliente_id` | uuid | FK para `profiles` |
| `titulo` | text | Título do projeto |
| `categoria` | text | Design, Dev, Marketing, etc. |
| `budget` | numeric | Orçamento |
| `moeda` | text | EUR, BRL, USD, etc. |
| `prazo_dias` | int | Dias para conclusão |
| `estado` | text | `aberto`, `em_curso`, `fechado` |

### `propostas`
| Coluna | Tipo | Descrição |
|---|---|---|
| `id` | uuid | PK auto-gerado |
| `projeto_id` | uuid | FK para `projetos` |
| `freelancer_id` | uuid | FK para `profiles` |
| `valor` | numeric | Valor proposto |
| `prazo_entrega` | text | Ex: "10 dias" |
| `estado` | text | `pendente`, `aceite`, `rejeitada` |

---

## Segurança (Row Level Security)

O schema já inclui políticas RLS:
- **Projetos e perfis** são visíveis a todos (leitura pública)
- **Freelancers** só podem ver/editar as suas próprias propostas
- **Clientes** só podem ver propostas dos seus projetos
- **Utilizadores** só podem editar o seu próprio perfil

---

## Próximos passos sugeridos

- [ ] Ligar `cadastro.html` ao Supabase (usar o mesmo `signUp` do `login.html`)
- [ ] Ligar `perfil.html` para mostrar dados reais do utilizador e as suas propostas
- [ ] Adicionar formulário de publicação de projeto para clientes
- [ ] Implementar notificações por e-mail via Supabase Edge Functions
- [ ] Configurar Supabase Storage para fotos de perfil
