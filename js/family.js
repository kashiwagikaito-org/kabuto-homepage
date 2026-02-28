// =============================================
// ファミリーページ JS
// color: 'shiro' = 白椿（男性）, 'aka' = 赤椿（女性）
// =============================================

// メンバーデータキャッシュ
var MEMBERS_DATA = {};

// =============================================
// グリッド描画
// =============================================
function renderGrid(year) {
  var grid = document.getElementById('famGrid');

  if (year === 'old') {
    grid.innerHTML = [
      '<div class="fam-old-site-cta">',
      '  <p>2025年以前のメンバーは旧サイトでご覧いただけます。</p>',
      '  <a href="../before19/index.html" class="btn-primary" target="_blank" rel="noopener">',
      '    旧サイトへ &nbsp;<i class="fas fa-external-link-alt" style="font-size:0.8em;"></i>',
      '  </a>',
      '</div>'
    ].join('');
    return;
  }

  // キャッシュがあればすぐ描画
  if (MEMBERS_DATA[year]) {
    _renderGridData(year);
    return;
  }

  // JSONを取得（パスはfamily.htmlからの相対パス）
  fetch('../js/member_' + year + '.json')
    .then(function(res) {
      if (!res.ok) throw new Error('fetch failed');
      return res.json();
    })
    .then(function(data) {
      MEMBERS_DATA[year] = data;
      _renderGridData(year);
    })
    .catch(function() {
      document.getElementById('famGrid').innerHTML =
        '<p style="text-align:center;color:#999;">データを読み込めませんでした</p>';
    });
}

function _renderGridData(year) {
  var grid = document.getElementById('famGrid');
  var data = MEMBERS_DATA[year];
  if (!data) {
    grid.innerHTML = '<p style="text-align:center;color:#999;">データがありません</p>';
    return;
  }

  grid.innerHTML = data.map(function(m) {
    // カードは facePhoto（顔写真）を使用。未設定なら kamon.jpg
    var isDefaultFace = !m.facePhoto;
    var cardPhotoSrc = m.facePhoto || '../images/kamon.jpg';
    var imgClass = 'fam-card-logo-img' + (isDefaultFace ? ' fam-card-logo-img--kamon' : '');
    var photoHTML = '<img src="' + cardPhotoSrc + '" alt="' + m.kabutoName + '" class="' + imgClass + '" />';
    return [
      '<div class="fam-card fam-card--' + m.color + '" data-id="' + m.id + '" data-year="' + year + '" tabindex="0" role="button" aria-label="' + m.kabutoName + 'のプロフィールを開く">',
      '  <div class="fam-card-photo">' + photoHTML + '</div>',
      '  <div class="fam-card-info">',
      '    <p class="fam-card-name">' + m.kabutoName + '</p>',
      '    <p class="fam-card-role">' + m.role + '</p>',
      '  </div>',
      '</div>'
    ].join('');
  }).join('');

  // カードクリックイベント
  grid.querySelectorAll('.fam-card').forEach(function(card) {
    card.addEventListener('click', function() {
      openModal(parseInt(card.dataset.id), parseInt(card.dataset.year));
    });
    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ')
        openModal(parseInt(card.dataset.id), parseInt(card.dataset.year));
    });
  });
}

// =============================================
// モーダル開閉
// =============================================
function openModal(id, year) {
  var data = MEMBERS_DATA[year];
  if (!data) return;
  var m = data.find(function(x) { return x.id === id; });
  if (!m) return;

  document.getElementById('fmName').textContent = m.kabutoName;
  document.getElementById('fmRole').textContent = m.role;
  document.getElementById('fmMessage').textContent = m.message;
  document.getElementById('fmHobby').textContent = m.hobby;
  document.getElementById('fmFavorite').textContent = m.favorite;

  // モーダル左パネルの写真（デフォルトは kamon.jpg）
  var isDefaultPhoto = !m.photo;
  var photoSrc = m.photo || '../images/kamon.jpg';
  var photoWrap = document.getElementById('fmPhotoWrap');
  var photoStyle = isDefaultPhoto
    ? 'width:100%;height:100%;object-fit:fill;border-radius:4px;cursor:zoom-in;'
    : 'width:100%;height:100%;object-fit:cover;border-radius:4px;cursor:zoom-in;';
  photoWrap.innerHTML =
    '<img src="' + photoSrc + '" alt="' + m.kabutoName + '" style="' + photoStyle + '" />';

  // 写真クリックで拡大
  photoWrap.querySelector('img').addEventListener('click', function() {
    openLightbox(photoSrc, m.kabutoName);
  });

  // 椿アイコン（背景画像・color に応じて切り替え）
  var kamonEl = document.getElementById('fmKamon');
  var kamonImg = m.color === 'shiro'
    ? '../images/akatsubaki1.png'
    : '../images/shirotsubaki1.png';
  kamonEl.style.backgroundImage = 'url("' + kamonImg + '")';

  var overlay = document.getElementById('famModal');
  overlay.classList.add('is-open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  var overlay = document.getElementById('famModal');
  overlay.classList.remove('is-open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// =============================================
// 写真ライトボックス
// =============================================
function openLightbox(src, alt) {
  var lb = document.getElementById('famPhotoLightbox');
  document.getElementById('famLightboxImg').src = src;
  document.getElementById('famLightboxImg').alt = alt;
  lb.classList.add('is-open');
}

function closeLightbox() {
  var lb = document.getElementById('famPhotoLightbox');
  lb.classList.remove('is-open');
  document.getElementById('famLightboxImg').src = '';
}

document.getElementById('famPhotoLightbox').addEventListener('click', function(e) {
  if (e.target === this || e.target.classList.contains('fam-photo-lightbox-close')) {
    closeLightbox();
  }
});

// =============================================
// 年度タブ切り替え
// =============================================
document.querySelectorAll('.fam-year-btn[data-year]').forEach(function(btn) {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.fam-year-btn').forEach(function(b) { b.classList.remove('is-active'); });
    btn.classList.add('is-active');
    var year = btn.dataset.year === 'old' ? 'old' : parseInt(btn.dataset.year);
    renderGrid(year);
  });
});

// モーダルクローズ
document.getElementById('famModal').querySelector('.fam-modal-close').addEventListener('click', closeModal);
document.getElementById('famModal').addEventListener('click', function(e) {
  if (e.target === document.getElementById('famModal')) closeModal();
});
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeLightbox();
    closeModal();
  }
});

// 初期描画（2026年）
renderGrid(2026);
