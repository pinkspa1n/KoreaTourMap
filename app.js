'use strict';

/* ══════════════════════════════════════════
   i18n
══════════════════════════════════════════ */
const i18n = {
  en: {
    appTitle:'Korea Tour Map', all:'All', seoul:'Seoul', busan:'Busan', jeju:'Jeju',
    gyeonggi:'Gyeonggi', incheon:'Incheon', gangwon:'Gangwon', chungcheong:'Chungcheong', jeolla:'Jeolla', gyeongsang:'Gyeongsang', other:'Other',
    catAll:'All', catKorean:'Korean', catChinese:'Chinese', catJapanese:'Japanese', catWestern:'Western', catAsian:'Asian', catDessert:'Dessert',
    planRoute:'Plan My Route', routeTitle:'My Route', routeHint:'Select restaurants on the map',
    startNav:'Start Navigation', clearRoute:'Clear All',
    addReview:'Write a Review', submit:'Submit', cancel:'Cancel',
    nationality:'Your Nationality', selectNationality:'Select nationality…',
    rating:'Rating', reviewText:'Your Review',
    noReviews:'No reviews yet. Be the first!',
    address:'Address', hours:'Hours', phone:'Phone', price:'Price',
    directions:'Get Directions', addToRoute:'Add to Route', removeFromRoute:'Remove',
    naverMap: 'Naver Map',
    emptyTitle:'Select a restaurant', emptySubtitle:'Tap any marker on the map to see details',
    close:'Close', reviews:'Reviews', from:'from',
    routeAdded:'Added to route', routeRemoved:'Removed from route',
    routeFull:'Route updated', reviewSaved:'Review saved!',
    reviewError:'Please fill in all fields',
  },
  zh: {
    appTitle:'韩国旅游地图', all:'全部', seoul:'首尔', busan:'釜山', jeju:'济州',
    gyeonggi:'京畿', incheon:'仁川', gangwon:'江原', chungcheong:'忠清', jeolla:'全罗', gyeongsang:'庆尚', other:'其他',
    catAll:'全部', catKorean:'韩食', catChinese:'中餐', catJapanese:'日料', catWestern:'西餐', catAsian:'东南亚', catDessert:'甜点',
    planRoute:'规划路线', routeTitle:'我的路线', routeHint:'在地图上选择餐厅',
    startNav:'开始导航', clearRoute:'全部清除',
    addReview:'写评价', submit:'提交', cancel:'取消',
    nationality:'您的国籍', selectNationality:'选择国籍…',
    rating:'评分', reviewText:'您的评价',
    noReviews:'暂无评价，来第一个吧！',
    address:'地址', hours:'营业时间', phone:'电话', price:'价格',
    directions:'查看路线', addToRoute:'加入路线', removeFromRoute:'删除',
    naverMap: '导航',
    emptyTitle:'选择一家餐厅', emptySubtitle:'点击地图上的标记查看详情',
    close:'关闭', reviews:'评价', from:'来自',
    routeAdded:'已加入路线', routeRemoved:'已从路线删除',
    routeFull:'路线已更新', reviewSaved:'评价已保存！',
    reviewError:'请填写所有字段',
  },
  ja: {
    appTitle:'韓国ツアーマップ', all:'すべて', seoul:'ソウル', busan:'釜山', jeju:'済州',
    gyeonggi:'京畿', incheon:'仁川', gangwon:'江原', chungcheong:'忠清', jeolla:'全罗', gyeongsang:'庆尚', other:'其他',
    catAll:'すべて', catKorean:'韓食', catChinese:'中華', catJapanese:'和食', catWestern:'洋食', catAsian:'アジア料理', catDessert:'デザート',
    planRoute:'ルートを計画', routeTitle:'マイルート', routeHint:'地図でレストランを選択',
    startNav:'ナビ開始', clearRoute:'全クリア',
    addReview:'レビューを書く', submit:'送信', cancel:'キャンセル',
    nationality:'国籍', selectNationality:'国籍を選択…',
    rating:'評価', reviewText:'レビュー',
    noReviews:'まだレビューがありません。最初に投稿しましょう！',
    address:'住所', hours:'営業時間', phone:'電話', price:'価格',
    directions:'道案内', addToRoute:'ルートに追加', removeFromRoute:'削除',
    naverMap: 'ナビ',
    emptyTitle:'レストランを選択', emptySubtitle:'地図のマーカーをタップして詳細を確認',
    close:'閉じる', reviews:'レビュー', from:'から',
    routeAdded:'ルートに追加しました', routeRemoved:'ルートから削除しました',
    routeFull:'ルート更新', reviewSaved:'レビューを保存しました！',
    reviewError:'すべての項目を入力してください',
  },
  fr: {
    appTitle:'Carte Touristique Corée', all:'Tout', seoul:'Séoul', busan:'Busan', jeju:'Jeju',
    gyeonggi:'Gyeonggi', incheon:'Incheon', gangwon:'Gangwon', chungcheong:'Chungcheong', jeolla:'Jeolla', gyeongsang:'Gyeongsang', other:'Autre',
    catAll:'Tout', catKorean:'Coréen', catChinese:'Chinois', catJapanese:'Japonais', catWestern:'Occidental', catAsian:'Asiatique', catDessert:'Dessert',
    planRoute:'Planifier mon itinéraire', routeTitle:'Mon Itinéraire', routeHint:'Sélectionnez des restaurants sur la carte',
    startNav:'Démarrer la navigation', clearRoute:'Tout effacer',
    addReview:'Écrire un avis', submit:'Soumettre', cancel:'Annuler',
    nationality:'Votre nationalité', selectNationality:'Sélectionner la nationalité…',
    rating:'Note', reviewText:'Votre avis',
    noReviews:'Aucun avis pour l\'instant. Soyez le premier !',
    address:'Adresse', hours:'Heures', phone:'Téléphone', price:'Prix',
    directions:'Itinéraire', addToRoute:'Ajouter', removeFromRoute:'Supprimer',
    naverMap: 'Naver Map',
    emptyTitle:'Sélectionnez un restaurant', emptySubtitle:'Appuyez sur un marqueur pour voir les détails',
    close:'Fermer', reviews:'Avis', from:'de',
    routeAdded:'Ajouté à l\'itinéraire', routeRemoved:'Retiré de l\'itinéraire',
    routeFull:'Itinéraire mis à jour', reviewSaved:'Avis enregistré !',
    reviewError:'Veuillez remplir tous les champs',
  },
};

/* ══════════════════════════════════════════
   State
══════════════════════════════════════════ */
const state = {
  restaurants: [],
  filtered: [],
  region: 'all',
  category: 'all',
  selected: null,
  routePlan: [],
  lang: 'en',
  searchQuery: '',
  searchMode: 'restaurant', // 'restaurant' | 'place'
  poiMarkers: [],
  lockersVisible: false,
  map: null,
  markers: {},
  infoWindow: null,
  routeMode: false,
};
let lockerMarkers = [];

async function loadAndShowLockers() {
  if (lockerMarkers.length > 0) {
    lockerMarkers.forEach(m => m.setMap(state.map));
    return;
  }
  function hideLockers() {
  lockerMarkers.forEach(m => m.setMap(null));
}
  try {
    const res = await fetch('lockers.json');
    const lockers = await res.json();
    lockers.forEach(l => {
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(l.lat, l.lng),
        map: state.map,
        icon: {
          content: `<div style="background:#4A90D9;border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-size:16px;border:2px solid white;box-shadow:0 2px 4px rgba(0,0,0,0.3)">🔒</div>`,
          anchor: new naver.maps.Point(16, 16),
        },
        zIndex: 5,
      });
      naver.maps.Event.addListener(marker, 'click', () => {
        if (state.infoWindow) state.infoWindow.close();
        const iw = new naver.maps.InfoWindow({
        content: `<div style="padding:8px;font-size:13px;min-width:150px"><b>${l.station}</b><br>${state.lang === 'ko' ? l.details : (l.detailsEn || l.details)}</div>`, 
        });
        iw.open(state.map, marker);
        state.infoWindow = iw;
      });
      lockerMarkers.push(marker);
    });
  } catch(e) {
    console.error('Lockers load error:', e);
  }
}

function hideLockers() {
  lockerMarkers.forEach(m => m.setMap(null));
}

const regionCenters = {
  all:   { lat: 36.5, lng: 127.5, zoom: 7 },
  seoul: { lat: 37.5665, lng: 126.978, zoom: 12 },
  busan: { lat: 35.1796, lng: 129.0756, zoom: 12 },
  jeju:  { lat: 33.3617, lng: 126.5292, zoom: 11 },
  gyeonggi:   { lat: 37.4138, lng: 127.5183, zoom: 10 },
  incheon:    { lat: 37.4563, lng: 126.7052, zoom: 11 },
  gangwon:    { lat: 37.8228, lng: 128.1555, zoom: 9  },
  chungcheong: { lat: 36.6358, lng: 127.4914, zoom: 9  },
  jeolla:     { lat: 35.7175, lng: 127.1530, zoom: 9  },
  gyeongsang: { lat: 35.7597, lng: 128.7612, zoom: 9  },
  other:      { lat: 36.5040, lng: 127.7669, zoom: 7  },
};

const catEmoji = { korean:'🍲', chinese:'🥡', japanese:'🍱', western:'🍝', asian:'🍜', dessert:'🍰', other:'🍽️' };
const catLabel = { korean:'Korean', chinese:'Chinese', japanese:'Japanese', western:'Western', asian:'Asian', dessert:'Dessert', other:'Other' };
const typeEmoji = { tourism:'🗺️', shopping:'🛍️', cafe:'☕' };
const channelShape = {
  '가희드': 'square',
  '너도가봤으면해': 'heart',
  '올리네': 'triangle',
};
const videoPalette = [
  '#E8A838','#E84393','#9B43E8','#43E8A8','#43A8E8','#E84343',
  '#88C640','#F4A460','#6495ED','#FF69B4','#20B2AA','#FF8C00',
];
function getVideoColor(videoTag) {
  if (!videoTag) return '#999';
  const hash = videoTag.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return videoPalette[hash % videoPalette.length];
}

   /* DOM refs
══════════════════════════════════════════ */
const $ = id => document.getElementById(id);
const dom = {
  sidePanel:       $('sidePanel'),
  panelEmpty:      $('panelEmpty'),
  panelDetail:     $('panelDetail'),
  panelHandle:     $('panelHandle'),
  detailName:      $('detailName'),
  detailNameEn:    $('detailNameEn'),
  detailRating:    $('detailRating'),
  detailAddress:   $('detailAddress'),
  detailHours:     $('detailHours'),
  detailDesc:      $('detailDescription'),
  detailBadge:     $('detailCategoryBadge'),
  btnDirections:   $('btnDirections'),
  btnNaverMap:     $('btnNaverMap'),
  btnAddRoute:     $('btnAddRoute'),
  btnAddReview:    $('btnAddReview'),
  reviewsList:     $('reviewsList'),
  routeFab:        $('routeFab'),
  routeCount:      $('routeCount'),
  routePanel:      $('routePanel'),
  routeStops:      $('routeStops'),
  btnStartRoute:   $('btnStartRoute'),
  btnClearRoute:   $('btnClearRoute'),
  btnCloseRoute:   $('btnCloseRoute'),
  reviewModal:     $('reviewModal'),
  reviewForm:      $('reviewForm'),
  btnCloseReview:  $('btnCloseReview'),
  btnCancelReview: $('btnCancelReview'),
  reviewNationality: $('reviewNationality'),
  reviewText:      $('reviewText'),
  starPicker:      $('starPicker'),
  toast:           $('toast'),
};

let selectedRating = 0;

/* ══════════════════════════════════════════
   Init
══════════════════════════════════════════ */
async function init() {
  await loadRestaurants();
  waitForNaverMaps(() => {
    initMap();
    applyFilters();
    renderMarkers();
  });
  setupEventListeners();
  applyLanguage(state.lang);
  registerServiceWorker();
}

function waitForNaverMaps(cb) {
  if (window.__naverMapsLoaded && typeof naver !== 'undefined') { cb(); return; }
  if (window.__naverMapsError) { showMapFallback(); return; }
  window.__naverReadyCb = () => {
    if (window.__naverMapsError) { showMapFallback(); return; }
    cb();
  };
}

function showMapFallback() {
  $('map').innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;flex-direction:column;gap:12px;color:#6e6e73;font-family:-apple-system,sans-serif"><p style="font-size:16px;font-weight:600">Map unavailable</p><p style="font-size:13px">Please add your Naver Maps Client ID to index.html</p></div>';
}

/* ══════════════════════════════════════════
   Data
══════════════════════════════════════════ */
async function loadRestaurants() {
  try {
    const res = await fetch('https://raw.githubusercontent.com/pinkspa1n/KoreaTourMap/main/restaurants.json');
    state.restaurants = await res.json();
  } catch (e) {
    console.error('Failed to load restaurants.json', e);
    state.restaurants = [];
  }
}

/* ══════════════════════════════════════════
   Map
══════════════════════════════════════════ */
function initMap() {
  const c = regionCenters.all;
  state.map = new naver.maps.Map('map', {
    center: new naver.maps.LatLng(c.lat, c.lng),
    zoom: c.zoom,
    mapTypeId: naver.maps.MapTypeId.NORMAL,
    mapTypeControl: false,
    scaleControl: false,
    logoControl: false,
    mapDataControl: false,
    zoomControlOptions: { position: naver.maps.Position.TOP_RIGHT },
  });

  naver.maps.Event.addListener(state.map, 'click', () => {
    if (state.selected) deselectRestaurant();
  });
}

/* ══════════════════════════════════════════
   Filters
══════════════════════════════════════════ */
function applyFilters() {
  const q = (state.searchQuery || '').toLowerCase().trim();
  state.filtered = state.restaurants.filter(r => {
    const regionOk = state.region === 'all' || r.region === state.region;
    const catOk    = state.category === 'all' || r.category === state.category;
    const searchOk = !q || 
      r.name.toLowerCase().includes(q) || 
      (r.nameEn || '').toLowerCase().includes(q) ||
      (r.address || '').toLowerCase().includes(q);
    return regionOk && catOk && searchOk;
  });
}

/* ══════════════════════════════════════════
   Markers
══════════════════════════════════════════ */
function renderMarkers() {
  if (!state.map) return;

  const filteredIds = new Set(state.filtered.map(r => r.id));
  for (const [id, m] of Object.entries(state.markers)) {
    if (!filteredIds.has(Number(id))) {
      m.marker.setMap(null);
      delete state.markers[id];
    }
  }

  state.filtered.forEach(r => {
    if (state.markers[r.id]) return;
    const marker = createMarker(r);
    state.markers[r.id] = { marker, restaurant: r };
  });

  state.filtered.forEach(r => {
    if (state.markers[r.id]) updateMarkerStyle(r.id);
  });
}

function createMarker(r) {
  const routeIdx = state.routePlan.findIndex(x => x.id === r.id);
  const isRoute  = routeIdx !== -1;
  const content  = buildMarkerHtml(r, isRoute, routeIdx + 1);

  const marker = new naver.maps.Marker({
    position: new naver.maps.LatLng(r.lat, r.lng),
    map: state.map,
    icon: {
      content,
      anchor: new naver.maps.Point(18, 36),
    },
    zIndex: isRoute ? 10 : 1,
  });

  naver.maps.Event.addListener(marker, 'click', () => handleMarkerClick(r));
  return marker;
}

function buildMarkerHtml(r, isRoute, routeNum) {
  if (!isRoute && r.source && channelShape[r.source]) {
    const shape = channelShape[r.source];
    const color = getVideoColor(r.videoTag);
    const emoji = typeEmoji[r.type] || catEmoji[r.category];
    if (shape === 'square') {
      return `<div style="background:${color};width:36px;height:36px;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:18px;box-shadow:0 2px 6px rgba(0,0,0,0.3);${state.selected?.id === r.id ? 'border:3px solid #fff;' : ''}">${emoji}</div>`;
    } else if (shape === 'heart') {
      return `<div style="position:relative;width:36px;height:36px;display:flex;align-items:center;justify-content:center"><div style="background:${color};width:36px;height:36px;border-radius:50% 50% 0 50%;transform:rotate(-45deg);box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div><span style="position:absolute;font-size:18px;transform:rotate(0deg)">${emoji}</span></div>`;
    } else if (shape === 'triangle') {
      return `<div style="position:relative;width:36px;height:36px;display:flex;align-items:center;justify-content:center"><div style="width:0;height:0;border-left:18px solid transparent;border-right:18px solid transparent;border-bottom:36px solid ${color};filter:drop-shadow(0 2px 3px rgba(0,0,0,0.3));"></div><span style="position:absolute;font-size:16px;top:14px">${emoji}</span></div>`;
    }
  }
  const cls = `map-marker marker-${r.category}${isRoute ? ' route-stop-marker' : ''}${state.selected?.id === r.id ? ' selected' : ''}`;
  const inner = isRoute ? routeNum : (typeEmoji[r.type] || catEmoji[r.category]);
  return `<div class="${cls}"><span class="map-marker-inner">${inner}</span></div>`;
}

function updateMarkerStyle(id) {
  const entry = state.markers[id];
  if (!entry) return;
  const { marker, restaurant: r } = entry;
  const routeIdx = state.routePlan.findIndex(x => x.id === r.id);
  marker.setIcon({
    content: buildMarkerHtml(r, routeIdx !== -1, routeIdx + 1),
    anchor: new naver.maps.Point(18, 36),
  });
  marker.setZIndex(routeIdx !== -1 ? 10 : (state.selected?.id === r.id ? 5 : 1));
}

function handleMarkerClick(r) {
  if (state.routeMode) {
    toggleRouteStop(r);
    return;
  }
  selectRestaurant(r);
}

/* ══════════════════════════════════════════
   Restaurant Selection
══════════════════════════════════════════ */
function selectRestaurant(r) {
  const prev = state.selected;
  state.selected = r;
  if (prev) updateMarkerStyle(prev.id);
  updateMarkerStyle(r.id);

  renderPanelDetail(r);
  openPanel();

  if (state.map) {
    state.map.panTo(new naver.maps.LatLng(r.lat, r.lng));
  }
}

function deselectRestaurant() {
  const prev = state.selected;
  state.selected = null;
  if (prev) updateMarkerStyle(prev.id);
  dom.panelDetail.style.display = 'none';
  dom.panelEmpty.style.display  = 'flex';
  closePanel();
}

function renderPanelDetail(r) {
  const t = i18n[state.lang];
  dom.panelEmpty.style.display  = 'none';
  dom.panelDetail.style.display = 'block';

  dom.detailBadge.textContent  = catLabel[r.category];
  dom.detailBadge.className    = `restaurant-category-badge badge-${r.category}`;
  dom.detailName.textContent   = r.name;
  dom.detailNameEn.textContent = r.nameEn;
  dom.detailAddress.textContent= r.address;
  dom.detailHours.innerHTML = r.hours ? translateHours(r.hours, state.lang).split(' | ').map(d => `<div>${d}</div>`).join('') : '';
  if (dom.detailPhone) dom.detailPhone.textContent = r.phone;
  if (dom.detailDesc) {
    if (r.description && r.description.includes('youtube.com')) {
      dom.detailDesc.innerHTML = `<a href="${r.description}" target="_blank" style="color:#FF0000;font-size:13px">▶ YouTube 영상 보기</a>`;
      dom.detailDesc.style.display = 'block';
    } else {
      dom.detailDesc.style.display = 'none';
    }
  }

  dom.detailRating.innerHTML = `<span class="rating-stars">☆☆☆☆☆</span><span class="rating-num">-</span>`;
  renderReviews(r.id).catch(() => {});

  const inRoute = state.routePlan.some(x => x.id === r.id);
  dom.btnAddRoute.textContent = inRoute ? t.removeFromRoute : t.addToRoute;
  dom.btnAddRoute.classList.toggle('in-route', inRoute);

  dom.btnDirections.onclick = () => openDirections(r);
  dom.btnNaverMap.onclick = () => window.open(`https://map.naver.com/v5/search/${encodeURIComponent(r.name)}`, '_blank');
  renderReviews(r.id);
}

/* ══════════════════════════════════════════
   Panel open/close (mobile)
══════════════════════════════════════════ */
function openPanel() {
  if (window.innerWidth <= 768) {
    dom.sidePanel.classList.remove('panel-peek');
    dom.sidePanel.classList.add('panel-open');
  }
}
function closePanel() {
  if (window.innerWidth <= 768) {
    dom.sidePanel.classList.remove('panel-open', 'panel-peek');
  }
}

/* ══════════════════════════════════════════
   Reviews
══════════════════════════════════════════ */
async function getReviews(restaurantId) {
  if (!window.db) return [];
  const { collection, getDocs, query, where } = window.firestore;
  const q = query(collection(window.db, 'reviews'), where('restaurantId', '==', restaurantId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data());
}
async function saveReview(restaurantId, review) {
  if (window.db) {
    const { collection, addDoc } = window.firestore;
    await addDoc(collection(window.db, 'reviews'), {
      restaurantId,
      ...review,
    });
  }
}
async function renderReviews(restaurantId) {
  const t    = i18n[state.lang];
  const list = await getReviews(restaurantId);
  if (!list.length) {
    dom.reviewsList.innerHTML = `<p class="no-reviews">${t.noReviews}</p>`;
    dom.detailRating.innerHTML = `<span class="rating-stars">☆☆☆☆☆</span><span class="rating-num">-</span>`;
    return;
  }
  dom.reviewsList.innerHTML = list.map(rv => `
    <div class="review-card">
      <div class="review-meta">
        <span class="review-nationality">${rv.flag || '🌍'} ${rv.nickname || rv.nationality}</span>
        <span class="review-stars">${'★'.repeat(rv.rating)}${'☆'.repeat(5-rv.rating)}</span>
        <span class="review-date">${rv.date}</span>
      </div>
      <p class="review-text">${escapeHtml(rv.text)}</p>
    </div>`).join('');

  // 별점 평균 계산 후 표시
  const avg = list.reduce((sum, rv) => sum + rv.rating, 0) / list.length;
  const full = Math.floor(avg);
  const half = avg - full >= 0.5;
  dom.detailRating.innerHTML = `
    <span class="rating-stars">${'★'.repeat(full)}${half ? '½' : ''}${'☆'.repeat(5 - full - (half?1:0))}</span>
    <span class="rating-num">${avg.toFixed(1)}</span>`;
}

/* ══════════════════════════════════════════
   Route Planning
══════════════════════════════════════════ */
function toggleRouteStop(r) {
  const idx = state.routePlan.findIndex(x => x.id === r.id);
  const t   = i18n[state.lang];
  if (idx !== -1) {
    state.routePlan.splice(idx, 1);
    showToast(t.routeRemoved);
  } else {
    state.routePlan.push(r);
    showToast(t.routeAdded);
  }
  updateMarkerStyle(r.id);
  if (state.selected?.id === r.id) renderPanelDetail(r);
  renderRoutePanel();
}
function translateHours(hours, lang) {
  if (lang === 'ko' || !hours) return hours;
  const dayMap = {
    en: { '월요일': 'Mon', '화요일': 'Tue', '수요일': 'Wed', '목요일': 'Thu', '금요일': 'Fri', '토요일': 'Sat', '일요일': 'Sun', '휴무일': 'Closed', '휴무': 'Closed', '오전': 'AM', '오후': 'PM' },
    zh: { '월요일': '周一', '화요일': '周二', '수요일': '周三', '목요일': '周四', '금요일': '周五', '토요일': '周六', '일요일': '周日', '휴무일': '休息', '휴무': '休息', '오전': '上午', '오후': '下午' },
    ja: { '월요일': '月曜', '화요일': '火曜', '수요일': '水曜', '목요일': '木曜', '금요일': '金曜', '토요일': '土曜', '일요일': '日曜', '휴무일': '定休日', '휴무': '定休日', '오전': '午前', '오후': '午後' },
    fr: { '월요일': 'Lun', '화요일': 'Mar', '수요일': 'Mer', '목요일': 'Jeu', '금요일': 'Ven', '토요일': 'Sam', '일요일': 'Dim', '휴무일': 'Fermé', '휴무': 'Fermé', '오전': 'AM', '오후': 'PM' },
  };
  const map = dayMap[lang] || dayMap['en'];
  let result = hours;
  for (const [kr, tr] of Object.entries(map)) {
    result = result.replaceAll(kr, tr);
  }
  return result;
}
function formatHours(hours) {
  if (!hours) return '';
  const days = hours.split(' | ');

  const weekdayDays = ['월요일','화요일','수요일','목요일','금요일'];
  const weekendDays = ['토요일','일요일'];

  const weekday = days.filter(d => weekdayDays.some(k => d.startsWith(k)));
  const weekend = days.filter(d => weekendDays.some(k => d.startsWith(k)));
  const closed = days.filter(d => d.includes('휴무') || d.includes('정기휴일'));

  const result = [];

  if (weekday.length) {
    const times = weekday[0].replace(/^.+?: /, '');
    const parts = times.split(', ');
    const mainTime = parts[0];
    const breakTime = parts.length > 1 ? parts.slice(1).join(', ') : null;
    result.push('주중: ' + mainTime);
    if (breakTime) result.push('브레이크: ' + breakTime);
  }

  if (weekend.length) {
    const times = weekend[0].replace(/^.+?: /, '');
    result.push('주말: ' + times.split(', ')[0]);
  }

  if (closed.length) result.push('휴무: ' + closed[0].replace(/^.+?: /, ''));

  return result.join('\n') || hours;
}
function renderRoutePanel() {
  const t   = i18n[state.lang];
  const cnt = state.routePlan.length;
  dom.routeCount.textContent = cnt;
  dom.routeCount.style.display = cnt ? 'flex' : 'none';

  dom.btnStartRoute.disabled = cnt < 2;

  dom.routeStops.innerHTML = state.routePlan.map((r, i) => `
    <div class="route-stop">
      <span class="stop-num">${i + 1}</span>
      <span class="stop-name">${r.nameEn}</span>
      <button class="stop-remove" data-id="${r.id}" aria-label="Remove" title="Remove">✕</button>
    </div>`).join('');

  dom.routeStops.querySelectorAll('.stop-remove').forEach(btn => {
    btn.onclick = () => {
      const r = state.routePlan.find(x => x.id === Number(btn.dataset.id));
      if (r) toggleRouteStop(r);
    };
  });
}

function openDirections(r) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      const url = `https://map.naver.com/p/directions/${lng},${lat},My%20Location,PLACE_POI/${r.lng},${r.lat},${encodeURIComponent(r.nameEn)},PLACE_POI/-/car?c=15,0,0,0,dh`;
      window.open(url, '_blank');
    }, () => {
      const url = `https://map.naver.com/p/directions/-/${r.lng},${r.lat},${encodeURIComponent(r.nameEn)},PLACE_POI/-/car?c=15,0,0,0,dh`;
      window.open(url, '_blank');
    });
  } else {
    const url = `https://map.naver.com/p/directions/-/${r.lng},${r.lat},${encodeURIComponent(r.nameEn)},PLACE_POI/-/car?c=15,0,0,0,dh`;
    window.open(url, '_blank');
  }
}

function startNavigation() {
  if (state.routePlan.length < 1) return;
  const stops = state.routePlan;

  if (stops.length === 1) {
    // 핀 1개: 현재 위치 → 핀
    navigator.geolocation.getCurrentPosition(pos => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      const dest = stops[0];
      const url = `https://map.naver.com/p/directions/${lng},${lat},My%20Location,PLACE_POI/${dest.lng},${dest.lat},${encodeURIComponent(dest.nameEn)},PLACE_POI/-/car?c=15,0,0,0,dh`;
      window.open(url, '_blank');
    }, () => {
      const dest = stops[0];
      const url = `https://map.naver.com/p/directions/-/${dest.lng},${dest.lat},${encodeURIComponent(dest.nameEn)},PLACE_POI/-/car?c=15,0,0,0,dh`;
      window.open(url, '_blank');
    });
  } else {
    // 핀 2개 이상: 유저 선택
    const choice = confirm('경로 안내 방식을 선택해주세요:\n\n확인 → 현재 위치에서 출발\n취소 → 핀끼리 경로');
    if (choice) {
      // 현재 위치 → 핀들
      navigator.geolocation.getCurrentPosition(pos => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const dest = stops[stops.length - 1];
        const waypoints = stops.slice(0, -1);
        const origin = `${lng},${lat},My%20Location,PLACE_POI`;
        const waypointStr = waypoints.map(r => `${r.lng},${r.lat},${encodeURIComponent(r.nameEn)},PLACE_POI`).join('/');
        const destStr = `${dest.lng},${dest.lat},${encodeURIComponent(dest.nameEn)},PLACE_POI`;
        const url = `https://map.naver.com/p/directions/${origin}/${waypointStr}/${destStr}/-/car?c=15,0,0,0,dh`;
        window.open(url, '_blank');
      }, () => {
        const dest = stops[stops.length - 1];
        const waypoints = stops.slice(0, -1);
        const waypointStr = waypoints.map(r => `${r.lng},${r.lat},${encodeURIComponent(r.nameEn)},PLACE_POI`).join('/');
        const destStr = `${dest.lng},${dest.lat},${encodeURIComponent(dest.nameEn)},PLACE_POI`;
        const url = `https://map.naver.com/p/directions/-/${waypointStr}/${destStr}/-/car?c=15,0,0,0,dh`;
        window.open(url, '_blank');
      });
    } else {
      // 핀끼리 경로
      const origin = stops[0];
      const dest = stops[stops.length - 1];
      const waypoints = stops.slice(1, -1);
      const originStr = `${origin.lng},${origin.lat},${encodeURIComponent(origin.nameEn)},PLACE_POI`;
      const waypointStr = waypoints.map(r => `${r.lng},${r.lat},${encodeURIComponent(r.nameEn)},PLACE_POI`).join('/');
      const destStr = `${dest.lng},${dest.lat},${encodeURIComponent(dest.nameEn)},PLACE_POI`;
      const middle = waypointStr ? `${waypointStr}/` : '';
      const url = `https://map.naver.com/p/directions/${originStr}/${middle}${destStr}/-/car?c=15,0,0,0,dh`;
      window.open(url, '_blank');
    }
  }
}

/* ══════════════════════════════════════════
   Language
══════════════════════════════════════════ */
function applyLanguage(lang) {
  state.lang = lang;
  const t = i18n[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.textContent = t[key];
  });
  if (state.selected) renderPanelDetail(state.selected);
  renderRoutePanel();
}

/* ══════════════════════════════════════════
   Toast
══════════════════════════════════════════ */
let toastTimer;
function showToast(msg) {
  dom.toast.textContent = msg;
  dom.toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => dom.toast.classList.remove('show'), 2200);
}

/* ══════════════════════════════════════════
   Helpers
══════════════════════════════════════════ */
function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ══════════════════════════════════════════
   Event Listeners
══════════════════════════════════════════ */
function setupEventListeners() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyLanguage(btn.dataset.lang);
    });
  });

  document.querySelectorAll('.region-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.region-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.region = tab.dataset.region;
      applyFilters();
      renderMarkers();
      if (state.map) {
        const c = regionCenters[state.region];
        state.map.setCenter(new naver.maps.LatLng(c.lat, c.lng));
        state.map.setZoom(c.zoom);
      }
    });
  });

  document.querySelectorAll('.cat-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.category = chip.dataset.cat;
      applyFilters();
      renderMarkers();
    });
  const searchInput = document.getElementById('searchInput');
const searchClear = document.getElementById('searchClear');
const searchModeToggle = document.getElementById('searchModeToggle');

searchModeToggle.addEventListener('click', () => {
  state.searchMode = state.searchMode === 'restaurant' ? 'place' : 'restaurant';
  searchModeToggle.textContent = state.searchMode === 'restaurant' ? '🍽️' : '📍';
  searchInput.placeholder = state.searchMode === 'restaurant'
    ? 'Search restaurants or areas...'
    : 'Search nearby places... (e.g. cafe, pharmacy)';
  searchInput.value = '';
  state.searchQuery = '';
  searchClear.style.display = 'none';
  clearPoiMarkers();
  applyFilters();
  renderMarkers();
});

searchInput.addEventListener('input', () => {
  state.searchQuery = searchInput.value;
  searchClear.style.display = searchInput.value ? 'block' : 'none';
  if (state.searchMode === 'restaurant') {
    clearPoiMarkers();
    applyFilters();
    renderMarkers();
  }
});

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && state.searchMode === 'place' && searchInput.value.trim()) {
    searchNearbyPOI(searchInput.value.trim());
  }
});

searchClear.addEventListener('click', () => {
  searchInput.value = '';
  state.searchQuery = '';
  searchClear.style.display = 'none';
  clearPoiMarkers();
  applyFilters();
  renderMarkers();
});
  searchClear.addEventListener('click', () => {
    searchInput.value = '';
    state.searchQuery = '';
    searchClear.style.display = 'none';
    applyFilters();
    renderMarkers();
  });
  // 물품보관함 토글
  document.getElementById('btnToggleLockers').addEventListener('click', async () => {
    state.lockersVisible = !state.lockersVisible;
    const btn = document.getElementById('btnToggleLockers');
    btn.dataset.active = state.lockersVisible;
    btn.style.opacity = state.lockersVisible ? '1' : '0.5';
    if (state.lockersVisible) {
      await loadAndShowLockers();
    } else {
      hideLockers();
    }
  });
  });

  dom.routeFab.addEventListener('click', () => {
    state.routeMode = !state.routeMode;
    const isOpen = dom.routePanel.style.display !== 'none';
    dom.routePanel.style.display = isOpen ? 'none' : 'block';
    dom.routeFab.style.background = state.routeMode ? 'var(--accent)' : 'var(--text)';
    if (state.routeMode) renderRoutePanel();
  });

  dom.btnCloseRoute.addEventListener('click', () => {
    dom.routePanel.style.display = 'none';
    state.routeMode = false;
    dom.routeFab.style.background = 'var(--text)';
  });

  dom.btnStartRoute.addEventListener('click', startNavigation);

  dom.btnClearRoute.addEventListener('click', () => {
    const ids = state.routePlan.map(r => r.id);
    state.routePlan = [];
    ids.forEach(id => updateMarkerStyle(id));
    if (state.selected) renderPanelDetail(state.selected);
    renderRoutePanel();
  });

  dom.btnAddRoute.addEventListener('click', () => {
    if (state.selected) toggleRouteStop(state.selected);
  });

  dom.btnAddReview.addEventListener('click', openReviewModal);
  dom.btnCloseReview.addEventListener('click', closeReviewModal);
  dom.btnCancelReview.addEventListener('click', closeReviewModal);
  dom.reviewModal.addEventListener('click', e => { if (e.target === dom.reviewModal) closeReviewModal(); });

  dom.starPicker.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', () => {
      selectedRating = Number(star.dataset.val);
      dom.starPicker.querySelectorAll('.star').forEach((s, i) => {
        s.classList.toggle('filled', i < selectedRating);
      });
    });
    star.addEventListener('mouseenter', () => {
      const val = Number(star.dataset.val);
      dom.starPicker.querySelectorAll('.star').forEach((s, i) => s.classList.toggle('filled', i < val));
    });
    star.addEventListener('mouseleave', () => {
      dom.starPicker.querySelectorAll('.star').forEach((s, i) => s.classList.toggle('filled', i < selectedRating));
    });
  });

  dom.reviewForm.addEventListener('submit', e => {
    e.preventDefault();
    submitReview();
  });

  if (dom.panelHandle) {
    dom.panelHandle.addEventListener('click', () => {
      const isOpen = dom.sidePanel.classList.contains('panel-open');
      if (isOpen) {
        dom.sidePanel.classList.remove('panel-open');
        dom.sidePanel.classList.add('panel-peek');
      } else {
        dom.sidePanel.classList.remove('panel-peek');
        dom.sidePanel.classList.add('panel-open');
      }
    });
  }
}

/* ══════════════════════════════════════════
   Review Modal
══════════════════════════════════════════ */
function openReviewModal() {
  selectedRating = 0;
  dom.reviewForm.reset();
  dom.starPicker.querySelectorAll('.star').forEach(s => s.classList.remove('filled'));
  dom.reviewModal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}
function closeReviewModal() {
  dom.reviewModal.style.display = 'none';
  document.body.style.overflow = '';
}
async function submitReview() {
  const t      = i18n[state.lang];
  const nation    = dom.reviewNationality.value;
  const nickname  = document.getElementById('reviewNickname').value.trim();
  const text      = dom.reviewText.value.trim();
  if (!nation || !nickname || !selectedRating || !text || text.length < 3) {
    showToast(t.reviewError); return;
  }
  const flagMap = {
    'American':'\uD83C\uDDFA\uD83C\uDDF8','British':'\uD83C\uDDEC\uD83C\uDDE7','Chinese':'\uD83C\uDDE8\uD83C\uDDF3','Japanese':'\uD83C\uDDEF\uD83C\uDDF5','French':'\uD83C\uDDEB\uD83C\uDDF7',
    'German':'\uD83C\uDDE9\uD83C\uDDEA','Australian':'\uD83C\uDDE6\uD83C\uDDFA','Canadian':'\uD83C\uDDE8\uD83C\uDDE6','Spanish':'\uD83C\uDDEA\uD83C\uDDF8','Italian':'\uD83C\uDDEE\uD83C\uDDF9',
    'Brazilian':'\uD83C\uDDE7\uD83C\uDDF7','Thai':'\uD83C\uDDF9\uD83C\uDDED','Singaporean':'\uD83C\uDDF8\uD83C\uDDEC','Malaysian':'\uD83C\uDDF2\uD83C\uDDFE','Indonesian':'\uD83C\uDDEE\uD83C\uDDE9',
    'Vietnamese':'\uD83C\uDDFB\uD83C\uDDF3','Filipino':'\uD83C\uDDF5\uD83C\uDDED','Indian':'\uD83C\uDDEE\uD83C\uDDF3','Mexican':'\uD83C\uDDF2\uD83C\uDDFD','Russian':'\uD83C\uDDF7\uD83C\uDDFA',
    'Dutch':'\uD83C\uDDF3\uD83C\uDDF1','Swedish':'\uD83C\uDDF8\uD83C\uDDEA','Swiss':'\uD83C\uDDE8\uD83C\uDDED','Taiwanese':'\uD83C\uDDF9\uD83C\uDDFC','Other':'\uD83C\uDF0D'
  };
  const flag = flagMap[nation] || '🌍';
  const review = {
    nationality: nation,
    nickname,
    flag,
    rating: selectedRating,
    text,
    date: new Date().toLocaleDateString(),
  };
  await saveReview(state.selected.id, review);
  closeReviewModal();
  await renderReviews(state.selected.id);
  showToast(t.reviewSaved);
}

/* ══════════════════════════════════════════
   Service Worker
══════════════════════════════════════════ */
function registerServiceWorker() {
  // disabled
}

/* ══════════════════════════════════════════
   Boot
══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', init);
function clearPoiMarkers() {
  state.poiMarkers.forEach(m => m.setMap(null));
  state.poiMarkers = [];
}

async function searchNearbyPOI(keyword) {
  clearPoiMarkers();
  const bounds = state.map.getBounds();
  const center = state.map.getCenter();
  const lat = center.lat();
  const lng = center.lng();

  const url = `https://openapi.naver.com/v1/search/local.json?query=${encodeURIComponent(keyword)}&display=20&sort=comment`;

  try {
    const res = await fetch(`/api/naver-search?query=${encodeURIComponent(keyword)}&lat=${lat}&lng=${lng}`);
    const data = await res.json();
    console.log('POI response:', data);

    if (!data.items || data.items.length === 0) {
      console.log('검색 결과가 없습니다:', data);
      return;
    }

    data.items.forEach(item => {
      const itemLat = parseFloat(item.mapy);
      const itemLng = parseFloat(item.mapx);
      const position = new naver.maps.LatLng(itemLat, itemLng);

    

      const marker = new naver.maps.Marker({
        position,
        map:state.map,
        icon: {
          content: `<div style="background:#4A90E2;color:#fff;border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-size:16px;box-shadow:0 2px 6px rgba(0,0,0,0.3)">📍</div>`,
          anchor: new naver.maps.Point(16, 16),
        }
      });

      const infoWindow = new naver.maps.InfoWindow({
        content: `<div style="padding:8px;min-width:150px;font-size:13px">
          <strong>${item.title.replace(/<[^>]*>/g, '')}</strong><br>
          <span style="color:#666">${item.address}</span><br>
          <a href="${item.link}" target="_blank" style="color:#4A90E2">카카오맵에서 보기</a>
        </div>`
      });

      marker.addListener('click', () => {
        state.poiMarkers.forEach(m => m._iw && m._iw.close());
        infoWindow.open(state.map, marker);
        marker._iw = infoWindow;
      });

      state.poiMarkers.push(marker);
    });
  } catch (err) {
    console.error('POI 검색 오류:', err);
  }
}