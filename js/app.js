/* ========================================
   サービス管理ポータル - 共通JavaScript
   ======================================== */

// --- モックデータ ---
const MOCK_USER = {
  id: 'user001',
  name: '村上 太郎',
  email: 'murakami@example.com',
  customerNumber: 'C-2024-00123'
};

const MOCK_SERVICES = [
  {
    id: 'SV001',
    name: 'クラウドホスティング スタンダード',
    category: 'ホスティング',
    status: 'active',
    plan: 'スタンダード',
    monthlyFee: 4980,
    contractDate: '2024-04-01',
    options: ['自動バックアップ', 'SSL証明書']
  },
  {
    id: 'SV002',
    name: 'セキュリティパック Pro',
    category: 'セキュリティ',
    status: 'active',
    plan: 'Pro',
    monthlyFee: 2980,
    contractDate: '2024-06-15',
    options: ['WAF', 'DDoS対策']
  },
  {
    id: 'SV003',
    name: 'データ分析プラットフォーム',
    category: 'データ分析',
    status: 'pending',
    plan: 'ベーシック',
    monthlyFee: 9800,
    contractDate: '2026-07-01',
    options: []
  },
  {
    id: 'SV004',
    name: 'メールホスティング',
    category: 'コミュニケーション',
    status: 'cancelled',
    plan: 'ライト',
    monthlyFee: 500,
    contractDate: '2023-01-10',
    options: []
  }
];

const MOCK_NOTICES = [
  { date: '2026-07-15', text: '【メンテナンス】7/20 深夜にネットワーク機器のメンテナンスを実施します' },
  { date: '2026-07-10', text: '【新サービス】データ分析プラットフォームの提供を開始しました' },
  { date: '2026-07-01', text: '【料金改定】クラウドホスティングの料金プランを改定しました' },
  { date: '2026-06-20', text: '【障害報告】6/19に発生したネットワーク障害の報告書を公開しました' }
];

const AVAILABLE_SERVICES = [
  { id: 'NEW001', name: 'クラウドホスティング', plans: [
    { name: 'ライト', fee: 1980 },
    { name: 'スタンダード', fee: 4980 },
    { name: 'プレミアム', fee: 9980 }
  ]},
  { id: 'NEW002', name: 'セキュリティパック', plans: [
    { name: 'ベーシック', fee: 980 },
    { name: 'Pro', fee: 2980 },
    { name: 'エンタープライズ', fee: 5980 }
  ]},
  { id: 'NEW003', name: 'データ分析プラットフォーム', plans: [
    { name: 'ベーシック', fee: 9800 },
    { name: 'アドバンスド', fee: 19800 }
  ]},
  { id: 'NEW004', name: 'マネージドDNS', plans: [
    { name: 'スタンダード', fee: 500 },
    { name: 'プレミアム', fee: 1500 }
  ]}
];

const MOCK_COUPONS = [
  { id: 'CP01', amount: 1000, price: 1000, label: '1,000円' },
  { id: 'CP02', amount: 3000, price: 2850, label: '3,000円（5%OFF）' },
  { id: 'CP03', amount: 5000, price: 4500, label: '5,000円（10%OFF）' },
  { id: 'CP04', amount: 10000, price: 8500, label: '10,000円（15%OFF）' }
];

// --- ユーティリティ ---
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}/${String(d.getMonth()+1).padStart(2,'0')}/${String(d.getDate()).padStart(2,'0')}`;
}

function formatCurrency(num) {
  return num.toLocaleString() + '円';
}

function getStatusLabel(status) {
  const map = { active: '利用中', pending: '申請中', cancelled: '解約済' };
  return map[status] || status;
}

function getStatusBadgeClass(status) {
  const map = { active: 'badge-active', pending: 'badge-pending', cancelled: 'badge-cancelled' };
  return map[status] || '';
}

// --- ログイン ---
function handleLogin(e) {
  e.preventDefault();
  const userId = document.getElementById('userId').value.trim();
  const password = document.getElementById('password').value.trim();

  // バリデーション
  let valid = true;

  if (!userId) {
    document.getElementById('userId').parentElement.classList.add('has-error');
    valid = false;
  } else {
    document.getElementById('userId').parentElement.classList.remove('has-error');
  }

  if (!password) {
    document.getElementById('password').parentElement.classList.add('has-error');
    valid = false;
  } else if (password.length < 8) {
    document.getElementById('password').parentElement.classList.add('has-error');
    document.querySelector('#password ~ .error-msg').textContent = 'パスワードは8文字以上で入力してください';
    valid = false;
  } else {
    document.getElementById('password').parentElement.classList.remove('has-error');
  }

  if (!valid) return;

  // モック認証（どんな入力でもOK）
  sessionStorage.setItem('loggedIn', 'true');
  sessionStorage.setItem('userName', MOCK_USER.name);
  window.location.href = 'dashboard.html';
}

// --- ログアウト ---
function handleLogout() {
  sessionStorage.clear();
  window.location.href = 'login.html';
}

// --- 認証チェック ---
function requireAuth() {
  if (sessionStorage.getItem('loggedIn') !== 'true') {
    window.location.href = 'login.html';
    return false;
  }
  // ユーザー名をサイドバーに表示
  const userInfoEl = document.querySelector('.user-info');
  if (userInfoEl) {
    userInfoEl.innerHTML = `${MOCK_USER.name}<br><a href="#" onclick="handleLogout()" style="color:rgba(255,255,255,0.5);font-size:12px;">ログアウト</a>`;
  }
  return true;
}

// --- ダッシュボード ---
function initDashboard() {
  if (!requireAuth()) return;

  const activeCount = MOCK_SERVICES.filter(s => s.status === 'active').length;
  const totalFee = MOCK_SERVICES.filter(s => s.status === 'active').reduce((sum, s) => sum + s.monthlyFee, 0);
  const couponBalance = 3000; // モック

  document.getElementById('activeCount').textContent = activeCount;
  document.getElementById('totalFee').textContent = formatCurrency(totalFee);
  document.getElementById('couponBalance').textContent = formatCurrency(couponBalance);
  document.getElementById('pendingCount').textContent = MOCK_SERVICES.filter(s => s.status === 'pending').length;

  // 未読お知らせ数（モック: 直近7日以内のお知らせを未読とする）
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const unreadCount = MOCK_NOTICES.filter(n => new Date(n.date) >= oneWeekAgo).length;
  document.getElementById('unreadNoticeCount').textContent = unreadCount;

  // 最終ログイン日時を表示
  const lastLoginEl = document.getElementById('lastLogin');
  if (lastLoginEl) {
    const now = new Date();
    const dateStr = `${now.getFullYear()}/${String(now.getMonth()+1).padStart(2,'0')}/${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
    lastLoginEl.textContent = '最終ログイン: ' + dateStr;
  }

  const noticeList = document.getElementById('noticeList');
  noticeList.innerHTML = MOCK_NOTICES.map(n =>
    `<li><span class="date">${n.date}</span>${n.text}</li>`
  ).join('');
}

// --- サービス一覧 ---
function initServiceList() {
  if (!requireAuth()) return;
  renderServiceTable('all');
}

function renderServiceTable(filter) {
  const filtered = filter === 'all'
    ? MOCK_SERVICES
    : MOCK_SERVICES.filter(s => s.status === filter);

  const tbody = document.getElementById('serviceTableBody');
  tbody.innerHTML = filtered.map(s => `
    <tr>
      <td>${s.id}</td>
      <td>${s.name}</td>
      <td>${s.category}</td>
      <td><span class="badge ${getStatusBadgeClass(s.status)}">${getStatusLabel(s.status)}</span></td>
      <td>${s.plan}</td>
      <td>${formatCurrency(s.monthlyFee)}</td>
      <td>${formatDate(s.contractDate)}</td>
      <td><a href="service-detail.html?id=${s.id}" class="btn btn-outline" style="padding:4px 12px;font-size:12px;">詳細</a></td>
    </tr>
  `).join('');
}

function filterServices() {
  const filter = document.getElementById('statusFilter').value;
  renderServiceTable(filter);
}

// --- サービス詳細 ---
function initServiceDetail() {
  if (!requireAuth()) return;

  const params = new URLSearchParams(window.location.search);
  const serviceId = params.get('id') || 'SV001';
  const service = MOCK_SERVICES.find(s => s.id === serviceId);

  if (!service) {
    document.querySelector('.main').innerHTML = '<div class="alert alert-danger">サービスが見つかりません</div>';
    return;
  }

  document.getElementById('serviceName').textContent = service.name;
  document.getElementById('detailId').textContent = service.id;
  document.getElementById('detailName').textContent = service.name;
  document.getElementById('detailCategory').textContent = service.category;
  document.getElementById('detailStatus').innerHTML = `<span class="badge ${getStatusBadgeClass(service.status)}">${getStatusLabel(service.status)}</span>`;
  document.getElementById('detailPlan').textContent = service.plan;
  document.getElementById('detailFee').textContent = formatCurrency(service.monthlyFee);
  document.getElementById('detailDate').textContent = formatDate(service.contractDate);
  document.getElementById('detailOptions').textContent = service.options.length > 0 ? service.options.join('、') : 'なし';

  // 解約ボタンの表示制御
  const cancelBtn = document.getElementById('cancelBtn');
  if (service.status !== 'active') {
    cancelBtn.style.display = 'none';
  }
}

function showCancelModal() {
  document.getElementById('cancelModal').classList.add('show');
}

function closeCancelModal() {
  document.getElementById('cancelModal').classList.remove('show');
}

function confirmCancel() {
  alert('解約手続きを受け付けました。');
  closeCancelModal();
  window.location.href = 'services.html';
}

// --- 新規申し込み ---
let applyStep = 1;
let selectedService = null;
let selectedPlan = null;

function initApply() {
  if (!requireAuth()) return;
  showApplyStep(1);
  renderServiceSelect();
}

function renderServiceSelect() {
  const container = document.getElementById('serviceSelect');
  container.innerHTML = AVAILABLE_SERVICES.map(s => `
    <option value="${s.id}">${s.name}</option>
  `).join('');
  updatePlanSelect();
}

function updatePlanSelect() {
  const serviceId = document.getElementById('serviceSelect').value;
  const service = AVAILABLE_SERVICES.find(s => s.id === serviceId);
  const container = document.getElementById('planSelect');
  container.innerHTML = service.plans.map(p => `
    <option value="${p.name}" data-fee="${p.fee}">${p.name}（${formatCurrency(p.fee)}/月）</option>
  `).join('');
}

function showApplyStep(step) {
  applyStep = step;
  document.querySelectorAll('.step').forEach((el, i) => {
    el.classList.remove('active', 'done');
    if (i + 1 < step) el.classList.add('done');
    if (i + 1 === step) el.classList.add('active');
  });
  document.querySelectorAll('.step-content').forEach(el => el.style.display = 'none');
  document.getElementById('step' + step).style.display = 'block';
}

function goToConfirm() {
  const serviceId = document.getElementById('serviceSelect').value;
  const service = AVAILABLE_SERVICES.find(s => s.id === serviceId);
  const planName = document.getElementById('planSelect').value;
  const plan = service.plans.find(p => p.name === planName);

  selectedService = service;
  selectedPlan = plan;

  document.getElementById('confirmService').textContent = service.name;
  document.getElementById('confirmPlan').textContent = plan.name;
  document.getElementById('confirmFee').textContent = formatCurrency(plan.fee);

  showApplyStep(2);
}

function submitApply() {
  showApplyStep(3);
}

// --- クーポン購入 ---
let selectedCoupon = null;

function initCoupon() {
  if (!requireAuth()) return;

  document.getElementById('currentBalance').textContent = formatCurrency(3000);

  const container = document.getElementById('couponGrid');
  container.innerHTML = MOCK_COUPONS.map(c => `
    <div class="coupon-card" data-id="${c.id}" onclick="selectCoupon('${c.id}')">
      <div class="amount">${c.label}</div>
      <div class="price">購入価格: ${formatCurrency(c.price)}</div>
    </div>
  `).join('');
}

function selectCoupon(id) {
  selectedCoupon = MOCK_COUPONS.find(c => c.id === id);
  document.querySelectorAll('.coupon-card').forEach(el => {
    el.classList.toggle('selected', el.dataset.id === id);
  });
  document.getElementById('purchaseBtn').disabled = false;
}

function showPurchaseConfirm() {
  if (!selectedCoupon) return;
  document.getElementById('confirmCouponAmount').textContent = selectedCoupon.label;
  document.getElementById('confirmCouponPrice').textContent = formatCurrency(selectedCoupon.price);
  document.getElementById('purchaseModal').classList.add('show');
}

function closePurchaseModal() {
  document.getElementById('purchaseModal').classList.remove('show');
}

function confirmPurchase() {
  closePurchaseModal();
  document.getElementById('couponSelectView').style.display = 'none';
  document.getElementById('couponCompleteView').style.display = 'block';
  document.getElementById('completeCouponAmount').textContent = selectedCoupon.label;
  document.getElementById('newBalance').textContent = formatCurrency(3000 + selectedCoupon.amount);
}

// --- お問い合わせ ---
function initContact() {
  if (!requireAuth()) return;

  // 関連サービスのプルダウンに契約中サービスを設定
  const serviceSelect = document.getElementById('contactService');
  MOCK_SERVICES.filter(s => s.status === 'active').forEach(s => {
    const opt = document.createElement('option');
    opt.value = s.id;
    opt.textContent = s.name;
    serviceSelect.appendChild(opt);
  });
}

function submitContact(e) {
  e.preventDefault();

  const category = document.getElementById('contactCategory').value;
  const subject = document.getElementById('contactSubject').value.trim();
  const body = document.getElementById('contactBody').value.trim();

  let valid = true;

  if (!subject) {
    document.getElementById('contactSubject').parentElement.classList.add('has-error');
    valid = false;
  } else {
    document.getElementById('contactSubject').parentElement.classList.remove('has-error');
  }

  if (!body) {
    document.getElementById('contactBody').parentElement.classList.add('has-error');
    valid = false;
  } else {
    document.getElementById('contactBody').parentElement.classList.remove('has-error');
  }

  if (!valid) return;

  // 受付番号を生成（モック）
  const ticketNo = 'TK-' + Date.now().toString().slice(-8);
  document.getElementById('ticketNumber').textContent = ticketNo;
  document.getElementById('contactFormView').style.display = 'none';
  document.getElementById('contactCompleteView').style.display = 'block';
}

// --- よくある質問 ---
const MOCK_FAQ = [
  {
    category: 'contract',
    q: 'サービスの申し込みからどのくらいで利用開始できますか？',
    a: 'お申し込み後、審査完了まで1～3営業日かかります。審査完了後、すぐにご利用いただけます。'
  },
  {
    category: 'contract',
    q: 'サービスを解約した場合、いつまで利用できますか？',
    a: '解約手続き後、当月末まではご利用いただけます。翌月1日にサービスが停止されます。'
  },
  {
    category: 'billing',
    q: '支払い方法にはどのような種類がありますか？',
    a: 'クレジットカード、口座振替、請求書払いに対応しています。請求書払いは法人契約のみご利用いただけます。'
  },
  {
    category: 'billing',
    q: '月の途中で申し込んだ場合、料金は日割り計算されますか？',
    a: 'はい、初月の料金は日割り計算となります。解約月も同様に日割り計算されます。'
  },
  {
    category: 'technical',
    q: 'サービスの稼働率はどの程度ですか？',
    a: 'SLA（サービスレベル契約）として月間稼働率99.9%を保証しています。計画メンテナンスは事前にお知らせにて通知いたします。'
  },
  {
    category: 'technical',
    q: '障害が発生した場合、どのように連絡がきますか？',
    a: 'ダッシュボードのお知らせ欄に掲載するほか、ご登録のメールアドレスにも通知いたします。'
  },
  {
    category: 'coupon',
    q: 'クーポンの有効期限はありますか？',
    a: 'クーポンの有効期限は購入日から1年間です。期限を過ぎたクーポン残高は失効します。'
  },
  {
    category: 'coupon',
    q: 'クーポンは返金できますか？',
    a: '購入済みのクーポンは原則として返金できません。サービス利用料への充当のみ可能です。'
  }
];

function initFAQ() {
  if (!requireAuth()) return;
  renderFAQ('all');
}

function renderFAQ(category) {
  const filtered = category === 'all'
    ? MOCK_FAQ
    : MOCK_FAQ.filter(f => f.category === category);

  const container = document.getElementById('faqList');
  container.innerHTML = filtered.map((f, i) => `
    <div class="card" style="margin-bottom: 12px; cursor: pointer;" onclick="toggleAnswer(this)">
      <div style="display: flex; align-items: center; gap: 12px;">
        <span style="color: #3b82f6; font-weight: bold; font-size: 1.2rem;">Q</span>
        <span style="font-weight: bold;">${f.q}</span>
        <span style="margin-left: auto; color: #999;">▼</span>
      </div>
      <div class="faq-answer" style="display: none; margin-top: 12px; padding-top: 12px; border-top: 1px solid #eee;">
        <div style="display: flex; align-items: flex-start; gap: 12px;">
          <span style="color: #22c55e; font-weight: bold; font-size: 1.2rem;">A</span>
          <span style="color: #555;">${f.a}</span>
        </div>
      </div>
    </div>
  `).join('');
}

function toggleAnswer(el) {
  const answer = el.querySelector('.faq-answer');
  const arrow = el.querySelector('span:last-of-type');
  if (answer.style.display === 'none') {
    answer.style.display = 'block';
    arrow.textContent = '▲';
  } else {
    answer.style.display = 'none';
    arrow.textContent = '▼';
  }
}

function filterFAQ() {
  const category = document.getElementById('faqCategory').value;
  renderFAQ(category);
}
