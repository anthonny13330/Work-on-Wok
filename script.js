// ========================
// MOEDAS DISPONÍVEIS
// ========================
const MOEDAS = {
  EUR: { simbolo: '€',  nome: 'Euro',          locale: 'pt-PT' },
  BRL: { simbolo: 'R$', nome: 'Real Brasileiro', locale: 'pt-BR' },
  USD: { simbolo: '$',  nome: 'Dólar Americano', locale: 'en-US' },
  GBP: { simbolo: '£',  nome: 'Libra Esterlina', locale: 'en-GB' },
  CHF: { simbolo: 'Fr', nome: 'Franco Suíço',    locale: 'de-CH' },
  CAD: { simbolo: 'C$', nome: 'Dólar Canadiano', locale: 'en-CA' },
};

const MOEDA_PADRAO = 'EUR'; // € por defeito

// ========================
// DADOS DE PROJETOS
// ========================
const projetos = [
  {
    id: 1,
    titulo: "Redesign de identidade visual para startup",
    desc: "Precisamos renovar nosso logo, paleta de cores e guia de marca completo para reposicionamento de mercado.",
    categoria: "Design",
    budget: 1200,
    moeda: "EUR",
    prazo: 15,
    tags: ["Branding", "Figma", "Illustrator"],
    cliente: "TechStart Ltda",
    propostas: 4,
    data: "2025-06-01"
  },
  {
    id: 2,
    titulo: "Desenvolvimento de app mobile para delivery",
    desc: "App iOS e Android para pedidos de restaurante com integração de pagamento, rastreamento em tempo real.",
    categoria: "Dev",
    budget: 4500,
    moeda: "BRL",
    prazo: 45,
    tags: ["React Native", "Node.js", "API REST"],
    cliente: "FoodExpress",
    propostas: 7,
    data: "2025-05-30"
  },
  {
    id: 3,
    titulo: "Gestão de redes sociais — 3 meses",
    desc: "Criação de conteúdo e gerenciamento de Instagram e LinkedIn para e-commerce de moda.",
    categoria: "Marketing",
    budget: 800,
    moeda: "EUR",
    prazo: 90,
    tags: ["Instagram", "Copywriting", "Canva"],
    cliente: "ModaVibe",
    propostas: 12,
    data: "2025-05-28"
  },
  {
    id: 4,
    titulo: "Landing page para lançamento de curso",
    desc: "Página de vendas completa com seções de benefícios, depoimentos, FAQ e integração com plataforma de pagamento.",
    categoria: "Dev",
    budget: 950,
    moeda: "USD",
    prazo: 10,
    tags: ["HTML/CSS", "JavaScript", "WordPress"],
    cliente: "EduPro Cursos",
    propostas: 9,
    data: "2025-05-27"
  },
  {
    id: 5,
    titulo: "Produção de vídeos institucionais (5 vídeos)",
    desc: "Roteiro, filmagem e edição de 5 vídeos curtos (1-2 min) para apresentar a empresa e seus produtos.",
    categoria: "Vídeo",
    budget: 3200,
    moeda: "EUR",
    prazo: 30,
    tags: ["Premiere", "After Effects", "Roteiro"],
    cliente: "Construtora Alfa",
    propostas: 3,
    data: "2025-05-26"
  },
  {
    id: 6,
    titulo: "Dashboard de BI para análise de vendas",
    desc: "Criação de dashboard interativo no Power BI conectado ao banco de dados PostgreSQL com KPIs de vendas.",
    categoria: "Dados",
    budget: 2100,
    moeda: "GBP",
    prazo: 20,
    tags: ["Power BI", "SQL", "PostgreSQL"],
    cliente: "Distribuidora Norte",
    propostas: 5,
    data: "2025-05-25"
  },
  {
    id: 7,
    titulo: "Redação de 20 artigos para blog corporativo",
    desc: "Artigos de 800-1200 palavras sobre tecnologia, SEO-friendly, com pesquisa e revisão incluídas.",
    categoria: "Redação",
    budget: 600,
    moeda: "EUR",
    prazo: 25,
    tags: ["SEO", "Wordpress", "Copywriting"],
    cliente: "AgênciaWeb360",
    propostas: 18,
    data: "2025-05-24"
  },
  {
    id: 8,
    titulo: "Sistema de gestão de estoque (web)",
    desc: "CRUD completo com controle de entrada/saída, relatórios e autenticação de usuários.",
    categoria: "Dev",
    budget: 6500,
    moeda: "BRL",
    prazo: 60,
    tags: ["Python", "Django", "React"],
    cliente: "Atacado Max",
    propostas: 6,
    data: "2025-05-23"
  },
  {
    id: 9,
    titulo: "Design de UI para plataforma SaaS",
    desc: "Design completo de interface no Figma para plataforma de gestão de projetos — 15 telas.",
    categoria: "Design",
    budget: 2800,
    moeda: "EUR",
    prazo: 21,
    tags: ["Figma", "UI Design", "Design System"],
    cliente: "FlowWork",
    propostas: 8,
    data: "2025-05-22"
  },
  {
    id: 10,
    titulo: "Campanha Google Ads + Meta Ads",
    desc: "Criação, gestão e otimização de campanhas de tráfego pago para loja virtual.",
    categoria: "Marketing",
    budget: 1400,
    moeda: "USD",
    prazo: 30,
    tags: ["Google Ads", "Meta Ads", "Analytics"],
    cliente: "Loja Online XYZ",
    propostas: 11,
    data: "2025-05-21"
  }
];

// ========================
// UTILITÁRIOS
// ========================
function formatBudget(val, codigoMoeda) {
  const moeda = MOEDAS[codigoMoeda] || MOEDAS[MOEDA_PADRAO];
  return `${moeda.simbolo} ${val.toLocaleString(moeda.locale)}`;
}

function badgeMoeda(codigoMoeda) {
  const moeda = MOEDAS[codigoMoeda] || MOEDAS[MOEDA_PADRAO];
  return `<span class="moeda-badge moeda-${codigoMoeda}" title="${moeda.nome}">${codigoMoeda}</span>`;
}

function catClass(cat) {
  const map = { 'Design': 'design', 'Dev': 'dev', 'Marketing': 'mkt', 'Redação': 'mkt', 'Vídeo': 'design', 'Dados': 'dev' };
  return map[cat] || 'design';
}

// ========================
// RENDERIZAR PROJETOS
// ========================
function renderProjetos(lista) {
  const container = document.getElementById('projetosList');
  const label = document.getElementById('totalLabel');
  if (!container) return;

  label.textContent = `${lista.length} projeto${lista.length !== 1 ? 's' : ''} encontrado${lista.length !== 1 ? 's' : ''}`;

  if (lista.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:60px 20px;color:var(--gray)">
        <div style="font-size:2.5rem;margin-bottom:12px">🔍</div>
        <p>Nenhum projeto encontrado com esses filtros.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = lista.map(p => `
    <div class="projeto-item" onclick="abrirModal(${p.id})">
      <div class="projeto-item-top">
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
          <span class="proj-cat ${catClass(p.categoria)}">${p.categoria}</span>
          <h3>${p.titulo}</h3>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          ${badgeMoeda(p.moeda || MOEDA_PADRAO)}
          <span class="projeto-item-budget">${formatBudget(p.budget, p.moeda || MOEDA_PADRAO)}</span>
        </div>
      </div>
      <p>${p.desc}</p>
      <div class="proj-tags">
        ${p.tags.map(t => `<span>${t}</span>`).join('')}
      </div>
      <div class="projeto-item-footer">
        <div class="meta">
          <span>📅 ${p.prazo} dias</span>
          <span>💬 ${p.propostas} propostas</span>
          <span>🏢 ${p.cliente}</span>
        </div>
        <button class="btn-proj" onclick="event.stopPropagation();abrirModal(${p.id})">Ver & Propor</button>
      </div>
    </div>
  `).join('');
}

// ========================
// FILTROS
// ========================
function filtrarProjetos() {
  const search = (document.getElementById('searchInput')?.value || '').toLowerCase();
  const budget = document.getElementById('budgetFilter')?.value;
  const prazo = document.getElementById('prazoFilter')?.value;
  const sort = document.getElementById('sortSelect')?.value || 'recente';

  const categorias = [...document.querySelectorAll('.checkbox-list input:checked')].map(el => el.value);

  let lista = projetos.filter(p => {
    const matchSearch = !search || p.titulo.toLowerCase().includes(search) || p.desc.toLowerCase().includes(search) || p.tags.some(t => t.toLowerCase().includes(search));
    const matchCat = categorias.length === 0 || categorias.includes(p.categoria);
    const matchBudget = !budget || p.budget <= parseInt(budget);
    const matchPrazo = !prazo || p.prazo <= parseInt(prazo);
    return matchSearch && matchCat && matchBudget && matchPrazo;
  });

  if (sort === 'maior') lista.sort((a, b) => b.budget - a.budget);
  else if (sort === 'menor') lista.sort((a, b) => a.budget - b.budget);
  else if (sort === 'prazo') lista.sort((a, b) => a.prazo - b.prazo);
  else lista.sort((a, b) => new Date(b.data) - new Date(a.data));

  renderProjetos(lista);
}

function limparFiltros() {
  document.querySelectorAll('.checkbox-list input').forEach(el => el.checked = false);
  if (document.getElementById('searchInput')) document.getElementById('searchInput').value = '';
  if (document.getElementById('budgetFilter')) document.getElementById('budgetFilter').value = '';
  if (document.getElementById('prazoFilter')) document.getElementById('prazoFilter').value = '';
  if (document.getElementById('sortSelect')) document.getElementById('sortSelect').value = 'recente';
  filtrarProjetos();
}

// ========================
// MODAL
// ========================
let projetoAtual = null;

function abrirModal(id) {
  const p = projetos.find(x => x.id === id);
  if (!p) return;
  projetoAtual = p;

  const moedaCod = p.moeda || MOEDA_PADRAO;
  const moeda = MOEDAS[moedaCod];

  document.getElementById('modalTitulo').textContent = p.titulo;
  document.getElementById('modalDesc').textContent = p.desc;
  document.getElementById('modalBudget').textContent = formatBudget(p.budget, moedaCod);
  document.getElementById('modalMoedaNome').textContent = `${moedaCod} — ${moeda.nome}`;
  document.getElementById('modalPrazo').textContent = `${p.prazo} dias`;

  // Pré-selecionar moeda da proposta igual ao projeto
  document.getElementById('propMoeda').value = moedaCod;

  document.getElementById('propValor').value = '';
  document.getElementById('propPrazo').value = '';
  document.getElementById('propMsg').value = '';
  document.getElementById('propostaSuccess').style.display = 'none';

  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function fecharModal(event) {
  if (event && event.target !== document.getElementById('modalOverlay') && !event.currentTarget.classList?.contains('modal-close')) return;
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const overlay = document.getElementById('modalOverlay');
    if (overlay) { overlay.classList.remove('open'); document.body.style.overflow = ''; }
  }
});

function enviarProposta() {
  const valor = document.getElementById('propValor').value;
  const prazo = document.getElementById('propPrazo').value;
  const msg = document.getElementById('propMsg').value;

  if (!valor || !prazo || !msg) {
    alert('Por favor, preencha todos os campos da proposta.');
    return;
  }

  // Simular envio
  document.getElementById('propostaSuccess').style.display = 'block';
  document.querySelector('.btn-submit').disabled = true;
  document.querySelector('.btn-submit').textContent = 'Proposta enviada ✓';

  setTimeout(() => {
    fecharModal({ target: document.getElementById('modalOverlay') });
    document.querySelector('.btn-submit').disabled = false;
    document.querySelector('.btn-submit').textContent = 'Enviar proposta →';
  }, 2000);
}

// ========================
// CADASTRO
// ========================
let tipoAtual = 'freelancer';

function setTipo(tipo) {
  tipoAtual = tipo;
  document.getElementById('btnFreelancer').classList.toggle('active', tipo === 'freelancer');
  document.getElementById('btnCliente').classList.toggle('active', tipo === 'cliente');
  document.getElementById('camposFreelancer').style.display = tipo === 'freelancer' ? 'block' : 'none';
  document.getElementById('camposCliente').style.display = tipo === 'cliente' ? 'block' : 'none';
}

function handleCadastro(e) {
  e.preventDefault();
  const btn = document.querySelector('.btn-submit');
  btn.textContent = 'Criando conta...';
  btn.disabled = true;

  setTimeout(() => {
    document.getElementById('successMsg').style.display = 'block';
    document.getElementById('cadastroForm').style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 1200);
}

// ========================
// NAV MOBILE
// ========================
function toggleMenu() {
  document.querySelector('.nav-links').classList.toggle('open');
}

// ========================
// INICIALIZAÇÃO
// ========================
document.addEventListener('DOMContentLoaded', () => {
  // Lê parâmetros da URL
  const params = new URLSearchParams(window.location.search);

  // Página cadastro: pré-selecionar tipo
  if (params.get('tipo') && document.getElementById('btnCliente')) {
    setTipo(params.get('tipo'));
  }

  // Página projetos: iniciar lista
  if (document.getElementById('projetosList')) {
    filtrarProjetos();

    // Filtro por categoria via URL
    const cat = params.get('cat');
    if (cat) {
      const map = { design: 'Design', dev: 'Dev', marketing: 'Marketing', texto: 'Redação', video: 'Vídeo', dados: 'Dados' };
      const nome = map[cat];
      if (nome) {
        const cb = document.querySelector(`.checkbox-list input[value="${nome}"]`);
        if (cb) { cb.checked = true; filtrarProjetos(); }
      }
    }
  }
});