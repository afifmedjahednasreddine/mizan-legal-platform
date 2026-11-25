/* ==========================================================================
   Avocat DZ — منطق التطبيق
   i18n (عربي/فرنسي) · وضع ليلي · دليل محامين · عقود · طلبات · لوحة بيانية
   ========================================================================== */
'use strict';

const { ALGERIA_WILAYAS, LAWYERS, CONTRACTS, ARTICLES } = window.AVOCAT_DATA;

/* ---------- أدوات مساعدة ---------- */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const store = {
  get(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* وضع خاص */ }
  },
};

/* ==========================================================================
   1) الترجمة عربي / فرنسي
   ========================================================================== */
const I18N = {
  fr: {
    'skip': 'Aller au contenu',
    'brand.tag': 'Plateforme juridique algérienne',
    'mvp': 'Version MVP',
    'nav.problem': 'Problème & Solution',
    'nav.lawyers': 'Annuaire',
    'nav.contracts': 'Modèles',
    'nav.pricing': 'Offres',
    'nav.dashboard': 'Tableau de bord',
    'header.cta': 'Consultation',
    'hero.eyebrow': 'Plateforme juridique algérienne · 58 wilayas',
    'hero.title': 'Votre avocat vérifié,<br /><em>à un clic</em>',
    'hero.desc': 'Avocat DZ connecte citoyens et entreprises à des avocats vérifiés par wilaya et spécialité, avec des modèles juridiques et des outils numériques pour les cabinets.',
    'hero.cta1': 'Trouver un avocat ←',
    'hero.cta2': 'Pourquoi Avocat DZ ?',
    'problem.kicker': 'Pourquoi cette plateforme ?',
    'problem.title': 'Du chaos de la recherche… à la clarté du choix',
    'problem.before': '❌ Avant Avocat DZ',
    'problem.b1': 'Des heures d’appels pour trouver un avocat spécialisé.',
    'problem.b2': 'Aucun moyen de vérifier l’accréditation ou la spécialité réelle.',
    'problem.b3': 'Des modèles juridiques non fiables qui circulent.',
    'problem.b4': 'Des cabinets qui gèrent dossiers et rendez-vous sur papier.',
    'problem.after': '✅ Avec Avocat DZ',
    'problem.a1': 'Un annuaire d’avocats vérifiés, par wilaya et spécialité.',
    'problem.a2': 'Un badge « avocat vérifié » après contrôle de l’accréditation.',
    'problem.a3': 'Un générateur de modèles imprimables en PDF.',
    'problem.a4': 'Un tableau de bord pour gérer demandes et dossiers.',
    'how.kicker': 'Fonctionnement',
    'how.title': 'Trois étapes vers votre avocat',
    'how.s1t': 'Recherchez et comparez',
    'how.s1d': 'Filtrez par wilaya, spécialité, expérience et note ; sauvegardez vos favoris.',
    'how.s2t': 'Demandez une consultation',
    'how.s2d': 'Envoyez les détails de votre affaire via un formulaire simple — sans affichage de prix ni paiement.',
    'how.s3t': 'Suivez votre dossier',
    'how.s3d': 'L’avocat reçoit votre demande sur son tableau de bord et coordonne directement avec vous.',
    'stats.wilayas': 'Wilayas couvertes',
    'stats.lawyers': 'Avocats en vérification',
    'stats.templates': 'Modèles prêts',
    'stats.satisfaction': 'Satisfaction des testeurs',
    'lawyers.kicker': 'Annuaire vérifié',
    'lawyers.title': 'Annuaire des avocats agréés',
    'lawyers.sub': 'Chaque profil « avocat vérifié » a fait l’objet d’un contrôle d’accréditation.',
    'filter.wilaya': 'Wilaya',
    'filter.specialty': 'Spécialité',
    'filter.allSpecs': 'Toutes les spécialités',
    'filter.keyword': 'Mot-clé',
    'filter.keywordPh': 'Nom, ville, sujet…',
    'filter.sort': 'Tri',
    'sort.rating': 'Mieux notés',
    'sort.experience': 'Plus expérimentés',
    'sort.distance': 'Plus proches',
    'filter.favorites': 'Favoris',
    'contracts.kicker': 'Outils pratiques',
    'contracts.title': 'Des modèles remplis et imprimés en minutes',
    'contracts.sub': 'Choisissez un modèle, remplissez les champs, prévisualisez en direct puis imprimez en PDF.',
    'contract.p1': 'Première partie',
    'contract.p2': 'Deuxième partie',
    'contract.subject': 'Objet du contrat',
    'contract.value': 'Valeur financière du contrat (DA)',
    'contract.duration': 'Durée légale',
    'contract.print': '🖨️ Imprimer / PDF',
    'contract.copy': '📋 Copier le texte',
    'contract.disclaimer': '<strong>Avertissement :</strong> modèles indicatifs qui ne remplacent pas une consultation. Faites relire par un avocat vérifié avant toute signature.',
    'contract.ref': 'Document prêt à imprimer',
    'contract.sign1': 'Signature de la première partie (lu et approuvé)',
    'contract.sign2': 'Signature de la deuxième partie (lu et approuvé)',
    'pricing.kicker': 'Modèle économique',
    'pricing.title': 'Abonnements de la plateforme pour avocats',
    'pricing.sub': 'L’abonnement donne des outils numériques et une visibilité vérifiée — ce ne sont ni des honoraires ni une tarification des services d’avocat.',
    'pricing.month': 'DA / mois',
    'pricing.p1t': 'Découverte', 'pricing.p1f1': 'Profil dans l’annuaire', 'pricing.p1f2': 'Réception des demandes', 'pricing.p1f3': 'Badge après vérification',
    'pricing.p2t': 'Professionnel', 'pricing.popular': 'Le plus choisi', 'pricing.p2f1': 'Tout Découverte', 'pricing.p2f2': 'Tableau de bord analytique', 'pricing.p2f3': 'Priorité dans la recherche', 'pricing.p2f4': 'Publication d’articles',
    'pricing.p3t': 'Cabinet', 'pricing.p3f1': 'Comptes multi-utilisateurs', 'pricing.p3f2': 'Gestion avancée des dossiers', 'pricing.p3f3': 'Rapports mensuels', 'pricing.p3f4': 'Support prioritaire',
    'pricing.cta': 'Commencer', 'pricing.cta2': 'Choisir', 'pricing.cta3': 'Nous contacter',
    'roadmap.kicker': 'Où en sommes-nous ?',
    'roadmap.title': 'Feuille de route',
    'roadmap.r1t': 'Lancement du MVP', 'roadmap.r1d': 'Annuaire, modèles et demandes de consultation.',
    'roadmap.r2t': 'Vérification numérique', 'roadmap.r2d': 'Connexion aux listes des barreaux régionaux.',
    'roadmap.r3t': 'Application mobile', 'roadmap.r3d': 'Expérience PWA complète avec notifications.',
    'roadmap.r4t': 'Assistant juridique intelligent', 'roadmap.r4d': 'Réponses sourcées et orientation vers la bonne spécialité.',
    'team.kicker': 'Qui est derrière la plateforme ?',
    'team.title': 'L’équipe',
    'team.m1': 'Afif Medjahed', 'team.m1r': 'Fondateur · Produit & Tech', 'team.m1d': 'Vision, développement produit et expérience utilisateur.',
    'team.m2': 'Dr Soumia Haddad', 'team.m2r': 'Conseillère juridique', 'team.m2d': 'Professeure de droit, supervise les modèles et la vérification.',
    'team.m3': 'Youcef Benaouda', 'team.m3r': 'Ingénierie logicielle', 'team.m3d': 'Architecture, performance et protection des données.',
    'team.m4': 'Lina Gasmi', 'team.m4r': 'Partenariats & Croissance', 'team.m4d': 'Relations avec barreaux, cabinets et incubateurs.',
    'dash.kicker': 'Section secondaire · Avocats',
    'dash.title': 'Tableau de bord du cabinet',
    'dash.sub': 'Demandes reçues avec statuts modifiables et graphiques d’activité.',
    'dash.c1': 'Demandes ce mois', 'dash.c1h': 'En temps réel',
    'dash.c2': 'En attente', 'dash.c2h': 'Réponse attendue',
    'dash.c3': 'Acceptées', 'dash.c3h': 'Rendez-vous en cours',
    'dash.c4': 'Terminées', 'dash.c4h': 'Dossiers clos',
    'dash.chart1': 'Répartition par statut', 'dash.chart2': 'Demandes hebdomadaires',
    'dash.table': 'Demandes de consultation reçues',
    'dash.note': 'Statuts sauvegardés localement',
    'dash.th1': 'Client', 'dash.th2': 'Wilaya', 'dash.th3': 'Sujet', 'dash.th4': 'Type', 'dash.th5': 'Statut',
    'articles.kicker': 'Section secondaire · Savoir',
    'articles.title': 'Bibliothèque juridique',
    'articles.sub': 'Articles et recherches de professeurs et d’avocats.',
    'articles.search': 'Rechercher', 'articles.searchPh': 'Titre, auteur, sujet…',
    'footer.about': 'Plateforme algérienne reliant clients et avocats vérifiés, avec des outils numériques pour les cabinets. Version MVP de démonstration.',
    'footer.links': 'Liens', 'footer.legal': 'Légal', 'footer.privacy': 'Politique de confidentialité', 'footer.disclaimer': 'Avertissement',
    'footer.rights': 'Version MVP, tous droits réservés',
    'modal.title': 'Demande de consultation',
    'modal.context': 'Votre demande arrivera sur le tableau de bord de l’avocat choisi.',
    'modal.note': 'Formulaire de démonstration : la demande est enregistrée dans votre navigateur. Aucune donnée n’est envoyée à un serveur.',
    'modal.name': 'Nom complet *',
    'modal.type': 'Type de consultation *',
    'modal.type1': 'Appel vidéo', 'modal.type2': 'Consultation écrite', 'modal.type3': 'Rendez-vous au cabinet',
    'modal.topic': 'Sujet de l’affaire *',
    'modal.topicPh': 'Décrivez brièvement les faits…',
    'modal.submit': 'Envoyer la demande',
    'verified.title': 'Que signifie « avocat vérifié » ?',
    'verified.body': 'L’équipe a contrôlé la carte professionnelle et le numéro d’accréditation auprès du barreau régional. Cette vérification est indicative et ne remplace pas votre propre contrôle avant tout engagement.',
  },
};

let currentLang = store.get('avocat-lang', 'ar');

function applyLang(lang) {
  currentLang = lang;
  store.set('avocat-lang', lang);
  const isFr = lang === 'fr';
  document.documentElement.lang = isFr ? 'fr' : 'ar';
  document.documentElement.dir = isFr ? 'ltr' : 'rtl';
  $('#lang-toggle').textContent = isFr ? 'ع' : 'FR';
  $$('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (I18N.fr[key] && isFr) el.innerHTML = I18N.fr[key];
    else if (el.dataset.i18nAr) el.innerHTML = el.dataset.i18nAr;
  });
  $$('[data-i18n-ph]').forEach(el => {
    const key = el.dataset.i18nPh;
    if (isFr && I18N.fr[key]) el.placeholder = I18N.fr[key];
    else if (el.dataset.i18nArPh) el.placeholder = el.dataset.i18nArPh;
  });
}

/* حفظ النص العربي الأصلي قبل أول ترجمة لاسترجاعه */
function snapshotArabic() {
  $$('[data-i18n]').forEach(el => { el.dataset.i18nAr = el.innerHTML; });
  $$('[data-i18n-ph]').forEach(el => { el.dataset.i18nArPh = el.placeholder; });
}

/* ==========================================================================
   2) الوضع الليلي
   ========================================================================== */
function initTheme() {
  const btn = $('#theme-toggle');
  const apply = dark => {
    document.documentElement.classList.toggle('dark', dark);
    btn.textContent = dark ? '☀️' : '🌙';
    btn.setAttribute('aria-pressed', String(dark));
    btn.title = dark ? 'الوضع النهاري' : 'الوضع الليلي';
  };
  apply(store.get('avocat-theme', 'light') === 'dark');
  btn.addEventListener('click', () => {
    const dark = !document.documentElement.classList.contains('dark');
    apply(dark);
    store.set('avocat-theme', dark ? 'dark' : 'light');
  });
}

/* ==========================================================================
   3) النوافذ المنبثقة (فتح/إغلاق + Escape + النقر خارجاً)
   ========================================================================== */
let selectedLawyer = null;

function openModal(id) {
  const modal = document.getElementById(id);
  modal.hidden = false;
  const focusable = modal.querySelector('input, select, textarea, button');
  if (focusable) focusable.focus();
}
function closeModal(el) {
  el.closest('.modal-backdrop').hidden = true;
}
function initModals() {
  $$('[data-open-modal]').forEach(btn =>
    btn.addEventListener('click', () => {
      selectedLawyer = btn.dataset.lawyer || null;
      const ctx = $('#modal-lawyer-context');
      ctx.textContent = selectedLawyer
        ? `المحامي المختار: ${selectedLawyer}`
        : (currentLang === 'fr' ? I18N.fr['modal.context'] : ctx.dataset.i18nAr || ctx.textContent);
      openModal(btn.dataset.openModal);
    })
  );
  $$('[data-close-modal]').forEach(btn => btn.addEventListener('click', () => closeModal(btn)));
  $$('.modal-backdrop').forEach(backdrop =>
    backdrop.addEventListener('click', e => { if (e.target === backdrop) backdrop.hidden = true; })
  );
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') $$('.modal-backdrop:not([hidden])').forEach(m => (m.hidden = true));
  });
}

/* ==========================================================================
   4) دليل المحامين: بحث + فلترة + ترتيب + مفضلة + skeleton
   ========================================================================== */
const FAV_KEY = 'avocat-favorites';
let favorites = new Set(store.get(FAV_KEY, []));
let showFavoritesOnly = false;
let lawyersSkeletonTimer = null;

function initials(name) {
  return name.replace(/^الأستاذة?\s*/, '').split(' ').slice(0, 2).map(p => p[0]).join('');
}

function renderLawyerSkeletons() {
  $('#lawyers-grid').innerHTML = Array.from({ length: 6 }, () => `
    <div class="skeleton-card" aria-hidden="true">
      <div style="display:flex;gap:.8rem">
        <div class="sk" style="width:56px;height:56px"></div>
        <div style="flex:1;display:grid;gap:.5rem">
          <div class="sk" style="height:16px;width:70%"></div>
          <div class="sk" style="height:12px;width:50%"></div>
        </div>
      </div>
      <div class="sk" style="height:34px;margin-top:1rem"></div>
      <div class="sk" style="height:14px;margin-top:.8rem;width:85%"></div>
      <div class="sk" style="height:42px;margin-top:1rem"></div>
    </div>`).join('');
}

function renderLawyers(withSkeleton = true) {
  clearTimeout(lawyersSkeletonTimer);
  if (withSkeleton) {
    renderLawyerSkeletons();
    lawyersSkeletonTimer = setTimeout(() => renderLawyers(false), 350);
    return;
  }

  const wVal = $('#wilaya-filter').value;
  const sVal = $('#specialty-filter').value;
  const kVal = $('#keyword-filter').value.trim().toLowerCase();
  const sortVal = $('#lawyer-sort').value;

  let list = LAWYERS.filter(l => {
    const matchW = wVal === 'all' || l.wilaya === wVal;
    const matchS = sVal === 'all' || l.specialties.includes(sVal);
    const matchK = !kVal || [l.name, l.wilaya, l.city, ...l.specialties].join(' ').toLowerCase().includes(kVal);
    const matchFav = !showFavoritesOnly || favorites.has(l.name);
    return matchW && matchS && matchK && matchFav;
  });

  if (sortVal === 'distance') list.sort((a, b) => a.distanceKm - b.distanceKm);
  else if (sortVal === 'experience') list.sort((a, b) => b.experience - a.experience);
  else list.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);

  const fr = currentLang === 'fr';
  $('#results-counter').textContent = fr
    ? `${list.length} avocat(s) vérifié(s) trouvé(s)`
    : `تم العثور على ${list.length} محامٍ موثّق`;
  $('#favorite-count').textContent = favorites.size;

  const grid = $('#lawyers-grid');
  if (!list.length) {
    grid.innerHTML = `<p class="empty-state">${fr ? 'Aucun résultat. Modifiez vos filtres.' : 'لا توجد نتائج مطابقة — جرّب تعديل البحث أو إلغاء تصفية المحفوظين.'}</p>`;
    return;
  }

  grid.innerHTML = list.map(l => {
    const isFav = favorites.has(l.name);
    return `
    <article class="lawyer-card">
      <div class="lc-head">
        <div class="lawyer-avatar" aria-hidden="true">${initials(l.name)}</div>
        <div style="min-width:0;flex:1">
          <h3 class="lawyer-name">${l.name}
            <button type="button" class="verified-badge" data-open-modal="verified-modal"
              title="${fr ? 'Accréditation vérifiée par l’équipe' : 'تمت مراجعة الاعتماد المهني'}">✔ ${fr ? 'Vérifié' : 'موثّق'}</button>
          </h3>
          <p class="lawyer-grade">${l.grade}</p>
          <p class="lawyer-loc">📍 ${l.wilaya} · ${l.city} · ${l.distanceKm} km</p>
        </div>
      </div>
      <div class="lc-meta">
        <span>⭐ <strong>${l.rating}</strong> (${l.reviews})</span>
        <span>${fr ? 'Expérience' : 'الخبرة'}: <strong>${l.experience} ${fr ? 'ans' : 'سنة'}</strong></span>
      </div>
      <div class="lawyer-tags">${l.specialties.map(s => `<span>${s}</span>`).join('')}</div>
      <div class="lc-foot">
        <button type="button" class="btn btn-dark" data-open-modal="request-modal" data-lawyer="${l.name}">${fr ? 'Consultation' : 'اطلب استشارة'}</button>
        <button type="button" class="save-btn" data-fav="${l.name}" aria-pressed="${isFav}"
          aria-label="${fr ? 'Sauvegarder cet avocat' : 'حفظ المحامي في المفضلة'}">${isFav ? '♥' : '♡'}</button>
      </div>
    </article>`;
  }).join('');

  // ربط أزرار البطاقات المولّدة ديناميكياً
  $$('[data-fav]', grid).forEach(btn => btn.addEventListener('click', () => {
    const name = btn.dataset.fav;
    favorites.has(name) ? favorites.delete(name) : favorites.add(name);
    store.set(FAV_KEY, [...favorites]);
    renderLawyers(false);
  }));
  $$('[data-open-modal]', grid).forEach(btn => btn.addEventListener('click', () => {
    selectedLawyer = btn.dataset.lawyer || null;
    const ctx = $('#modal-lawyer-context');
    if (selectedLawyer) ctx.textContent = `${currentLang === 'fr' ? 'Avocat choisi' : 'المحامي المختار'}: ${selectedLawyer}`;
    openModal(btn.dataset.openModal);
  }));
}

function initDirectory() {
  const wilayaSelect = $('#wilaya-filter');
  wilayaSelect.innerHTML = `<option value="all">كل الولايات (58)</option>` +
    ALGERIA_WILAYAS.map(w => `<option value="${w}">${w}</option>`).join('');

  $('#filters-form').addEventListener('submit', e => e.preventDefault());
  ['wilaya-filter', 'specialty-filter', 'lawyer-sort'].forEach(id =>
    document.getElementById(id).addEventListener('change', () => renderLawyers()));
  $('#keyword-filter').addEventListener('input', () => renderLawyers());

  $('#favorites-filter').addEventListener('click', e => {
    showFavoritesOnly = !showFavoritesOnly;
    e.currentTarget.setAttribute('aria-pressed', String(showFavoritesOnly));
    renderLawyers();
  });

  renderLawyers();
}

/* ==========================================================================
   5) مولد العقود: معاينة لحظية + طباعة PDF + نسخ
   ========================================================================== */
let activeContractIdx = 0;

function renderContractTabs() {
  $('#contract-tabs').innerHTML = CONTRACTS.map((c, i) => `
    <button type="button" role="tab" class="contract-tab ${i === activeContractIdx ? 'active' : ''}"
      aria-selected="${i === activeContractIdx}" data-contract="${i}">${c.category}</button>`).join('');
  $$('#contract-tabs [data-contract]').forEach(btn =>
    btn.addEventListener('click', () => { activeContractIdx = +btn.dataset.contract; renderContractTabs(); updateContractPreview(); }));
}

function updateContractPreview() {
  const tpl = CONTRACTS[activeContractIdx];
  $('#contract-form-title').textContent = tpl.title;
  $('#contract-form-desc').textContent = tpl.desc;
  const v = id => $(id).value;
  $('#contract-live-preview').textContent = tpl.body
    .replaceAll('{{partyOne}}', v('#input-partyOne') || '........................')
    .replaceAll('{{partyTwo}}', v('#input-partyTwo') || '........................')
    .replaceAll('{{jobTitle}}', v('#input-jobTitle') || '........................')
    .replaceAll('{{salary}}', v('#input-salary') || '............ د.ج')
    .replaceAll('{{duration}}', v('#input-duration') || '............');
}

function initContracts() {
  $('#contract-date-label').textContent = new Date().toLocaleDateString('ar-DZ');
  renderContractTabs();
  updateContractPreview();
  $$('.contract-input').forEach(inp => inp.addEventListener('input', updateContractPreview));
  $('#print-contract').addEventListener('click', () => window.print());
  $('#copy-contract').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText($('#contract-live-preview').textContent);
      $('#copy-contract').textContent = '✅ تم النسخ';
      setTimeout(() => { $('#copy-contract').textContent = currentLang === 'fr' ? I18N.fr['contract.copy'] : '📋 نسخ النص'; }, 1600);
    } catch { /* المتصفح منع الحافظة */ }
  });
}

/* ==========================================================================
   6) طلبات الاستشارة: حفظ محلي + لوحة بحالات قابلة للتغيير
   ========================================================================== */
const REQ_KEY = 'avocat-requests';
const STATUSES = ['قيد المراجعة', 'مقبول', 'مكتمل', 'مرفوض'];

const seedRequests = [
  { id: 'seed-1', client: 'شركة الأفق للتجارة ذ.م.م', wilaya: '16 - الجزائر العاصمة', topic: 'مراجعة وتدقيق عقد شراكة تجارية', type: 'استشارة مكتوبة', status: 'قيد المراجعة' },
  { id: 'seed-2', client: 'السيد رياض بوعلام', wilaya: '14 - تيارت', topic: 'تسوية عقارية وقسمة عقار موروث', type: 'مكالمة مرئية', status: 'مقبول' },
  { id: 'seed-3', client: 'مؤسسة النور للخدمات', wilaya: '31 - وهران', topic: 'نزاع عقد عمل', type: 'موعد حضوري', status: 'مكتمل' },
];

function getRequests() {
  const saved = store.get(REQ_KEY, null);
  return Array.isArray(saved) && saved.length ? saved : seedRequests;
}

function renderRequests() {
  const requests = getRequests();
  const fr = currentLang === 'fr';
  const tbody = $('#requests-tbody');
  tbody.innerHTML = requests.map(r => `
    <tr>
      <td><strong>${r.client}</strong>${r.lawyer ? `<br><small style="color:var(--muted)">${r.lawyer}</small>` : ''}</td>
      <td>${r.wilaya || '—'}</td>
      <td>${r.topic}</td>
      <td>${r.type}</td>
      <td>
        <select class="status-select" data-req="${r.id}" data-status="${r.status}" aria-label="${fr ? 'Changer le statut' : 'تغيير حالة الطلب'}">
          ${STATUSES.map(s => `<option ${s === r.status ? 'selected' : ''}>${s}</option>`).join('')}
        </select>
      </td>
    </tr>`).join('');

  // تحديث الحالة وحفظها
  $$('[data-req]', tbody).forEach(sel => sel.addEventListener('change', () => {
    const all = getRequests().map(r => r.id === sel.dataset.req ? { ...r, status: sel.value } : r);
    store.set(REQ_KEY, all);
    sel.dataset.status = sel.value;
    updateDashStats();
    updateCharts();
  }));

  updateDashStats();
}

function updateDashStats() {
  const requests = getRequests();
  const count = s => requests.filter(r => r.status === s).length;
  $('#dash-total').textContent = requests.length;
  $('#dash-pending').textContent = count('قيد المراجعة');
  $('#dash-accepted').textContent = count('مقبول');
  $('#dash-done').textContent = count('مكتمل');
}

function initRequestForm() {
  $('#request-form').addEventListener('submit', e => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const all = getRequests();
    all.unshift({
      id: `req-${Date.now()}`,
      client: $('#req-name').value.trim(),
      lawyer: selectedLawyer,
      wilaya: selectedLawyer ? (LAWYERS.find(l => l.name === selectedLawyer)?.wilaya || '—') : '—',
      topic: $('#req-topic').value.trim(),
      type: $('#req-type').value,
      status: 'قيد المراجعة',
    });
    store.set(REQ_KEY, all);
    renderRequests();
    updateCharts();
    const status = $('#request-status');
    status.hidden = false;
    status.textContent = currentLang === 'fr'
      ? '✅ Demande enregistrée et visible dans le tableau de bord.'
      : '✅ سُجّل طلبك وظهر في لوحة المكتب أدناه.';
    setTimeout(() => { closeModal(form); form.reset(); status.hidden = true; }, 1400);
  });
}

/* ==========================================================================
   7) الرسوم البيانية (Chart.js) مع احتياط عند حجب CDN
   ========================================================================== */
let chartStatus = null, chartWeek = null;

function updateCharts() {
  if (typeof Chart === 'undefined') return;
  const requests = getRequests();
  const counts = STATUSES.map(s => requests.filter(r => r.status === s).length);
  const fr = currentLang === 'fr';
  const statusLabels = fr ? ['En attente', 'Acceptées', 'Terminées', 'Rejetées'] : STATUSES;

  if (chartStatus) {
    chartStatus.data.datasets[0].data = counts;
    chartStatus.update();
  } else {
    chartStatus = new Chart($('#chart-status'), {
      type: 'doughnut',
      data: { labels: statusLabels, datasets: [{ data: counts, backgroundColor: ['#c9a24b', '#2f7d5b', '#4b5568', '#b04a3a'], borderWidth: 0 }] },
      options: { plugins: { legend: { position: 'bottom', labels: { font: { family: 'IBM Plex Sans Arabic' } } } }, cutout: '62%' },
    });
  }

  if (!chartWeek) {
    chartWeek = new Chart($('#chart-week'), {
      type: 'bar',
      data: {
        labels: fr ? ['S1', 'S2', 'S3', 'S4'] : ['أسبوع 1', 'أسبوع 2', 'أسبوع 3', 'أسبوع 4'],
        datasets: [{ data: [2, 4, 3, Math.max(requests.length, 1)], backgroundColor: '#c9a24b', borderRadius: 4 }],
      },
      options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } },
    });
  }
}

/* رسوم CSS بديلة عند غياب Chart.js */
function renderChartFallback() {
  const requests = getRequests();
  const counts = STATUSES.map(s => requests.filter(r => r.status === s).length);
  const max = Math.max(...counts, 1);
  const bars = STATUSES.map((s, i) => `
    <div style="display:flex;align-items:center;gap:.6rem;margin-bottom:.5rem;font-size:.78rem">
      <span style="min-width:80px">${s}</span>
      <span style="flex:1;background:var(--beige-soft);border-radius:99px;height:14px;overflow:hidden">
        <span style="display:block;height:100%;width:${(counts[i] / max) * 100}%;background:${['#c9a24b', '#2f7d5b', '#4b5568', '#b04a3a'][i]}"></span>
      </span>
      <strong>${counts[i]}</strong>
    </div>`).join('');
  const box1 = $('#chart-status')?.closest('.chart-box');
  if (box1) box1.insertAdjacentHTML('beforeend', bars);
  const box2 = $('#chart-week')?.closest('.chart-box');
  if (box2) box2.insertAdjacentHTML('beforeend', '<p style="font-size:.78rem;color:var(--muted)">تتطلب الرسوم التفاعلية تحميل Chart.js.</p>');
}

/* ==========================================================================
   8) المقالات: عرض + بحث
   ========================================================================== */
function renderArticles() {
  const q = $('#articles-search').value.trim().toLowerCase();
  const fr = currentLang === 'fr';
  const list = ARTICLES.filter(a => !q || `${a.title} ${a.excerpt} ${a.author} ${a.inst}`.toLowerCase().includes(q));
  const grid = $('#articles-grid');
  if (!list.length) {
    grid.innerHTML = `<p class="empty-state">${fr ? 'Aucun article trouvé.' : 'لم نعثر على مقالات مطابقة.'}</p>`;
    return;
  }
  grid.innerHTML = list.map(a => `
    <article class="article-card">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:.6rem">
        <span class="article-badge ${a.role === 'أستاذ تعليم عالي' ? 'academic' : 'lawyer'}">
          ${a.role === 'أستاذ تعليم عالي' ? '🎓 ' + (fr ? 'Professeur' : 'أستاذ جامعي') : '⚖️ ' + (fr ? 'Avocat' : 'محامي معتمد')}
        </span>
        <small style="color:var(--muted)">${a.readTime}</small>
      </div>
      <h3>${a.title}</h3>
      <p class="excerpt">${a.excerpt}</p>
      <footer>
        <div><p class="author">${a.author}</p><p class="inst">${a.inst}</p></div>
      </footer>
    </article>`).join('');
}

/* ==========================================================================
   9) الأرقام المتحركة + حركات الظهور
   ========================================================================== */
function initObservers() {
  const counters = $$('[data-counter]');
  const counterIO = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    counterIO.unobserve(entry.target);
    const el = entry.target, target = +el.dataset.counter, dur = 1200, t0 = performance.now();
    (function tick(now) {
      const p = Math.min((now - t0) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }), { threshold: .6 });
  counters.forEach(el => counterIO.observe(el));

  const revealIO = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); revealIO.unobserve(entry.target); }
  }), { threshold: .12 });
  $$('.reveal').forEach(el => revealIO.observe(el));
}

/* ==========================================================================
   10) تسجيل عامل الخدمة (PWA)
   ========================================================================== */
function initPwa() {
  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    navigator.serviceWorker.register('sw.js').catch(() => { /* بيئة لا تدعم SW */ });
  }
}

/* ---------- الإقلاع ---------- */
document.addEventListener('DOMContentLoaded', () => {
  snapshotArabic();
  initTheme();
  initModals();
  initDirectory();
  initContracts();
  initRequestForm();
  renderRequests();
  renderArticles();
  initObservers();
  initPwa();

  $('#articles-search').addEventListener('input', renderArticles);
  $('#lang-toggle').addEventListener('click', () => {
    applyLang(currentLang === 'ar' ? 'fr' : 'ar');
    renderLawyers(false);
    renderArticles();
    renderRequests();
  });
  if (currentLang === 'fr') applyLang('fr');

  // Chart.js يُحمَّل بتأجيل؛ نهيئ الرسوم بعد توفره
  const chartTimer = setInterval(() => {
    if (typeof Chart !== 'undefined') { updateCharts(); clearInterval(chartTimer); }
  }, 200);
  // بديل CSS بسيط إن تعذر تحميل المكتبة (شبكة ضعيفة أو حاجب إعلانات)
  setTimeout(() => {
    clearInterval(chartTimer);
    if (typeof Chart === 'undefined') renderChartFallback();
  }, 8000);
});
