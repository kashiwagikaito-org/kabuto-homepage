// =============================================
// 動画館 JS
// embedUrl: YouTube の埋め込みURL (https://www.youtube.com/embed/動画ID)
// =============================================

var VIDEO_DATA = {};
var VIDEO_CURRENT_YEAR = 2026;
var VIDEO_CURRENT_PAGE = 1;
var VIDEO_PAGE_SIZE = 15;

// =============================================
// グリッド描画（ページ指定）
// =============================================
function renderGrid(year, page) {
  page = page || 1;
  VIDEO_CURRENT_YEAR = year;
  VIDEO_CURRENT_PAGE = page;

  // キャッシュがあればすぐ描画
  if (VIDEO_DATA[year]) {
    _renderGridData(year, page);
    return;
  }

  // JSONを取得
  fetch('../js/video_' + year + '.json')
    .then(function(res) {
      if (!res.ok) throw new Error('fetch failed');
      return res.json();
    })
    .then(function(data) {
      VIDEO_DATA[year] = data;
      _renderGridData(year, page);
    })
    .catch(function() {
      document.getElementById('videoGrid').innerHTML =
        '<p style="text-align:center;color:#999;">データを読み込めませんでした</p>';
      document.getElementById('videoPagination').innerHTML = '';
    });
}

function _renderGridData(year, page) {
  var grid = document.getElementById('videoGrid');
  var pagination = document.getElementById('videoPagination');
  var data = VIDEO_DATA[year];

  if (!data || data.length === 0) {
    grid.innerHTML = '<p style="text-align:center;color:#999;grid-column:1/-1;">動画はまだありません</p>';
    pagination.innerHTML = '';
    return;
  }

  // ページスライス
  var total = data.length;
  var totalPages = Math.ceil(total / VIDEO_PAGE_SIZE);
  page = Math.max(1, Math.min(page, totalPages));
  var start = (page - 1) * VIDEO_PAGE_SIZE;
  var slice = data.slice(start, start + VIDEO_PAGE_SIZE);

  // グリッド描画
  grid.innerHTML = slice.map(function(v) {
    return [
      '<div class="video-card">',
      '  <div class="video-card-embed">',
      '    <iframe src="' + v.embedUrl + '" title="' + v.title + '" allowfullscreen></iframe>',
      '  </div>',
      '  <div class="video-card-body">',
      '    <p class="video-card-title">' + v.title + '</p>',
      '  </div>',
      '</div>'
    ].join('');
  }).join('');

  // ページネーション描画
  if (totalPages <= 1) {
    pagination.innerHTML = '';
    return;
  }

  var html = '';
  html += '<button class="news-page-btn" id="videoPrevBtn"' + (page === 1 ? ' disabled' : '') + '>&#8249;</button>';
  for (var i = 1; i <= totalPages; i++) {
    html += '<button class="news-page-btn' + (i === page ? ' is-active' : '') + '" data-page="' + i + '">' + i + '</button>';
  }
  html += '<button class="news-page-btn" id="videoNextBtn"' + (page === totalPages ? ' disabled' : '') + '>&#8250;</button>';
  pagination.innerHTML = html;

  // ページネーション イベント
  document.getElementById('videoPrevBtn').addEventListener('click', function() {
    renderGrid(VIDEO_CURRENT_YEAR, VIDEO_CURRENT_PAGE - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  document.getElementById('videoNextBtn').addEventListener('click', function() {
    renderGrid(VIDEO_CURRENT_YEAR, VIDEO_CURRENT_PAGE + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  pagination.querySelectorAll('[data-page]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      renderGrid(VIDEO_CURRENT_YEAR, parseInt(btn.dataset.page));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

// =============================================
// 年度タブ切り替え
// =============================================
document.querySelectorAll('.fam-year-btn[data-year]').forEach(function(btn) {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.fam-year-btn').forEach(function(b) { b.classList.remove('is-active'); });
    btn.classList.add('is-active');
    // アクティブタブをスクロールエリアの中央に表示
    var tabs = document.querySelector('.fam-year-tabs');
    tabs.scrollTo({ left: btn.offsetLeft - tabs.clientWidth / 2 + btn.offsetWidth / 2, behavior: 'smooth' });
    renderGrid(parseInt(btn.dataset.year), 1);
  });
});

// =============================================
// PC用 タブスクロール矢印ボタン
// =============================================
(function() {
  var tabs = document.querySelector('.fam-year-tabs');
  var prev = document.getElementById('tabPrev');
  var next = document.getElementById('tabNext');
  if (!tabs || !prev || !next) return;

  var STEP = 200;

  prev.addEventListener('click', function() {
    tabs.scrollBy({ left: -STEP, behavior: 'smooth' });
  });
  next.addEventListener('click', function() {
    tabs.scrollBy({ left: STEP, behavior: 'smooth' });
  });
})();

// 初期描画
renderGrid(2026, 1);
