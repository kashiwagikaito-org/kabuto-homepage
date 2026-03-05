// =============================================
// お知らせ一覧
// データは js/json/news/news.json で管理（新しいものを上に追記）
// =============================================

// カテゴリー定義（label: バッジ表示名, cls: CSSクラス）
var CATEGORY_MAP = {
  report:   { label: '活動報告',   cls: 'news-badge--report'   },
  greeting: { label: 'ご挨拶',     cls: 'news-badge--greeting' },
  event:    { label: 'イベント',   cls: 'news-badge--event'    },
  party:    { label: '宴会',       cls: 'news-badge--party'    },
  notice:   { label: 'お知らせ',   cls: 'news-badge--notice'   },
  media:    { label: '動画・写真', cls: 'news-badge--media'    },
  sns:      { label: 'SNS',        cls: 'news-badge--sns'      }
};

var NEWS_DATA = [];
var PER_PAGE = 30;
var currentPage = 1;

// =============================================
// 一覧描画
// =============================================
function renderNews(page) {
  var list = document.getElementById("newsList");
  var start = (page - 1) * PER_PAGE;
  var end = Math.min(start + PER_PAGE, NEWS_DATA.length);
  var html = "";

  for (var i = start; i < end; i++) {
    var n = NEWS_DATA[i];
    var cat = CATEGORY_MAP[n.category] || { label: n.category || '', cls: '' };
    html += '<div class="news-item' + (n.thumb ? ' news-item--has-thumb' : '') + '">';
    if (n.thumb) {
      html += '<img class="news-item-thumb" src="../' + n.thumb + '" alt="' + (n.alt || '') + '" />';
    }
    html += '<div class="news-item-body">';
    html += '<div class="news-item-meta">';
    html += '<span class="news-item-date">' + n.date + '</span>';
    html += '<span class="news-badge ' + cat.cls + '">' + cat.label + '</span>';
    html += '</div>';
    html += '<p class="news-text">' + n.text + '</p>';
    html += '<a href="../' + n.href + '" class="news-link" style="margin-left:0">詳細 →</a>';
    html += '</div></div>';
  }

  list.innerHTML =
    html ||
    '<p style="text-align:center;color:#999;">お知らせはありません</p>';
}

// =============================================
// ページネーション描画
// =============================================
function renderPagination() {
  var totalPages = Math.ceil(NEWS_DATA.length / PER_PAGE);
  var nav = document.getElementById("newsPagination");

  if (totalPages <= 1) {
    nav.innerHTML = "";
    return;
  }

  var html = "";
  html +=
    '<button class="news-page-btn" id="pagePrev" ' +
    (currentPage === 1 ? "disabled" : "") +
    '><i class="fas fa-chevron-left"></i> 前へ</button>';
  for (var p = 1; p <= totalPages; p++) {
    html +=
      '<button class="news-page-btn' +
      (p === currentPage ? " is-active" : "") +
      '" data-page="' +
      p +
      '">' +
      p +
      "</button>";
  }
  html +=
    '<button class="news-page-btn" id="pageNext" ' +
    (currentPage === totalPages ? "disabled" : "") +
    '>次へ <i class="fas fa-chevron-right"></i></button>';
  nav.innerHTML = html;

  nav.querySelectorAll("[data-page]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      goToPage(parseInt(btn.dataset.page));
    });
  });
  document
    .getElementById("pagePrev")
    .addEventListener("click", function () {
      if (currentPage > 1) goToPage(currentPage - 1);
    });
  document
    .getElementById("pageNext")
    .addEventListener("click", function () {
      if (currentPage < totalPages) goToPage(currentPage + 1);
    });
}

function goToPage(page) {
  currentPage = page;
  renderNews(currentPage);
  renderPagination();
  document
    .getElementById("newsList")
    .scrollIntoView({ behavior: "smooth", block: "start" });
}

// JSONから読み込んで初期描画
fetch('../js/json/news/news.json')
  .then(function(r) { return r.json(); })
  .then(function(data) {
    NEWS_DATA = data;
    renderNews(1);
    renderPagination();
  });
