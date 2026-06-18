const STORAGE_KEY = "travel-expense-app-v2";
const LEGACY_STORAGE_KEY = "travel-expense-app-v1";

const transactionTypes = [
  { id: "expense", label: "지출" },
  { id: "income", label: "수입" },
  { id: "withdrawal", label: "인출" },
  { id: "exchangeIn", label: "환전입금" },
  { id: "exchangeOut", label: "환전출금" },
  { id: "adjustment", label: "현금조정" },
];

const paymentMethods = ["현금", "카드", "계좌", "선결제", "기타"];

const sampleState = (() => {
  const names = ["김현진", "박진호", "안서현", "황서은"];
  const all = { 김현진: 1, 박진호: 1, 안서현: 1, 황서은: 1 };
  const baseTime = Date.now() - 100000;
  let order = 0;
  const tx = ({ date, category, item, note = "", currency = "USD", amount, payer, krw, method = "카드", weights = all }) => ({
    id: crypto.randomUUID(),
    date,
    type: "expense",
    category,
    item,
    note,
    currency,
    amount,
    paymentMethod: method,
    payer,
    krwActual: krw,
    exchangeRate: currency === "KRW" ? 1 : "",
    weights,
    createdAt: baseTime + order++,
  });

  return {
    id: "sample-san-diego-2026",
    tripName: "샌디에고 2026",
    regions: ["미국", "샌디에고"],
    startDate: "2026-04-17",
    endDate: "2026-04-24",
    travelMode: "group",
    homeCurrency: "KRW",
    currencies: [
      { code: "KRW", startingCash: 0, startingRate: 1 },
      { code: "USD", startingCash: 0, startingRate: 1350 },
    ],
    categories: ["숙소", "교통", "식비", "활동", "기타", "환전"],
    participants: names,
    transactions: [
      tx({ date: "2026-04-17", category: "숙소", item: "힐튼 그랜드 베이케이션", note: "7박", currency: "KRW", amount: 3800000, payer: "박진호", krw: 3800000 }),
      tx({ date: "2026-04-17", category: "교통", item: "5인승 SUV_프리미엄", note: "7일", amount: 737.88, payer: "박진호", krw: 1125635 }),
      tx({ date: "2026-04-17", category: "교통", item: "5인승 SUV_일반", note: "7일", amount: 750.68, payer: "황서은", krw: 1162020 }),
      tx({ date: "2026-04-17", category: "교통", item: "렌트카 추가금액", note: "추가 보험", amount: 9.65, payer: "박진호", krw: 14617 }),
      tx({ date: "2026-04-17", category: "교통", item: "렌트카 추가금액", note: "추가 보험", amount: 9.64, payer: "황서은", krw: 14617 }),
      tx({ date: "2026-04-17", category: "식비", item: "IN-N-OUT 버거", amount: 44.07, payer: "황서은", krw: 66851 }),
      tx({ date: "2026-04-18", category: "식비", item: "코스트코", amount: 196.28, payer: "박진호", krw: 294420 }),
      tx({ date: "2026-04-18", category: "식비", item: "망고", amount: 5, payer: "안서현", krw: 7500 }),
      tx({ date: "2026-04-18", category: "활동", item: "골프대회", note: "160*3 현금", amount: 160, payer: "김현진", krw: 240000, method: "현금", weights: { 김현진: 1, 박진호: 1, 안서현: 0, 황서은: 1 } }),
      tx({ date: "2026-04-18", category: "활동", item: "골프대회", note: "160*3 현금", amount: 160, payer: "박진호", krw: 240000, method: "현금", weights: { 김현진: 1, 박진호: 1, 안서현: 0, 황서은: 1 } }),
      tx({ date: "2026-04-18", category: "활동", item: "골프대회", note: "160*3 현금", amount: 160, payer: "황서은", krw: 240000, method: "현금", weights: { 김현진: 1, 박진호: 1, 안서현: 0, 황서은: 1 } }),
      tx({ date: "2026-04-19", category: "식비", item: "트레이더조", note: "김밥/두부/달걀", amount: 12.96, payer: "김현진", krw: 19440 }),
      tx({ date: "2026-04-20", category: "활동", item: "마데라스 골프 그린피", amount: 330, payer: "황서은", krw: 501008, weights: { 김현진: 0, 박진호: 1, 안서현: 0, 황서은: 1 } }),
      tx({ date: "2026-04-20", category: "교통", item: "주유비", note: "일반", amount: 65.86, payer: "안서현", krw: 96549 }),
      tx({ date: "2026-04-21", category: "숙소", item: "하우스키핑 팁", amount: 10, payer: "박진호", krw: 15000 }),
      tx({ date: "2026-04-22", category: "활동", item: "토레이파인스 예약금", note: "32*3 현금", amount: 32, payer: "김현진", krw: 48000, method: "현금", weights: { 김현진: 1, 박진호: 1, 안서현: 0, 황서은: 1 } }),
      tx({ date: "2026-04-22", category: "활동", item: "토레이파인스 예약금", note: "32*3 현금", amount: 32, payer: "박진호", krw: 48000, method: "현금", weights: { 김현진: 1, 박진호: 1, 안서현: 0, 황서은: 1 } }),
      tx({ date: "2026-04-22", category: "활동", item: "토레이파인스 예약금", note: "32*3 현금", amount: 32, payer: "황서은", krw: 48000, method: "현금", weights: { 김현진: 1, 박진호: 1, 안서현: 0, 황서은: 1 } }),
      tx({ date: "2026-04-22", category: "활동", item: "토레이파인스 그린피", note: "156*2", amount: 312, payer: "황서은", krw: 474936, weights: { 김현진: 1, 박진호: 0, 안서현: 0, 황서은: 1 } }),
      tx({ date: "2026-04-22", category: "활동", item: "토레이파인스 카트비", note: "34*2", amount: 68, payer: "황서은", krw: 103510, weights: { 김현진: 1, 박진호: 2, 안서현: 0, 황서은: 1 } }),
      tx({ date: "2026-04-22", category: "식비", item: "롯지 엣 토리파인스", amount: 377.06, payer: "황서은", krw: 573974, weights: { 김현진: 0, 박진호: 1, 안서현: 0, 황서은: 1 } }),
      tx({ date: "2026-04-23", category: "활동", item: "테메큘라크릭 그린피 + 카트피", amount: 267, payer: "황서은", krw: 405078, weights: { 김현진: 1, 박진호: 1, 안서현: 0, 황서은: 1 } }),
      tx({ date: "2026-04-23", category: "교통", item: "주유비", amount: 40.18, payer: "황서은", krw: 60957 }),
      tx({ date: "2026-04-23", category: "식비", item: "도넛", amount: 18.25, payer: "안서현", krw: 26937 }),
      tx({ date: "2026-04-24", category: "숙소", item: "하우스키핑 팁", amount: 10, payer: "박진호", krw: 15000 }),
      tx({ date: "2026-04-24", category: "교통", item: "주유비", amount: 27.28, payer: "안서현", krw: 40265 }),
      tx({ date: "2026-04-24", category: "식비", item: "판다익스프레스", amount: 54.81, payer: "황서은", krw: 83145 }),
      tx({ date: "2026-04-24", category: "식비", item: "스타벅스 커피", amount: 16.57, payer: "황서은", krw: 25136 }),
    ],
  };
})();

const bogotaSampleState = (() => {
  const baseTime = Date.now() - 50000;
  let order = 0;
  const tx = ({ date, category, item, note = "", currency = "COP", amount, krw, method = "카드", exchangeRate = "" }) => ({
    id: crypto.randomUUID(),
    date,
    type: "expense",
    category,
    item,
    note,
    currency,
    amount,
    paymentMethod: method,
    payer: "나",
    krwActual: krw,
    exchangeRate,
    weights: { 나: 1 },
    createdAt: baseTime + order++,
  });

  return {
    id: "sample-bogota-solo",
    tripName: "보고타 혼자 여행",
    regions: ["콜롬비아", "보고타"],
    startDate: "2026-05-03",
    endDate: "2026-05-07",
    travelMode: "solo",
    homeCurrency: "KRW",
    currencies: [
      { code: "KRW", startingCash: 0, startingRate: 1 },
      { code: "COP", startingCash: 420000, startingRate: 0.35 },
      { code: "USD", startingCash: 80, startingRate: 1380 },
    ],
    categories: ["항공", "숙소", "교통", "식비", "활동", "쇼핑", "통신", "기타", "환전"],
    participants: ["나"],
    transactions: [
      tx({ date: "2026-05-03", category: "교통", item: "공항 택시", note: "BOG → La Candelaria", amount: 55000, method: "현금", exchangeRate: 0.35 }),
      tx({ date: "2026-05-03", category: "숙소", item: "호텔 1박 보증금", amount: 90000, method: "카드", krw: 32400 }),
      tx({ date: "2026-05-03", category: "식비", item: "저녁 아히아코", amount: 42000, method: "카드", krw: 15120 }),
      tx({ date: "2026-05-03", category: "식비", item: "생수와 간식", amount: 16000, method: "현금", exchangeRate: 0.35 }),
      tx({ date: "2026-05-04", category: "식비", item: "아침 커피", amount: 14500, method: "현금", exchangeRate: 0.35 }),
      tx({ date: "2026-05-04", category: "활동", item: "몬세라테 케이블카", amount: 32000, method: "현금", exchangeRate: 0.35 }),
      tx({ date: "2026-05-04", category: "교통", item: "택시", note: "몬세라테 → Chapinero", amount: 21000, method: "현금", exchangeRate: 0.35 }),
      tx({ date: "2026-05-04", category: "식비", item: "카페와 간식", amount: 28500, method: "카드", krw: 10260 }),
      tx({ date: "2026-05-04", category: "식비", item: "저녁", amount: 52000, method: "카드", krw: 18720 }),
      tx({ date: "2026-05-05", category: "활동", item: "보테로 미술관 기부", amount: 10000, method: "현금", exchangeRate: 0.35 }),
      tx({ date: "2026-05-05", category: "교통", item: "TransMilenio 충전", amount: 12000, method: "현금", exchangeRate: 0.35 }),
      tx({ date: "2026-05-05", category: "활동", item: "골드 뮤지엄", amount: 6000, method: "현금", exchangeRate: 0.35 }),
      tx({ date: "2026-05-05", category: "식비", item: "점심 메뉴 델 디아", amount: 28000, method: "현금", exchangeRate: 0.35 }),
      tx({ date: "2026-05-05", category: "쇼핑", item: "기념 엽서", amount: 18000, method: "현금", exchangeRate: 0.35 }),
      tx({ date: "2026-05-06", category: "교통", item: "우버", note: "숙소 → Usaquen", amount: 24500, method: "카드", krw: 8820 }),
      tx({ date: "2026-05-06", category: "식비", item: "브런치", amount: 48000, method: "카드", krw: 17280 }),
      tx({ date: "2026-05-06", category: "쇼핑", item: "커피 원두", amount: 68000, method: "카드", krw: 24480 }),
      tx({ date: "2026-05-06", category: "식비", item: "레스토랑 저녁", amount: 76000, method: "카드", krw: 27360 }),
      tx({ date: "2026-05-06", category: "기타", item: "세탁", amount: 22000, method: "현금", exchangeRate: 0.35 }),
      tx({ date: "2026-05-07", category: "통신", item: "eSIM", currency: "USD", amount: 12, method: "카드", krw: 16560 }),
      tx({ date: "2026-05-07", category: "식비", item: "아침 빵과 커피", amount: 19000, method: "현금", exchangeRate: 0.35 }),
      tx({ date: "2026-05-07", category: "교통", item: "공항 이동", amount: 62000, method: "현금", exchangeRate: 0.35 }),
      tx({ date: "2026-05-07", category: "식비", item: "공항 식사", amount: 39000, method: "카드", krw: 14040 }),
      tx({ date: "2026-05-07", category: "쇼핑", item: "공항 초콜릿", amount: 35000, method: "카드", krw: 12600 }),
    ],
  };
})();

const emptyState = {
  id: "project-default",
  tripName: "새 여행",
  regions: [],
  startDate: "",
  endDate: "",
  travelMode: "group",
  homeCurrency: "KRW",
    currencies: [
      { code: "KRW", startingCash: 0, startingRate: 1 },
      { code: "USD", startingCash: 0, startingRate: "" },
      { code: "COP", startingCash: 0, startingRate: "" },
  ],
  categories: ["항공", "숙소", "교통", "식비", "활동", "쇼핑", "통신", "보험", "기타", "환전"],
  participants: ["나", "동행1"],
  transactions: [],
};

let appState = loadState();
let state = getCurrentProject();

const $ = (id) => document.getElementById(id);

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function createProject(overrides = {}) {
  return {
    ...clone(emptyState),
    id: crypto.randomUUID(),
    tripName: "새 여행",
    participants: ["나"],
    travelMode: "solo",
    ...overrides,
  };
}

function normalizeProject(project) {
  const regions = Array.isArray(project.regions)
    ? project.regions
    : String(project.region || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
  return {
    ...clone(emptyState),
    ...project,
    id: project.id || crypto.randomUUID(),
    regions,
    startDate: project.startDate || "",
    endDate: project.endDate || "",
    travelMode: project.travelMode || (project.participants?.length > 1 ? "group" : "solo"),
    currencies: project.currencies?.length
      ? project.currencies.map((currency) => ({
          code: currency.code,
          startingCash: Number(currency.startingCash || 0),
          startingRate: currency.startingRate === "" || currency.startingRate === undefined ? "" : Number(currency.startingRate || 0),
        }))
      : clone(emptyState.currencies),
    categories: project.categories?.length ? project.categories : clone(emptyState.categories),
    participants: project.participants?.length ? project.participants : ["나"],
    transactions: project.transactions || [],
  };
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const legacyRaw = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacyRaw) {
      try {
        const legacy = normalizeProject(JSON.parse(legacyRaw));
        return { currentProjectId: legacy.id, projects: [legacy] };
      } catch {
        const project = createProject();
        return { currentProjectId: project.id, projects: [project] };
      }
    }
    const project = createProject();
    return { currentProjectId: project.id, projects: [project] };
  }
  try {
    const parsed = JSON.parse(raw);
    const projects = (parsed.projects || []).map(normalizeProject);
    if (!projects.length) {
      const project = createProject();
      return { currentProjectId: project.id, projects: [project] };
    }
    return {
      currentProjectId: parsed.currentProjectId || projects[0].id,
      projects,
    };
  } catch {
    const project = createProject();
    return { currentProjectId: project.id, projects: [project] };
  }
}

function getCurrentProject() {
  const found = appState.projects.find((project) => project.id === appState.currentProjectId);
  if (found) return found;
  appState.currentProjectId = appState.projects[0].id;
  return appState.projects[0];
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
}

function formatKrw(value) {
  return `${Math.round(value || 0).toLocaleString("ko-KR")} ${state.homeCurrency}`;
}

function formatProjectKrw(value, currency = "KRW") {
  return `${Math.round(value || 0).toLocaleString("ko-KR")} ${currency}`;
}

function formatMoney(value, currency) {
  const digits = currency === "KRW" ? 0 : 2;
  return `${Number(value || 0).toLocaleString("ko-KR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })} ${currency}`;
}

function getCurrency(code) {
  return state.currencies.find((currency) => currency.code === code) || { code, startingCash: 0, startingRate: "" };
}

function getKrw(transaction) {
  const fifo = getFifoAllocation(transaction.id);
  if (fifo && fifo.krw > 0) return fifo.krw;
  const manual = Number(transaction.krwActual);
  if (manual > 0) return manual;
  if (transaction.currency === state.homeCurrency) return Number(transaction.amount || 0);
  return Number(transaction.amount || 0) * Number(transaction.exchangeRate || 0);
}

function sortedTransactions(project = state) {
  return project.transactions
    .slice()
    .sort((a, b) => `${a.date || ""}-${a.createdAt || 0}`.localeCompare(`${b.date || ""}-${b.createdAt || 0}`));
}

function getStoredKrwBasis(project, transaction) {
  const amount = Number(transaction.amount || 0);
  const manual = Number(transaction.krwActual || 0);
  if (manual > 0) return manual;
  if (transaction.currency === project.homeCurrency) return amount;
  return amount * Number(transaction.exchangeRate || 0);
}

function getFundingRate(project, transaction) {
  const amount = Number(transaction.amount || 0);
  if (!amount) return 0;
  if (transaction.currency === project.homeCurrency) return 1;
  return getStoredKrwBasis(project, transaction) / amount;
}

function buildFifoLedger(project = state, options = {}) {
  const lots = new Map();
  const allocations = new Map();
  const pendingExchangeKrw = [];
  const excludedId = options.excludeId || "";

  const getLots = (currency) => {
    if (!lots.has(currency)) lots.set(currency, []);
    return lots.get(currency);
  };

  const addLot = (currency, amount, rate, sourceId) => {
    if (amount > 0 && rate > 0) getLots(currency).push({ remaining: amount, rate, sourceId });
  };

  for (const currency of project.currencies) {
    const startingCash = Number(currency.startingCash || 0);
    const startingRate = currency.code === project.homeCurrency ? 1 : Number(currency.startingRate || 0);
    addLot(currency.code, startingCash, startingRate, "initial");
  }

  const consumePendingExchangeKrw = (date) => {
    const index = pendingExchangeKrw.findIndex((item) => !date || !item.date || item.date <= date);
    if (index < 0) return 0;
    const [item] = pendingExchangeKrw.splice(index, 1);
    return item.krw;
  };

  const consume = (transaction) => {
    const amount = Number(transaction.amount || 0);
    if (amount <= 0) return { krw: 0, rate: 0, details: [] };
    const currencyLots = getLots(transaction.currency);
    let remaining = amount;
    let krw = 0;
    const details = [];

    for (const lot of currencyLots) {
      if (remaining <= 0) break;
      if (lot.remaining <= 0) continue;
      const used = Math.min(remaining, lot.remaining);
      lot.remaining -= used;
      remaining -= used;
      krw += used * lot.rate;
      details.push({ sourceId: lot.sourceId, amount: used, rate: lot.rate, krw: used * lot.rate });
    }

    if (remaining > 0) {
      const fallbackRate =
        transaction.currency === project.homeCurrency ? 1 : Number(transaction.exchangeRate || 0) || getFundingRate(project, transaction);
      if (fallbackRate > 0) {
        krw += remaining * fallbackRate;
        details.push({ sourceId: "fallback", amount: remaining, rate: fallbackRate, krw: remaining * fallbackRate });
      }
    }

    return { krw, rate: amount ? krw / amount : 0, details };
  };

  for (const transaction of sortedTransactions(project)) {
    if (transaction.id === excludedId) continue;
    const amount = Number(transaction.amount || 0);
    if (!amount) continue;

    if (transaction.type === "withdrawal" || transaction.type === "exchangeIn") {
      let basisKrw = getStoredKrwBasis(project, transaction);
      if (transaction.type === "exchangeIn" && basisKrw <= 0) {
        basisKrw = consumePendingExchangeKrw(transaction.date);
      }
      const rate = amount > 0 ? basisKrw / amount : 0;
      addLot(transaction.currency, amount, rate || getFundingRate(project, transaction), transaction.id);
      continue;
    }

    if (transaction.paymentMethod !== "현금") continue;

    if (transaction.type === "expense" || transaction.type === "exchangeOut") {
      const allocation = consume(transaction);
      allocations.set(transaction.id, allocation);
      if (transaction.type === "exchangeOut" && allocation.krw > 0) {
        pendingExchangeKrw.push({ date: transaction.date, krw: allocation.krw, sourceId: transaction.id });
      }
    } else if (transaction.type === "income" || transaction.type === "adjustment") {
      addLot(transaction.currency, amount, getFundingRate(project, transaction), transaction.id);
    }
  }

  return { lots, allocations };
}

function getFifoAllocation(transactionId) {
  return buildFifoLedger().allocations.get(transactionId);
}

function estimateFifoKrw(currency, amount, date, excludedId = "") {
  const draft = {
    id: "__draft__",
    date: date || "9999-12-31",
    createdAt: Number.MAX_SAFE_INTEGER,
    type: "expense",
    category: "",
    item: "",
    currency,
    amount: Number(amount || 0),
    paymentMethod: "현금",
    krwActual: "",
    exchangeRate: "",
  };
  const project = { ...state, transactions: [...state.transactions.filter((item) => item.id !== excludedId), draft] };
  const allocation = buildFifoLedger(project).allocations.get("__draft__");
  return allocation || { krw: 0, rate: 0, details: [] };
}

function getExchangeBasis(currency, date = "9999-12-31") {
  if (currency === state.homeCurrency) return { rate: 1, source: "home" };
  const fundingTypes = new Set(["exchangeIn", "withdrawal"]);
  let totalLocal = 0;
  let totalKrw = 0;

  for (const item of state.transactions) {
    if (!fundingTypes.has(item.type)) continue;
    if (item.currency !== currency) continue;
    if (item.date && date && item.date > date) continue;
    const localAmount = Number(item.amount || 0);
    const krwAmount = Number(item.krwActual || 0) || localAmount * Number(item.exchangeRate || 0);
    if (localAmount > 0 && krwAmount > 0) {
      totalLocal += localAmount;
      totalKrw += krwAmount;
    }
  }

  if (totalLocal > 0 && totalKrw > 0) {
    return { rate: totalKrw / totalLocal, source: "exchange" };
  }
  return { rate: 0, source: "" };
}

function getProjectKrw(project, transaction) {
  const fifo = buildFifoLedger(project).allocations.get(transaction.id);
  if (fifo && fifo.krw > 0) return fifo.krw;
  const manual = Number(transaction.krwActual);
  if (manual > 0) return manual;
  if (transaction.currency === project.homeCurrency) return Number(transaction.amount || 0);
  return Number(transaction.amount || 0) * Number(transaction.exchangeRate || 0);
}

function summarizeProject(project) {
  const expenses = project.transactions.filter((item) => item.type === "expense");
  return {
    totalExpense: expenses.reduce((sum, item) => sum + getProjectKrw(project, item), 0),
    transactionCount: project.transactions.length,
    participantCount: project.participants.length,
  };
}

function getCashDelta(transaction) {
  const amount = Number(transaction.amount || 0);
  if (transaction.type === "expense") return transaction.paymentMethod === "현금" ? -amount : 0;
  if (transaction.type === "exchangeOut") return transaction.paymentMethod === "현금" ? -amount : 0;
  if (transaction.type === "withdrawal" || transaction.type === "exchangeIn") return amount;
  if (transaction.type === "income" || transaction.type === "adjustment") return transaction.paymentMethod === "현금" ? amount : 0;
  return 0;
}

function filteredTransactions() {
  const category = $("filterCategory")?.value || "전체";
  const method = $("filterMethod")?.value || "전체";
  return state.transactions
    .filter((item) => category === "전체" || item.category === category)
    .filter((item) => method === "전체" || item.paymentMethod === method)
    .sort((a, b) => `${b.date}-${b.createdAt}`.localeCompare(`${a.date}-${a.createdAt}`));
}

function calculate() {
  const expenses = state.transactions.filter((item) => item.type === "expense");
  const totalExpense = expenses.reduce((sum, item) => sum + getKrw(item), 0);
  const cashExpense = expenses
    .filter((item) => item.paymentMethod === "현금")
    .reduce((sum, item) => sum + getKrw(item), 0);

  const categoryTotals = Object.fromEntries(state.categories.map((category) => [category, 0]));
  for (const item of expenses) {
    categoryTotals[item.category] = (categoryTotals[item.category] || 0) + getKrw(item);
  }

  const cashBalances = Object.fromEntries(
    state.currencies.map((currency) => [currency.code, Number(currency.startingCash || 0)]),
  );
  for (const item of state.transactions) {
    cashBalances[item.currency] = (cashBalances[item.currency] || 0) + getCashDelta(item);
  }

  const settlement = Object.fromEntries(
    state.participants.map((name) => [
      name,
      { name, paid: 0, used: 0, cashPaid: 0, count: 0 },
    ]),
  );

  for (const item of expenses) {
    const krw = getKrw(item);
    if (settlement[item.payer]) {
      settlement[item.payer].paid += krw;
      if (item.paymentMethod === "현금") settlement[item.payer].cashPaid += krw;
    }
    const weightSum = state.participants.reduce((sum, name) => sum + Number(item.weights?.[name] || 0), 0);
    if (weightSum > 0) {
      for (const name of state.participants) {
        const weight = Number(item.weights?.[name] || 0);
        settlement[name].used += (krw * weight) / weightSum;
        if (weight > 0) settlement[name].count += 1;
      }
    }
  }

  return {
    totalExpense,
    cashExpense,
    cardExpense: totalExpense - cashExpense,
    categoryTotals,
    cashBalances,
    settlement: Object.values(settlement).map((item) => ({ ...item, balance: item.paid - item.used })),
  };
}

function populateSelect(select, values, selected) {
  select.innerHTML = "";
  for (const value of values) {
    const option = document.createElement("option");
    if (typeof value === "string") {
      option.value = value;
      option.textContent = value;
    } else {
      option.value = value.id;
      option.textContent = value.label;
    }
    select.append(option);
  }
  if (selected !== undefined) select.value = selected;
}

function formatTripMeta() {
  const parts = [];
  if (state.regions?.length) parts.push(state.regions.join(", "));
  if (state.startDate || state.endDate) parts.push(`${state.startDate || "?"} ~ ${state.endDate || "?"}`);
  parts.push(state.travelMode === "solo" ? "혼자 여행" : `${state.participants.length}명 여행`);
  return parts.join(" · ");
}

function isSoloTrip() {
  return state.travelMode === "solo";
}

function syncModeUi(mode = state.travelMode) {
  document.body.classList.toggle("is-solo", mode === "solo");
  document.body.classList.toggle("is-group", mode !== "solo");
}

function setCompactChrome(enabled) {
  document.body.classList.toggle("compact-chrome", enabled);
  $("toggleChromeButton").textContent = enabled ? "상단 펼치기" : "간편 보기";
  localStorage.setItem("travel-expense-compact-chrome", enabled ? "1" : "0");
}

function formatUserWeights(weights = {}) {
  if (isSoloTrip()) return "";
  const users = state.participants
    .map((name) => ({ name, weight: Number(weights?.[name] || 0) }))
    .filter((item) => item.weight > 0);
  if (!users.length) return "";
  return users
    .map((item) => `${item.name} ${Number.isInteger(item.weight) ? item.weight : item.weight.toFixed(2)}`)
    .join(", ");
}

function renderProjectControls() {
  const select = $("projectSelect");
  select.innerHTML = "";
  for (const project of appState.projects) {
    const option = document.createElement("option");
    option.value = project.id;
    option.textContent = project.tripName || "새 여행";
    select.append(option);
  }
  select.value = state.id;
}

function renderSelects() {
  renderProjectControls();
  populateSelect($("typeInput"), transactionTypes, "expense");
  populateSelect($("categoryInput"), state.categories, state.categories[0]);
  populateSelect($("currencyInput"), state.currencies.map((item) => item.code), state.currencies[0]?.code);
  populateSelect($("methodInput"), paymentMethods, "현금");
  populateSelect($("payerInput"), state.participants, state.participants[0]);
  populateSelect($("filterCategory"), ["전체", ...state.categories], $("filterCategory").value || "전체");
  populateSelect($("filterMethod"), ["전체", ...paymentMethods], $("filterMethod").value || "전체");
}

function renderWeights(weights = {}) {
  const container = $("weightInputs");
  container.innerHTML = "";
  for (const name of state.participants) {
    const label = document.createElement("label");
    label.textContent = name;
    const input = document.createElement("input");
    input.type = "number";
    input.min = "0";
    input.step = "0.5";
    input.value = weights[name] ?? 1;
    input.dataset.participant = name;
    label.append(input);
    container.append(label);
  }
}

function renderDashboard() {
  const calc = calculate();
  $("tripNameLabel").textContent = state.tripName;
  $("tripMetaLabel").textContent = formatTripMeta();
  $("totalExpense").textContent = formatKrw(calc.totalExpense);
  $("cardExpense").textContent = formatKrw(calc.cardExpense);
  $("cashExpense").textContent = formatKrw(calc.cashExpense);
  $("transactionCount").textContent = state.transactions.length.toLocaleString("ko-KR");
  $("lastUpdated").textContent = state.transactions.length ? `${state.transactions.length}건` : "";

  const maxCategory = Math.max(1, ...Object.values(calc.categoryTotals));
  $("categoryBars").innerHTML = "";
  for (const category of state.categories.filter((item) => item !== "환전")) {
    const amount = calc.categoryTotals[category] || 0;
    const row = document.createElement("div");
    row.className = "bar-row";
    row.innerHTML = `
      <span>${category}</span>
      <div class="bar-track"><div class="bar-fill" style="width:${Math.max(3, (amount / maxCategory) * 100)}%"></div></div>
      <strong class="numeric">${formatKrw(amount)}</strong>
    `;
    $("categoryBars").append(row);
  }

  $("walletCards").innerHTML = "";
  for (const currency of state.currencies) {
    const balance = calc.cashBalances[currency.code] || 0;
    const card = document.createElement("article");
    card.className = "wallet-card";
    card.innerHTML = `<span>${currency.code}</span><strong>${formatMoney(balance, currency.code)}</strong>`;
    $("walletCards").append(card);
  }

  renderRows(
    $("recentRows"),
    state.transactions.slice().sort((a, b) => `${b.date}-${b.createdAt}`.localeCompare(`${a.date}-${a.createdAt}`)),
    6,
  );
}

function getDisplayRate(transaction) {
  const amount = Number(transaction.amount || 0);
  const fifo = getFifoAllocation(transaction.id);
  if (fifo && fifo.rate > 0) return fifo.rate;
  if (transaction.currency === state.homeCurrency) return 1;
  if (Number(transaction.exchangeRate) > 0) return Number(transaction.exchangeRate);
  if (Number(transaction.krwActual) > 0 && amount > 0) return Number(transaction.krwActual) / amount;
  return 0;
}

function renderRows(tbody, rows, colspan = 11) {
  tbody.innerHTML = "";
  if (!rows.length) {
    const empty = document.createElement("tr");
    empty.innerHTML = `<td colspan="${colspan}" class="empty-state">기록 없음</td>`;
    tbody.append(empty);
    return;
  }
  for (const item of rows) {
    const tr = document.createElement("tr");
    if (colspan === 6) {
      tr.innerHTML = `
        <td>${item.date}</td>
        <td>${item.category}</td>
        <td>${item.item}</td>
        <td>${item.paymentMethod}</td>
        <td class="numeric">${formatMoney(item.amount, item.currency)}</td>
        <td class="numeric">${formatKrw(getKrw(item))}</td>
      `;
    } else {
      tr.innerHTML = `
        <td>${item.date}</td>
        <td>${transactionTypes.find((type) => type.id === item.type)?.label || item.type}</td>
        <td>${item.category}</td>
        <td>${item.item}</td>
        <td class="group-only">${item.payer}</td>
        <td class="group-only">${formatUserWeights(item.weights)}</td>
        <td>${item.paymentMethod}</td>
        <td class="numeric">${formatMoney(item.amount, item.currency)}</td>
        <td class="numeric">${getDisplayRate(item) ? getDisplayRate(item).toLocaleString("ko-KR", { maximumFractionDigits: 4 }) : ""}</td>
        <td class="numeric">${formatKrw(getKrw(item))}</td>
        <td class="row-actions">
          <button class="icon-button" data-edit="${item.id}" type="button" title="수정">✎</button>
          <button class="icon-button" data-delete="${item.id}" type="button" title="삭제">×</button>
        </td>
      `;
    }
    tbody.append(tr);
  }
}

function renderTransactions() {
  renderRows($("transactionRows"), filteredTransactions());
}

function renderCash() {
  const calc = calculate();
  $("cashBalanceRows").innerHTML = "";
  for (const currency of state.currencies) {
    const balance = calc.cashBalances[currency.code] || 0;
    const row = document.createElement("div");
    row.className = "cash-row";
    row.innerHTML = `<span>${currency.code}</span><strong>${formatMoney(balance, currency.code)}</strong>`;
    $("cashBalanceRows").append(row);
  }
  renderDailyCash();
}

function renderDailyCash() {
  const date = $("cashDateInput").value || new Date().toISOString().slice(0, 10);
  $("cashDateInput").value = date;
  const balances = Object.fromEntries(
    state.currencies.map((currency) => [currency.code, Number(currency.startingCash || 0)]),
  );
  for (const item of state.transactions) {
    if (item.date <= date) balances[item.currency] = (balances[item.currency] || 0) + getCashDelta(item);
  }
  $("dailyCashRows").innerHTML = "";
  for (const currency of state.currencies) {
    const row = document.createElement("div");
    row.className = "cash-row";
    row.innerHTML = `<span>${currency.code}</span><strong>${formatMoney(balances[currency.code] || 0, currency.code)}</strong>`;
    $("dailyCashRows").append(row);
  }
}

function renderSettlement() {
  $("settlementRows").innerHTML = "";
  for (const item of calculate().settlement) {
    const row = document.createElement("div");
    row.className = "settlement-row";
    const className = item.balance >= 0 ? "positive" : "negative";
    row.innerHTML = `
      <strong>${item.name}</strong>
      <div><span>지불</span><strong>${formatKrw(item.paid)}</strong></div>
      <div><span>사용</span><strong>${formatKrw(item.used)}</strong></div>
      <div><span>잔액</span><strong class="${className}">${formatKrw(item.balance)}</strong></div>
    `;
    $("settlementRows").append(row);
  }
}

function renderProjects() {
  const container = $("projectCards");
  container.innerHTML = "";
  const sorted = appState.projects
    .slice()
    .sort((a, b) => String(b.startDate || "").localeCompare(String(a.startDate || "")));

  for (const project of sorted) {
    const summary = summarizeProject(project);
    const card = document.createElement("article");
    card.className = `project-card${project.id === state.id ? " active" : ""}`;
    card.innerHTML = `
      <div class="project-card-top">
        <span class="project-pill">${project.travelMode === "solo" ? "혼자 여행" : `${summary.participantCount}명 여행`}</span>
        <button class="danger-button compact-button" data-delete-project="${project.id}" type="button">삭제</button>
      </div>
      <div class="project-card-main">
        <strong>${project.tripName || "새 여행"}</strong>
        <p>${(project.regions || []).join(", ") || "지역 미정"}</p>
        <small>${project.startDate || "?"} ~ ${project.endDate || "?"}</small>
      </div>
      <div class="project-card-stats">
        <span>${formatProjectKrw(summary.totalExpense, project.homeCurrency)}</span>
        <span>${summary.transactionCount}건</span>
      </div>
      <div class="project-card-actions">
        <button class="secondary-button" data-open-project="${project.id}" type="button">열기</button>
      </div>
    `;
    container.append(card);
  }
}

function renderSettings() {
  $("tripNameInput").value = state.tripName;
  $("tripRegionsInput").value = (state.regions || []).join(", ");
  $("tripStartInput").value = state.startDate || "";
  $("tripEndInput").value = state.endDate || "";
  $("homeCurrencyInput").value = state.homeCurrency;
  $("travelModeInput").value = state.travelMode || "group";
  $("participantCountInput").value = state.participants.length;

  $("currencySettings").innerHTML = "";
  state.currencies.forEach((currency, index) => {
    const row = document.createElement("div");
    row.className = "settings-row";
    row.innerHTML = `
      <input data-currency-code="${index}" value="${currency.code}" maxlength="3" />
      <input data-currency-cash="${index}" type="number" step="0.01" value="${currency.startingCash}" />
      <input data-currency-rate="${index}" type="number" step="0.0001" value="${currency.startingRate ?? ""}" placeholder="KRW/1" />
      <button class="icon-button" data-remove-currency="${index}" type="button">×</button>
    `;
    $("currencySettings").append(row);
  });

  $("participantSettings").innerHTML = "";
  state.participants.forEach((name, index) => {
    const row = document.createElement("div");
    row.className = "settings-row participant-row";
    row.innerHTML = `
      <input data-participant="${index}" value="${name}" />
      <button class="icon-button" data-remove-participant="${index}" type="button">×</button>
    `;
    $("participantSettings").append(row);
  });

  $("categorySettings").innerHTML = "";
  state.categories.forEach((category, index) => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.innerHTML = `${category}<button data-remove-category="${index}" type="button">×</button>`;
    $("categorySettings").append(chip);
  });
}

function renderAll() {
  syncModeUi();
  renderSelects();
  renderWeights();
  renderProjects();
  renderDashboard();
  renderTransactions();
  renderCash();
  renderSettlement();
  renderSettings();
}

function getFormData() {
  const weights = {};
  if (isSoloTrip()) {
    weights[state.participants[0] || "나"] = 1;
  } else {
    document.querySelectorAll("#weightInputs input").forEach((input) => {
      weights[input.dataset.participant] = Number(input.value || 0);
    });
  }
  return {
    id: $("editingId").value || crypto.randomUUID(),
    date: $("dateInput").value,
    type: $("typeInput").value,
    category: $("categoryInput").value,
    item: $("itemInput").value.trim(),
    note: $("noteInput").value.trim(),
    currency: $("currencyInput").value,
    amount: Number($("amountInput").value || 0),
    paymentMethod: $("methodInput").value,
    payer: isSoloTrip() ? state.participants[0] || "나" : $("payerInput").value,
    krwActual: $("krwInput").value === "" ? "" : Number($("krwInput").value),
    exchangeRate: $("exchangeRateInput").value === "" ? "" : Number($("exchangeRateInput").value),
    weights,
    createdAt: Number($("editingId").dataset.createdAt || Date.now()),
  };
}

function updateConversionFields(eventTarget = null) {
  const amount = Number($("amountInput").value || 0);
  const krwValue = Number($("krwInput").value || 0);
  const rateValue = Number($("exchangeRateInput").value || 0);
  const currency = $("currencyInput").value;
  const date = $("dateInput").value;

  if (!amount || !currency) return;

  if (eventTarget?.id === "krwInput" && krwValue > 0) {
    $("exchangeRateInput").value = currency === state.homeCurrency ? 1 : (krwValue / amount).toFixed(4);
    $("exchangeRateInput").dataset.auto = "manual-krw";
    return;
  }

  if (eventTarget?.id === "exchangeRateInput" && rateValue > 0) {
    $("krwInput").value = Math.round(amount * rateValue);
    $("krwInput").dataset.auto = "manual-rate";
    return;
  }

  if (currency === state.homeCurrency) {
    $("exchangeRateInput").value = 1;
    $("krwInput").value = Math.round(amount);
    $("exchangeRateInput").dataset.auto = "home";
    $("krwInput").dataset.auto = "home";
    return;
  }

  const autoState = $("krwInput").dataset.auto || "";
  if ($("krwInput").value && (!autoState || autoState.startsWith("manual"))) return;
  const isCashExpense = $("methodInput").value === "현금" && $("typeInput").value === "expense";
  const estimate = isCashExpense
    ? estimateFifoKrw(currency, amount, date, $("editingId").value)
    : { krw: 0, rate: 0 };
  const basis = estimate.rate ? estimate : getExchangeBasis(currency, date);
  if (!basis.rate) return;

  $("exchangeRateInput").value = basis.rate.toFixed(4);
  $("krwInput").value = Math.round(amount * basis.rate);
  $("exchangeRateInput").dataset.auto = estimate.rate ? "fifo" : "exchange";
  $("krwInput").dataset.auto = estimate.rate ? "fifo" : "exchange";
}

function resetForm(options = {}) {
  const keepContext = Boolean(options.keepContext);
  const context = options.context || (keepContext
    ? {
        date: $("dateInput").value,
        type: $("typeInput").value,
        category: $("categoryInput").value,
        currency: $("currencyInput").value,
        method: $("methodInput").value,
        payer: $("payerInput").value,
      }
    : null);

  $("transactionForm").reset();
  $("editingId").value = "";
  $("editingId").dataset.createdAt = "";
  $("krwInput").dataset.auto = "";
  $("exchangeRateInput").dataset.auto = "";
  $("dateInput").value = context?.date || new Date().toISOString().slice(0, 10);
  renderSelects();
  if (context) {
    $("typeInput").value = context.type;
    $("categoryInput").value = context.category;
    $("currencyInput").value = context.currency;
    $("methodInput").value = context.method;
    $("payerInput").value = context.payer;
  }
  renderWeights();
}

function resizeParticipants(count, mode) {
  const nextCount = mode === "solo" ? 1 : Math.max(1, Math.min(20, Number(count || 1)));
  const next = [];
  for (let index = 0; index < nextCount; index += 1) {
    if (state.participants[index]) next.push(state.participants[index]);
    else next.push(index === 0 ? "나" : `동행${index}`);
  }
  state.participants = next;
}

function editTransaction(id) {
  const item = state.transactions.find((transaction) => transaction.id === id);
  if (!item) return;
  $("editingId").value = item.id;
  $("editingId").dataset.createdAt = item.createdAt;
  $("dateInput").value = item.date;
  $("typeInput").value = item.type;
  $("categoryInput").value = item.category;
  $("itemInput").value = item.item;
  $("noteInput").value = item.note || "";
  $("currencyInput").value = item.currency;
  $("amountInput").value = item.amount;
  $("methodInput").value = item.paymentMethod;
  $("payerInput").value = item.payer;
  $("krwInput").value = item.krwActual || "";
  $("exchangeRateInput").value = item.exchangeRate || "";
  $("krwInput").dataset.auto = "";
  $("exchangeRateInput").dataset.auto = "";
  renderWeights(item.weights);
  document.body.classList.add("show-advanced-entry");
  $("toggleAdvancedButton").textContent = "상세 닫기";
  switchView("entry");
}

function switchView(view) {
  document.querySelectorAll(".nav-tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.view === view));
  document.querySelectorAll(".view").forEach((section) => section.classList.remove("active"));
  $(`${view}View`).classList.add("active");
  $("viewTitle").textContent = document.querySelector(`[data-view="${view}"]`).textContent;
}

function openProject(projectId, view = "dashboard") {
  appState.currentProjectId = projectId;
  state = getCurrentProject();
  saveState();
  resetForm();
  renderAll();
  switchView(view);
}

function addProjectFromTemplate(template, view = "dashboard") {
  const project = normalizeProject({ ...clone(template), id: crypto.randomUUID() });
  appState.projects.push(project);
  appState.currentProjectId = project.id;
  state = getCurrentProject();
  saveState();
  resetForm();
  renderAll();
  switchView(view);
}

function deleteProject(projectId) {
  if (appState.projects.length <= 1) {
    alert("마지막 프로젝트는 삭제할 수 없습니다.");
    return;
  }
  const project = appState.projects.find((item) => item.id === projectId);
  if (!project) return;
  const confirmed = confirm(`'${project.tripName || "새 여행"}' 프로젝트를 삭제할까요?`);
  if (!confirmed) return;
  appState.projects = appState.projects.filter((item) => item.id !== projectId);
  if (appState.currentProjectId === projectId) {
    appState.currentProjectId = appState.projects[0].id;
  }
  state = getCurrentProject();
  saveState();
  resetForm();
  renderAll();
  switchView("projects");
}

function download(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function exportCsv() {
  const header = ["date", "type", "category", "item", "currency", "amount", "paymentMethod", "payer", "exchangeRate", "krw", "note"];
  const rows = state.transactions.map((item) =>
    [item.date, item.type, item.category, item.item, item.currency, item.amount, item.paymentMethod, item.payer, getDisplayRate(item), getKrw(item), item.note]
      .map((value) => `"${String(value ?? "").replaceAll('"', '""')}"`)
      .join(","),
  );
  download("travel-expenses.csv", [header.join(","), ...rows].join("\n"), "text/csv;charset=utf-8");
}

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  if (target.matches(".nav-tab")) switchView(target.dataset.view);
  if (target.id === "newProjectButton" || target.id === "newProjectButtonMain") {
    const project = createProject({ tripName: `새 여행 ${appState.projects.length + 1}` });
    appState.projects.push(project);
    openProject(project.id, "settings");
  }
  if (target.dataset.openProject) openProject(target.dataset.openProject, "dashboard");
  if (target.dataset.deleteProject) deleteProject(target.dataset.deleteProject);
  if (target.dataset.edit) editTransaction(target.dataset.edit);
  if (target.dataset.delete) {
    state.transactions = state.transactions.filter((item) => item.id !== target.dataset.delete);
    saveState();
    renderAll();
  }
  if (target.id === "clearButton") {
    const replacement = createProject({ id: state.id, tripName: state.tripName });
    const index = appState.projects.findIndex((project) => project.id === state.id);
    appState.projects[index] = replacement;
    state = replacement;
    saveState();
    resetForm();
    renderAll();
  }
  if (target.id === "cancelEditButton") {
    resetForm();
    document.body.classList.remove("show-advanced-entry");
    $("toggleAdvancedButton").textContent = "상세 입력";
  }
  if (target.id === "toggleAdvancedButton") {
    const isOpen = document.body.classList.toggle("show-advanced-entry");
    target.textContent = isOpen ? "상세 닫기" : "상세 입력";
  }
  if (target.id === "toggleChromeButton") {
    setCompactChrome(!document.body.classList.contains("compact-chrome"));
  }
  if (target.id === "saveTripButton") {
    state.tripName = $("tripNameInput").value.trim() || "새 여행";
    state.regions = $("tripRegionsInput")
      .value.split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    state.startDate = $("tripStartInput").value;
    state.endDate = $("tripEndInput").value;
    state.homeCurrency = $("homeCurrencyInput").value.trim().toUpperCase() || "KRW";
    state.travelMode = $("travelModeInput").value;
    resizeParticipants($("participantCountInput").value, state.travelMode);
    saveState();
    renderAll();
  }
  if (target.id === "addCurrencyButton") {
    state.currencies.push({ code: "USD", startingCash: 0, startingRate: "" });
    saveState();
    renderAll();
  }
  if (target.id === "saveCurrencyButton" || target.id === "saveParticipantButton" || target.id === "saveCategoryButton") {
    saveState();
    renderAll();
  }
  if (target.id === "addParticipantButton") {
    state.participants.push(`동행${state.participants.length}`);
    saveState();
    renderAll();
  }
  if (target.id === "addCategoryButton") {
    const value = $("newCategoryInput").value.trim();
    if (value && !state.categories.includes(value)) state.categories.push(value);
    $("newCategoryInput").value = "";
    saveState();
    renderAll();
  }
  if (target.dataset.removeCurrency) {
    state.currencies.splice(Number(target.dataset.removeCurrency), 1);
    saveState();
    renderAll();
  }
  if (target.dataset.removeParticipant) {
    state.participants.splice(Number(target.dataset.removeParticipant), 1);
    saveState();
    renderAll();
  }
  if (target.dataset.removeCategory) {
    state.categories.splice(Number(target.dataset.removeCategory), 1);
    saveState();
    renderAll();
  }
});

document.addEventListener("change", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement)) return;
  let handled = false;
  if (target.dataset.currencyCode) state.currencies[Number(target.dataset.currencyCode)].code = target.value.trim().toUpperCase();
  if (target.dataset.currencyCode) handled = true;
  if (target.dataset.currencyCash) {
    state.currencies[Number(target.dataset.currencyCash)].startingCash = Number(target.value || 0);
    handled = true;
  }
  if (target.dataset.currencyRate) {
    state.currencies[Number(target.dataset.currencyRate)].startingRate = target.value === "" ? "" : Number(target.value || 0);
    handled = true;
  }
  if (target.dataset.participant) {
    state.participants[Number(target.dataset.participant)] = target.value.trim();
    handled = true;
  }
  if (!handled) return;
  saveState();
  renderAll();
});

$("transactionForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const context = {
    date: $("dateInput").value,
    type: $("typeInput").value,
    category: $("categoryInput").value,
    currency: $("currencyInput").value,
    method: $("methodInput").value,
    payer: $("payerInput").value,
  };
  const data = getFormData();
  if (!data.date || !data.item || !data.amount) return;
  const index = state.transactions.findIndex((item) => item.id === data.id);
  if (index >= 0) state.transactions[index] = data;
  else state.transactions.push(data);
  saveState();
  renderAll();
  resetForm({ context });
});

["amountInput", "currencyInput", "dateInput", "krwInput", "exchangeRateInput", "methodInput", "typeInput"].forEach((id) => {
  $(id).addEventListener("input", (event) => updateConversionFields(event.target));
  $(id).addEventListener("change", (event) => updateConversionFields(event.target));
});

$("filterCategory").addEventListener("change", renderTransactions);
$("filterMethod").addEventListener("change", renderTransactions);
$("cashDateInput").addEventListener("change", renderDailyCash);
$("travelModeInput").addEventListener("change", (event) => {
  syncModeUi(event.target.value);
  if (event.target.value === "solo") $("participantCountInput").value = 1;
});
$("projectSelect").addEventListener("change", (event) => {
  openProject(event.target.value, "dashboard");
});
$("exportCsvButton").addEventListener("click", exportCsv);
$("exportJsonButton").addEventListener("click", () => download("travel-wallet.json", JSON.stringify(appState, null, 2), "application/json"));

resetForm();
renderAll();
setCompactChrome(
  localStorage.getItem("travel-expense-compact-chrome") === "1" ||
    (localStorage.getItem("travel-expense-compact-chrome") === null && window.matchMedia("(max-width: 680px)").matches),
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}
