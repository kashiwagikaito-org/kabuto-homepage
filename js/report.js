// =============================================
// 活動報告 JS
// 新しい年度を追加するときは js/json/report/report_XXXX.json を作成
// photoUrl / blogUrl が null のときはリンクを表示しない
// =============================================

// 活動報告データキャッシュ
var REPORT_DATA = {};

// =============================================
// コンテンツ描画
// =============================================
function renderContent(year) {
  var wrap = document.getElementById('reportContent');

  if (year === 'old') {
    wrap.innerHTML = [
      '<div class="fam-old-site-cta">',
      '  <p>2025年以前の活動報告は旧サイトでご覧いただけます。</p>',
      '  <a href="../before19/index.html" class="btn-primary" target="_blank" rel="noopener">',
      '    旧サイトへ &nbsp;<i class="fas fa-external-link-alt" style="font-size:0.8em;"></i>',
      '  </a>',
      '</div>'
    ].join('');
    return;
  }

  // キャッシュがあればすぐ描画
  if (REPORT_DATA[year]) {
    _renderTable(year);
    return;
  }

  // JSONを取得（パスはreport.htmlからの相対パス）
  fetch('../js/json/report/report_' + year + '.json')
    .then(function(res) {
      if (!res.ok) throw new Error('fetch failed');
      return res.json();
    })
    .then(function(data) {
      REPORT_DATA[year] = data;
      _renderTable(year);
    })
    .catch(function() {
      document.getElementById('reportContent').innerHTML =
        '<p style="text-align:center;color:#999;">データを読み込めませんでした</p>';
    });
}

function _renderTable(year) {
  var wrap = document.getElementById('reportContent');
  var data = REPORT_DATA[year];

  if (!data || data.length === 0) {
    wrap.innerHTML = '<p style="text-align:center;color:#999;">活動報告はまだありません</p>';
    return;
  }

  var rows = data.map(function(r) {
    var photo = r.photoUrl
      ? '<a href="' + r.photoUrl + '" class="report-link report-link--photo" target="_blank" rel="noopener"><i class="fas fa-images"></i> Photo</a>'
      : '<span class="report-link-none">-</span>';
    var blog = r.blogUrl
      ? '<a href="' + r.blogUrl + '" class="report-link report-link--blog" target="_blank" rel="noopener"><i class="fas fa-pen-to-square"></i> Blog</a>'
      : '<span class="report-link-none">-</span>';
    var sub2 = r.sub2 || '-';
    return [
      '<tr>',
      '  <td data-label="開催日" class="report-td-date">' + r.date + '</td>',
      '  <td data-label="祭り・イベント" class="report-td-event">' + r.event + '</td>',
      '  <td data-label="隊長">' + r.leader + '</td>',
      '  <td data-label="副隊長">' + r.sub1 + '</td>',
      '  <td data-label="副隊長">' + sub2 + '</td>',
      '  <td data-label="Photo">' + photo + '</td>',
      '  <td data-label="Blog">' + blog + '</td>',
      '</tr>'
    ].join('');
  }).join('');

  wrap.innerHTML = [
    '<div class="report-table-wrap">',
    '  <table class="report-table">',
    '    <thead>',
    '      <tr>',
    '        <th>日にち</th>',
    '        <th>イベント・祭り名</th>',
    '        <th>隊長</th>',
    '        <th>副隊長①</th>',
    '        <th>副隊長②</th>',
    '        <th>Photo</th>',
    '        <th>Blog</th>',
    '      </tr>',
    '    </thead>',
    '    <tbody>',
    rows,
    '    </tbody>',
    '  </table>',
    '</div>'
  ].join('');
}

// =============================================
// 年度タブ切り替え
// =============================================
document.querySelectorAll('.fam-year-btn[data-year]').forEach(function(btn) {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.fam-year-btn').forEach(function(b) { b.classList.remove('is-active'); });
    btn.classList.add('is-active');
    var year = btn.dataset.year === 'old' ? 'old' : parseInt(btn.dataset.year);
    renderContent(year);
  });
});

// 初期描画
renderContent(2026);
