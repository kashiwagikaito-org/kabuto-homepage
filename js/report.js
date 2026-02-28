// =============================================
// 活動報告 JS
// 新しい報告を追加するときはここに追記（新しいものを上に）
// photoUrl / blogUrl が null のときはリンクを表示しない
// =============================================
var REPORT_DATA = {
  2026: [
    {
      date: '2026.02.28',
      event: 'とにかく宴！',
      leader: '山田 太郎',
      sub1: '鈴木 花子',
      sub2: '田中 一郎',
      photoUrl: 'https://photos.app.goo.gl/MFDKdau4xCje2LnR9',
      blogUrl: 'https://yosakoikabuto2006.blog.fc2.com/blog-entry-1.htm'
    },
    {
      date: '2026.01.25',
      event: '松山よさこい新春演舞',
      leader: '山田 太郎',
      sub1: '鈴木 花子',
      sub2: '佐藤 次郎',
      photoUrl: 'https://photos.app.goo.gl/MFDKdau4xCje2LnR9',
      blogUrl: 'https://yosakoikabuto2006.blog.fc2.com/blog-entry-1.htm'
    },
    {
      date: '2026.01.01',
      event: '新年初詣演舞（松山城）',
      leader: '山田 太郎',
      sub1: '高橋 美咲',
      sub2: null,
      photoUrl: 'https://photos.app.goo.gl/MFDKdau4xCje2LnR9',
      blogUrl: null
    }
  ]
};

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
