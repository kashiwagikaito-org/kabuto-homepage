// =============================================
// 写真館 JS
// albumUrl: Googleフォト共有リンク
// =============================================

// 写真データキャッシュ
var PHOTO_DATA = {};

// =============================================
// グリッド描画
// =============================================
function renderGrid(year) {
  var grid = document.getElementById('photoGrid');

  if (year === 'old') {
    grid.innerHTML = [
      '<div class="fam-old-site-cta">',
      '  <p>2025年以前の写真は旧サイトでご覧いただけます。</p>',
      '  <a href="../member/before19/index.html" class="btn-primary" target="_blank" rel="noopener">',
      '    旧サイトへ &nbsp;<i class="fas fa-external-link-alt" style="font-size:0.8em;"></i>',
      '  </a>',
      '</div>'
    ].join('');
    return;
  }

  // キャッシュがあればすぐ描画
  if (PHOTO_DATA[year]) {
    _renderGridData(year);
    return;
  }

  // JSONを取得（パスはphoto.htmlからの相対パス）
  fetch('../js/photo_' + year + '.json')
    .then(function(res) {
      if (!res.ok) throw new Error('fetch failed');
      return res.json();
    })
    .then(function(data) {
      PHOTO_DATA[year] = data;
      _renderGridData(year);
    })
    .catch(function() {
      document.getElementById('photoGrid').innerHTML =
        '<p style="text-align:center;color:#999;">データを読み込めませんでした</p>';
    });
}

function _renderGridData(year) {
  var grid = document.getElementById('photoGrid');
  var data = PHOTO_DATA[year];
  if (!data || data.length === 0) {
    grid.innerHTML = '<p style="text-align:center;color:#999;grid-column:1/-1;">写真アルバムはまだありません</p>';
    return;
  }

  grid.innerHTML = data.map(function(p) {
    var thumbContent = p.thumbnail
      ? '<img src="' + p.thumbnail + '" alt="' + p.title + '" />'
      : '<i class="fas fa-images"></i>';
    return [
      '<a class="photo-card" href="' + p.albumUrl + '" target="_blank" rel="noopener">',
      '  <div class="photo-card-thumb">',
      '    ' + thumbContent,
      '  </div>',
      '  <div class="photo-card-body">',
      '    <p class="photo-card-title">' + p.title + '</p>',
      '    <span class="photo-card-btn"><i class="fas fa-external-link-alt"></i> アルバムを開く</span>',
      '  </div>',
      '</a>'
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
