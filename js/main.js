// ========================================
// ハンバーガーメニュー開閉
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  var menuToggle = document.getElementById('menuToggle');
  var nav = document.getElementById('nav');

  if (!menuToggle || !nav) return;

  // ハンバーガーボタン
  menuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    nav.classList.toggle('active');
  });

  // ナビリンクをクリック → メニューを閉じる（サブメニュー親は除く）
  nav.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      if (link.classList.contains('submenu-toggle')) return;
      menuToggle.classList.remove('active');
      nav.classList.remove('active');
    });
  });

  // メニュー外クリック → 閉じる
  document.addEventListener('click', function(e) {
    if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
      menuToggle.classList.remove('active');
      nav.classList.remove('active');
    }
  });
});

// ========================================
// ヘッダーのスクロール制御
// ========================================
var lastScroll = 0;
var header = document.querySelector('.site-header');

window.addEventListener('scroll', function() {
  var currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    header.classList.remove('hidden');
    return;
  }

  if (currentScroll > lastScroll && currentScroll > 100) {
    header.classList.add('hidden');
  } else {
    header.classList.remove('hidden');
  }

  lastScroll = currentScroll;
});

// ========================================
// スムーススクロール
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    var href = this.getAttribute('href');
    if (!href || href === '#') return;
    var target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    }
  });
});

// ========================================
// 年別ナビゲーションのアクティブ状態管理
// ========================================
var yearLinks = document.querySelectorAll('.year-link');
var sections = document.querySelectorAll('.member-section');

if (yearLinks.length > 0 && sections.length > 0) {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var id = entry.target.getAttribute('id');
        yearLinks.forEach(function(link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' });

  sections.forEach(function(section) { observer.observe(section); });
}

// ========================================
// コンソールメッセージ
// ========================================
console.log('%c風舞人 KABUTO', 'color: #dc143c; font-size: 24px; font-weight: bold;');
console.log('%c松山市のよさこいチーム - 宴会も全力！', 'color: #666; font-size: 14px;');
