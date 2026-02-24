// =============================================
// 動画館 JS
// embedUrl: YouTube の埋め込みURL (https://www.youtube.com/embed/動画ID)
// =============================================

// 動画データキャッシュ
var VIDEO_DATA = {};

// =============================================
// グリッド描画
// =============================================
function renderGrid(year) {
  var grid = document.getElementById('videoGrid');

  if (year === 'old') {
    grid.innerHTML = [
      '<div class="fam-old-site-cta">',
      '  <p>2025年以前の動画は旧サイトでご覧いただけます。</p>',
      '  <a href="../member/before19/index.html" class="btn-primary" target="_blank" rel="noopener">',
      '    旧サイトへ &nbsp;<i class="fas fa-external-link-alt" style="font-size:0.8em;"></i>',
      '  </a>',
      '</div>'
    ].join('');
    return;
  }

  // キャッシュがあればすぐ描画
  if (VIDEO_DATA[year]) {
    _renderGridData(year);
    return;
  }

  // JSONを取得（パスはvideo.htmlからの相対パス）
  fetch('../js/video_' + year + '.json')
    .then(function(res) {
      if (!res.ok) throw new Error('fetch failed');
      return res.json();
    })
    .then(function(data) {
      VIDEO_DATA[year] = data;
      _renderGridData(year);
    })
    .catch(function() {
      document.getElementById('videoGrid').innerHTML =
        '<p style="text-align:center;color:#999;">データを読み込めませんでした</p>';
    });
}

function _renderGridData(year) {
  var grid = document.getElementById('videoGrid');
  var data = VIDEO_DATA[year];
  if (!data || data.length === 0) {
    grid.innerHTML = '<p style="text-align:center;color:#999;grid-column:1/-1;">動画はまだありません</p>';
    return;
  }

  grid.innerHTML = data.map(function(v) {
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
}

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

// 初期描画
renderGrid(2026);
