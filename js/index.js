// カテゴリー定義（label: バッジ表示名, cls: CSSクラス）
var CATEGORY_MAP = {
  report: { label: "活動報告", cls: "news-badge--report" },
  greeting: { label: "ご挨拶", cls: "news-badge--greeting" },
  event: { label: "イベント", cls: "news-badge--event" },
  party: { label: "宴会", cls: "news-badge--party" },
  notice: { label: "お知らせ", cls: "news-badge--notice" },
  media: { label: "動画・写真", cls: "news-badge--media" },
  sns: { label: "SNS", cls: "news-badge--sns" },
};

// 最新のお知らせ（5件）
fetch("js/json/news/news.json")
  .then(function (r) {
    return r.json();
  })
  .then(function (data) {
    var items = data.slice(0, 5);
    var html = "";
    items.forEach(function (n) {
      var cat = CATEGORY_MAP[n.category] || {
        label: n.category || "",
        cls: "",
      };
      html +=
        '<div class="news-item' +
        (n.thumb ? " news-item--has-thumb" : "") +
        '">';
      if (n.thumb) {
        html +=
          '<img class="news-item-thumb" src="' +
          n.thumb +
          '" alt="' +
          (n.alt || "") +
          '" />';
      }
      html += '<div class="news-item-body">';
      html += '<div class="news-item-meta">';
      html += '<span class="news-item-date">' + n.date + "</span>";
      html +=
        '<span class="news-badge ' +
        cat.cls +
        '">' +
        cat.label +
        "</span>";
      html += "</div>";
      html += '<p class="news-text">' + n.text + "</p>";
      html +=
        '<a href="' +
        n.href +
        '" class="news-link" style="margin-left:0">詳細 →</a>';
      html += "</div></div>";
    });
    document.getElementById("newsListTop").innerHTML =
      html ||
      '<p style="text-align:center;color:#999;">お知らせはありません</p>';
  });

// 動画が読み込めない・再生できない場合のフォールバック処理
const video = document.getElementById("heroVideo");
const section = document.getElementById("heroSection");

function showFallback() {
  if (!section) return;
  const poster = video ? video.getAttribute("poster") : "";
  if (poster) {
    section.style.backgroundImage = `url('${poster}')`;
    section.style.backgroundSize = "cover";
    section.style.backgroundPosition = "center";
  }
  if (video) video.style.display = "none";
}

if (video) {
  video.addEventListener("error", showFallback);
  const fallbackTimer = setTimeout(showFallback, 3000);
  video.addEventListener("playing", () => clearTimeout(fallbackTimer));
  video.addEventListener("canplay", () => clearTimeout(fallbackTimer));
}
