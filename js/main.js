// ========================================
// メニュー・サブメニュー制御
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');

  if (!menuToggle || !nav) return;

  // ハンバーガーメニュー 開閉
  menuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    nav.classList.toggle('active');
  });

  // サブメニュートグル（モバイルのみ）
  nav.querySelectorAll('.submenu-toggle').forEach(function(toggle) {
    toggle.addEventListener('click', function(e) {
      if (window.innerWidth > 768) return; // PC は CSS hover で動作
      e.preventDefault();
      e.stopPropagation();

      var parent = this.closest('.has-submenu');
      var isOpen = parent.classList.contains('active');

      // 他のサブメニューを閉じる
      nav.querySelectorAll('.has-submenu.active').forEach(function(el) {
        el.classList.remove('active');
      });

      // 自分を開閉
      if (!isOpen) {
        parent.classList.add('active');
      }
    });
  });

  // サブメニュー以外のリンクをクリック → メニューを閉じる
  nav.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      if (link.classList.contains('submenu-toggle')) return;
      menuToggle.classList.remove('active');
      nav.classList.remove('active');
      nav.querySelectorAll('.has-submenu.active').forEach(function(el) {
        el.classList.remove('active');
      });
    });
  });

  // メニュー外クリック → 閉じる
  document.addEventListener('click', function(e) {
    if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
      menuToggle.classList.remove('active');
      nav.classList.remove('active');
      nav.querySelectorAll('.has-submenu.active').forEach(function(el) {
        el.classList.remove('active');
      });
    }
  });
});

// ========================================
// ヘッダーのスクロール制御
// ========================================
let lastScroll = 0;
const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

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
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// ========================================
// 年別ナビゲーションのアクティブ状態管理
// ========================================
const yearLinks = document.querySelectorAll('.year-link');
const sections = document.querySelectorAll('.member-section');

if (yearLinks.length > 0 && sections.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        yearLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' });

  sections.forEach(section => observer.observe(section));
}

// ========================================
// コンソールメッセージ
// ========================================
console.log('%c風舞人 KABUTO', 'color: #dc143c; font-size: 24px; font-weight: bold;');
console.log('%c松山市のよさこいチーム - 宴会も全力！', 'color: #666; font-size: 14px;');
