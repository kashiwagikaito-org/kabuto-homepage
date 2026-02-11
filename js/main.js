// ========================================
// モバイルメニュートグル
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      nav.classList.toggle('active');
    });

    // メニュー項目をクリックしたらメニューを閉じる
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
      });
    });

    // メニュー外をクリックしたら閉じる
    document.addEventListener('click', function(e) {
      if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
      }
    });
  }
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
    
    // 空のハッシュまたは#のみの場合はスキップ
    if (!href || href === '#') {
      return;
    }
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
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
  const observerOptions = {
    threshold: 0.3,
    rootMargin: '-100px 0px -50% 0px'
  };

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
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

// ========================================
// コンソールメッセージ
// ========================================
console.log(
  '%c風舞人 KABUTO',
  'color: #dc143c; font-size: 24px; font-weight: bold;'
);
console.log(
  '%c松山市のよさこいチーム - 宴会も全力！',
  'color: #666; font-size: 14px;'
);